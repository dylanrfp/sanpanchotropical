'use client';

import React, { useRef } from 'react';

interface Review {
  guestName: string;
  date: string;
  text: string;
}

interface VillaReviewsProps {
  reviews: Review[];
}

const getInitials = (name: string) => {
  if (!name) return 'G';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-[#FF5A3D]', 'bg-ocean-teal', 'bg-blue-600', 'bg-green-600', 
    'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-[#F5A623]'
  ];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function VillaReviews({ reviews }: VillaReviewsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="space-y-8 pt-12 border-t border-sand-accent/10 reveal-on-scroll">
      <div className="flex flex-col items-center text-center space-y-2 reveal-on-scroll">
        <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-base-dark">Reviews</h4>
        <h3 className="font-sans font-black tracking-tight text-3xl md:text-4xl text-base-dark">What our Customers Say</h3>
      </div>

      <div className="relative group">
        {/* Scroll Buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-sand-accent/10 flex items-center justify-center text-base-dark hover:bg-sand-accent/5 transition-colors hidden md:flex"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-sand-accent/10 flex items-center justify-center text-base-dark hover:bg-sand-accent/5 transition-colors hidden md:flex"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 px-4 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Inject a global style block for webkit hide scrollbar since Tailwind doesn't have it built-in by default */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
          
          {reviews.map((review, idx) => (
            <div 
              key={idx}
              className={`snap-center shrink-0 w-80 md:w-96 bg-white border border-sand-accent/15 rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] reveal-on-scroll reveal-scale reveal-delay-${(idx % 3) + 1}`}
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-sans font-bold text-xl mb-4 shadow-sm border-2 border-white ring-2 ring-orange-400/50 ${getAvatarColor(review.guestName)}`}>
                {getInitials(review.guestName)}
              </div>
              
              {/* Name */}
              <h4 className="font-sans font-bold text-base text-base-dark mb-1">{review.guestName}</h4>
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-[#FF5A3D]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="font-sans font-light italic text-sm text-base-dark/80 leading-relaxed line-clamp-6">
                "{review.text.replace(/^["']|["']$/g, '')}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
