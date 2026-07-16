'use client';

import React, { useState } from 'react';

interface CopyAddressButtonProps {
  address: string;
}

export default function CopyAddressButton({ address }: CopyAddressButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-sand-accent/15 rounded-2xl shadow-sm">
      <div className="space-y-1">
        <span className="font-sans font-bold text-[9px] uppercase tracking-wider text-base-dark/50">Property Address</span>
        <p className="font-sans font-medium text-sm text-base-dark">{address}</p>
      </div>
      <button
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ocean-teal hover:bg-base-dark text-base-light font-sans font-semibold tracking-wider text-xs rounded-full transition-colors duration-300 shadow-sm shrink-0 uppercase"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m14.25 8.25v-3.375c0-.621-.504-1.125-1.125-1.125h-9.75a1.125 1.125 0 00-1.125 1.125v10.5c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V16.5zM16.5 12h3.375c.621 0 1.125-.504 1.125-1.125V1.125c0-.621-.504-1.125-1.125-1.125H11.25a1.125 1.125 0 00-1.125 1.125V3" />
            </svg>
            Copy Address
          </>
        )}
      </button>
    </div>
  );
}
