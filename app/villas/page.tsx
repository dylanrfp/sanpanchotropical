import React from 'react';
import Link from 'next/link';
import { villasData, globalPolicies } from '@/data/villas';

export default function VillasPage() {
  const order = ['villa-iguana', 'villa-cocos', 'villa-sunset', 'villa-papaya', 'villa-palmas'];
  const orderedVillas = [...villasData]
    .filter((v) => v.id !== 'golf-cart')
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return (
    <div className="bg-base-light text-base-dark min-h-screen pt-12 pb-0 overflow-x-hidden">
      {/* ── Cinematic Banner Header ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden border-b border-sand-accent/20 mb-6 md:mb-12" style={{ height: '180px' }}>

        {/* LAYER 1 — background photo (behind text) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 0,
            backgroundImage: "url('/beach_hero3.png')",
            backgroundSize: 'auto 120%',
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            transform: 'translateY(25px)',
          }}
        />

        {/* LAYER 2 — text (middle) */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16" style={{ zIndex: 10, transform: 'translateY(-25px)' }}>
          <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-ocean-teal mb-2 md:mb-3">
            PORTFOLIO
          </span>
          <h1
            className="font-sans font-black italic uppercase leading-none tracking-tighter text-accent-blue whitespace-nowrap"
            style={{ fontSize: 'clamp(1.8rem, 7.16vw, 5.82rem)' }}
          >
            The Villas Collection
          </h1>
        </div>

        {/* LAYER 3 — foreground hillside (solid overlap in front of text) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 20,
            backgroundImage: "url('/beach_hero3.png')",
            backgroundSize: 'auto 120%',
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
            transform: 'translateY(25px)',
          }}
        />

      </div>

      {/* ── Rest of page ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 pt-10 md:pt-20">
        <div className="space-y-16 md:space-y-32 mb-20 md:mb-36">
          {orderedVillas.map((villa, idx) => (
            <div 
              key={villa.id} 
              className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Card Thumbnail - Clickable */}
              <Link 
                href={`/villas/${villa.id}`}
                className={`w-full lg:w-1/2 bg-base-light border border-sand-accent/20 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgba(48,41,47,0.03)] hover:shadow-2xl transition-all duration-500 flex group cursor-pointer reveal-on-scroll ${
                  idx % 2 === 0 ? 'reveal-left' : 'reveal-right'
                }`}
              >
                <div 
                  className="w-full h-52 md:h-[400px] bg-base-dark/5 rounded-xl md:rounded-2xl flex flex-col justify-between p-5 md:p-8 relative overflow-hidden transition-all duration-500 bg-cover bg-center"
                  style={villa.images && villa.images.length > 0 ? { backgroundImage: `url('${villa.images[0]}')` } : {}}
                >
                  <div className="absolute inset-0 bg-base-dark/[0.02] mix-blend-overlay"></div>
                  {villa.images && villa.images.length > 0 && (
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-500 z-0"></div>
                  )}
                  
                  {/* Top tags */}
                  <div className="flex flex-wrap gap-2 z-10">
                    {villa.unit && (
                      <span className="text-xs font-sans font-bold tracking-widest text-base-light bg-sand-accent px-3 py-1.5 rounded-full shadow-sm">
                        {villa.unit}
                      </span>
                    )}
                  </div>

                  {/* Mid Title Overlay */}
                  <div className={`text-center font-serif italic text-3xl md:text-5xl transition-all duration-500 select-none my-auto z-10 ${
                    villa.images && villa.images.length > 0 
                      ? 'text-base-light/90 group-hover:text-white group-hover:scale-105' 
                      : 'text-base-dark/25 group-hover:text-ocean-teal group-hover:scale-105'
                  }`}>
                    {villa.name}
                  </div>

                  {/* Bottom Rate/Capacity */}
                  <div className={`font-sans text-sm tracking-widest font-semibold self-end z-10 ${
                    villa.images && villa.images.length > 0
                      ? 'text-base-light/90'
                      : 'text-base-dark/70'
                  }`}>
                    {villa.capacity}
                  </div>
                </div>
              </Link>

              {/* Text Information */}
              <div className={`w-full lg:w-1/2 flex flex-col justify-between relative reveal-on-scroll ${
                idx % 2 === 0 ? 'reveal-right' : 'reveal-left'
              }`}>
                <div>
                  <Link href={`/villas/${villa.id}`}>
                    <h2 className="text-3xl md:text-5xl font-sans font-black italic tracking-tighter uppercase text-accent-blue mb-2 md:mb-4 hover:text-ocean-teal transition-colors cursor-pointer">
                      {villa.name}
                    </h2>
                  </Link>
                  <p className="font-serif italic text-lg md:text-xl text-base-dark/90 mb-4 md:mb-6">
                    {villa.tagline}
                  </p>
                  
                  <div className="space-y-3 md:space-y-4 mb-5 md:mb-8">
                    <div>
                      <h4 className="text-xs font-sans font-bold tracking-widest text-sand-accent uppercase mb-1">
                        {villa.descriptionTitle || "Design Concept"}
                      </h4>
                      <p className="font-sans font-light text-sm md:text-base text-base-dark/85 leading-relaxed text-justify">{villa.designConcept}</p>
                    </div>
                  </div>
                </div>

                {/* Specs List */}
                <div className={`grid grid-cols-2 gap-3 md:gap-4 border-t border-b border-sand-accent/20 py-4 md:py-6 mb-5 md:mb-8 ${
                  villa.id === 'villa-iguana' ? 'md:max-w-[52%]' : ''
                }`}>
                  {villa.specs.slice(0, 4).map((spec, sidx) => (
                    <div key={sidx} className="flex items-center space-x-2 text-xs md:text-sm font-sans text-base-dark/75">
                      <span className="text-sand-accent">✦</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <Link href={`/villas/${villa.id}`} className="self-start">
                  <button className="bg-base-dark hover:bg-ocean-teal text-base-light font-sans font-semibold tracking-widest text-xs md:text-sm py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-300 shadow-md">
                    VIEW DETAILS & BOOK
                  </button>
                </Link>

                {/* Golf Cart Inclusion Badge (Villa Iguana only) */}
                {villa.id === 'villa-iguana' && (
                  <div className="absolute right-[-1rem] lg:right-[-2rem] bottom-[1.5rem] w-[17rem] h-[10rem] pointer-events-none select-none z-20 hidden md:block">
                    <div className="relative w-full h-full">
                      {/* Golf Cart with Blue Shadow */}
                      <img 
                        src="/golfcart_blueshadow.png" 
                        alt="Includes Golf Cart" 
                        className="w-[12.5rem] h-auto object-contain absolute left-0 bottom-0"
                      />
                      {/* Speech Bubble */}
                      <div 
                        className="absolute left-[8rem] bottom-[2.5rem] bg-[#202023] text-white px-4.5 py-3 rounded-[1.3rem] shadow-xl flex flex-col items-start leading-tight border border-white/5"
                        style={{ minWidth: '7.2rem' }}
                      >
                        <span className="text-[10px] font-sans font-light text-white/60 tracking-wider">Includes a</span>
                        <span className="text-[13px] font-sans font-bold text-white uppercase tracking-wider">Golfcart</span>
                        {/* Shine Sparkle */}
                        <img 
                          src="/shine.png" 
                          alt="Sparkle" 
                          className="absolute right-0.5 -top-4 w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global Operational Policies & Rules */}
        <div className="border-t border-sand-accent/30 pt-10 md:pt-16 reveal-on-scroll">
          <div className="max-w-4xl mb-8 md:mb-12">
            <span className="text-xs md:text-sm font-sans tracking-widest uppercase text-ocean-teal font-semibold block mb-3 md:mb-4">OPERATIONAL STANDARDS</span>
            <h2 className="text-3xl md:text-6xl font-sans font-black italic tracking-tighter uppercase text-accent-blue leading-none">
              Stay Guidelines & Rules
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {globalPolicies.map((policy, pIdx) => (
              <div 
                key={policy.id}
                className={`bg-base-light border border-sand-accent/20 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(48,41,47,0.02)] flex flex-col justify-between reveal-on-scroll reveal-scale reveal-delay-${(pIdx % 3) + 1}`}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sand-accent text-lg">✦</span>
                    <h3 className="font-sans font-bold tracking-wider text-sm uppercase text-base-dark">
                      {policy.title}
                    </h3>
                  </div>
                  <p className="font-sans font-light text-sm text-base-dark/80 leading-relaxed">
                    {policy.details}
                  </p>
                </div>
              </div>
            ))}
            
            {/* The 6th slot: Beach Chairs Illustration */}
            <div className="flex items-center justify-center p-4 reveal-on-scroll reveal-scale reveal-delay-3">
              <img 
                src="/beach_chairs.png" 
                alt="Beach chairs illustration" 
                className="max-h-[220px] w-auto object-contain select-none pointer-events-none" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
