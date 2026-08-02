import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-base-light text-base-dark min-h-screen pb-28">
      {/* Editorial Story Header Banner */}
      <div className="relative w-full h-[240px] md:h-[425px] overflow-hidden flex items-end justify-start bg-base-dark pb-6 md:pb-12">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/about_banner_spt.png')`, filter: 'brightness(1.2)' }}
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Overlay for premium aesthetic and enhanced text contrast */}
        
        {/* Text Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 text-white">
          <h1 
            className="text-[32px] md:text-[84px] font-outfit font-semibold tracking-tight mb-3 md:mb-6 text-white leading-tight md:leading-none"
            style={{ textShadow: '3px 6px 12px rgba(0, 0, 0, 0.8)' }}
          >
            About SP Tropical
          </h1>
          <p 
            className="font-outfit font-light text-sm md:text-[24px] text-white/95 leading-relaxed max-w-4xl"
            style={{ textShadow: '2px 4px 10px rgba(0, 0, 0, 0.95)' }}
          >
            We're a family who's lived in San Pancho for over 20 years, raising our kids in this beautiful town. As community members, we feel connected to our home and proudly share it with others.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Column */}
          <div className="reveal-on-scroll reveal-left">
            <h2 className="font-outfit font-black text-3xl md:text-6xl lg:text-[68px] text-base-dark tracking-tight leading-[1.1] mb-5 md:mb-8">
              Your Hosts in<br />San Pancho
            </h2>
            <div className="space-y-6">
              <p className="font-sans font-light text-sm md:text-[20px] text-base-dark/80 leading-relaxed text-justify">
                With more than 20 years of experience in the vacation rental industry, we are proud to offer four private villas in the charming town of San Pancho. As locals, we provide personal assistance and share our favorite local recommendations to ensure your stay is perfect. Each villa is thoughtfully designed with modern amenities, creating a warm and welcoming atmosphere that offers more space and independence than traditional hotels. Our convenient location is just a short walk from secluded beaches and top-notch restaurants, allowing you to enjoy an authentic local experience.
              </p>
              <p className="font-sans font-light text-[19px] md:text-[20px] text-base-dark/80 leading-relaxed text-justify">
                Staying in our private villas gives you the unique opportunity to enjoy a vacation with more space, tranquility, and independence, providing a more genuine and intimate alternative to typical hotel stays. Our location allows you to immerse yourself fully in the relaxed local culture. We invite you to review our house rules before booking to ensure they align with your travel needs, as we strive to maintain the peace and harmony of our small neighborhood community.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl reveal-on-scroll reveal-right">
            <img 
              src="/beach_aboutphoto.png" 
              alt="San Pancho Beach" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Logo Overlay */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-24 h-24 md:w-32 md:h-32 z-10 flex items-center justify-center bg-white rounded-2xl md:rounded-3xl shadow-xl p-3">
              <img 
                src="/SPtropical_logo.png" 
                alt="SP Tropical Logo" 
                className="w-full h-full object-contain rounded-xl md:rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white border-y border-base-dark/5 py-20 md:py-28 my-8 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center reveal-on-scroll reveal-scale">
              <span className="font-outfit font-black text-6xl md:text-7xl lg:text-8xl text-base-dark tracking-tight leading-none mb-4">
                25+
              </span>
              <span className="font-outfit font-medium text-base md:text-lg text-base-dark/60 tracking-normal">
                Years of Hospitality
              </span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center reveal-on-scroll reveal-scale">
              <span className="font-outfit font-black text-6xl md:text-7xl lg:text-8xl text-base-dark tracking-tight leading-none mb-4">
                1000+
              </span>
              <span className="font-outfit font-medium text-base md:text-lg text-base-dark/60 tracking-normal">
                5 Star Guest Stays
              </span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center reveal-on-scroll reveal-scale">
              <span className="font-outfit font-black text-6xl md:text-7xl lg:text-8xl text-base-dark tracking-tight leading-none mb-4">
                100%
              </span>
              <span className="font-outfit font-medium text-base md:text-lg text-base-dark/60 tracking-normal">
                Locally Managed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
