import { NextResponse } from 'next/server';
import { villasData } from '@/data/villas';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guests = parseInt(searchParams.get('guests') || '2', 10);

  // Filter candidate villas that can accommodate this group size
  const candidateVillas = villasData.filter((v) => v.maxGuests >= guests);

  if (candidateVillas.length === 0) {
    return NextResponse.json({
      guests,
      candidateVillas: [],
      idealVillas: [],
      blockedDates: [],
      error: `No single villa accommodates ${guests} guests. Please contact us for multi-villa bookings.`
    });
  }

  // Find Ideal Villas where guests fit within ideal range
  const idealVillas = candidateVillas.filter(
    (v) => guests >= v.idealGuests.min && guests <= v.idealGuests.max
  );

  // Fallback to all candidate villas if no specific ideal range matches
  const recommendedVillas = idealVillas.length > 0 ? idealVillas : candidateVillas;

  // 12-month rolling window for availability checking
  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  
  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  const endDate = future.toISOString().split('T')[0];
  const API_KEY = process.env.RESERVATION_KEY_API_KEY;

  try {
    // Extract unique ReservationKey Unit IDs across all candidate villas
    const rawUnitIds: string[] = [];
    const villaUnitMap: Record<string, string[]> = {};

    candidateVillas.forEach((v) => {
      if (v.reservationKeyUnitId) {
        const ids = v.reservationKeyUnitId.split(',').map((id) => id.split(':')[0]);
        villaUnitMap[v.id] = ids;
        rawUnitIds.push(...ids);
      }
    });

    const uniqueUnitIds = Array.from(new Set(rawUnitIds)).join(',');
    const url = `https://api.reservationkey.com/availability/calendar?start_date=${startDate}&end_date=${endDate}&unit_ids=${uniqueUnitIds}&include=inventory`;
    
    let resKeyData: any = null;

    if (API_KEY) {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 300 } // cache 5 mins
      });

      if (response.ok) {
        resKeyData = await response.json();
      }
    }

    // Process Date -> Availability mapping for each candidate villa
    // villaAvailability[villaId][dateStr] = boolean
    const villaAvailability: Record<string, Record<string, boolean>> = {};

    candidateVillas.forEach((v) => {
      villaAvailability[v.id] = {};
    });

    if (resKeyData && resKeyData.units && Array.isArray(resKeyData.units)) {
      for (const unit of resKeyData.units) {
        const thisUnitId = String(unit.unit_id || unit.id).split(':')[0];
        
        // Find which villa owns this unit ID
        const ownerVilla = candidateVillas.find((v) => 
          villaUnitMap[v.id]?.includes(thisUnitId)
        );

        if (!ownerVilla) continue;

        if (unit.dates && Array.isArray(unit.dates)) {
          for (const dayInfo of unit.dates) {
            const dateStr = dayInfo.date;
            const isAvailable = 
              dayInfo.available !== false && 
              (!dayInfo.inventory || dayInfo.inventory.available !== false) &&
              dayInfo.inventory !== 0;

            if (villaAvailability[ownerVilla.id][dateStr] === undefined) {
              villaAvailability[ownerVilla.id][dateStr] = isAvailable;
            } else {
              villaAvailability[ownerVilla.id][dateStr] = villaAvailability[ownerVilla.id][dateStr] || isAvailable;
            }
          }
        }
      }
    }

    // Merge pending local bookings from booking_requests.json
    const bookingsFilePath = path.join(process.cwd(), 'data', 'booking_requests.json');
    if (fs.existsSync(bookingsFilePath)) {
      try {
        const fileContent = fs.readFileSync(bookingsFilePath, 'utf-8');
        const localBookings = JSON.parse(fileContent || '[]');
        
        for (const booking of localBookings) {
          if (!booking.villaId || !villaAvailability[booking.villaId]) continue;
          const start = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);
          const temp = new Date(start);
          while (temp < end) {
            const dateStr = temp.toISOString().split('T')[0];
            if (villaAvailability[booking.villaId][dateStr] !== undefined) {
              villaAvailability[booking.villaId][dateStr] = false;
            }
            temp.setDate(temp.getDate() + 1);
          }
        }
      } catch (err) {
        console.error('Failed to merge local bookings into group availability:', err);
      }
    }

    // A date is BLOCKED if 0 candidate villas are available for this group size
    const dateCounts: Record<string, number> = {};

    candidateVillas.forEach((v) => {
      Object.entries(villaAvailability[v.id] || {}).forEach(([dateStr, isAvail]) => {
        if (!dateCounts[dateStr]) dateCounts[dateStr] = 0;
        if (isAvail) dateCounts[dateStr] += 1;
      });
    });

    const blockedDates: string[] = [];

    Object.entries(dateCounts).forEach(([dateStr, availCount]) => {
      if (availCount === 0) {
        blockedDates.push(dateStr);
      }
    });

    // Enforce Minimum Stay Rule (e.g. 2 nights min for Palmas/Papaya/Cocos/Sunset, 3 for Iguana)
    const minNights = Math.min(...candidateVillas.map((v) => v.minNights));

    return NextResponse.json({
      guests,
      minNights,
      candidateVillas: candidateVillas.map((v) => ({
        id: v.id,
        name: v.name,
        maxGuests: v.maxGuests,
        minNights: v.minNights,
      })),
      idealVillas: recommendedVillas.map((v) => ({
        id: v.id,
        name: v.name,
        tagline: v.tagline,
        maxGuests: v.maxGuests,
        minNights: v.minNights,
        images: v.images,
      })),
      blockedDates,
      villaAvailability,
    });

  } catch (error) {
    console.error('Group Availability API Error:', error);
    return NextResponse.json({
      guests,
      minNights: 2,
      candidateVillas: candidateVillas.map((v) => ({ id: v.id, name: v.name })),
      idealVillas: recommendedVillas.map((v) => ({ id: v.id, name: v.name })),
      blockedDates: [],
    });
  }
}
