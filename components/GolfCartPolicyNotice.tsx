'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileText, Info, ShieldAlert, ShieldCheck, UserCheck, Users,
  Ban, ShieldX, Compass, Baby, Clock, AlertTriangle, Zap, Lock,
  ExternalLink, Copy, Check,
} from 'lucide-react';

export default function GolfCartPolicyNotice() {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('+523221177974');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mt-14 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200/80 shadow-md space-y-8 text-left"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 border-b border-gray-100 pb-5">
        <div className="w-12 h-12 rounded-2xl bg-[#418de2]/10 text-[#418de2] flex items-center justify-center flex-shrink-0 shadow-sm">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-sans font-bold text-2xl md:text-3xl text-base-dark">
            Golf Cart Rental Rules & Guidelines
          </h3>
          <p className="text-xs md:text-sm font-sans text-base-dark/60 font-medium">
            Essential rules, return deadlines, charger care, and local guidelines.
          </p>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

        {/* Card 1: General Driving Rules */}
        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-gray-200/60 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#418de2]" />
              <h4 className="font-sans font-bold text-base text-base-dark">General Driving Rules</h4>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex items-start space-x-2.5">
                <UserCheck className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-base-dark">Valid Driver&apos;s License: </span>
                  <span className="text-base-dark/75">Must carry a valid physical license while driving.</span>
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <Users className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-base-dark">4-Person Capacity: </span>
                  <span className="text-base-dark/75">Maximum of 4 passengers per cart at all times.</span>
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <Ban className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-rose-900">No Highways, Beaches, or Trails: </span>
                  <span className="text-rose-800/85">Strictly off-limits for golf cart use.</span>
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <ShieldX className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-rose-900">Zero Tolerance for Alcohol: </span>
                  <span className="text-rose-800/85">Never operate the cart under the influence.</span>
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <Compass className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-base-dark">Follow Traffic Laws: </span>
                  <span className="text-base-dark/75">Obey local speed limits and parking signs.</span>
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <Baby className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-base-dark">Child Safety: </span>
                  <span className="text-base-dark/75">Children cannot drive or sit on the driver&apos;s lap in motion.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Returns & Late Fees */}
        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-gray-200/60 pb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <h4 className="font-sans font-bold text-base text-base-dark">Returns & Late Fees</h4>
            </div>

            <div className="space-y-3.5 text-xs md:text-sm">
              <div className="flex items-start space-x-2.5 bg-white p-3.5 rounded-xl border border-gray-200/60">
                <Clock className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-base-dark">12:00 PM Return Deadline:</p>
                  <p className="text-base-dark/75 leading-relaxed">Cart must be returned by 12:00 PM on return date.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">Late Fee ($100 MXN / Hr):</p>
                  <p className="text-amber-800/90 leading-relaxed">Extra time past 12:00 PM incurs a $100 MXN/hr fee.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-white p-3.5 rounded-xl border border-gray-200/60">
                <Info className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-base-dark">Prices in Mexican Pesos (MXN):</p>
                  <p className="text-[11px] text-base-dark/65 italic mt-0.5">Rates may vary seasonally. Contact us for exact pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Cart & Charger Care */}
        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200/80 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 border-b border-gray-200/60 pb-3">
              <Zap className="w-5 h-5 text-emerald-600" />
              <h4 className="font-sans font-bold text-base text-base-dark">Cart & Charger Care</h4>
            </div>

            <div className="space-y-3.5 text-xs md:text-sm">
              <div className="flex items-start space-x-2.5 bg-white p-3.5 rounded-xl border border-gray-200/60">
                <Lock className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-base-dark">Secure Charger Indoors:</p>
                  <p className="text-base-dark/75 leading-relaxed">Keep charger in a dry, indoor location (never outdoors).</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-blue-50/70 p-3.5 rounded-xl border border-blue-200/80">
                <Lock className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#418de2]">Lock Charger on Street:</p>
                  <p className="text-base-dark/80 leading-relaxed">Lock charger to cart if charging on public streets.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 bg-white p-3.5 rounded-xl border border-gray-200/60">
                <ShieldAlert className="w-4 h-4 text-[#418de2] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#418de2]">Substitution Policy:</p>
                  <p className="text-xs text-base-dark/75 leading-relaxed mt-0.5">
                    We reserve the right to substitute a comparable Club Car model based on availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom WhatsApp Assistance Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 text-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 p-2.5 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/25">
            <Image
              src="/WhatsApp_icon.png"
              alt="WhatsApp Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-sans font-bold text-base sm:text-xl text-white">Need Assistance?</h4>
            <p className="font-sans text-xs sm:text-sm text-white/90 font-medium max-w-2xl leading-relaxed flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
              <span>If you experience any issues with your cart, please contact us on WhatsApp at</span>
              <button
                onClick={handleCopyNumber}
                type="button"
                title="Click to copy phone number to clipboard"
                className="inline-flex items-center space-x-1.5 whitespace-nowrap bg-white/20 hover:bg-white/30 active:scale-95 px-3 py-1 rounded-lg font-sans font-bold text-white text-xs sm:text-sm border border-white/40 cursor-pointer transition-all shadow-sm"
              >
                <span>+52 322 117 7974</span>
                {copied ? (
                  <span className="flex items-center text-emerald-200 font-normal text-xs space-x-1 bg-emerald-800/80 px-1.5 py-0.5 rounded">
                    <Check className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Copied!</span>
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/80" />
                )}
              </button>
              <span>Have a great trip and enjoy your ride safely!</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <a
            href="https://wa.me/523221177974"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-emerald-700 hover:bg-emerald-50 font-sans font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md transition-all transform hover:scale-105"
          >
            <Image src="/WhatsApp_icon.png" alt="WhatsApp Icon" width={20} height={20} className="object-contain w-5 h-5" />
            <span>Chat on WhatsApp</span>
            <ExternalLink className="w-4 h-4 text-emerald-700" />
          </a>

          <button
            onClick={handleCopyNumber}
            type="button"
            title="Copy WhatsApp number"
            className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all border border-white/30 cursor-pointer active:scale-95 flex items-center justify-center"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-200" /> : <Copy className="w-5 h-5 text-white" />}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
