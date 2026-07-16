import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

    // Graceful fallback for mock testing if no secret key is configured
    if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.includes('sk_test_51O')) {
      console.warn('[Stripe Warning] STRIPE_SECRET_KEY is not configured in .env.local. Running in Mock Mode.');
      return NextResponse.json({ 
        clientSecret: 'mock_seti_123456_secret_654321',
        customerId: 'mock_cus_123456',
        isMock: true
      });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15' as any,
    });

    // Create a customer in Stripe so the card is vaulted under their profile
    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });

    // Create a SetupIntent to vault the card securely off-session
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session',
    });

    return NextResponse.json({ 
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
      isMock: false
    });

  } catch (error: any) {
    console.error('Stripe SetupIntent Error:', error);
    return NextResponse.json({ error: error.message || 'Stripe setup failed' }, { status: 500 });
  }
}
