'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { villasData } from '@/data/villas';
import SingleMonthCalendar from '@/components/SingleMonthCalendar';
import GuestSelectorPopover from '@/components/GuestSelectorPopover';

export default function Home() {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [adults, setAdults] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  // Real Villas Mapping
  const iguana = villasData.find((v) => v.id === 'villa-iguana') || villasData[0];
  const sunset = villasData.find((v) => v.id === 'villa-sunset') || villasData[1];
  const papaya = villasData.find((v) => v.id === 'villa-papaya') || villasData[2];
  const cocos = villasData.find((v) => v.id === 'villa-cocos') || villasData[3];
  const palmas = villasData.find((v) => v.id === 'villa-palmas') || villasData[4];

  const allVillas = [
    { villa: iguana, price: 200, rating: '5.0' },
    { villa: sunset, price: 100, rating: '4.98' },
    { villa: papaya, price: 100, rating: '4.95' },
    { villa: cocos, price: 95, rating: '4.92' },
    { villa: palmas, price: 50, rating: '4.89' },
  ];

  const getVillaLowestPrice = (id: string) => {
    switch (id) {
      case 'villa-iguana': return 200;
      case 'villa-sunset': return 100;
      case 'villa-papaya': return 100;
      case 'villa-cocos': return 95;
      case 'villa-palmas': return 50;
      default: return 100;
    }
  };

  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleNextVilla = () => {
    setCarouselIndex((prev) => (prev + 1) % allVillas.length);
  };

  const handlePrevVilla = () => {
    setCarouselIndex((prev) => (prev - 1 + allVillas.length) % allVillas.length);
  };

  const topVilla1 = allVillas[(carouselIndex + 0) % 5];
  const topVilla2 = allVillas[(carouselIndex + 1) % 5];
  const bottomVilla1 = allVillas[(carouselIndex + 2) % 5];
  const bottomVilla2 = allVillas[(carouselIndex + 3) % 5];
  const bottomVilla3 = allVillas[(carouselIndex + 4) % 5];

  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [idealVillas, setIdealVillas] = useState<any[]>([]);
  const [minNights, setMinNights] = useState<number>(2);
  const [isDatesBlocked, setIsDatesBlocked] = useState<boolean>(false);

  const totalGuests = adults + childrenCount;

  const [villaAvailabilityMap, setVillaAvailabilityMap] = useState<Record<string, Record<string, boolean>>>({});

  // Reactively fetch group availability whenever totalGuests change
  React.useEffect(() => {
    let isMounted = true;
    async function fetchGroupAvailability() {
      try {
        const res = await fetch(`/api/availability/group?guests=${totalGuests}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) {
          setBlockedDates(data.blockedDates || []);
          setIdealVillas(data.idealVillas || []);
          setMinNights(data.minNights || 2);
          setVillaAvailabilityMap(data.villaAvailability || {});
        }
      } catch (err) {
        console.error('Failed to fetch group availability:', err);
      }
    }
    fetchGroupAvailability();
    return () => { isMounted = false; };
  }, [totalGuests]);

  const isVillaAvailableOnDates = (villaId: string) => {
    if (!checkIn || !checkOut) return true;
    const vMap = villaAvailabilityMap[villaId];
    if (!vMap) return true;

    const start = new Date(checkIn + 'T00:00:00');
    const end = new Date(checkOut + 'T00:00:00');
    const temp = new Date(start);

    while (temp < end) {
      const dateStr = temp.toISOString().split('T')[0];
      if (vMap[dateStr] === false) {
        return false;
      }
      temp.setDate(temp.getDate() + 1);
    }
    return true;
  };

  // Evaluate whether selected dates overlap blocked dates
  React.useEffect(() => {
    if (!checkIn || !checkOut) {
      setIsDatesBlocked(false);
      return;
    }
    const start = new Date(checkIn + 'T00:00:00');
    const end = new Date(checkOut + 'T00:00:00');
    const temp = new Date(start);
    let blockedFound = false;

    while (temp < end) {
      const dateStr = temp.toISOString().split('T')[0];
      if (blockedDates.includes(dateStr)) {
        blockedFound = true;
        break;
      }
      temp.setDate(temp.getDate() + 1);
    }
    setIsDatesBlocked(blockedFound);
  }, [checkIn, checkOut, blockedDates]);

  const formatDateLabel = (dateStr: string | null) => {
    if (!dateStr) return 'Add dates';
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return 'Add dates';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatGuestLabel = () => {
    if (totalGuests === 0) return 'Add guests';
    const main = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;
    if (infants > 0) {
      const infantText = infants === 1 ? '1 Infant' : `${infants} Infants`;
      return `${main}, ${infantText}`;
    }
    return main;
  };

  const handleSelectDates = (newCheckIn: string | null, newCheckOut: string | null) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
  };

  // Enforce minimum 2-day advance notice for bookings (no same-day or next-day check-in)
  React.useEffect(() => {
    if (!checkIn) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minCheckIn = new Date(today);
    minCheckIn.setDate(minCheckIn.getDate() + 2);
    const minCheckInStr = minCheckIn.toISOString().split('T')[0];

    if (checkIn < minCheckInStr) {
      setCheckIn(null);
      setCheckOut(null);
    }
  }, [checkIn]);

  const [hasSearched, setHasSearched] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setValidationMessage('Please select your check-in and check-out dates first!');
      setTimeout(() => setValidationMessage(null), 3500);
      return;
    }
    if (totalGuests <= 0) {
      setValidationMessage('Please select the number of guests first!');
      setTimeout(() => setValidationMessage(null), 3500);
      return;
    }
    setValidationMessage(null);
    setHasSearched(true);
    setTimeout(() => {
      const el = document.getElementById('search-results-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <main className="bg-[#f4fafd] text-[#161d1f] min-h-screen antialiased selection:bg-[#004b87] selection:text-white">

      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-between pt-24 pb-20 md:pb-28 w-full">
        
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="bg-cover bg-center w-full h-full transform scale-105" 
            style={{ backgroundImage: "url('/san_pancho_sunset_hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003461]/40 via-transparent to-[#f4fafd]/90" />
        </div>

        {/* Spacer top */}
        <div className="shrink-0 h-4 md:h-8" />

        {/* Hero Title & Floating Search Box */}
        <div className="relative z-10 text-center px-5 md:px-8 max-w-5xl mx-auto w-full my-auto py-6">
          <h1 className="text-white drop-shadow-2xl mb-6 tracking-tight text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
            Your Private Paradise <br />
            in San Pancho
          </h1>
          <p className="text-white/95 text-lg md:text-xl font-normal drop-shadow-lg max-w-2xl mx-auto mb-10 md:mb-14 opacity-90">
            Built to be your home base villas in Mexico&apos;s most charming surf town.
          </p>

          {/* Search Calculator Floating Glass Card */}
          <div className="relative max-w-4xl mx-auto z-10">
            {/* Validation Warning Popup */}
            {validationMessage && (
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-[110] bg-[#003461] text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#418de2]/40 flex items-center gap-2 text-xs md:text-sm font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300 whitespace-nowrap">
                <svg className="w-4 h-4 text-[#418de2] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{validationMessage}</span>
              </div>
            )}

            <form 
              onSubmit={handleSearch}
              className="glass-panel rounded-[2.5rem] p-3 md:p-4 ambient-shadow flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 border border-white/40 shadow-2xl relative z-10"
            >
              {/* CHECK-IN */}
              <div 
                onClick={() => {
                  setShowGuestSelector(false);
                  setShowCalendar((prev) => !prev);
                }}
                className="flex-1 w-full bg-[#f4fafd]/70 hover:bg-white rounded-2xl md:rounded-3xl p-3.5 px-5 cursor-pointer transition-all text-left border border-white/40 group"
              >
                <span className="block font-bold text-[11px] tracking-[0.12em] text-[#424750] mb-1 uppercase group-hover:text-[#003461]">
                  CHECK-IN
                </span>
                <div className="text-sm md:text-base text-[#161d1f] flex items-center font-bold">
                  <svg className="w-5 h-5 text-[#003461] mr-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={checkIn ? 'text-[#003461] font-bold' : 'text-[#161d1f]'}>
                    {formatDateLabel(checkIn)}
                  </span>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-300/40 shrink-0" />

              {/* CHECK-OUT */}
              <div 
                onClick={() => {
                  setShowGuestSelector(false);
                  setShowCalendar((prev) => !prev);
                }}
                className="flex-1 w-full bg-[#f4fafd]/70 hover:bg-white rounded-2xl md:rounded-3xl p-3.5 px-5 cursor-pointer transition-all text-left border border-white/40 group"
              >
                <span className="block font-bold text-[11px] tracking-[0.12em] text-[#424750] mb-1 uppercase group-hover:text-[#003461]">
                  CHECK-OUT
                </span>
                <div className="text-sm md:text-base text-[#161d1f] flex items-center font-bold">
                  <svg className="w-5 h-5 text-[#003461] mr-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={checkOut ? 'text-[#003461] font-bold' : 'text-[#161d1f]'}>
                    {formatDateLabel(checkOut)}
                  </span>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-gray-300/40 shrink-0" />

              {/* GUESTS */}
              <div 
                onClick={() => {
                  setShowCalendar(false);
                  setShowGuestSelector((prev) => !prev);
                }}
                className="flex-1 w-full bg-[#f4fafd]/70 hover:bg-white rounded-2xl md:rounded-3xl p-3.5 px-5 cursor-pointer transition-all text-left border border-white/40 group"
              >
                <span className="block font-bold text-[11px] tracking-[0.12em] text-[#424750] mb-1 uppercase group-hover:text-[#003461]">
                  GUESTS
                </span>
                <div className="text-sm md:text-base text-[#161d1f] flex items-center font-bold">
                  <svg className="w-5 h-5 text-[#003461] mr-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[#161d1f]">
                    {formatGuestLabel()}
                  </span>
                </div>
              </div>

              {/* Search Button Container */}
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto shrink-0">
                {hasSearched && (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckIn(null);
                      setCheckOut(null);
                      setAdults(0);
                      setChildrenCount(0);
                      setInfants(0);
                      setShowCalendar(false);
                      setShowGuestSelector(false);
                      setHasSearched(false);
                      setValidationMessage(null);
                    }}
                    className="w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-[#424750] px-4 md:px-5 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer shrink-0"
                  >
                    <svg className="w-5 h-5 text-[#424750] md:mr-1 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="hidden md:inline">Clear</span>
                  </button>
                )}
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-[#003461] hover:bg-[#002447] text-white px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer shrink-0"
                >
                  <svg className="w-4 h-4 text-white mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </form>

            {/* Single Month Calendar Popover */}
            {showCalendar && (
              <SingleMonthCalendar
                checkIn={checkIn}
                checkOut={checkOut}
                blockedDates={blockedDates}
                minNights={minNights}
                onSelectDates={handleSelectDates}
                onClose={() => setShowCalendar(false)}
              />
            )}

            {/* Guest Selector Popover */}
            {showGuestSelector && (
              <GuestSelectorPopover
                adults={adults}
                childrenCount={childrenCount}
                infants={infants}
                onChange={(a, c, i) => {
                  setAdults(a);
                  setChildrenCount(c);
                  setInfants(i);
                }}
                onClose={() => setShowGuestSelector(false)}
              />
            )}
          </div>

        </div>

        {/* Balanced Space below Search */}
        <div className="shrink-0 h-6 md:h-12" />
      </section>

      {/* ── 1.5. Interactive Search Results & Ideal Houses Section ───────────── */}
      {hasSearched && (() => {
        const candidateVillas = villasData.filter((v) => (v.maxGuests || 8) >= totalGuests && v.id !== 'golf-cart');
        const availableVillas = candidateVillas.filter((v) => isVillaAvailableOnDates(v.id));

        const getBestIdealVillaIds = (a: number, c: number, i: number, t: number) => {
          const hasKids = c > 0 || i > 0;
          if (t <= 2) return ['villa-palmas'];
          if (t === 3) return ['villa-papaya'];
          if (t === 4) return ['villa-papaya', 'villa-cocos'];
          if (t === 5) {
            const arr = ['villa-cocos', 'villa-sunset', 'villa-iguana'];
            if (hasKids) arr.unshift('villa-papaya');
            return arr;
          }
          if (t === 6) return ['villa-sunset', 'villa-iguana'];
          if (t === 7) return hasKids ? ['villa-sunset', 'villa-iguana'] : ['villa-iguana'];
          return ['villa-iguana'];
        };
        const bestIdealVillaIds = getBestIdealVillaIds(adults, childrenCount, infants, totalGuests);

        // Booked Ideal Villas will contain ALL strictly BEST matches for the group size IF they're booked.
        const bookedIdealVillas = villasData.filter((v) => bestIdealVillaIds.includes(v.id) && !isVillaAvailableOnDates(v.id));

        return (
          <section id="search-results-section" className="px-4 md:px-12 max-w-[1440px] mx-auto relative z-30 -mt-10 mb-16 animate-in fade-in slide-in-from-top-4 duration-500 scroll-mt-24 space-y-6">
            
            {/* 1. AVAILABLE VILLAS FOR DATES */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-5 md:p-6 shadow-2xl border border-white/60">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 pb-4 border-b border-sand-accent/15">
                <div>
                  <h3 className="text-[#003461] text-xl md:text-2xl font-bold tracking-tight">
                    {availableVillas.length > 0
                      ? `Found ${availableVillas.length} ${availableVillas.length === 1 ? 'villa' : 'villas'} available for your dates`
                      : `No villas available on your selected dates that fit at least ${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`}
                  </h3>
                  <p className="text-[#424750] text-xs md:text-sm mt-1">
                    {availableVillas.length > 0
                      ? `Available coastal retreats in San Pancho that fit at least ${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`
                      : 'All villas accommodating your group size are booked on these dates. Check out your ideal matches below!'}
                  </p>
                </div>

                <Link 
                  href={`/villas?guests=${totalGuests}`}
                  className="text-[#003461] hover:text-[#002447] font-bold text-sm md:text-base flex items-center group shrink-0 transition-colors"
                >
                  View all results 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {availableVillas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  {availableVillas.map((villaObj) => (
                    <div 
                      key={villaObj.id}
                      className="bg-white rounded-3xl overflow-hidden border border-[#003461]/10 p-3 md:p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
                    >
                      <Link href={`/villas/${villaObj.id}`} className="block">
                        <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                          {bestIdealVillaIds.includes(villaObj.id) && (
                            <div className="absolute top-3 left-3 z-20 bg-[#003461] text-[#f4fafd] text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-[#418de2]/40 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#418de2]"></span>
                              IDEAL MATCH
                            </div>
                          )}
                          <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            src={villaObj.images?.[0] || '/villaesperanza.jpg'} 
                            alt={villaObj.name}
                          />
                        </div>
                      </Link>

                      <div className="px-2">
                        <Link href={`/villas/${villaObj.id}`}>
                          <h4 className="font-bold text-lg text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                            {villaObj.name}
                          </h4>
                        </Link>
                        <p className="text-[#424750] text-xs mb-2">
                          {villaObj.capacity} · {villaObj.rooms}
                        </p>
                        <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                            <p className="font-black text-[#003461] text-base leading-tight">
                              ${getVillaLowestPrice(villaObj.id)}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                            </p>
                            <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                          </div>
                          <div className="flex items-center text-blue-500 font-bold text-xs md:text-sm shrink-0 mb-1">
                            <span className="mr-1 text-sky-500">★</span> 4.95
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#eef5f7] rounded-[2rem] p-6 text-center text-[#003461] font-semibold text-sm">
                  Try selecting alternative dates above to find open availability for your group!
                </div>
              )}
            </div>

            {/* 2. DEDICATED IDEAL VILLAS FOR GROUP (Booked on selected dates) */}
            {bookedIdealVillas.length > 0 && (
              <div className="bg-gradient-to-br from-[#418de2]/5 via-white to-sky-50 rounded-[2.5rem] md:rounded-[3rem] p-5 md:p-6 shadow-2xl border border-[#418de2]/30">
                <div className="mb-5 pb-4 border-b border-[#418de2]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#418de2]"></span>
                    <span className="text-[10px] md:text-xs font-black tracking-widest text-[#003461] uppercase">RECOMMENDED FOR YOUR GROUP SIZE</span>
                  </div>
                  <h3 className="text-[#003461] text-xl md:text-2xl font-bold tracking-tight">
                    Ideal Villas for {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
                  </h3>
                  <p className="text-[#424750] text-xs md:text-sm mt-1 max-w-2xl">
                    These villas are perfect matches for your group size! Although they are booked on your selected dates, we encourage you to explore alternative dates to experience staying here.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  {bookedIdealVillas.map((villaObj) => (
                    <div 
                      key={villaObj.id}
                      className="bg-white rounded-3xl overflow-hidden border border-[#418de2]/30 p-3 md:p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
                    >
                      <Link href={`/villas/${villaObj.id}`} className="block">
                        <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                          
                          {/* SLEEK IDEAL GROUP FIT BADGE */}
                          <div className="absolute top-3 left-3 z-20 bg-[#003461] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-white/40 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            IDEAL GROUP FIT
                          </div>

                          <img 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95" 
                            src={villaObj.images?.[0] || '/villaesperanza.jpg'} 
                            alt={villaObj.name}
                          />
                        </div>
                      </Link>

                      <div className="px-2">
                        <Link href={`/villas/${villaObj.id}`}>
                          <h4 className="font-bold text-lg text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                            {villaObj.name}
                          </h4>
                        </Link>
                        <p className="text-[#424750] text-xs mb-2">
                          {villaObj.capacity} · {villaObj.rooms}
                        </p>
                        <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                            <p className="font-black text-[#003461] text-base leading-tight">
                              ${getVillaLowestPrice(villaObj.id)}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                            </p>
                            <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCalendar(true);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-[11px] font-bold text-[#003461] hover:underline bg-sand-accent/20 px-3 py-1 rounded-full"
                          >
                            Explore Open Dates →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        );
      })()}

      {/* ── 2. Villa Construction / Narrative Section ──────────────────────── */}
      <section className="py-24 w-full overflow-hidden bg-[#eef5f7] relative -mt-12 md:-mt-16 pt-28 md:pt-36 pb-32 rounded-t-[4rem] z-20 reveal-on-scroll">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Organic Morphed Shape Frame */}
            <div className="order-2 lg:order-1 relative reveal-on-scroll reveal-left flex justify-center">
              <div className="absolute -inset-10 bg-[#003461]/10 rounded-full blur-3xl opacity-50" />
              <div className="relative w-[90%] md:w-full aspect-square organic-shape overflow-hidden ambient-shadow organic-morph border-8 border-white/50 z-10">
                <img 
                  className="w-full h-full object-cover" 
                  src={sunset.images?.[0] || '/beach_aboutphoto.png'}
                  alt="San Pancho Riviera Nayarit"
                />
              </div>
            </div>

            {/* Right Column: Text Narrative */}
            <div className="order-1 lg:order-2 reveal-on-scroll reveal-right">
              <h2 className="text-[#003461] mb-6 text-4xl md:text-5xl font-bold leading-tight">
                Your Homes on the Riviera Nayarit
              </h2>
              <p className="text-[#424750] mb-8 text-lg md:text-xl leading-relaxed">
                Staying in our private villas gives you the unique opportunity to enjoy a vacation with more space, tranquility, and independence, providing a more genuine and intimate alternative to typical hotel stays. Our location allows you to immerse yourself fully in the relaxed local culture.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-[#f4fafd] text-[#003461] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-[#003461]/30"
              >
                Discover Our Process
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Featured Villas Section ──────────────────────────────────────── */}
      <section id="featured-villas" className="py-10 px-4 md:px-8 max-w-6xl mx-auto relative z-30 -mt-20">
        
        {/* Title Container */}
        <div className="text-center bg-white/80 backdrop-blur-md py-5 px-6 md:px-10 rounded-2xl shadow-xl border border-white/50 mb-8 max-w-3xl mx-auto reveal-on-scroll reveal-scale">
          <h2 className="text-[#003461] mb-1 text-2xl md:text-3xl font-bold">Featured Villas</h2>
          <p className="text-[#424750] text-sm md:text-base">Discover our selection of coastal retreats.</p>
        </div>

        {/* Villa Grid Container */}
        <div className="relative group">
          
          {/* ── Top Row: 2 Large Cards with Nav Chevrons ────── */}
          <div className="flex items-center gap-3 md:gap-5 w-full flex-none mb-6">
            
            {/* Left Chevron */}
            <button 
              type="button"
              onClick={handlePrevVilla}
              aria-label="Previous Villa Carousel"
              className="flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#003461]/20 items-center justify-center text-[#003461] hover:bg-[#003461] hover:text-white transition-all shadow-md bg-white shrink-0 cursor-pointer active:scale-95"
            >
              <span className="text-xl md:text-2xl font-bold">‹</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 flex-1">
              
              {/* Top Villa 1 */}
              <div 
                key={topVilla1.villa.id}
                className="bg-white rounded-2xl overflow-hidden ambient-shadow hover-lift border border-[#003461]/10 p-3.5 md:p-4 flex flex-col justify-between transition-all duration-500 animate-in fade-in zoom-in-95"
              >
                <Link href={`/villas/${topVilla1.villa.id}`} className="block group">
                  <div className="relative h-40 md:h-44 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={topVilla1.villa.images?.[0] || '/villaesperanza.jpg'} 
                      alt={topVilla1.villa.name}
                    />
                  </div>
                </Link>
                <div className="px-3">
                  <Link href={`/villas/${topVilla1.villa.id}`}>
                    <h3 className="font-bold text-xl text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                      {topVilla1.villa.name}
                    </h3>
                  </Link>
                  <p className="text-[#424750] text-sm mb-3">
                    {topVilla1.villa.capacity} · {topVilla1.villa.rooms}
                  </p>
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                      <p className="font-black text-[#003461] text-lg leading-tight">
                        ${topVilla1.price}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                      </p>
                      <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                    </div>
                    <div className="flex items-center text-blue-500 font-bold text-sm shrink-0 mb-1">
                      <span className="mr-1 text-sky-500">★</span> {topVilla1.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Villa 2 */}
              <div 
                key={topVilla2.villa.id}
                className="bg-white rounded-2xl overflow-hidden ambient-shadow hover-lift border border-[#003461]/10 p-3.5 md:p-4 flex flex-col justify-between transition-all duration-500 animate-in fade-in zoom-in-95"
              >
                <Link href={`/villas/${topVilla2.villa.id}`} className="block group">
                  <div className="relative h-40 md:h-44 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={topVilla2.villa.images?.[0] || '/villaesperanza.jpg'} 
                      alt={topVilla2.villa.name}
                    />
                  </div>
                </Link>
                <div className="px-3">
                  <Link href={`/villas/${topVilla2.villa.id}`}>
                    <h3 className="font-bold text-xl text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                      {topVilla2.villa.name}
                    </h3>
                  </Link>
                  <p className="text-[#424750] text-sm mb-3">
                    {topVilla2.villa.capacity} · {topVilla2.villa.rooms}
                  </p>
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                      <p className="font-black text-[#003461] text-lg leading-tight">
                        ${topVilla2.price}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                      </p>
                      <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                    </div>
                    <div className="flex items-center text-blue-500 font-bold text-sm shrink-0 mb-1">
                      <span className="mr-1 text-sky-500">★</span> {topVilla2.rating}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Chevron */}
            <button 
              type="button"
              onClick={handleNextVilla}
              aria-label="Next Villa Carousel"
              className="flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#003461]/20 items-center justify-center text-[#003461] hover:bg-[#003461] hover:text-white transition-all shadow-md bg-white shrink-0 cursor-pointer active:scale-95"
            >
              <span className="text-xl md:text-2xl font-bold">›</span>
            </button>

          </div>

          {/* ── Bottom Row: 3 Cards Grid ───────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full">
            
            {/* Bottom Villa 1 */}
            <div 
              key={bottomVilla1.villa.id}
              className="bg-white rounded-2xl overflow-hidden ambient-shadow hover-lift border border-[#003461]/10 p-3.5 md:p-4 flex flex-col justify-between transition-all duration-500 animate-in fade-in zoom-in-95"
            >
              <Link href={`/villas/${bottomVilla1.villa.id}`} className="block group">
                <div className="relative h-36 md:h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={bottomVilla1.villa.images?.[0] || '/villaesperanza.jpg'} 
                    alt={bottomVilla1.villa.name}
                  />
                </div>
              </Link>
              <div className="px-2">
                <Link href={`/villas/${bottomVilla1.villa.id}`}>
                  <h3 className="font-bold text-xl text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                    {bottomVilla1.villa.name}
                  </h3>
                </Link>
                <p className="text-[#424750] text-sm mb-3">
                  {bottomVilla1.villa.capacity} · {bottomVilla1.villa.rooms}
                </p>
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                    <p className="font-black text-[#003461] text-lg leading-tight">
                      ${bottomVilla1.price}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                    </p>
                    <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                  </div>
                  <div className="flex items-center text-blue-500 font-bold text-sm shrink-0 mb-1">
                    <span className="mr-1 text-sky-500">★</span> {bottomVilla1.rating}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Villa 2 */}
            <div 
              key={bottomVilla2.villa.id}
              className="bg-white rounded-2xl overflow-hidden ambient-shadow hover-lift border border-[#003461]/10 p-3.5 md:p-4 flex flex-col justify-between transition-all duration-500 animate-in fade-in zoom-in-95"
            >
              <Link href={`/villas/${bottomVilla2.villa.id}`} className="block group">
                <div className="relative h-36 md:h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={bottomVilla2.villa.images?.[0] || '/villaesperanza.jpg'} 
                    alt={bottomVilla2.villa.name}
                  />
                </div>
              </Link>
              <div className="px-2">
                <Link href={`/villas/${bottomVilla2.villa.id}`}>
                  <h3 className="font-bold text-xl text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                    {bottomVilla2.villa.name}
                  </h3>
                </Link>
                <p className="text-[#424750] text-sm mb-3">
                  {bottomVilla2.villa.capacity} · {bottomVilla2.villa.rooms}
                </p>
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                    <p className="font-black text-[#003461] text-lg leading-tight">
                      ${bottomVilla2.price}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                    </p>
                    <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                  </div>
                  <div className="flex items-center text-blue-500 font-bold text-sm shrink-0 mb-1">
                    <span className="mr-1 text-sky-500">★</span> {bottomVilla2.rating}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Villa 3 */}
            <div 
              key={bottomVilla3.villa.id}
              className="bg-white rounded-2xl overflow-hidden ambient-shadow hover-lift border border-[#003461]/10 p-3.5 md:p-4 flex flex-col justify-between transition-all duration-500 animate-in fade-in zoom-in-95"
            >
              <Link href={`/villas/${bottomVilla3.villa.id}`} className="block group">
                <div className="relative h-36 md:h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={bottomVilla3.villa.images?.[0] || '/villaesperanza.jpg'} 
                    alt={bottomVilla3.villa.name}
                  />
                </div>
              </Link>
              <div className="px-2">
                <Link href={`/villas/${bottomVilla3.villa.id}`}>
                  <h3 className="font-bold text-xl text-[#003461] mb-1 hover:text-ocean-teal transition-colors">
                    {bottomVilla3.villa.name}
                  </h3>
                </Link>
                <p className="text-[#424750] text-sm mb-3">
                  {bottomVilla3.villa.capacity} · {bottomVilla3.villa.rooms}
                </p>
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#424750]/70 leading-none mb-0.5">As low as</p>
                    <p className="font-black text-[#003461] text-lg leading-tight">
                      ${bottomVilla3.price}* USD<span className="text-xs font-normal text-[#424750]">/night</span>
                    </p>
                    <p className="text-[9px] text-[#424750]/60 italic leading-none mt-0.5">*September rates</p>
                  </div>
                  <div className="flex items-center text-blue-500 font-bold text-sm shrink-0 mb-1">
                    <span className="mr-1 text-sky-500">★</span> {bottomVilla3.rating}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
