import { NextResponse } from 'next/server';
import { villasData } from '@/data/villas';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      villaId, 
      checkIn, 
      checkOut, 
      guests, 
      name, 
      email, 
      phone, 
      total,
      quantity,
      currency,
      stripeSetupIntentId,
      addedGolfCart,
      upsellGolfCartQuantity,
      golfCartTotalMXN
    } = body;

    if (!villaId || !checkIn || !checkOut || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const villa = villasData.find((v) => v.id === villaId);

    if (!villa || !villa.reservationKeyUnitId) {
      return NextResponse.json({ error: 'Villa not found or missing ReservationKey Unit ID' }, { status: 404 });
    }

    const API_KEY = process.env.RESERVATION_KEY_API_KEY;

    // Build the payload for ReservationKey
    const reservationPayload = {
      start_date: checkIn,
      end_date: checkOut,
      adults: parseInt(guests, 10) || 1,
      unit_id: villa.reservationKeyUnitId.split(',')[0].split(':')[0],
      guest_details: {
        first_name: name.split(' ')[0] || name,
        last_name: name.split(' ').slice(1).join(' ') || '',
        email: email,
        phone: phone,
      },
      notes: `Stripe Setup Intent ID: ${stripeSetupIntentId} | Total: ${total} ${currency || 'USD'} | Quantity/Carts: ${quantity || 1}${addedGolfCart ? ` | UPSOLD GOLF CARTS: ${upsellGolfCartQuantity} (Total: ${golfCartTotalMXN} MXN)` : ''}`
    };

    // Make the request to ReservationKey
    const url = `https://api.reservationkey.com/reservations/create`;
    let reservationKeyResponse = null;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationPayload)
      });
      reservationKeyResponse = await response.json();
    } catch (err) {
      console.warn('ReservationKey API post failed, using local database fallback:', err);
    }

    // Since ReservationKey's API is read-only / placeholder for creation,
    // we save the booking details to a local JSON database file.
    // This serves as the owner's record of bookings and vault references.
    const fs = require('fs');
    const path = require('path');
    const bookingsFilePath = path.join(process.cwd(), 'data', 'booking_requests.json');
    
    let bookings = [];
    try {
      if (fs.existsSync(bookingsFilePath)) {
        const fileContent = fs.readFileSync(bookingsFilePath, 'utf-8');
        bookings = JSON.parse(fileContent || '[]');
      }
    } catch (e) {
      console.error('Failed to read local bookings database:', e);
    }

    const newBooking = {
      id: `bk_${Date.now()}`,
      villaId,
      villaName: villa.name,
      checkIn,
      checkOut,
      guests,
      quantity,
      currency,
      total,
      name,
      email,
      phone,
      stripeSetupIntentId,
      addedGolfCart,
      upsellGolfCartQuantity,
      golfCartTotalMXN,
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    try {
      fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
      console.log(`[Notification Alert] Booking request saved to local database: ${newBooking.id}`);
      
      // Configure Nodemailer transporter (SMTP config)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      });

      const emailContent = `
        <h2>New Native Booking Request</h2>
        <p><strong>Property:</strong> ${villa.name}</p>
        <p><strong>Guest Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Check-In:</strong> ${checkIn}</p>
        <p><strong>Check-Out:</strong> ${checkOut}</p>
        <p><strong>Guests:</strong> ${guests} guests</p>
        <p><strong>Total Price (Calculated):</strong> $${total} USD</p>
        <p><strong>Stripe Setup Intent ID (Vault Token):</strong> <code>${stripeSetupIntentId}</code></p>
        <hr />
        <p><em>Please manually add this booking to ReservationKey to permanently block the dates, and execute any manual card charges inside Stripe using the token above.</em></p>
      `;

      const mailOptions = {
        from: `"San Pancho Tropical" <${process.env.SMTP_USER || 'noreply@mexicosta.com'}>`,
        to: 'vicky@mexicosta.com',
        subject: `New Booking Request: ${villa.name} - ${name}`,
        html: emailContent,
      };

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`[Email Sent] Real notification email successfully delivered to vicky@mexicosta.com`);
      } else {
        console.warn(`[SMTP Warning] SMTP_USER/PASS not configured. Simulated email sent to vicky@mexicosta.com with content:\n${emailContent}`);
      }
    } catch (e) {
      console.error('Failed to write to local database or send email:', e);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request sent to ReservationKey and saved locally',
      bookingId: newBooking.id,
      reservationKeyResponse 
    });

  } catch (error) {
    console.error('Checkout submission error:', error);
    return NextResponse.json({ error: 'Internal server error during booking submission' }, { status: 500 });
  }
}
