import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-[#f4fafd] text-[#161d1f] min-h-screen pb-24 font-sans">
      {/* ── 1. Hero Header Banner ─────────────────────────────────────────────── */}
      <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden flex items-center justify-center bg-[#003461] text-center">
        {/* Background Image with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/about_banner_spt.png')`, filter: 'brightness(0.95)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#003461]/60 via-[#003461]/40 to-[#003461]/80" />
        
        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
          

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#418de2]"></span>
            <span>20+ Years in San Pancho</span>
          </div>

          <h1 
            className="text-3xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-tight mb-4"
            style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.6)' }}
          >
            About San Pancho Tropical
          </h1>

          <p 
            className="font-sans font-light text-base md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
          >
            We are a local family who has called San Pancho home for over two decades. We proudly share our private beach town villas and insider local recommendations with our guests.
          </p>
        </div>
      </div>

      {/* ── 2. Main Story & Image Section ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block bg-[#003461]/10 text-[#003461] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest">
              LOCAL HOSPITALITY & CARE
            </div>
            
            <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-6xl text-[#003461] tracking-tight leading-[1.15]">
              Your Local Hosts in<br />
              <span className="text-[#418de2]">San Pancho, Mexico</span>
            </h2>

            <p className="font-sans text-base md:text-lg text-[#161d1f]/85 leading-relaxed text-justify">
              With more than 20 years of experience in San Pancho, we are proud to offer four private, boutique villas in town. As long-time locals, we provide personal assistance and share our favorite taco spots, quiet beach coves, weekly markets, and sunset views to ensure your vacation is seamless.
            </p>

            <p className="font-sans text-base md:text-lg text-[#161d1f]/85 leading-relaxed text-justify">
              Staying in our private villas gives you the unique opportunity to enjoy a vacation with more space, tranquility, and independence than traditional hotels. Each villa is fully equipped with modern air conditioning, full kitchens, private outdoor spaces, and access to our saltwater pool and golf carts.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link 
                href="/villas"
                className="bg-[#003461] hover:bg-[#418de2] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Explore Our Villas</span>
                <span>→</span>
              </Link>
              <Link 
                href="/contact"
                className="bg-white hover:bg-sky-50 text-[#003461] border border-[#003461]/30 font-bold text-sm px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right Image Column with Popping Logo Badge */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/beach_aboutphoto.png" 
                alt="San Pancho Beach & Palms" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003461]/40 via-transparent to-transparent" />
            </div>

            {/* Popping Floating Logo Box */}
            <div className="absolute -bottom-6 -left-4 md:-left-6 z-20 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-3xl shadow-[0_15px_40px_rgba(0,52,97,0.2)] border-2 border-[#003461]/15 flex items-center gap-4 max-w-xs hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-sky-50 rounded-2xl p-2 flex items-center justify-center border border-[#003461]/10">
                <img 
                  src="/SPtropical_logo.png" 
                  alt="SP Tropical Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#003461]">San Pancho Tropical</h4>
                <p className="text-xs text-[#161d1f]/70 font-medium mt-0.5">Sanctuary & Villas</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. Pillars of Hospitality Section (Added Design Detail) ─────────── */}
      <div className="w-full bg-[#e8eff1]/60 py-16 md:py-24 border-y border-[#003461]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
            <span className="text-[#003461] font-bold text-xs uppercase tracking-widest">WHY GUESTS LOVE STAYING WITH US</span>
            <h3 className="text-3xl md:text-5xl font-black text-[#003461] tracking-tight">The SP Tropical Experience</h3>
            <p className="text-base text-[#161d1f]/75 font-light">Thoughtfully crafted hospitality designed for your ultimate beach-town relaxation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#003461]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#003461]/10 text-[#003461] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#003461]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[#003461]">20+ Years Local Heritage</h4>
              <p className="text-sm text-[#161d1f]/80 leading-relaxed">
                As long-time locals, we know every corner of San Pancho. We offer direct assistance, airport shuttle arrangements, and insider recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#003461]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#003461]/10 text-[#003461] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#003461]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[#003461]">3 Blocks to the Beach</h4>
              <p className="text-sm text-[#161d1f]/80 leading-relaxed">
                Our villas are perfectly located just three short blocks from the surf break and two blocks from town, combining peaceful quiet with effortless access.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#003461]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#003461]/10 text-[#003461] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#003461]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[#003461]">Saltwater Pool & Carts</h4>
              <p className="text-sm text-[#161d1f]/80 leading-relaxed">
                Unwind in your private enclave with an emerald saltwater pool, lush gardens, full kitchens, and electric golf cart rentals ready at your door.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── 4. Stats Section (No Orange Text!) ───────────────────────────── */}
      <div className="w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
            
            {/* Stat 1 */}
            <div className="bg-[#f4fafd] p-8 rounded-3xl border border-[#003461]/10 flex flex-col items-center justify-center shadow-md">
              <span className="font-sans font-black text-5xl md:text-7xl text-[#003461] tracking-tight leading-none mb-3">
                20+ Yrs
              </span>
              <span className="font-sans font-semibold text-sm md:text-base text-[#161d1f]/75 tracking-wider uppercase">
                San Pancho Expertise
              </span>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#f4fafd] p-8 rounded-3xl border border-[#003461]/10 flex flex-col items-center justify-center shadow-md">
              <span className="font-sans font-black text-5xl md:text-7xl text-[#003461] tracking-tight leading-none mb-3">
                1000+
              </span>
              <span className="font-sans font-semibold text-sm md:text-base text-[#161d1f]/75 tracking-wider uppercase">
                5-Star Guest Stays
              </span>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#f4fafd] p-8 rounded-3xl border border-[#003461]/10 flex flex-col items-center justify-center shadow-md">
              <span className="font-sans font-black text-5xl md:text-7xl text-[#003461] tracking-tight leading-none mb-3">
                100%
              </span>
              <span className="font-sans font-semibold text-sm md:text-base text-[#161d1f]/75 tracking-wider uppercase">
                Locally Owned & Managed
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
