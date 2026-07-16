import { NextResponse } from 'next/server';
import { villasData } from '@/data/villas';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const villaId = searchParams.get('villaId');
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);
  
  if (!villaId) {
    return NextResponse.json({ error: 'villaId is required' }, { status: 400 });
  }

  const villa = villasData.find((v) => v.id === villaId);
  
  if (!villa || !villa.reservationKeyUnitId) {
    return NextResponse.json({ error: 'Villa not found or missing ReservationKey Unit ID' }, { status: 404 });
  }

  // Use a 12-month rolling window for availability checking
  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  
  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  const endDate = future.toISOString().split('T')[0];
  const API_KEY = process.env.RESERVATION_KEY_API_KEY;

  try {
    const rawUnitIds = villa.reservationKeyUnitId.split(',');
    const cleanUnitIds = rawUnitIds.map((id: string) => id.split(':')[0]).join(',');
    const url = `https://api.reservationkey.com/availability/calendar?start_date=${startDate}&end_date=${endDate}&unit_ids=${cleanUnitIds}&include=inventory`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      // Keep fresh for 5 mins to avoid hitting rate limits
      next: { revalidate: 300 } 
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`ReservationKey API returned status ${response.status}:`, data);
      return NextResponse.json({ 
        blockedDates: [], 
        error: `ReservationKey API returned: ${data.error || 'Error'}` 
      }, { status: response.status });
    }

    // Map through the calendar response and find dates with less inventory than requested quantity
    const blockedDates: string[] = [];

    if (data.units && Array.isArray(data.units)) {
      // Create a map of date -> available count across all pooled units
      const dateAvailability: Record<string, number> = {};
      
      const targetUnitIds = rawUnitIds.map((id: string) => id.split(':')[0]);

      for (const unit of data.units) {
        // Only process units we actually care about. Strip any :0 suffix from the API response
        const thisUnitId = String(unit.unit_id || unit.id).split(':')[0];
        if (!targetUnitIds.includes(thisUnitId)) continue;
        
        if (unit.dates && Array.isArray(unit.dates)) {
          for (const dayInfo of unit.dates) {
            const dateStr = dayInfo.date;
            if (dateAvailability[dateStr] === undefined) {
              dateAvailability[dateStr] = 0;
            }
            
            // Check if this specific unit is available on this date
            const isAvailable = 
              dayInfo.available !== false && 
              (!dayInfo.inventory || dayInfo.inventory.available !== false) &&
              dayInfo.inventory !== 0;
              
            if (isAvailable) {
              dateAvailability[dateStr] += 1;
            }
          }
        }
      }

      // Merge pending local bookings from booking_requests.json to prevent double booking
      const fs = require('fs');
      const path = require('path');
      const bookingsFilePath = path.join(process.cwd(), 'data', 'booking_requests.json');
      if (fs.existsSync(bookingsFilePath)) {
        try {
          const fileContent = fs.readFileSync(bookingsFilePath, 'utf-8');
          const localBookings = JSON.parse(fileContent || '[]');
          
          // Filter bookings for this specific villa
          const villaBookings = localBookings.filter((b: any) => b.villaId === villaId);
          
          for (const booking of villaBookings) {
            const bookedQty = parseInt(booking.quantity || '1', 10);
            const start = new Date(booking.checkIn);
            const end = new Date(booking.checkOut);
            const temp = new Date(start);
            while (temp < end) {
              const dateStr = temp.toISOString().split('T')[0];
              if (dateAvailability[dateStr] !== undefined) {
                dateAvailability[dateStr] -= bookedQty;
              }
              temp.setDate(temp.getDate() + 1);
            }
          }
        } catch (err) {
          console.error('Failed to merge local bookings into availability:', err);
        }
      }

      // Now block dates where the total available count is less than the requested quantity
      for (const [dateStr, availableCount] of Object.entries(dateAvailability)) {
        if (availableCount < quantity) {
          blockedDates.push(dateStr);
        }
      }
    }

    return NextResponse.json({ blockedDates });

  } catch (error) {
    console.error('ReservationKey API Error:', error);
    // If the API fails completely, return empty
    return NextResponse.json({ blockedDates: [] });
  }
}
