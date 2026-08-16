'use client';

import React, { useState, useEffect } from 'react';
import { Villa } from '@/data/villas';

interface VillaGalleryProps {
  villa: Villa;
}

const getGallerySubtitle = (villa: Villa) => {
  switch (villa.id) {
    case 'villa-palmas':
      return 'Sleeps 2 • 1 King Bed • 1 Full Bathroom';
    case 'villa-iguana':
      return 'Sleeps 8 • 4 Bedrooms • 3.5 Bathrooms';
    case 'villa-sunset':
      return 'Sleeps 4 • 2 Bedrooms • 2 Bathrooms';
    case 'villa-papaya':
      return 'Sleeps 4 • 2 Bedrooms • 1.5 Bathrooms';
    case 'villa-cocos':
      return 'Sleeps 2 • 1 Bedroom • 1 Bathroom';
    default:
      return `${villa.capacity} • ${villa.rooms}`;
  }
};

export default function VillaGallery({ villa }: VillaGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const images = villa.images || [];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen || activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, activeLightboxIndex]);

  if (!images || images.length === 0) return null;

  // Determine images for the static grid
  const topRowImages = images.slice(0, 2);
  const bottomRowImages = images.slice(2, 5);
  const remainingCount = images.length - 5;

  return (
    <section className="w-full">
      {/* Static Grid Layout */}
      <div className="relative flex flex-col gap-1 md:gap-2">
        {/* 2 large images */}
        {topRowImages.length > 0 && (
          <div className={`grid grid-cols-1 ${topRowImages.length === 2 ? 'md:grid-cols-2' : ''} gap-1 md:gap-2`}>
            {topRowImages.map((img, idx) => (
              <div 
                key={idx}
                className={`relative aspect-[16/9] overflow-hidden cursor-pointer group reveal-on-scroll reveal-scale reveal-delay-${idx + 1}`}
                onClick={() => setActiveLightboxIndex(idx)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                <img
                  src={img}
                  alt={`${villa.name} highlight ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Small thumbnail row below */}
        {images.length > 2 && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
            {images.slice(2, 8).map((img, idx, arr) => {
              const isLast = idx === arr.length - 1;
              const remainingCount = images.length - 8;
              const showOverlay = isLast && remainingCount > 0;

              return (
                <div 
                  key={idx + 2}
                  className={`relative aspect-[2/1] overflow-hidden cursor-pointer group reveal-on-scroll reveal-scale reveal-delay-${(idx % 3) + 1}`}
                  onClick={() => {
                    if (showOverlay) {
                      setIsModalOpen(true);
                    } else {
                      setActiveLightboxIndex(idx + 2);
                    }
                  }}
                >
                  <div className={`absolute inset-0 transition-colors z-10 ${showOverlay ? 'bg-black/40 hover:bg-black/50' : 'bg-black/0 group-hover:bg-black/10'}`} />
                  <img
                    src={img}
                    alt={`${villa.name} highlight ${idx + 3}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {showOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="flex flex-col items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-90">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        <span className="font-sans font-semibold tracking-wider text-xs md:text-sm">
                          +{remainingCount}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Floating View all button */}
        {images.length > 2 && (
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-white/90 text-base-dark border border-black/5 font-sans font-semibold tracking-wide text-xs px-6 py-3 rounded-full shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              View all {images.length} photos
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Scroll Grid Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-base-light flex flex-col">
          {/* Modal Header */}
          <div className="flex-shrink-0 border-b border-sand-accent/15 bg-base-light px-6 py-4 flex items-center justify-center sticky top-0 z-10 shadow-sm relative">
            <div className="text-center">
              <h2 className="text-2xl font-sans font-black italic tracking-tighter uppercase text-accent-blue">
                {villa.name}
              </h2>
              <p className="font-sans font-semibold text-xs text-base-dark/70 mt-1">
                {getGallerySubtitle(villa)}
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-sand-accent/10 hover:bg-sand-accent/20 flex items-center justify-center text-base-dark transition-colors"
              aria-label="Close gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal Body (Scrollable Masonry) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-base-light/50">
            <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="break-inside-avoid rounded-2xl overflow-hidden border border-sand-accent/10 shadow-sm bg-base-light cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setActiveLightboxIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`${villa.name} photo ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal (For single photo detailed view) */}
      {activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[110] bg-white flex flex-col justify-between p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Header block (Counter & Close) */}
          <div className="flex items-center justify-between text-base-dark z-20" onClick={(e) => e.stopPropagation()}>
            <span className="font-sans font-semibold text-sm">
              {activeLightboxIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-sand-accent/10 hover:bg-sand-accent/20 flex items-center justify-center text-base-dark transition-colors"
              aria-label="Close photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Main image content with arrows */}
          <div className="flex-1 flex items-center justify-center relative w-full my-4">
            {/* Prev arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
              }}
              className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-sand-accent/10 hover:bg-sand-accent/20 flex items-center justify-center text-base-dark text-3xl font-light transition-all select-none z-20"
              aria-label="Previous photo"
            >
              ‹
            </button>

            {/* Main image */}
            <div className="max-w-[90%] max-h-[80vh] flex items-center justify-center select-none" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[activeLightboxIndex]}
                alt={`${villa.name} photo ${activeLightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain shadow-xl"
              />
            </div>

            {/* Next arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
              }}
              className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-sand-accent/10 hover:bg-sand-accent/20 flex items-center justify-center text-base-dark text-3xl font-light transition-all select-none z-20"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
          
          <div className="h-6" /> {/* Spacer at bottom */}
        </div>
      )}
    </section>
  );
}
