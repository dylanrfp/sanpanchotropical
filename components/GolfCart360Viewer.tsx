'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 120;
const START_FRAME = 60;

export default function GolfCart360Viewer() {
  const [currentFrame, setCurrentFrame] = useState(START_FRAME);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const startXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(0);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, '0');
      // Folder name has a typo: "animaiton" instead of "animation", exactly as it is in the public folder
      img.src = `/golfcart animaiton/frame_${paddedIndex}_delay-0.045s.jpg`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Draw the current frame to the canvas
  useEffect(() => {
    if (imagesLoaded > 0 && imagesRef.current[currentFrame]) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = imagesRef.current[currentFrame];

      if (canvas && ctx && img && img.complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to fit image in canvas (contain behavior)
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let drawX = 0;
        let drawY = 0;

        if (imgAspect > canvasAspect) {
          drawHeight = canvas.width / imgAspect;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          drawX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    }
  }, [currentFrame, imagesLoaded]);

  // Handle Dragging Logic
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startFrameRef.current = currentFrame;
  };

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    
    // Sensitivity: how many pixels per frame
    const pixelsPerFrame = 5; 
    const deltaX = clientX - startXRef.current;
    
    // Calculate how many frames to advance (drag left -> advance frame, drag right -> reverse frame)
    // Adjust the sign depending on the desired rotation direction.
    const frameDelta = Math.floor(deltaX / pixelsPerFrame);
    
    let newFrame = startFrameRef.current - frameDelta;
    
    // Soft lock (clamp) instead of wrap around
    if (newFrame < 0) newFrame = 0;
    if (newFrame >= TOTAL_FRAMES) newFrame = TOTAL_FRAMES - 1;
    
    setCurrentFrame(newFrame);
  }, [isDragging]);

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse Events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  
  // Touch Events
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-sand-accent/5 flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      
      {/* Loading overlay if not all images are loaded */}
      {imagesLoaded < TOTAL_FRAMES && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-base-light/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-sand-accent/20 border-t-[#F5A623] rounded-full animate-spin mb-4" />
          <span className="font-sans font-semibold text-base-dark text-sm tracking-widest uppercase">
            Loading 360 View... ({Math.floor((imagesLoaded / TOTAL_FRAMES) * 100)}%)
          </span>
        </div>
      )}

      {/* 360 Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full object-contain pointer-events-none"
      />
      
      {/* Invisible overlay for capturing mouse/touch events covering the entire area */}
      <div 
        className="absolute inset-0 z-20"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleEnd}
      />
      
      {/* Hint UI overlaid at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md border border-sand-accent/20 px-6 py-2.5 rounded-full shadow-lg flex items-center gap-3 pointer-events-none transition-opacity duration-300">
        <svg className="w-5 h-5 text-base-dark/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-base-dark">
          Drag to rotate
        </span>
      </div>
    </div>
  );
}
