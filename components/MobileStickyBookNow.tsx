'use client';

import React from 'react';

interface MobileStickyBookNowProps {
  targetId: string;
  label?: string;
}

export default function MobileStickyBookNow({ targetId, label = "BOOK NOW" }: MobileStickyBookNowProps) {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full p-3 bg-base-light/95 border-t border-sand-accent/20 z-50 backdrop-blur-md">
      <button 
        onClick={handleScroll}
        className="block w-full bg-ocean-teal text-base-light font-sans font-semibold py-3 rounded-full text-center text-xs tracking-widest shadow-lg"
      >
        {label}
      </button>
    </div>
  );
}
