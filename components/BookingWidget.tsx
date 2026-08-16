'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DoubleMonthCalendar from './DoubleMonthCalendar';
import { villasData } from '@/data/villas';

interface BookingWidgetProps {
  villaId: string;
  baseRate?: number;
}

export default function BookingWidget({ villaId, baseRate = 180 }: BookingWidgetProps) {
  const router = useRouter();
  const calendarRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);
  
  const villa = villasData.find(v => v.id === villaId);
  const maxGuests = parseInt(villa?.capacity || '2', 10) || 2;
  
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const getBaseGuestsForVilla = (id: string) => {
    if (id === 'villa-iguana') return 6;
    if (id === 'villa-palmas') return 2;
    if (id === 'villa-cocos') return 5;
    if (id === 'villa-sunset') return 4;
    if (id === 'villa-papaya') return 5;
    if (id === 'golf-cart') return 4;
    return 2;
  };

  const [guests, setGuests] = useState(() => getBaseGuestsForVilla(villaId));

  useEffect(() => {
    setGuests(getBaseGuestsForVilla(villaId));
  }, [villaId]);

  const [nights, setNights] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [minStayError, setMinStayError] = useState<string | null>(null);
  const [averageNightlyRate, setAverageNightlyRate] = useState(baseRate);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  // Helper to check Christmas/New Year week (Dec 20 to Jan 3)
  const isChristmasNewYear = (date: Date): boolean => {
    const m = date.getMonth(); // 0 = Jan, 11 = Dec
    const d = date.getDate();
    if (m === 11 && d >= 20) return true;
    if (m === 0 && d <= 3) return true;
    return false;
  };

  // Helper to check Semana Santa (Easter Week)
  const isSemanaSanta = (date: Date): boolean => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    // 2024: March 24 - March 31
    if (y === 2024 && m === 2 && d >= 24 && d <= 31) return true;
    // 2026: March 29 - April 5
    if (y === 2026 && ((m === 2 && d >= 29) || (m === 3 && d <= 5))) return true;
    return false;
  };

  // Retrieve matching rate table details for a date
  const getRateForDate = (date: Date, totalNights: number, targetVillaId: string): { rate: number; minStay: number; categoryName: string } => {
    let category = '';
    let categoryName = '';
    
    if (isChristmasNewYear(date)) {
      category = 'christmas';
      categoryName = 'Christmas & New Year Weeks';
    } else if (isSemanaSanta(date)) {
      category = 'easter';
      categoryName = 'Semana Santa';
    } else {
      const month = date.getMonth();
      if (month >= 0 && month <= 2) {
        category = 'jan-mar';
        categoryName = 'Jan-Mar';
      } else if (month === 3) {
        category = 'april';
        categoryName = 'April';
      } else if (month === 4) {
        category = 'may';
        categoryName = 'May';
      } else if (month >= 5 && month <= 7) {
        category = 'jun-aug';
        categoryName = 'Jun-Aug';
      } else if (month === 8) {
        category = 'september';
        categoryName = 'September';
      } else if (month === 9) {
        category = 'october';
        categoryName = 'October';
      } else if (month === 10) {
        category = 'november';
        categoryName = 'November';
      } else if (month === 11) {
        category = 'december';
        categoryName = 'December';
      }
    }

    interface RateRow {
      night: number;
      week: number;
      fourWeeks: number;
      minStay: number;
    }

    const palmasRates: Record<string, RateRow> = {
      'jan-mar': { night: 95, week: 575, fourWeeks: 2000, minStay: 4 },
      'april': { night: 85, week: 525, fourWeeks: 1600, minStay: 3 },
      'may': { night: 75, week: 450, fourWeeks: 1350, minStay: 3 },
      'jun-aug': { night: 60, week: 350, fourWeeks: 1000, minStay: 4 },
      'september': { night: 50, week: 300, fourWeeks: 900, minStay: 3 },
      'october': { night: 50, week: 300, fourWeeks: 900, minStay: 3 },
      'november': { night: 90, week: 550, fourWeeks: 1800, minStay: 3 },
      'december': { night: 90, week: 550, fourWeeks: 2300, minStay: 3 },
      'christmas': { night: 105, week: 650, fourWeeks: 2300, minStay: 7 },
      'easter': { night: 100, week: 600, fourWeeks: 1600, minStay: 5 }
    };

    const iguanaRates: Record<string, RateRow> = {
      'jan-mar': { night: 410, week: 2460, fourWeeks: 8000, minStay: 5 },
      'april': { night: 370, week: 2200, fourWeeks: 7000, minStay: 4 },
      'may': { night: 330, week: 2000, fourWeeks: 6000, minStay: 4 },
      'jun-aug': { night: 245, week: 1500, fourWeeks: 4500, minStay: 4 },
      'september': { night: 200, week: 1400, fourWeeks: 4000, minStay: 3 },
      'october': { night: 200, week: 1400, fourWeeks: 4000, minStay: 3 },
      'november': { night: 385, week: 2300, fourWeeks: 7000, minStay: 4 },
      'december': { night: 385, week: 2300, fourWeeks: 8300, minStay: 4 },
      'christmas': { night: 470, week: 3150, fourWeeks: 8300, minStay: 7 },
      'easter': { night: 470, week: 2800, fourWeeks: 7000, minStay: 5 }
    };

    const cocosRates: Record<string, RateRow> = {
      'jan-mar': { night: 190, week: 1150, fourWeeks: 4000, minStay: 4 },
      'april': { night: 170, week: 1000, fourWeeks: 3500, minStay: 3 },
      'may': { night: 150, week: 900, fourWeeks: 2700, minStay: 3 },
      'jun-aug': { night: 115, week: 700, fourWeeks: 2100, minStay: 4 },
      'september': { night: 95, week: 570, fourWeeks: 1700, minStay: 3 },
      'october': { night: 95, week: 570, fourWeeks: 1700, minStay: 3 },
      'november': { night: 170, week: 1000, fourWeeks: 3500, minStay: 3 },
      'december': { night: 170, week: 1000, fourWeeks: 4200, minStay: 3 },
      'christmas': { night: 210, week: 1450, fourWeeks: 4200, minStay: 7 },
      'easter': { night: 210, week: 1300, fourWeeks: 3500, minStay: 5 }
    };

    const sunsetRates: Record<string, RateRow> = {
      'jan-mar': { night: 245, week: 1450, fourWeeks: 4700, minStay: 4 },
      'april': { night: 220, week: 1300, fourWeeks: 4400, minStay: 3 },
      'may': { night: 150, week: 900, fourWeeks: 2700, minStay: 3 },
      'jun-aug': { night: 130, week: 800, fourWeeks: 2400, minStay: 4 },
      'september': { night: 100, week: 600, fourWeeks: 1800, minStay: 3 },
      'october': { night: 120, week: 700, fourWeeks: 2100, minStay: 3 },
      'november': { night: 225, week: 1350, fourWeeks: 4400, minStay: 3 },
      'december': { night: 225, week: 1350, fourWeeks: 5000, minStay: 3 },
      'christmas': { night: 300, week: 1800, fourWeeks: 5000, minStay: 7 },
      'easter': { night: 300, week: 1800, fourWeeks: 4400, minStay: 5 }
    };

    const papayaRates: Record<string, RateRow> = {
      'jan-mar': { night: 210, week: 1250, fourWeeks: 4000, minStay: 4 },
      'april': { night: 190, week: 1150, fourWeeks: 3800, minStay: 3 },
      'may': { night: 170, week: 1000, fourWeeks: 3000, minStay: 3 },
      'jun-aug': { night: 125, week: 750, fourWeeks: 2250, minStay: 4 },
      'september': { night: 100, week: 600, fourWeeks: 1800, minStay: 3 },
      'october': { night: 100, week: 600, fourWeeks: 1800, minStay: 3 },
      'november': { night: 200, week: 1200, fourWeeks: 3800, minStay: 3 },
      'december': { night: 200, week: 1200, fourWeeks: 4600, minStay: 3 },
      'christmas': { night: 240, week: 1450, fourWeeks: 4600, minStay: 7 },
      'easter': { night: 240, week: 1400, fourWeeks: 3800, minStay: 5 }
    };

    const golfCartRates: Record<string, RateRow> = {
      'jan-mar': { night: 1100 / 7, week: 1100, fourWeeks: 4000, minStay: 3 },
      'april': { night: 1100 / 7, week: 1100, fourWeeks: 4000, minStay: 3 },
      'may': { night: 900 / 7, week: 900, fourWeeks: 3200, minStay: 3 },
      'jun-aug': { night: 900 / 7, week: 900, fourWeeks: 3200, minStay: 3 },
      'september': { night: 900 / 7, week: 900, fourWeeks: 3200, minStay: 3 },
      'october': { night: 900 / 7, week: 900, fourWeeks: 3200, minStay: 3 },
      'november': { night: 1100 / 7, week: 1100, fourWeeks: 4000, minStay: 3 },
      'december': { night: 1100 / 7, week: 1100, fourWeeks: 4000, minStay: 3 },
      'christmas': { night: 1100 / 7, week: 1100, fourWeeks: 4000, minStay: 3 },
      'easter': { night: 1100 / 7, week: 1100, fourWeeks: 4000, minStay: 3 }
    };

    const rates = targetVillaId === 'villa-iguana' 
      ? iguanaRates 
      : targetVillaId === 'villa-cocos'
      ? cocosRates
      : targetVillaId === 'villa-sunset'
      ? sunsetRates
      : targetVillaId === 'villa-papaya'
      ? papayaRates
      : targetVillaId === 'golf-cart'
      ? golfCartRates
      : palmasRates;
    const row = rates[category] || rates['may'];

    let nightlyRate = row.night;
    if (totalNights >= 28) {
      nightlyRate = row.fourWeeks / 28;
    } else if (totalNights >= 7) {
      nightlyRate = row.week / 7;
    }

    return { rate: nightlyRate, minStay: row.minStay, categoryName };
  };

  // Fetch blocked dates from our Reservation Key proxy route
  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch(`/api/availability?villaId=${villaId}`);
        const data = await res.json();
        if (data.blockedDates) {
          setBlockedDates(data.blockedDates);
        }
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    }
    fetchAvailability();
  }, [villaId]);

  // Calculate pricing if dates are selected
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn + 'T00:00:00');
      const end = new Date(checkOut + 'T00:00:00');
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNights(diffDays);

        if (
          villaId === 'villa-palmas' || 
          villaId === 'villa-iguana' || 
          villaId === 'villa-cocos' || 
          villaId === 'villa-sunset' ||
          villaId === 'villa-papaya' ||
          villaId === 'golf-cart'
        ) {
          let calculatedSubtotal = 0;
          let tempDate = new Date(start);
          const firstNightRateInfo = getRateForDate(tempDate, diffDays, villaId);
          const requiredMinStay = firstNightRateInfo.minStay;

          for (let i = 0; i < diffDays; i++) {
            const nightInfo = getRateForDate(tempDate, diffDays, villaId);
            calculatedSubtotal += nightInfo.rate;
            tempDate.setDate(tempDate.getDate() + 1);
          }

          if (diffDays < requiredMinStay) {
            setMinStayError(`Minimum stay is ${requiredMinStay} nights during ${firstNightRateInfo.categoryName}.`);
          } else {
            setMinStayError(null);
          }

          let guestSurcharge = 0;
          if (villaId === 'villa-iguana' && guests > 6) {
            guestSurcharge = (guests - 6) * 20 * diffDays;
          }

          const baseSubtotal = Math.round(calculatedSubtotal);
          const finalSubtotal = baseSubtotal + guestSurcharge;

          const avgRate = Math.round(finalSubtotal / diffDays);
          setAverageNightlyRate(avgRate);
          setSubtotal(finalSubtotal);
          
          const cleaning = 
            villaId === 'golf-cart' ? 0 :
            villaId === 'villa-iguana' ? 125 : 
            villaId === 'villa-sunset' ? 100 : 
            villaId === 'villa-papaya' ? 100 : 
            villaId === 'villa-palmas' ? 50 : 
            75;
          const taxRate = (villaId === 'villa-iguana' || villaId === 'villa-cocos') ? 0.21 : 0.16;
          const taxes = finalSubtotal * taxRate;
          setTotal(Math.round(finalSubtotal + cleaning + taxes));
        } else {
          // Standard baseRate logic for other villas
          setMinStayError(null);
          setAverageNightlyRate(baseRate);
          const calculatedSubtotal = diffDays * baseRate;
          setSubtotal(calculatedSubtotal);

          const cleaning = 
            villaId === 'villa-iguana' ? 125 : 
            villaId === 'villa-sunset' ? 100 : 
            villaId === 'villa-papaya' ? 100 : 
            villaId === 'villa-palmas' ? 50 : 
            75;
          const taxes = calculatedSubtotal * 0.16;
          setTotal(Math.round(calculatedSubtotal + cleaning + taxes));
        }
      } else {
        setNights(0);
        setTotal(0);
        setSubtotal(0);
        setMinStayError(null);
      }
    } else {
      setNights(0);
      setTotal(0);
      setSubtotal(0);
      setMinStayError(null);
    }
  }, [checkIn, checkOut, baseRate, villaId, guests]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setIsGuestDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      villaId,
      checkIn,
      checkOut,
      guests: guests.toString(),
      total: total.toString()
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
    <div className="space-y-6">
      
      {/* Booking Card */}
      <div id="booking-section" className="border border-sand-accent/15 bg-white rounded-[32px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 relative">
        
        {/* Header / Title */}
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-medium text-lg text-base-dark tracking-tight">
            {checkIn && checkOut ? (
              <span className="flex items-baseline gap-1">
                <strong className="font-sans font-black text-2xl text-base-dark">${averageNightlyRate}</strong>
                <span className="font-sans text-sm text-base-dark/60 font-light">USD / night</span>
              </span>
            ) : (
              'Add dates for price'
            )}
          </h4>
        </div>

        {/* Dynamic Pills Selection Section */}
        <div className="grid grid-cols-2 gap-3 relative">
          
          {/* Dates Selector Pill */}
          <div ref={calendarRef} className="col-span-1 static md:relative">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-full border bg-white hover:bg-sand-accent/5 transition-all text-left duration-200 cursor-pointer ${
                isCalendarOpen ? 'border-[#F5A623] ring-1 ring-[#F5A623]/25' : 'border-sand-accent/30'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {/* Calendar Icon */}
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

            {/* Custom Popover Calendar */}
            {isCalendarOpen && (
              <div className="static md:absolute md:top-full md:left-0 md:mt-3 md:z-50 w-full md:w-auto">
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

          {/* Guests Selector Pill */}
          <div ref={guestDropdownRef} className="relative col-span-1">
            <button
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-full border bg-white hover:bg-sand-accent/5 transition-all text-left duration-200 cursor-pointer ${
                isGuestDropdownOpen ? 'border-[#F5A623] ring-1 ring-[#F5A623]/25' : 'border-sand-accent/30'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {/* Guest Person Icon */}
                <svg className="w-4 h-4 text-base-dark/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="font-sans text-[13px] font-semibold text-base-dark truncate">
                  {guests} guest{guests !== 1 ? 's' : ''}
                </span>
              </div>
              <svg className="w-3.5 h-3.5 text-base-dark/45 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Premium Guest Dropdown */}
            {isGuestDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-sand-accent/15 rounded-3xl p-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-xs text-base-dark">Guests</span>
                      <span className="font-sans text-[10px] text-base-dark/50">Maximum {maxGuests} guests</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                        disabled={guests <= 1}
                        className="h-8 w-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-sans font-bold text-sm text-base-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sand-accent/5"
                      >
                        -
                      </button>
                      <span className="font-sans font-bold text-sm text-base-dark w-4 text-center">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(prev => Math.min(maxGuests, prev + 1))}
                        disabled={guests >= maxGuests}
                        className="h-8 w-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-sans font-bold text-sm text-base-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sand-accent/5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGuestDropdownOpen(false)}
                    className="w-full text-center font-sans text-xs font-bold text-white bg-base-dark hover:bg-ocean-teal py-2 rounded-full transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Pricing Summary (Only visible if dates selected) */}
        {nights > 0 && (
          <div className="space-y-2 py-2 border-t border-sand-accent/10 pt-4 animate-in fade-in duration-200">
            <div className="flex justify-between font-sans text-xs text-base-dark/75">
              <span className="underline decoration-sand-accent/30 underline-offset-4">${averageNightlyRate} x {nights} nights</span>
              <span>${subtotal}</span>
            </div>
            {villaId === 'villa-iguana' && guests > 6 && (
              <div className="flex justify-between font-sans text-[11px] text-base-dark/50 pl-2">
                <span>Guest surcharge ($20/night each over 6)</span>
                <span>Included above</span>
              </div>
            )}
            <div className="flex justify-between font-sans text-xs text-base-dark/75">
              <span className="underline decoration-sand-accent/30 underline-offset-4">Cleaning fee</span>
              <span>$
                {villaId === 'golf-cart' ? 0 :
                 villaId === 'villa-iguana' ? 125 : 
                 villaId === 'villa-sunset' ? 100 : 
                 villaId === 'villa-papaya' ? 100 : 
                 villaId === 'villa-palmas' ? 50 : 
                 75}
              </span>
            </div>
            <div className="flex justify-between font-sans text-xs text-base-dark/75">
              <span className="underline decoration-sand-accent/30 underline-offset-4">Taxes {(villaId === 'villa-iguana' || villaId === 'villa-cocos') ? '(16% IVA + 5% ISH)' : '(16%)'}</span>
              <span>${Math.round(subtotal * ((villaId === 'villa-iguana' || villaId === 'villa-cocos') ? 0.21 : 0.16))}</span>
            </div>
            <div className="pt-3 mt-1 border-t border-sand-accent/10 flex justify-between font-sans font-bold text-sm text-base-dark">
              <span>Total</span>
              <span>${total}</span>
            </div>
            
            {(villaId === 'villa-iguana' || villaId === 'villa-cocos' || villaId === 'golf-cart') && (
              <div className="bg-sand-accent/5 rounded-xl p-3 space-y-1 mt-2 text-[11px] font-sans">
                <div className="flex justify-between font-semibold text-base-dark">
                  <span>25% Deposit Due Now</span>
                  <span>${Math.round(total * 0.25)}</span>
                </div>
                {villaId === 'villa-cocos' ? (
                  <>
                    <div className="flex justify-between text-base-dark/65">
                      <span>25% Due 3 Months Prior</span>
                      <span>${Math.round(total * 0.25)}</span>
                    </div>
                    <div className="flex justify-between text-base-dark/65">
                      <span>50% Balance Due at Arrival</span>
                      <span>${total - Math.round(total * 0.25) - Math.round(total * 0.25)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-base-dark/65">
                    <span>75% Balance Due at Arrival</span>
                    <span>${total - Math.round(total * 0.25)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Minimum Stay Error */}
        {minStayError && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 text-xs font-sans font-medium flex items-start gap-2.5 leading-relaxed">
            <svg className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{minStayError}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleBookNow}
          disabled={!!minStayError}
          className="w-full bg-[#FFB224] hover:bg-[#F0A415] disabled:bg-sand-accent/30 disabled:text-base-dark/30 disabled:cursor-not-allowed text-white font-sans font-bold text-sm py-4 px-6 rounded-2xl transition-colors shadow-sm cursor-pointer"
        >
          {checkIn && checkOut ? 'Book now' : 'Check availability'}
        </button>

        {/* Policy & Rules Block */}
        <div className="text-[11px] text-base-dark/50 space-y-1.5 pt-4 border-t border-sand-accent/10 font-sans leading-relaxed">
          <p className="flex justify-between">
            <span>Currency</span>
            <span className="font-medium text-base-dark/70">All rates in US Dollars (USD)</span>
          </p>
          {(villaId === 'villa-iguana' || villaId === 'villa-cocos' || villaId === 'golf-cart') ? (
            <>
              {villaId === 'golf-cart' ? (
                <>
                  <p className="flex justify-between">
                    <span>Pricing</span>
                    <span className="font-medium text-base-dark/70">Winter $1,100/wk | Summer $900/wk (3-day min)</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-medium text-base-dark/70">25% deposit to book. Balance at arrival</span>
                  </p>
                </>
              ) : villaId === 'villa-iguana' ? (
                <>
                  <p className="flex justify-between">
                    <span>Base Rate</span>
                    <span className="font-medium text-base-dark/70">For up to 6 guests (+ $20 USD/night extra, max 8)</span>
                  </p>
                  <p className="flex justify-between text-ocean-teal/90">
                    <span>Included Amenity</span>
                    <span className="font-medium">4-seater electric golf cart is included</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-medium text-base-dark/70">25% deposit to book. Balance at arrival</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="flex justify-between">
                    <span>Base Rate</span>
                    <span className="font-medium text-base-dark/70">For up to 5 guests (maximum occupancy 5)</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-medium text-base-dark/70">25% now, 25% 3mo prior, 50% at arrival</span>
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="flex justify-between">
              <span>Payment</span>
              <span className="font-medium text-base-dark/70">50% deposit to book. Balance 30 days prior</span>
            </p>
          )}
          <p className="italic text-[10px] text-base-dark/40 pt-1 text-center">Until confirmed, rates are subject to change without notice.</p>
        </div>

      </div>

    </div>
  );
}
