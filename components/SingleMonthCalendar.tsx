'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SingleMonthCalendarProps {
  checkIn: string | null;
  checkOut: string | null;
  blockedDates?: string[];
  minNights?: number;
  onSelectDates: (checkIn: string | null, checkOut: string | null) => void;
  onClose: () => void;
}

export default function SingleMonthCalendar({
  checkIn,
  checkOut,
  blockedDates = [],
  minNights = 2,
  onSelectDates,
  onClose,
}: SingleMonthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (checkIn) {
      const checkInDate = new Date(checkIn + 'T00:00:00');
      if (!isNaN(checkInDate.getTime())) {
        return new Date(checkInDate.getFullYear(), checkInDate.getMonth(), 1);
      }
    }
    return new Date();
  });

  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const hasBlockedDatesBetween = (startStr: string, endStr: string): boolean => {
    const start = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T00:00:00');
    if (start >= end) return true;

    const temp = new Date(start);
    while (temp < end) {
      const dStr = temp.toISOString().split('T')[0];
      if (blockedDates.includes(dStr)) {
        return true;
      }
      temp.setDate(temp.getDate() + 1);
    }
    return false;
  };

  const handleDateClick = (date: Date, isDisabled: boolean) => {
    if (isDisabled) return;
    const dateStr = date.toISOString().split('T')[0];

    if (checkIn === dateStr) {
      if (!checkOut) {
        onSelectDates(null, null);
      } else {
        onSelectDates(dateStr, null);
      }
    } else if (checkOut === dateStr) {
      onSelectDates(checkIn, null);
    } else if (!checkIn || (checkIn && checkOut)) {
      onSelectDates(dateStr, null);
    } else {
      const checkInDate = new Date(checkIn + 'T00:00:00');
      const diffTime = date.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        if (!hasBlockedDatesBetween(checkIn, dateStr)) {
          if (diffDays >= minNights) {
            onSelectDates(checkIn, dateStr);
          } else {
            const targetMinOut = new Date(checkInDate);
            targetMinOut.setDate(targetMinOut.getDate() + minNights);
            const minOutStr = targetMinOut.toISOString().split('T')[0];
            if (!hasBlockedDatesBetween(checkIn, minOutStr)) {
              onSelectDates(checkIn, minOutStr);
            } else {
              onSelectDates(checkIn, dateStr);
            }
          }
        } else {
          // If there are blocked dates in between, restart selection from this date
          onSelectDates(dateStr, null);
        }
      } else {
        onSelectDates(dateStr, null);
      }
    }
  };

  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minCheckIn = new Date(today);
    minCheckIn.setDate(minCheckIn.getDate() + 2);

    const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const days: React.ReactNode[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      const dateStr = date.toISOString().split('T')[0];
      const isPast = date < minCheckIn;
      const isBlocked = blockedDates.includes(dateStr);
      const isDisabled = isPast || isBlocked;

      const isCheckIn = checkIn === dateStr;
      const isCheckOut = checkOut === dateStr;
      
      const checkInTime = checkIn ? new Date(checkIn + 'T00:00:00').getTime() : null;
      const checkOutTime = checkOut ? new Date(checkOut + 'T00:00:00').getTime() : null;
      const hoverTime = hoverDate ? hoverDate.getTime() : null;
      const dateTime = date.getTime();

      let inRange = false;
      if (checkIn && checkOut) {
        inRange = dateTime > (checkInTime || 0) && dateTime < (checkOutTime || 0) && !hasBlockedDatesBetween(checkIn, checkOut);
      } else if (checkIn && hoverDate && !checkOut) {
        const hoverStr = hoverDate.toISOString().split('T')[0];
        inRange = dateTime > (checkInTime || 0) && dateTime <= (hoverTime || 0) && !hasBlockedDatesBetween(checkIn, hoverStr);
      }

      let btnClass = 'text-base-dark hover:bg-ocean-teal/10 font-semibold';
      if (isDisabled) {
        btnClass = 'text-gray-300 line-through cursor-not-allowed';
      } else if (isCheckIn || isCheckOut) {
        btnClass = 'bg-[#003461] text-white font-bold shadow-md scale-105';
      } else if (inRange) {
        btnClass = 'bg-ocean-teal/15 text-[#003461] font-semibold';
      }

      days.push(
        <button
          key={d}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateClick(date, isDisabled)}
          onMouseEnter={() => !isDisabled && setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-xs md:text-sm transition-all duration-150 ${btnClass}`}
        >
          {d}
        </button>
      );
    }

    return (
      <div className="w-full">
        {/* Month Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full border border-sand-accent/20 flex items-center justify-center text-[#003461] hover:bg-[#003461] hover:text-white transition-colors cursor-pointer"
          >
            ‹
          </button>
          <h4 className="font-bold text-[#003461] text-base md:text-lg uppercase tracking-wide">
            {monthName}
          </h4>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full border border-sand-accent/20 flex items-center justify-center text-[#003461] hover:bg-[#003461] hover:text-white transition-colors cursor-pointer"
          >
            ›
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-[#424750] uppercase tracking-wider mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 justify-items-center">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-3 z-[100] bg-white rounded-[2rem] p-5 shadow-[0_25px_60px_rgba(0,52,97,0.3)] border border-sand-accent/20 w-[92vw] max-w-sm sm:w-80 md:w-96 text-base-dark animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Month View */}
      {renderMonth(currentMonth)}

      {/* Date Summary Footer */}
      <div className="mt-4 pt-3 border-t border-sand-accent/15 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelectDates(null, null)}
          className="text-xs font-bold text-gray-500 hover:text-red-500 underline transition-colors cursor-pointer"
        >
          Clear dates
        </button>

        <span className="text-[11px] font-semibold text-[#003461] bg-[#eef5f7] px-3 py-1 rounded-full border border-[#003461]/10">
          {minNights} Night Min
        </span>

        <button
          type="button"
          onClick={onClose}
          className="bg-[#003461] hover:bg-[#002447] text-white font-bold text-xs px-5 py-2 rounded-full transition-colors shadow-md cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}
