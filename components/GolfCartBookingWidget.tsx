'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DoubleMonthCalendar from '@/components/DoubleMonthCalendar';

export default function GolfCartBookingWidget() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  
  const [nights, setNights] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [averageNightlyRate, setAverageNightlyRate] = useState(0);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch(`/api/availability?villaId=golf-cart&quantity=${quantity}`);
        const data = await res.json();
        if (data.blockedDates) {
          setBlockedDates(data.blockedDates);
        }
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    }
    fetchAvailability();
  }, [quantity]);

  const getRateForDate = (date: Date, totalNights: number) => {
    const month = date.getMonth(); // 0 = Jan, 11 = Dec
    // Summer: May (4) to Oct (9)
    const isSummer = month >= 4 && month <= 9;
    
    let rate = 0;
    if (totalNights >= 7) {
      rate = isSummer ? 6000 / 7 : 7000 / 7;
    } else {
      rate = isSummer ? 900 : 1100;
    }
    return rate;
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn + 'T00:00:00');
      const end = new Date(checkOut + 'T00:00:00');
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNights(diffDays);
        let calculatedSubtotal = 0;
        let tempDate = new Date(start);

        for (let i = 0; i < diffDays; i++) {
          calculatedSubtotal += getRateForDate(tempDate, diffDays);
          tempDate.setDate(tempDate.getDate() + 1);
        }

        // Multiply by quantity of carts
        calculatedSubtotal = calculatedSubtotal * quantity;
        
        const avgRate = Math.round(calculatedSubtotal / diffDays / quantity);
        setAverageNightlyRate(avgRate);
        setSubtotal(Math.round(calculatedSubtotal));
        
        const taxes = calculatedSubtotal * 0.16; // 16% IVA
        setTotal(Math.round(calculatedSubtotal + taxes));
      } else {
        setNights(0);
        setTotal(0);
        setSubtotal(0);
      }
    } else {
      setNights(0);
      setTotal(0);
      setSubtotal(0);
    }
  }, [checkIn, checkOut, quantity]);

  const handleSelectDates = (start: string | null, end: string | null) => {
    setCheckIn(start);
    setCheckOut(end);
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      setIsCalendarOpen(true);
      return;
    }
    const searchParams = new URLSearchParams({
      villaId: 'golf-cart',
      checkIn,
      checkOut,
      guests: '1',
      quantity: quantity.toString(),
      total: total.toString(),
      currency: 'MXN'
    });
    router.push(`/checkout?${searchParams.toString()}`);
  };

  const formatDateDisplay = () => {
    if (!checkIn) return 'Add dates';
    const startObj = new Date(checkIn + 'T00:00:00');
    const startStr = startObj.toLocaleDateString('default', { day: 'numeric', month: 'short' });
    if (!checkOut) return `${startStr} - ...`;
    const endObj = new Date(checkOut + 'T00:00:00');
    const endStr = endObj.toLocaleDateString('default', { day: 'numeric', month: 'short' });
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="border border-sand-accent/15 bg-white rounded-[32px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 relative w-full">
      
      <div className="flex items-center justify-between">
        <h4 className="font-sans font-medium text-lg text-base-dark tracking-tight">
          {checkIn && checkOut ? (
            <span className="flex items-baseline gap-1">
              <strong className="font-sans font-black text-2xl text-base-dark">${averageNightlyRate}</strong>
              <span className="font-sans text-sm text-base-dark/60 font-light">MXN / day</span>
            </span>
          ) : (
            'Select dates for pricing'
          )}
        </h4>
      </div>

      <div className="space-y-4">
        <div ref={calendarRef} className="static md:relative">
          <label className="block text-xs font-sans font-bold text-base-dark/60 uppercase tracking-wider mb-1.5 ml-1">Dates</label>
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl border bg-white hover:bg-sand-accent/5 transition-all text-left duration-200 cursor-pointer ${
              isCalendarOpen ? 'border-[#F5A623] ring-1 ring-[#F5A623]/25' : 'border-sand-accent/30'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <svg className="w-4 h-4 text-base-dark/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="font-sans text-[13px] font-semibold text-base-dark truncate">
                {formatDateDisplay()}
              </span>
            </div>
            <svg className="w-3.5 h-3.5 text-base-dark/45 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {isCalendarOpen && (
            <div className="static md:absolute md:top-full md:right-0 md:mt-2 md:z-50 w-full md:w-auto">
              <DoubleMonthCalendar
                checkIn={checkIn}
                checkOut={checkOut}
                blockedDates={blockedDates}
                onSelectDates={handleSelectDates}
                onClose={() => setIsCalendarOpen(false)}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-sans font-bold text-base-dark/60 uppercase tracking-wider mb-1.5 ml-1">Number of Carts</label>
          <div className="flex items-center justify-between px-4 py-3 border border-sand-accent/30 rounded-2xl bg-white">
            <span className="font-sans text-[13px] font-semibold text-base-dark">Carts</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className="h-8 w-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-sans font-bold text-sm text-base-dark disabled:opacity-30 hover:bg-sand-accent/5 transition-colors"
              >
                -
              </button>
              <span className="font-sans font-bold text-sm text-base-dark w-4 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.min(4, prev + 1))}
                disabled={quantity >= 4}
                className="h-8 w-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-sans font-bold text-sm text-base-dark disabled:opacity-30 hover:bg-sand-accent/5 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {nights > 0 && (
        <div className="space-y-2 py-2 border-t border-sand-accent/10 pt-4 animate-in fade-in duration-200">
          <div className="flex justify-between font-sans text-xs text-base-dark/75">
            <span className="underline decoration-sand-accent/30 underline-offset-4">
              ${averageNightlyRate} x {nights} days {quantity > 1 ? `x ${quantity} carts` : ''}
            </span>
            <span>${subtotal} MXN</span>
          </div>
          <div className="flex justify-between font-sans text-xs text-base-dark/75">
            <span className="underline decoration-sand-accent/30 underline-offset-4">Taxes (16% IVA)</span>
            <span>${Math.round(subtotal * 0.16)} MXN</span>
          </div>
          <div className="pt-3 mt-1 border-t border-sand-accent/10 flex justify-between font-sans font-bold text-sm text-base-dark">
            <span>Total</span>
            <span>${total} MXN</span>
          </div>
          
          <div className="bg-sand-accent/5 rounded-xl p-3 space-y-1 mt-2 text-[11px] font-sans">
            <div className="flex justify-between font-semibold text-base-dark">
              <span>25% Deposit Due Now</span>
              <span>${Math.round(total * 0.25)} MXN</span>
            </div>
            <div className="flex justify-between text-base-dark/65">
              <span>75% Balance Due at Arrival</span>
              <span>${total - Math.round(total * 0.25)} MXN</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleBookNow}
        className="w-full bg-base-dark hover:bg-ocean-teal text-base-light font-sans font-semibold tracking-widest text-[13px] py-4 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(48,41,47,0.15)] hover:shadow-[0_6px_20px_rgba(48,41,47,0.2)] mt-2 uppercase"
      >
        Rent Golf Cart
      </button>
    </div>
  );
}
