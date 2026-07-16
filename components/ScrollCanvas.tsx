'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import Link from 'next/link';

function Experience({ images }: { images: HTMLImageElement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 120;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const progress = smoothProgress.get();
      // Finish the video animation early at 75% scroll progress
      const clampedProgress = Math.min(progress / 0.75, 1);
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(clampedProgress * frameCount)
      );

      const img = images[frameIndex];
      if (img) {
        const { width, height } = canvas;
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        // "contain" fit logic for canvas
        if (canvasRatio > imgRatio) {
          drawHeight = height;
          drawWidth = img.width * (height / img.height);
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = width;
          drawHeight = img.height * (width / img.width);
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, width, height);
        
        // Draw white background first to ensure seamless blending
        ctx.fillStyle = '#FFFFFE';
        ctx.fillRect(0, 0, width, height);
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, smoothProgress]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Opacity & Position Mapping (3 sections, holding on the last frame)
  // Beat A: 0 - 25% (Hero)
  const beatAOpacity = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const beatAY = useTransform(smoothProgress, [0, 0.2, 0.25], [0, 0, -20]);

  // Beat B: 25% - 50% (Features)
  const beatBOpacity = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const beatBY = useTransform(smoothProgress, [0.25, 0.3, 0.45, 0.5], [20, 0, 0, -20]);

  // Beat C: 50% - 100% (CTA)
  const beatCOpacity = useTransform(smoothProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const beatCY = useTransform(smoothProgress, [0.5, 0.6, 1], [20, 0, 0]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-base-light text-base-dark" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas container with exact pure white background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain pointer-events-none bg-base-light" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none">
          
          {/* Scroll Indicator */}
          <motion.div style={{ opacity: scrollIndicatorOpacity }} className="absolute top-28 md:top-36 left-6 md:left-12 flex flex-col items-center z-20">
            <span className="text-[9px] md:text-[10px] font-sans font-light tracking-[0.25em] uppercase mb-4 text-base-dark/40">
              Scroll to Explore
            </span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <svg className="w-3 h-16 text-base-dark/30" fill="none" stroke="currentColor" viewBox="0 0 12 64" preserveAspectRatio="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 0v62M1 57l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Beat A: The Hero */}
          <motion.div style={{ opacity: beatAOpacity, y: beatAY }} className="absolute text-center max-w-6xl select-none">
            <div className="flex flex-col items-center justify-center font-sans font-black italic uppercase leading-none">
              <span className="text-6xl md:text-8xl lg:text-[7rem] xl:text-[9rem] text-white tracking-[-0.09em] text-shadow-black-sm drop-shadow-sm">
                Escape
              </span>
              <div className="relative my-[-0.45em] md:my-[-0.55em] lg:my-[-0.65em] xl:my-[-0.7em] z-10 flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-sand-accent rounded-full flex items-center justify-center text-base-light text-base md:text-lg lg:text-2xl font-black shadow-lg">
                  TO
                </div>
              </div>
              <span className="text-7xl md:text-9xl lg:text-[8rem] xl:text-[10rem] text-white tracking-[-0.09em] text-shadow-black-lg drop-shadow-sm">
                Paradise
              </span>
            </div>
            <div className="bg-base-light px-6 py-2.5 rounded-full border border-sand-accent/20 shadow-[0_8px_30px_rgba(48,41,47,0.06)] mt-8 inline-block pointer-events-auto">
              <p className="text-xs md:text-sm font-sans font-bold tracking-widest uppercase text-base-dark">
                Where high design meets tropical tranquility.
              </p>
            </div>
          </motion.div>

          {/* Beat B: Core Features (The Three Pillars) */}
          <motion.div style={{ opacity: beatBOpacity, y: beatBY }} className="absolute max-w-6xl w-full px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-12">
                {/* Feature 1 */}
                <div className="bg-white border border-sand-accent/20 px-8 pb-8 pt-32 rounded-[2rem] shadow-2xl flex flex-col items-center text-center pointer-events-auto h-full relative">
                  <img src="/villa5_icon2.png" alt="Villa 5" className="w-[18rem] absolute -top-16 left-1/2 -translate-x-1/2 z-20 drop-shadow-sm" />
                  <div className="flex-1 flex flex-col items-center relative z-10">
                    <h3 className="text-[1.6rem] font-serif italic text-base-dark mb-3">Your Home in Mexico</h3>
                    <p className="font-sans text-base-dark/80 font-light text-[0.95rem] leading-relaxed mb-6 text-justify">
                      Think of our villas as your own second home in San Pancho. Cozy, private, and set up with all the comforts you need to drop your bags and instantly relax.
                    </p>
                  </div>
                  <Link href="/villas" className="inline-block bg-[#19647E] hover:bg-[#f7f5f0] text-white hover:text-[#19647E] border border-transparent hover:border-[#19647E] font-sans tracking-widest text-[10px] uppercase font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md z-10 w-full text-center">
                    VIEW VILLAS
                  </Link>
                </div>
                {/* Feature 2 */}
                <div className="bg-white border border-sand-accent/20 px-8 pb-8 pt-10 rounded-[2rem] shadow-2xl flex flex-col items-center pointer-events-auto h-full relative overflow-hidden">
                  <div className="flex-1 w-full text-left relative z-10">
                    <h3 className="text-[1.6rem] font-serif italic text-base-dark mb-3">Golf Cart Rentals</h3>
                    <p className="font-sans text-base-dark/80 font-light text-[0.95rem] leading-relaxed mb-6 w-[58%] text-justify">
                      The ultimate beach town transport. Rent a cart with us to easily explore the village, beaches, and local shops.
                    </p>
                  </div>
                  <img src="/golfcart_icon2.png" alt="Golf Cart" className="w-[13.2rem] absolute -right-4 bottom-28 z-0 opacity-90 drop-shadow-sm" />
                  <Link href="/golf-carts" className="inline-block bg-[#19647E] hover:bg-[#f7f5f0] text-white hover:text-[#19647E] border border-transparent hover:border-[#19647E] font-sans tracking-widest text-[10px] uppercase font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md z-10 w-full text-center">
                    RESERVE A CART
                  </Link>
                </div>
                {/* Feature 3 */}
                <div className="bg-white border border-sand-accent/20 px-8 pb-8 pt-10 rounded-[2rem] shadow-2xl flex flex-col items-center pointer-events-auto h-full relative">
                  <img src="/welcome_icon.svg" alt="Welcome Sign" className="w-[10.5rem] absolute -right-5 -top-14 z-20 drop-shadow-sm" />
                  <div className="flex-1 w-full text-left relative z-10">
                    <h3 className="text-[1.6rem] font-serif italic text-base-dark mb-3 w-[55%]">Your Local Neighbors</h3>
                    <p className="font-sans text-base-dark/80 font-light text-[0.95rem] leading-relaxed mb-6 w-[60%] text-justify">
                      From a seamless check-in to pointing you toward the best street tacos, we live on-site and love helping you experience the real San Pancho.
                    </p>
                  </div>
                  <Link href="/contact" className="inline-block bg-[#19647E] hover:bg-[#f7f5f0] text-white hover:text-[#19647E] border border-transparent hover:border-[#19647E] font-sans tracking-widest text-[10px] uppercase font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md z-10 w-full text-center">
                    MEET YOUR HOSTS
                  </Link>
                </div>
              </div>
          </motion.div>

          {/* Beat C: CTA */}
          <motion.div style={{ opacity: beatCOpacity, y: beatCY }} className="absolute text-center max-w-2xl pointer-events-auto select-none">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-black italic tracking-tighter uppercase text-white text-shadow-black-lg mb-8">
              Visit San Pancho
            </h2>
            <Link href="/villas" className="inline-block bg-ocean-teal hover:bg-base-light text-base-light hover:text-ocean-teal font-sans tracking-widest text-xs font-semibold px-10 py-4.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(25,100,126,0.25)] pointer-events-auto">
              PLAN YOUR TRIP HERE
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default function ScrollCanvas() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameCount = 120;

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/esperanza2.1/frame_${paddedIndex}_delay-0.066s.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load frame: ${img.src}`);
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-base-light text-base-dark">
        {/* Loading Spinner */}
        <div className="w-12 h-12 border-2 border-primary-green border-t-transparent rounded-full animate-spin mb-6"></div>
        {/* Loading details */}
        <h2 className="text-lg font-serif tracking-widest text-base-dark uppercase mb-4">ASSEMBLING SANCTUARY</h2>
        
        {/* Progress bar container */}
        <div className="w-48 h-[1px] bg-sand-accent/30 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-primary-green transition-all duration-300"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <span className="text-[10px] font-sans tracking-widest text-base-dark/60 font-medium mt-2">{loadProgress}%</span>
      </div>
    );
  }

  return <Experience images={images} />;
}
