'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { villasData } from '@/data/villas';
import VillaGallery from '@/components/VillaGallery';
import GolfCartBookingWidget from '@/components/GolfCartBookingWidget';
import GolfCart360Viewer from '@/components/GolfCart360Viewer';
import MobileStickyBookNow from '@/components/MobileStickyBookNow';

export default function GolfCartsPage() {
  const cartData = villasData.find((v) => v.id === 'golf-cart');

  if (!cartData) {
    return (
      <div className="min-h-screen pt-28 text-center font-sans font-medium text-base-dark/70">
        Cart data not found.
      </div>
    );
  }

  return (
    <div className="bg-base-light text-base-dark min-h-screen pt-20 md:pt-28 pb-28">

      {/* Header Section */}
      <div className="w-full pl-4 pr-3 md:pl-12 md:pr-6 lg:pl-16 lg:pr-8 mb-4 md:mb-8">
        <Link
          href="/villas"
          className="inline-flex items-center space-x-2 text-xs md:text-sm font-sans font-bold tracking-wider uppercase text-ocean-teal hover:text-sand-accent transition-colors mb-3 md:mb-4"
        >
          <span>←</span>
          <span>Back to Properties</span>
        </Link>
      </div>

      {/* Main Redesigned Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: 360 Viewer */}
          <div className="lg:col-span-7 w-full">
            <GolfCart360Viewer />
          </div>

          {/* Right Column: Title, Pricing, and Booking */}
          <div className="lg:col-span-5 space-y-4 md:space-y-5 lg:-mt-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-base-dark leading-none mb-1 md:mb-2">
                4 Seater Golfcart
              </h1>
              <p className="font-sans text-base text-base-dark/70 font-light leading-relaxed text-justify">
                Explore San Pancho effortlessly. Our premium electric carts are the perfect companion for navigating town and getting to the beach in comfort.
              </p>
            </div>

            {/* Pricing Summary Block */}
            <div className="bg-white border border-sand-accent/15 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-sm space-y-2">
              <h3 className="font-sans font-bold uppercase tracking-widest text-[10px] text-ocean-teal">Rental Rates</h3>
              
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif italic text-3xl md:text-4xl text-base-dark">$900 - $1,100</span>
                  <span className="font-sans text-sm text-base-dark/60 font-light">MXN / day</span>
                </div>
                
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-sand-accent/10">
                  <span className="font-sans font-medium text-xs text-base-dark">Weekly Rate:</span>
                  <span className="font-sans text-xs text-base-dark/70">$6,000 - $7,000 MXN / week</span>
                </div>
              </div>
            </div>

            {/* Interactive Booking Widget */}
            <div id="golf-cart-booking" className="mt-4">
              <GolfCartBookingWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-16">
        <h2 className="font-serif italic text-2xl md:text-4xl text-base-dark mb-5 md:mb-8 text-center">Cart Gallery & Details</h2>
        <div className="w-full">
          <VillaGallery villa={cartData} />
        </div>
      </div>

      {/* Rules & Policies */}
      {cartData.houseRules && (
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <section className="space-y-4 md:space-y-6 pt-8 md:pt-12 border-t border-sand-accent/10">
            <h3 className="font-serif italic text-2xl md:text-3xl text-base-dark">Rules & Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {cartData.houseRules.map((rule, idx) => {
                const isCancellation = rule.title.toLowerCase().includes("cancellation");
                return (
                  <div 
                    key={idx} 
                    className={`bg-white border border-sand-accent/10 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-2 md:space-y-3 shadow-sm ${
                      isCancellation ? 'md:col-span-2' : ''
                    }`}
                  >
                    <h4 className="font-sans font-bold text-sm text-base-dark">{rule.title}</h4>
                    <p className="font-sans font-light text-sm text-base-dark/80 leading-relaxed text-justify">{rule.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}



      {/* Mobile Sticky Reserve Bar */}
      <MobileStickyBookNow targetId="golf-cart-booking" label="RESERVE A CART" />
    </div>
  );
}
