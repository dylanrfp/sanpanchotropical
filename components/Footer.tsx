'use client';

import React from 'react';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-base-light text-base-dark pt-12 md:pt-20 pb-0 border-t border-sand-accent/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-16">
        {/* Brand identity */}
        <div className="flex flex-col space-y-4 md:space-y-6 col-span-2 md:col-span-1">
          <Link href="/" className="font-sans font-black italic tracking-tighter text-2xl uppercase text-base-dark">
            SAN PANCHO <span className="text-accent-blue">TROPICAL</span>
          </Link>
          <p className="font-sans font-light text-xs text-base-dark/70 leading-relaxed max-w-sm">
            Thoughtfully designed beach-town villas and local hospitality, built to be your comfortable home base on the Riviera Nayarit.
          </p>
        </div>

        {/* Directory Links */}
        <div className="flex flex-col space-y-3 md:space-y-6">
          <h4 className="font-sans text-[10px] tracking-widest text-sand-accent uppercase font-semibold">Explore</h4>
          <ul className="flex flex-col space-y-3 font-sans font-light text-xs text-base-dark/80">
            <li>
              <Link href="/villas" className="hover:text-primary-green transition-colors">Villas</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary-green transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary-green transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social connections */}
        <div className="flex flex-col space-y-3 md:space-y-6">
          <h4 className="font-sans text-[10px] tracking-widest text-sand-accent uppercase font-semibold">Connect</h4>
          <ul className="flex flex-col space-y-3 font-sans font-light text-xs text-base-dark/80">
            <li>
              <a href="https://www.instagram.com/sp_tropical/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-green transition-colors">Instagram</a>
            </li>
            <li>
              <a href="https://www.facebook.com/SPTVillas/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-green transition-colors">Facebook</a>
            </li>
          </ul>
        </div>

        {/* WhatsApp Contact */}
        <div className="flex flex-col space-y-3 md:space-y-5 col-span-2 md:col-span-1">
          <h4 className="font-sans text-[10px] tracking-widest text-sand-accent uppercase font-semibold">Chat with us</h4>
          <p className="font-sans font-light text-xs text-base-dark/75 leading-relaxed">
            Have questions about a villa or need help booking? Send us a message on WhatsApp for the fastest response.
          </p>
          <a 
            href="https://wa.me/523221177974" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white font-sans tracking-widest text-[10px] py-3 px-6 rounded-full transition-colors font-semibold shadow-sm w-fit"
          >
            WHATSAPP US
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 border-t border-sand-accent/15 mt-8 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-base-dark/40 font-sans font-light tracking-wider space-y-3 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} San Pancho Tropical. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-primary-green transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary-green transition-colors">Terms of Service</Link>
        </div>
      </div>

      {/* Tropical Leaves Banner at the Bottom */}
      <div className="w-full -mt-8 pointer-events-none select-none relative overflow-hidden">
        <img 
          src="/footer_design.png" 
          alt="Tropical leaves footer design" 
          className="w-full h-auto min-h-[50px] object-cover block scale-105 translate-y-[2%] origin-top" 
        />
      </div>
    </footer>
  );
}
