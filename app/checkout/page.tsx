'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { villasData } from '@/data/villas';
import Link from 'next/link';

// Load Stripe publishable key from env or fallback to default test key
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
const stripePromise = loadStripe(stripePublicKey);

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const villaId = searchParams.get('villaId') || 'villa-palmas';
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');
  const total = searchParams.get('total');
  const quantity = searchParams.get('quantity') || '1';
  const currency = searchParams.get('currency') || 'USD';
  const isMXN = currency === 'MXN';

  const villa = villasData.find(v => v.id === villaId) || villasData[0];

  const isIguana = villa.id === 'villa-iguana';
  const isCocos = villa.id === 'villa-cocos';
  const isGolfCart = villa.id === 'golf-cart';
  const cleaningFee = 
    villa.id === 'golf-cart' ? 0 :
    villa.id === 'villa-iguana' ? 125 : 
    villa.id === 'villa-sunset' ? 100 : 
    villa.id === 'villa-papaya' ? 100 : 
    villa.id === 'villa-palmas' ? 50 : 
    75;
  const taxRate = (isIguana || isCocos) ? 0.20 : 0.16;
  const rawTotal = Number(total) || 0;
  const calculatedSubtotal = rawTotal > cleaningFee ? Math.round((rawTotal - cleaningFee) / (1 + taxRate)) : 0;
  const calculatedTaxes = Math.round(calculatedSubtotal * taxRate);
  const deposit = (isIguana || isCocos || isGolfCart) ? Math.round(rawTotal * 0.25) : Math.round(rawTotal * 0.50);
  const balance = rawTotal - deposit;

  let nights = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn + 'T00:00:00');
    const end = new Date(checkOut + 'T00:00:00');
    const diffTime = Math.abs(end.getTime() - start.getTime());
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  let maxCartsAllowed = 8;
  if (!isGolfCart && villa) {
    if (isIguana) {
      maxCartsAllowed = 1;
    } else if (villa.capacity) {
      const capacityMatch = villa.capacity.match(/\d+/);
      const capacity = capacityMatch ? parseInt(capacityMatch[0], 10) : 10;
      if (capacity <= 5) {
        maxCartsAllowed = 1;
      } else {
        maxCartsAllowed = Math.ceil(capacity / 4);
      }
    }
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [upsellQuantity, setUpsellQuantity] = useState(0);

  const calculateGolfCartPrice = () => {
    if (!checkIn || !checkOut || nights <= 0 || upsellQuantity <= 0) {
      return { subtotal: 0, taxes: 0, total: 0 };
    }
    const start = new Date(checkIn + 'T00:00:00');
    let base = 0;
    
    for (let i = 0; i < nights; i++) {
      let tempDate = new Date(start);
      tempDate.setDate(tempDate.getDate() + i);
      const month = tempDate.getMonth() + 1;
      const isSummer = month >= 4 && month <= 9;
      
      let rate = 0;
      if (nights >= 7) {
        rate = isSummer ? 6000 / 7 : 7000 / 7;
      } else {
        rate = isSummer ? 900 : 1100;
      }
      base += rate;
    }
    
    base = base * upsellQuantity;
    const taxes = base * 0.16;
    return {
      subtotal: Math.round(base),
      taxes: Math.round(taxes),
      total: Math.round(base + taxes)
    };
  };
  
  const golfCartPricing = calculateGolfCartPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create a SetupIntent securely on the backend
      const intentRes = await fetch('/api/checkout/setup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const intentData = await intentRes.json();
      
      if (!intentRes.ok) {
        throw new Error(intentData.error || 'Failed to initialize secure payment session.');
      }

      let verifiedSetupIntentId = 'mock_seti_123456789';

      if (intentData.isMock) {
        console.warn('[Stripe] Running in mock card mode.');
      } else {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) throw new Error('Card payment form is not loaded.');

        // 2. Encrypt and verify the card details directly with Stripe's servers
        const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(
          intentData.clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name,
                email,
                phone
              }
            }
          }
        );

        if (stripeError) {
          throw new Error(stripeError.message || 'Card verification failed.');
        }

        if (setupIntent) {
          verifiedSetupIntentId = setupIntent.id;
        }
      }

      // 3. Submit booking to ReservationKey and local database via our backend
      const bookingPayload = {
        villaId,
        checkIn,
        checkOut,
        guests,
        quantity,
        currency,
        total,
        name,
        email,
        phone,
        stripeSetupIntentId: verifiedSetupIntentId,
        addedGolfCart: upsellQuantity > 0,
        upsellGolfCartQuantity: upsellQuantity,
        golfCartTotalMXN: golfCartPricing.total
      };

      const submitRes = await fetch('/api/checkout/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      
      const submitData = await submitRes.json();
      
      if (!submitRes.ok) {
        throw new Error(submitData.error || 'Failed to submit booking to ReservationKey');
      }
      
      // Simulate success and redirect back or to success page
      alert('Booking Request Sent Successfully! It has been synced to ReservationKey.');
      router.push(isGolfCart ? '/golf-carts' : `/villas/${villa.id}`);

    } catch (err: any) {
      setError(err.message || 'An error occurred during booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#1a1a1a',
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' }
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
      
      {/* Left Column: Form */}
      <div className="lg:col-span-7 space-y-12">
        <div>
          <Link href={`/villas/${villa.id}`} className="inline-flex items-center text-sm font-sans font-bold text-base-dark/60 hover:text-ocean-teal mb-6 transition-colors">
            ← Back to {villa.name}
          </Link>
          <h1 className="font-serif italic text-4xl md:text-5xl text-base-dark tracking-tight">Complete your request</h1>
          <p className="font-sans text-base-dark/70 mt-3 text-lg font-light max-w-lg">
            Submit your details below. We will securely vault your card and manually confirm your dates before processing any charges.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Contact Information */}
          <section className="space-y-5">
            <h2 className="font-sans font-bold text-xl text-base-dark border-b border-sand-accent/20 pb-3">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-sans font-bold text-[10px] uppercase tracking-wider text-base-dark/60 mb-1.5">Full Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-sand-accent/5 border border-sand-accent/20 rounded-xl px-4 py-3 text-base-dark font-sans focus:outline-none focus:ring-2 focus:ring-ocean-teal/20 transition-all" placeholder="Jane Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-[10px] uppercase tracking-wider text-base-dark/60 mb-1.5">Email Address</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-sand-accent/5 border border-sand-accent/20 rounded-xl px-4 py-3 text-base-dark font-sans focus:outline-none focus:ring-2 focus:ring-ocean-teal/20 transition-all" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block font-sans font-bold text-[10px] uppercase tracking-wider text-base-dark/60 mb-1.5">Phone Number</label>
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-sand-accent/5 border border-sand-accent/20 rounded-xl px-4 py-3 text-base-dark font-sans focus:outline-none focus:ring-2 focus:ring-ocean-teal/20 transition-all" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Vault */}
          <section className="space-y-5">
            <h2 className="font-sans font-bold text-xl text-base-dark border-b border-sand-accent/20 pb-3">Secure Payment</h2>
            <p className="font-sans text-sm text-base-dark/60 font-light">Your card will not be charged immediately. We use Stripe to securely encrypt and vault your card details for manual processing.</p>
            <div className="bg-sand-accent/5 border border-sand-accent/20 rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-ocean-teal/20 transition-all">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </section>

          {/* Cancellation Policy */}
          <section className="space-y-4 bg-red-50/25 rounded-2xl p-5 border border-red-200/40">
            <h3 className="font-sans font-bold text-xs text-base-dark uppercase tracking-wider">Cancellation Policy</h3>
            <p className="font-sans text-[13px] text-base-dark/85 leading-relaxed font-light text-justify">
              The deposit is refundable under the following conditions:<br />
              1. The cancellation request is made within <strong className="font-medium text-base-dark">30 days</strong> of the deposit being received, <strong className="font-semibold text-base-dark">AND</strong><br />
              2. The cancellation occurs more than <strong className="font-medium text-base-dark">60 days</strong> before the scheduled arrival date.<br />
              <span className="block mt-2 italic text-base-dark/70 font-medium">Please note that any cancellations or changes will incur a 10% administration fee.</span>
            </p>
          </section>

          {/* Legal / Terms */}
          <section className="pt-4">
            <label className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors cursor-pointer ${shake ? 'animate-shake border-red-500 bg-red-50' : 'border-sand-accent/20 hover:bg-sand-accent/5'}`}>
              <div className="flex items-center h-5 mt-0.5">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms} 
                  onChange={e => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-sand-accent/30 text-ocean-teal focus:ring-ocean-teal"
                />
              </div>
              <div className="flex-1">
                <p className={`font-sans text-xs leading-relaxed ${shake ? 'text-red-800' : 'text-base-dark/70'}`}>
                  I have read and agree to the <Link href="/terms" target="_blank" className="text-ocean-teal hover:underline font-semibold">House Rules & Terms of Service</Link> and the <Link href="/privacy" target="_blank" className="text-ocean-teal hover:underline font-semibold">Privacy Notice</Link>. I authorize San Pancho Tropical to securely save my contact and payment information to manually process the charges for my stay, as well as any post-stay damages or rule violations (including the $300 smoke-free policy fee).
                </p>
              </div>
            </label>
            {error && <p className="text-red-500 font-sans text-sm mt-4">{error}</p>}
          </section>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={!stripe || isSubmitting}
            className="w-full bg-[#F5A623] hover:bg-[#E0961B] disabled:bg-sand-accent/50 disabled:text-base-dark/30 text-white font-sans font-bold text-lg py-5 px-6 rounded-2xl transition-all shadow-md transform active:scale-[0.99]"
          >
            {isSubmitting ? 'Securely processing...' : 'Request to Book'}
          </button>
        </form>
      </div>

      {/* Right Column: Receipt */}
      <div className="lg:col-span-5 relative">
        <div className="sticky top-32 border border-sand-accent/20 bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.05)]">
          <div className="flex gap-4 pb-6 border-b border-sand-accent/10">
            <div className="w-24 h-24 bg-sand-accent/10 rounded-xl overflow-hidden shrink-0">
              {villa.images && villa.images[0] && (
                <img src={villa.images[0]} alt={villa.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-base-dark/50">San Pancho Tropical</span>
              <h3 className="font-serif italic text-2xl text-base-dark mt-1">{villa.name}</h3>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <h4 className="font-sans font-bold text-sm text-base-dark">Price details</h4>
            
            <div className="space-y-3 font-sans text-sm font-light text-base-dark/80">
              <div className="flex justify-between border-b border-sand-accent/10 pb-3 mb-3">
                <span className="font-semibold text-base-dark">Your Stay</span>
                <span className="font-semibold text-base-dark text-right">
                  {nights} night{nights !== 1 ? 's' : ''} ({isGolfCart ? quantity : guests || 2} {isGolfCart ? 'cart' : 'guest'}{Number(isGolfCart ? quantity : guests || 2) !== 1 ? 's' : ''})
                </span>
              </div>
              <div className="flex justify-between text-xs text-base-dark/60">
                <span>Dates</span>
                <span>{checkIn} to {checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Rate</span>
                <span>${calculatedSubtotal || '---'}</span>
              </div>
              {isIguana && Number(guests) > 6 && (
                <div className="flex justify-between text-xs text-base-dark/65 pl-2 font-sans">
                  <span>Additional guest surcharge ($20/night each)</span>
                  <span>Included above</span>
                </div>
              )}
              {cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span>Cleaning Fee</span>
                  <span>${cleaningFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes {(isIguana || isCocos) ? '(16% IVA + 4% Hotel)' : '(16%)'}</span>
                <span>${calculatedTaxes || '---'}</span>
              </div>
              {isIguana && (
                <div className="flex justify-between text-xs text-ocean-teal font-medium">
                  <span>Golf Cart (4-seater electric)</span>
                  <span>Included</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-sand-accent/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans font-bold text-lg text-base-dark">Total ({currency})</span>
              <span className="font-sans font-black text-2xl text-base-dark">${total || '0'}</span>
            </div>

            {(isIguana || isCocos || isGolfCart) ? (
              <div className="bg-sand-accent/5 rounded-2xl p-4 space-y-2 text-xs font-sans">
                <div className="flex justify-between font-semibold text-base-dark">
                  <span>Deposit Due Now (25%)</span>
                  <span>${deposit}</span>
                </div>
                {isCocos ? (
                  <>
                    <div className="flex justify-between text-base-dark/65 font-medium">
                      <span>25% Due 3 Months Prior</span>
                      <span>${deposit}</span>
                    </div>
                    <div className="flex justify-between text-base-dark/65">
                      <span>50% Balance Due at Arrival</span>
                      <span>${rawTotal - deposit - deposit}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-base-dark/65">
                    <span>75% Balance Due at Arrival</span>
                    <span>${rawTotal - deposit}</span>
                  </div>
                )}
                <p className="text-[10px] text-base-dark/50 italic pt-1 border-t border-sand-accent/10 mt-1">
                  Currency: All rates in {isMXN ? 'Mexican Pesos (MXN)' : 'US Dollars (USD)'}. Note: Until confirmed, rates are subject to change without notice.
                </p>
              </div>
            ) : (
              <div className="bg-sand-accent/5 rounded-2xl p-4 space-y-2 text-xs font-sans">
                <div className="flex justify-between font-semibold text-base-dark">
                  <span>Deposit Due Now (50%)</span>
                  <span>${deposit}</span>
                </div>
                <div className="flex justify-between text-base-dark/65">
                  <span>50% Balance Due at Arrival</span>
                  <span>${rawTotal - deposit}</span>
                </div>
                <p className="text-[10px] text-base-dark/50 italic pt-1 border-t border-sand-accent/10 mt-1">
                  Currency: All rates in {isMXN ? 'Mexican Pesos (MXN)' : 'US Dollars (USD)'}. Note: Until confirmed, rates are subject to change without notice.
                </p>
              </div>
            )}

            {!isGolfCart && (
              <div className="bg-gradient-to-br from-ocean-teal/5 to-ocean-teal/10 rounded-2xl p-6 border border-ocean-teal/20 mt-6 shadow-sm relative overflow-hidden">
                <h4 className="font-serif italic text-2xl text-ocean-teal tracking-tight mb-2">
                  {isIguana ? 'Add an additional 4-Seater Golf Cart' : 'Add a 4-Seater Golf Cart'}
                </h4>
                <p className="font-sans text-sm text-base-dark/80 leading-relaxed mb-4">
                  Cruise San Pancho effortlessly for your {nights} night stay. Guarantee yours today! <a href="/golf-carts" target="_blank" className="text-ocean-teal font-semibold hover:underline">Visit the golf cart page to learn more →</a>
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-sm text-base-dark">Quantity:</span>
                  <div className="flex items-center gap-4 bg-white border border-ocean-teal/30 rounded-full px-4 py-1.5 shadow-sm">
                    <button type="button" onClick={() => setUpsellQuantity(Math.max(0, upsellQuantity - 1))} className="text-base-dark/60 hover:text-ocean-teal font-medium w-6 h-6 flex items-center justify-center text-lg">-</button>
                    <span className="font-sans font-bold text-base text-base-dark w-4 text-center">{upsellQuantity}</span>
                    <button 
                      type="button" 
                      onClick={() => setUpsellQuantity(Math.min(maxCartsAllowed, upsellQuantity + 1))} 
                      disabled={upsellQuantity >= maxCartsAllowed}
                      className="text-base-dark/60 hover:text-ocean-teal disabled:opacity-30 disabled:cursor-not-allowed font-medium w-6 h-6 flex items-center justify-center text-lg"
                    >+</button>
                  </div>
                </div>

                {upsellQuantity >= maxCartsAllowed && (
                  <p className="text-[10px] text-ocean-teal/80 mt-2 font-medium italic text-right">
                    Maximum carts reached for this villa.
                  </p>
                )}

                {upsellQuantity > 0 && (
                  <div className="mt-5 pt-4 border-t border-ocean-teal/15 space-y-2.5 font-sans text-sm">
                    <div className="flex justify-between text-base-dark/80">
                      <span>Base Rate ({upsellQuantity} cart{upsellQuantity !== 1 ? 's' : ''})</span>
                      <span>${golfCartPricing.subtotal} MXN</span>
                    </div>
                    <div className="flex justify-between text-base-dark/80">
                      <span>Taxes (16% IVA)</span>
                      <span>${golfCartPricing.taxes} MXN</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <span className="font-bold text-base-dark">Golf Cart Total</span>
                      <div className="text-right">
                        <span className="font-black text-xl text-ocean-teal block leading-none">${golfCartPricing.total}</span>
                        <span className="text-[10px] text-ocean-teal/70 font-semibold uppercase tracking-widest mt-1 block">Pesos (MXN)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Suspense fallback={<div className="p-24 text-center font-sans">Loading secure checkout...</div>}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Suspense>
    </div>
  );
}
