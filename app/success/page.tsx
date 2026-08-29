'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { villasData } from '@/data/villas';

function SuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId') || 'TXN-PENDING';
  const villaId = searchParams.get('villaId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');
  const total = searchParams.get('total');
  const currency = searchParams.get('currency') || 'USD';

  const villa = villasData.find((v) => v.id === villaId) || villasData[0];
  const isGolfCart = villaId === 'golf-cart';

  let nights = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn + 'T00:00:00');
    const end = new Date(checkOut + 'T00:00:00');
    const diffTime = Math.abs(end.getTime() - start.getTime());
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-24">
      {/* Success Message Header */}
      <div className="text-center space-y-4 mb-10 reveal-on-scroll reveal-up">
        <div className="w-20 h-20 bg-ocean-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-ocean-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-serif italic text-4xl md:text-5xl text-base-dark tracking-tight">
          Booking Request Sent!
        </h1>
        <p className="font-sans text-base md:text-lg text-base-dark/70 font-light max-w-xl mx-auto leading-relaxed">
          We will get back to you as soon as we can. You will receive an email shortly—please check your inbox for updates. Feel free to contact us at any time regarding your stay.
        </p>
      </div>

      {/* Receipt Details Card */}
      <div className="bg-white border border-sand-accent/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.05)] mb-8 reveal-on-scroll reveal-up">
        <div className="flex flex-col md:flex-row gap-6 pb-6 md:pb-8 border-b border-sand-accent/10">
          <div className="w-24 h-24 bg-sand-accent/10 rounded-xl overflow-hidden shrink-0">
            {villa?.images && villa.images[0] && (
              <img src={villa.images[0]} alt={villa.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-base-dark/50">
              San Pancho Tropical
            </span>
            <h3 className="font-serif italic text-2xl text-base-dark mt-1">
              {villa?.name || 'San Pancho Tropical Stay'}
            </h3>
            <div className="mt-3 font-sans text-xs bg-sand-accent/10 inline-block px-3 py-1.5 rounded-full text-base-dark/70 font-semibold border border-sand-accent/20 w-max">
              Transaction ID: <span className="font-mono text-ocean-teal">{transactionId}</span>
            </div>
          </div>
        </div>

        <div className="py-6 md:py-8 space-y-4">
          <h4 className="font-sans font-bold text-sm text-base-dark">Order Details</h4>
          <div className="space-y-4 font-sans text-sm font-light text-base-dark/80">
            <div className="flex justify-between">
              <span className="font-semibold text-base-dark">Your Stay</span>
              <span className="font-semibold text-base-dark text-right">
                {nights} night{nights !== 1 ? 's' : ''} ({guests} {isGolfCart ? 'cart' : 'guest'}{Number(guests) !== 1 ? 's' : ''})
              </span>
            </div>
            <div className="flex justify-between text-xs text-base-dark/60">
              <span>Dates</span>
              <span>{checkIn} to {checkOut}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-sand-accent/10">
          <div className="flex justify-between items-center">
            <span className="font-sans font-bold text-lg text-base-dark">Total</span>
            <div className="text-right">
              <span className="font-sans font-black text-2xl text-base-dark">${total || '0'}</span>
              <span className="font-sans text-[10px] text-base-dark/50 uppercase tracking-widest ml-1">{currency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Golf Cart Suggestion (If applicable) */}
      {!isGolfCart && (
        <div className="bg-gradient-to-br from-ocean-teal/5 to-ocean-teal/10 rounded-2xl p-6 md:p-8 border border-ocean-teal/20 mb-10 shadow-sm relative overflow-hidden reveal-on-scroll reveal-up">
          <h4 className="font-serif italic text-2xl text-ocean-teal tracking-tight mb-2">
            Need a Golf Cart?
          </h4>
          <p className="font-sans text-sm text-base-dark/80 leading-relaxed mb-6">
            Cruise San Pancho effortlessly during your stay. We offer 4-seater electric golf carts for our guests. 
          </p>
          <Link href="/golf-carts" className="inline-block bg-white text-ocean-teal font-sans font-bold text-sm py-3 px-6 rounded-xl border border-ocean-teal/30 hover:bg-ocean-teal hover:text-white transition-colors">
            Explore Golf Carts
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-on-scroll reveal-up">
        <Link href="/" className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#E0961B] text-white font-sans font-bold text-sm py-4 px-8 rounded-2xl transition-all shadow-md text-center">
          Return to Homepage
        </Link>
        <Link href="/villas" className="w-full sm:w-auto bg-white text-base-dark font-sans font-bold text-sm py-4 px-8 rounded-2xl border border-sand-accent/30 hover:bg-sand-accent/5 transition-all text-center">
          View Other Villas
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Suspense fallback={<div className="p-24 text-center font-sans">Loading receipt...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
