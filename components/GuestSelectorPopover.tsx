'use client';

import React, { useEffect, useRef } from 'react';

interface GuestSelectorPopoverProps {
  adults: number;
  childrenCount: number;
  infants: number;
  onChange: (adults: number, childrenCount: number, infants: number) => void;
  onClose: () => void;
}

export default function GuestSelectorPopover({
  adults,
  childrenCount,
  infants,
  onChange,
  onClose,
}: GuestSelectorPopoverProps) {
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

  const updateAdults = (delta: number) => {
    const next = Math.max(0, Math.min(8, adults + delta));
    onChange(next, childrenCount, infants);
  };

  const updateChildren = (delta: number) => {
    const next = Math.max(0, Math.min(6, childrenCount + delta));
    const nextAdults = (next > 0 && adults === 0) ? 1 : adults;
    onChange(nextAdults, next, infants);
  };

  const updateInfants = (delta: number) => {
    const next = Math.max(0, Math.min(3, infants + delta));
    const nextAdults = (next > 0 && adults === 0) ? 1 : adults;
    onChange(nextAdults, childrenCount, next);
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 mt-3 z-[100] bg-white rounded-[2rem] p-6 shadow-[0_25px_60px_rgba(0,52,97,0.3)] border border-sand-accent/20 w-[92vw] max-w-xs sm:w-72 md:w-80 text-base-dark animate-in fade-in zoom-in-95 duration-200"
    >
      <h4 className="font-bold text-[#003461] text-base mb-4 uppercase tracking-wide">
        Select Guests
      </h4>

      <div className="space-y-5">
        {/* Adults */}
        <div className="flex items-center justify-between pb-3 border-b border-sand-accent/15">
          <div>
            <div className="font-bold text-sm text-[#161d1f]">Adults</div>
            <div className="text-xs text-[#424750] font-light">Ages 13 or above</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={adults <= 0}
              onClick={() => updateAdults(-1)}
              className="w-8 h-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-bold text-[#003461] hover:bg-[#003461] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#003461] transition-colors cursor-pointer"
            >
              –
            </button>
            <span className="font-bold text-sm w-4 text-center">{adults}</span>
            <button
              type="button"
              disabled={adults >= 8}
              onClick={() => updateAdults(1)}
              className="w-8 h-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-bold text-[#003461] hover:bg-[#003461] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#003461] transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between pb-3 border-b border-sand-accent/15">
          <div>
            <div className="font-bold text-sm text-[#161d1f]">Children</div>
            <div className="text-xs text-[#424750] font-light">Ages 2 – 12</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={childrenCount <= 0}
              onClick={() => updateChildren(-1)}
              className="w-8 h-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-bold text-[#003461] hover:bg-[#003461] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#003461] transition-colors cursor-pointer"
            >
              –
            </button>
            <span className="font-bold text-sm w-4 text-center">{childrenCount}</span>
            <button
              type="button"
              disabled={childrenCount >= 6}
              onClick={() => updateChildren(1)}
              className="w-8 h-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-bold text-[#003461] hover:bg-[#003461] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#003461] transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Infants */}
        <div className="flex items-center justify-between pb-3">
          <div>
            <div className="font-bold text-sm text-[#161d1f]">Infants</div>
            <div className="text-xs text-[#424750] font-light">Under 2</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={infants <= 0}
              onClick={() => updateInfants(-1)}
              className="w-8 h-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-bold text-[#003461] hover:bg-[#003461] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#003461] transition-colors cursor-pointer"
            >
              –
            </button>
            <span className="font-bold text-sm w-4 text-center">{infants}</span>
            <button
              type="button"
              disabled={infants >= 3}
              onClick={() => updateInfants(1)}
              className="w-8 h-8 rounded-full border border-sand-accent/30 flex items-center justify-center font-bold text-[#003461] hover:bg-[#003461] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#003461] transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-sand-accent/15 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#003461] hover:bg-[#002447] text-white font-bold text-xs px-6 py-2.5 rounded-full transition-colors shadow-md cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
