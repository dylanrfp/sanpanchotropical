'use client';

import React, { useState } from 'react';

interface DoubleMonthCalendarProps {
  checkIn: string | null;
  checkOut: string | null;
  blockedDates?: string[];
  onSelectDates: (checkIn: string | null, checkOut: string | null) => void;
  onClose: () => void;
}

export default function DoubleMonthCalendar({
  checkIn,
  checkOut,
  blockedDates = [],
  onSelectDates,
  onClose,
}: DoubleMonthCalendarProps) {
  // Open on the check-in month if already selected, otherwise default to current month
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
  const [isDragging, setIsDragging] = useState(false);
  const [activeDragHandle, setActiveDragHandle] = useState<'checkIn' | 'checkOut' | null>(null);

  // Global mouseup listener to end dragging if released outside the calendar grid
  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setActiveDragHandle(null);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const getNextMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateMouseDown = (date: Date, isDisabled: boolean) => {
    if (isDisabled) return;
    const dateStr = date.toISOString().split('T')[0];

    if (checkIn === dateStr) {
      if (!checkOut) {
        // Clicked check-in again while check-out is empty: cancel selection
        onSelectDates(null, null);
        setIsDragging(false);
        setActiveDragHandle(null);
        setHoverDate(null);
      } else {
        // User clicked on check-in date to adjust it
        setActiveDragHandle('checkIn');
        setIsDragging(true);
      }
    } else if (checkOut === dateStr) {
      // User clicked on check-out date to adjust it
      setActiveDragHandle('checkOut');
      setIsDragging(true);
    } else if (!checkIn || (checkIn && checkOut)) {
      // Start a completely fresh selection
      setActiveDragHandle(null);
      onSelectDates(dateStr, null);
      setIsDragging(true);
      setHoverDate(null);
    } else {
      // Select the check-out date
      const checkInDate = new Date(checkIn + 'T00:00:00');
      if (date > checkInDate) {
        onSelectDates(checkIn, dateStr);
      } else {
        onSelectDates(dateStr, null);
        setIsDragging(true);
      }
    }
  };

  const handleDateMouseUp = (date: Date, isDisabled: boolean) => {
    if (isDragging) {
      if (activeDragHandle) {
        // Drag boundary adjustments are already saved via mouseenter
      } else if (checkIn && !isDisabled) {
        // Finalize a regular range drag selection
        const checkInDate = new Date(checkIn + 'T00:00:00');
        const dateStr = date.toISOString().split('T')[0];
        if (date > checkInDate) {
          onSelectDates(checkIn, dateStr);
        }
      }
    }
    setIsDragging(false);
    setActiveDragHandle(null);
  };

  const handleDateHover = (date: Date, isDisabled: boolean) => {
    if (isDisabled) return;
    const dateStr = date.toISOString().split('T')[0];

    if (isDragging && activeDragHandle) {
      // Adjust check-in or check-out boundary on the fly
      if (activeDragHandle === 'checkIn' && checkOut) {
        const checkOutDate = new Date(checkOut + 'T00:00:00');
        if (date < checkOutDate) {
          onSelectDates(dateStr, checkOut);
        }
      } else if (activeDragHandle === 'checkOut' && checkIn) {
        const checkInDate = new Date(checkIn + 'T00:00:00');
        if (date > checkInDate) {
          onSelectDates(checkIn, dateStr);
        }
      }
    } else if (checkIn && !checkOut) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  };

  const clearDates = () => {
    onSelectDates(null, null);
    setHoverDate(null);
    setIsDragging(false);
  };

  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthName = monthDate.toLocaleString('default', { month: 'long' });

    // Days of the week header
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Get number of days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Get the first day of the month (1-indexed for Monday as start of week)
    // Date.getDay() returns 0 for Sunday, 1 for Monday, etc.
    let firstDayIndex = new Date(year, month, 1).getDay();
    // Convert to Monday start: 0 for Mon, 1 for Tue, ..., 6 for Sun
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const days = [];
    // Empty cells for days of prev month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days cells
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];

      const isCheckIn = checkIn === dateStr;
      const isCheckOut = checkOut === dateStr;
      
      let isInRange = false;
      if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        isInRange = date > start && date < end;
      } else if (checkIn && hoverDate) {
        const start = new Date(checkIn);
        isInRange = date > start && date <= hoverDate;
      }

      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      // Disable past dates and blocked dates
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isBlocked = blockedDates.includes(dateStr);
      const isDisabled = isPast || isBlocked;

      days.push(
        <div
          key={`day-${day}`}
          className="relative h-10 w-10 flex items-center justify-center font-sans text-xs select-none"
          onMouseEnter={() => handleDateHover(date, isDisabled)}
          onMouseDown={() => handleDateMouseDown(date, isDisabled)}
          onMouseUp={() => handleDateMouseUp(date, isDisabled)}
        >
          {/* Range Background highlights */}
          {isInRange && !isDisabled && (
            <div className="absolute inset-0 bg-[#FDF3E2] opacity-80 z-0"></div>
          )}
          
          <button
            type="button"
            disabled={isDisabled}
            className={`
              relative z-10 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-150 font-medium
              ${isCheckIn || isCheckOut 
                ? 'bg-[#F5A623] text-white font-bold scale-105 shadow-sm' 
                : isDisabled 
                  ? 'text-base-dark/30 cursor-not-allowed line-through hover:bg-transparent'
                  : 'hover:bg-sand-accent/15 text-base-dark cursor-pointer'
              }
              ${isToday && !isCheckIn && !isCheckOut ? 'border border-sand-accent' : ''}
            `}
          >
            {day}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Month Title */}
        <h3 className="font-serif italic text-base font-semibold text-base-dark text-center">
          {monthName} {year}
        </h3>
        
        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center font-sans text-[10px] uppercase tracking-wider text-base-dark/50 font-bold mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="h-6 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute top-full right-0 left-0 md:left-auto mt-4 bg-white border border-sand-accent/15 rounded-3xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-50 w-full md:w-[650px] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="relative">
        
        {/* Navigation Header */}
        <div className="absolute top-0 inset-x-0 flex justify-between px-2 pointer-events-none z-10">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="pointer-events-auto h-8 w-8 flex items-center justify-center rounded-full border border-sand-accent/20 bg-white text-base-dark hover:bg-sand-accent/5 transition-colors cursor-pointer"
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="pointer-events-auto h-8 w-8 flex items-center justify-center rounded-full border border-sand-accent/20 bg-white text-base-dark hover:bg-sand-accent/5 transition-colors cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Dual Month View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2">
          {renderMonth(currentMonth)}
          <div className="md:block hidden">
            {renderMonth(getNextMonth(currentMonth))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t border-sand-accent/10">
          <div className="font-sans text-xs text-base-dark/70 font-light">
            {!checkIn ? (
              <span className="font-medium text-base-dark">Select check-in date</span>
            ) : !checkOut ? (
              <span className="font-medium text-base-dark">Select check-out date</span>
            ) : (
              <span>
                Selected: <strong className="text-base-dark">{checkIn}</strong> to <strong className="text-base-dark">{checkOut}</strong>
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={clearDates}
              className="font-sans text-xs font-bold text-base-dark hover:text-[#F5A623] underline transition-colors cursor-pointer"
            >
              Clear dates
            </button>
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-xs font-bold bg-base-dark hover:bg-[#F5A623] text-white px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
