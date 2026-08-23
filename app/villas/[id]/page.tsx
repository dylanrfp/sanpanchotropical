import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { villasData } from '@/data/villas';
import VillaGallery from '@/components/VillaGallery';
import VillaReviews from '@/components/VillaReviews';
import CopyAddressButton from '@/components/CopyAddressButton';
import BookingWidget from '@/components/BookingWidget';
const getVillaParams = (id: string) => {
  switch (id) {
    case 'villa-palmas':
      return { guests: '2 guests maximum', bedsRooms: '1 bedroom • 1 bed', baths: '1 bathroom' };
    case 'villa-iguana':
      return { guests: '8 guests maximum', bedsRooms: '4 bedrooms • 5 beds', baths: '3.5 bathrooms' };
    case 'villa-sunset':
      return { guests: '6 guests maximum', bedsRooms: '3 bedrooms • 5 beds', baths: '2.5 bathrooms' };
    case 'villa-papaya':
      return { guests: '4 guests maximum', bedsRooms: '2 bedrooms • 3 beds', baths: '2.5 bathrooms' };
    case 'villa-cocos':
      return { guests: '5 guests maximum', bedsRooms: '3 bedrooms • 4 beds', baths: '2 bathrooms' };
    default:
      return { guests: '2 guests', bedsRooms: '1 bedroom', baths: '1 bathroom' };
  }
};

export async function generateStaticParams() {
  return villasData.map((v) => ({
    id: v.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VillaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const villa = villasData.find((v) => v.id === id);

  if (!villa) {
    notFound();
  }

  return (
    <div className="bg-base-light text-base-dark min-h-screen pt-20 md:pt-28 pb-28">
      
      {/* ── Header Block (Constrained) ─────────────────────────────────── */}
      <div className="w-full pl-4 pr-3 md:pl-12 md:pr-6 lg:pl-16 lg:pr-8 mb-3 md:mb-4">
        {/* Back Link */}
        <Link 
          href="/villas" 
          className="inline-flex items-center space-x-2 text-xs md:text-sm font-sans font-bold tracking-wider uppercase text-ocean-teal hover:text-sand-accent transition-colors mb-2 md:mb-3"
        >
          <span>←</span>
          <span>Back to All Villas</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6 reveal-on-scroll">
          <div>
            <h1 className="text-3xl md:text-7xl font-sans font-black italic tracking-tighter uppercase text-accent-blue mb-1 md:mb-2">
              {villa.name}
            </h1>
            <p className="font-serif italic text-lg md:text-2xl text-base-dark/80 leading-relaxed max-w-3xl">
              {villa.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center md:justify-end gap-2 md:gap-3 shrink-0 md:mb-1">
            {villa.unit && (
              <span className="text-sm md:text-base font-sans font-bold tracking-wider text-base-light bg-sand-accent px-4 md:px-6 py-2 md:py-3 rounded-full shadow-sm">
                {villa.unit}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Full-Width Gallery (Unconstrained) ─────────────────────────── */}
      {villa.images && villa.images.length > 0 && (
        <div className="mb-12 w-full reveal-on-scroll reveal-scale">
          <VillaGallery villa={villa} />
        </div>
      )}

      {/* ── Main Content (Constrained) ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* ── Dynamic Details & Description Layout (Airbnb style) ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Left Column: Specs Row & Description (2/3 width) */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12 reveal-on-scroll">
            
            {/* Specs Row */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 border-b border-sand-accent/15 pb-4 md:pb-6 text-xs md:text-sm font-sans font-semibold text-base-dark">
              {/* Guests */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-base-dark/80 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span>{getVillaParams(villa.id).guests}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-sand-accent/30 hidden sm:inline-block" />
              
              {/* Beds / Bedrooms */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-base-dark/80 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10V19M21 6V19M3 14H21M3 18H21M6 10H10V14H6V10ZM14 10H18V14H14V10Z" />
                </svg>
                <span>{getVillaParams(villa.id).bedsRooms}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-sand-accent/30 hidden sm:inline-block" />

              {/* Bathrooms */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-base-dark/80 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h5v10H4V4zm5 6h10c0 3-3 6-7 6H9v4h6v-4" />
                </svg>
                <span>{getVillaParams(villa.id).baths}</span>
              </div>
            </div>

            {/* Main Description text */}
            <div className="prose prose-sand max-w-none space-y-6">
              {villa.longDescription ? (
                villa.longDescription.map((p, idx) => (
                  <p key={idx} className="font-sans font-light text-base md:text-lg text-base-dark/85 leading-relaxed text-justify">
                    {p}
                  </p>
                ))
              ) : (
                <>
                  <p className="font-sans font-light text-base md:text-lg text-base-dark/85 leading-relaxed text-justify">
                    {villa.designConcept}
                  </p>
                  {villa.targetAudience && (
                    <p className="font-sans font-light text-sm md:text-base text-base-dark/60 italic leading-relaxed pt-4 border-t border-sand-accent/10">
                      <strong>Design Intent:</strong> {villa.targetAudience}
                    </p>
                  )}
                </>
              )}
            </div>

            {villa.golfCartUpsell && (
              villa.id === 'villa-iguana' ? (
                <div className="relative w-full max-w-[900px] mx-auto my-12 reveal-on-scroll reveal-scale">
                  <img 
                    src="/golfcart_included.png" 
                    alt="Golf Cart Included" 
                    className="w-full h-auto object-contain drop-shadow-sm"
                  />
                  {/* Absolute Positioned Button - Original Size & Position */}
                  <Link 
                    href="/golf-carts"
                    className="absolute bottom-[8%] right-[12%] md:bottom-[10%] md:right-[15%] inline-block bg-[#4085F6] hover:bg-[#2b6ada] text-white font-sans font-semibold tracking-wide text-[9px] md:text-[12px] py-2 md:py-2.5 px-4 md:px-5.5 rounded-full transition-all shadow-[0_8px_20px_rgb(64,133,246,0.3)] whitespace-nowrap"
                  >
                    {villa.golfCartUpsell.buttonText}
                  </Link>
                </div>
              ) : (
                <div className="relative w-full max-w-[900px] mx-auto my-12 reveal-on-scroll reveal-scale">
                  <img 
                    src="/addagolfcart.png" 
                    alt="Add a Golf Cart" 
                    className="w-full h-auto object-contain drop-shadow-sm"
                  />
                  {/* Absolute Positioned Button - New Adjusted Size & Position */}
                  <Link 
                    href="/golf-carts"
                    className="absolute bottom-[8%] right-[17%] md:bottom-[10%] md:right-[20%] inline-block bg-[#4085F6] hover:bg-[#2b6ada] text-white font-sans font-semibold tracking-wide text-[11px] md:text-[15px] py-2.5 md:py-3 px-5 md:px-7 rounded-full transition-all shadow-[0_10px_25px_rgb(64,133,246,0.3)] whitespace-nowrap"
                  >
                    {villa.golfCartUpsell.buttonText}
                  </Link>
                </div>
              )
            )}

            {/* Mobile Booking Widget (Inserted Below Golf Cart / Description) */}
            <div id="booking-section" className="block lg:hidden w-full relative reveal-on-scroll mt-8 mb-8 space-y-6">
              <BookingWidget villaId={villa.id} baseRate={villa.id === 'villa-iguana' ? 450 : 180} />
              
              <div className="border border-sand-accent/20 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-between gap-5">
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm text-base-dark">Ask the host anything</h4>
                  <p className="font-sans text-[13px] text-base-dark/65 leading-relaxed">
                    Do you have a question about this home or the local area?{' '}
                    <a 
                      href="https://wa.me/523221177974" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-ocean-teal hover:underline font-semibold block mt-1 text-[13.5px]"
                    >
                      Message the host: +52 322 117 7974
                    </a>
                  </p>
                </div>
                <a 
                  href="https://wa.me/523221177974" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 hover:scale-105 transition-transform"
                >
                  <img 
                    src="/WhatsApp_icon.png" 
                    alt="WhatsApp" 
                    className="w-14 h-14 object-contain"
                  />
                </a>
              </div>
            </div>

            {/* The Amenities */}
            <section className="space-y-4 md:space-y-6 pt-4 border-t border-sand-accent/10 reveal-on-scroll">
              <h3 className="font-serif italic text-2xl md:text-3xl text-base-dark">The Amenities</h3>
              
              {villa.amenityCategories ? (
                <div className="space-y-8">
                  {/* Regular Categories Grid (3 Columns) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 md:divide-x divide-sand-accent/30">
                    {villa.amenityCategories
                      .filter((cat) => cat.title !== "Essential Features")
                      .map((cat, idx) => (
                        <div key={idx} className="md:px-4 first:md:pl-0 last:md:pr-0 space-y-4">
                          <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-sand-accent">{cat.title}</h4>
                          <ul className="space-y-3">
                            {cat.items.map((item, i) => (
                              <li key={i} className="font-sans font-light text-sm text-base-dark/80 flex items-start space-x-2">
                                <span className="text-sand-accent mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>

                  {/* Essential Features Category (Rendered side-by-side below the grid) */}
                  {villa.amenityCategories.find((cat) => cat.title === "Essential Features") && (
                    <div className="pt-6 border-t border-sand-accent/10 space-y-4">
                      <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-sand-accent">
                        {villa.amenityCategories.find((cat) => cat.title === "Essential Features")?.title}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {villa.amenityCategories
                          .find((cat) => cat.title === "Essential Features")
                          ?.items.map((item, i) => (
                            <div 
                              key={i} 
                              className="bg-base-light border border-sand-accent/10 rounded-2xl p-5 flex items-start space-x-3"
                            >
                              <span className="text-sand-accent text-sm mt-0.5">✦</span>
                              <span className="font-sans font-light text-sm text-base-dark/85 leading-relaxed">
                                {item}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {villa.highlights.map((highlight, hidx) => (
                    <div 
                      key={hidx} 
                      className="border border-sand-accent/10 p-5 rounded-xl bg-base-light flex items-start space-x-3"
                    >
                      <span className="text-sand-accent text-sm mt-0.5">✦</span>
                      <span className="font-sans font-light text-sm text-base-dark/85 leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Location & Getting Around */}
            <section className="space-y-4 md:space-y-6 pt-4 border-t border-sand-accent/10 reveal-on-scroll">
              <h3 className="font-serif italic text-2xl md:text-3xl text-base-dark">Location & Getting Around</h3>
              
              <div className="space-y-4">
                <p className="font-sans font-light text-sm text-base-dark/80 leading-relaxed">
                  Located in the heart of San Pancho, our villas offer the perfect balance of peaceful privacy and convenient access. 
                  We are just a short stroll away from the beautiful beach, as well as the town's best restaurants, boutique shops, and vibrant local markets. Everything you need is easily walkable.
                </p>
                
                {villa.mapAddress ? (
                  <div className="space-y-4">
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-sand-accent/20 shadow-sm relative bg-sand-accent/5">
                      <iframe 
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(villa.mapQuery || villa.mapAddress)}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    </div>
                    <CopyAddressButton address={villa.mapAddress} />
                  </div>
                ) : (
                  <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl border border-sand-accent/20 bg-sand-accent/5 flex items-center justify-center text-base-dark/50 font-sans text-sm">
                    Map unavailable
                  </div>
                )}
              </div>
            </section>

            {/* House Rules & Commitments */}
            {villa.houseRules && (
              <section className="space-y-4 md:space-y-6 pt-4 border-t border-sand-accent/10 reveal-on-scroll">
                <div className="space-y-1 md:space-y-2">
                  <h3 className="font-serif italic text-2xl md:text-3xl text-base-dark">House Rules & Commitments</h3>
                  <p className="font-sans font-light text-sm text-base-dark/70">
                    To preserve the absolute peace, safety, and tranquility of our shared grounds, we kindly ask our guests to honor these estate guidelines:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {villa.houseRules.map((rule, idx) => {
                    const isCancellation = rule.title.toLowerCase().includes("cancellation");
                    return (
                      <div 
                        key={idx} 
                        className={`bg-base-light border border-sand-accent/10 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-2 md:space-y-3 ${
                          isCancellation ? 'md:col-span-2' : ''
                        }`}
                      >
                        <h4 className="font-sans font-bold text-sm text-base-dark">{rule.title}</h4>
                        <p className="font-sans font-light text-sm text-base-dark/80 leading-relaxed text-justify">{rule.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Booking Widget (1/3 width) */}
          <div id="booking-section-desktop" className="hidden lg:block lg:col-span-1 relative reveal-on-scroll reveal-right">
            <div className="sticky top-32 space-y-6">
              
              {/* Interactive Booking Widget */}
              <BookingWidget villaId={villa.id} baseRate={villa.id === 'villa-iguana' ? 450 : 180} />
              
              {/* Ask the Host Anything Box */}
              <div className="border border-sand-accent/20 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-between gap-5">
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-sm text-base-dark">Ask the host anything</h4>
                  <p className="font-sans text-[13px] text-base-dark/65 leading-relaxed">
                    Do you have a question about this home or the local area?{' '}
                    <a 
                      href="https://wa.me/523221177974" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-ocean-teal hover:underline font-semibold block mt-1 text-[13.5px]"
                    >
                      Message the host: +52 322 117 7974
                    </a>
                  </p>
                </div>
                <a 
                  href="https://wa.me/523221177974" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 hover:scale-105 transition-transform"
                >
                  <img 
                    src="/WhatsApp_icon.png" 
                    alt="WhatsApp" 
                    className="w-14 h-14 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
          
        </div>

        {/* Customer Reviews Carousel (Full Width) */}
        {villa.reviews && (
          <div className="reveal-on-scroll">
            <VillaReviews reviews={villa.reviews} />
          </div>
        )}

      </div>
    </div>
  );
}
