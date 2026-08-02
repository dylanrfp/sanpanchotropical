'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-base-light text-base-dark min-h-screen pb-28 overflow-x-hidden">
      {/* ── Cinematic Banner Header ─────────────────────────────────────────── */}
      <div 
        className="relative w-full overflow-hidden mb-6 md:mb-12 flex items-center justify-center bg-base-dark" 
        style={{ 
          aspectRatio: '2750 / 592',
          minHeight: '150px'
        }}
      >

        {/* Background photo */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/contact_banner.png')",
            backgroundPosition: 'center top',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          
          {/* Details & Info */}
          <div className="flex flex-col reveal-on-scroll reveal-left">
            <div>
              <p className="font-outfit font-light text-sm md:text-[19px] text-base-dark/80 leading-relaxed mb-6 md:mb-10 max-w-lg text-justify">
                Whether you are inquiring about availability, need local recommendations, or have a special request for your upcoming stay, we are here to help.
              </p>

              {/* Contact Information Elements */}
              <div className="space-y-5 md:space-y-8 mt-6 md:mt-10">
                {/* Email Item */}
                <div className="flex items-center space-x-6 border-b border-sand-accent/15 pb-6">
                  <div className="w-12 h-12 rounded-full bg-base-dark/[0.04] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-base-dark/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">Email</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">vicky@mexicosta.com</p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center space-x-6 border-b border-sand-accent/15 pb-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/WhatsApp_icon.png" 
                      alt="WhatsApp" 
                      className="w-11 h-11 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">WhatsApp</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">
                      <a 
                        href="https://wa.me/523221177974" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-ocean-teal transition-colors"
                      >
                        +52 322 117 7974
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address Item */}
                <div className="flex items-center space-x-6 border-b border-sand-accent/15 pb-6">
                  <div className="w-12 h-12 rounded-full bg-base-dark/[0.04] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-base-dark/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">Address</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">San Pancho, Nay Mex</p>
                  </div>
                </div>

                {/* Office Hours Item */}
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-full bg-base-dark/[0.04] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-base-dark/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">Office Hours</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">Mon - Sat: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white border border-sand-accent/15 rounded-[2.5rem] p-10 md:p-14 lg:p-16 shadow-xl flex flex-col justify-center lg:mt-0 w-full reveal-on-scroll reveal-right">
            <h3 className="font-outfit font-black text-3xl md:text-4xl text-base-dark tracking-tight mb-8">Message Us</h3>
            
            <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">FULL NAME</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-sand-accent/30 py-3.5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors"
                  placeholder="Elena Rostova"
                />
              </div>

              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-sand-accent/30 py-3.5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors"
                  placeholder="elena@example.com"
                />
              </div>

              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">HOW CAN WE HELP YOU</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-sand-accent/30 py-3.5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors"
                  placeholder="Check dates, questions and coordination"
                />
              </div>

              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">ADDITIONAL SPECIFICATIONS</label>
                <textarea 
                  rows={5}
                  className="w-full bg-transparent border border-sand-accent/25 rounded-xl p-5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors resize-none mt-1"
                  placeholder="Notes on guest party, dietary requests, surf excursions..."
                />
              </div>

              {/* Privacy Notice Consent */}
              <div className="flex items-start space-x-3 pt-2">
                <input 
                  type="checkbox" 
                  id="privacy-consent"
                  required
                  className="mt-1 h-4 w-4 rounded border-sand-accent/30 text-ocean-teal focus:ring-ocean-teal accent-ocean-teal cursor-pointer"
                />
                <label htmlFor="privacy-consent" className="font-outfit text-xs text-base-dark/70 leading-relaxed cursor-pointer select-none">
                  Acepto el <Link href="/privacy" target="_blank" className="text-ocean-teal hover:underline font-semibold">Aviso de Privacidad</Link> / I agree to the <Link href="/privacy" target="_blank" className="text-ocean-teal hover:underline font-semibold">Privacy Notice</Link>.
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-ocean-teal hover:bg-base-dark text-base-light font-outfit tracking-widest text-sm font-semibold py-5 rounded-full transition-colors shadow-md cursor-pointer mt-2"
              >
                SUBMIT INQUIRY
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
