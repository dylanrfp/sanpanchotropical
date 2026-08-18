import React from 'react';

const mockProperties = [
  {
    id: 1,
    title: "VILLA PAROTA",
    location: "San Francisco (San Pancho), Nayarit",
    description: "An architectural landmark constructed with raw concrete, native parota woods, and massive floor-to-ceiling glass systems that integrate the tropical surroundings.",
    price: "$450 USD / night",
    specs: ["3 Bedrooms", "3.5 Baths", "Private Pool", "High-Speed Wi-Fi"],
    tag: "ARCHITECTURAL FEATURE"
  },
  {
    id: 2,
    title: "CASA DE LAS PALMAS",
    location: "Bahía de Banderas, Nayarit",
    description: "A luxury coastal sanctuary focusing on environmental sustainability. Featuring natural cross-ventilation systems, an infinity pool, and native landscape paths.",
    price: "$380 USD / night",
    specs: ["2 Bedrooms", "2 Baths", "Pool", "Chef Services"],
    tag: "ECO SANCTUARY"
  },
  {
    id: 3,
    title: "MAR Y SELVA LOFT",
    location: "San Francisco (San Pancho), Nayarit",
    description: "A minimalist loft structured for remote creators and design-conscious travelers. Features custom concrete textures, parota furniture, and a private canopy terrace.",
    price: "$220 USD / night",
    specs: ["1 Bedroom", "1.5 Baths", "Working Studio", "Fiber Optic"],
    tag: "MINIMAL DESIGN"
  }
];

export default function PropertiesPage() {
  return (
    <div className="bg-base-light text-base-dark min-h-screen pt-36 pb-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="border-b border-sand-accent/30 pb-16 mb-20 max-w-4xl">
          <span className="text-xs font-sans tracking-widest uppercase text-ocean-teal font-semibold block mb-4">PORTFOLIO</span>
          <h1 className="text-5xl md:text-7xl font-sans font-black italic tracking-tighter uppercase text-accent-blue mb-8 leading-none">
            The Stays Collection
          </h1>
          <p className="font-sans font-light text-lg text-base-dark/85 leading-relaxed max-w-2xl text-justify">
            A curated directory of elite architectural sanctuaries on the Riviera Nayarit. Built for visual tranquility, environmental integration, and total escape.
          </p>
        </div>

        {/* Portfolio Grid - Heavy Whitespace, Clean Margins */}
        <div className="space-y-32">
          {mockProperties.map((property, idx) => (
            <div 
              key={property.id} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Graphic/Photo Placeholder with Sand Accent Border */}
              <div className="w-full lg:w-1/2 bg-base-light border border-sand-accent/20 p-4 rounded-3xl shadow-[0_8px_30px_rgba(48,41,47,0.03)] hover:shadow-2xl transition-all duration-500">
                <div className="h-80 md:h-[400px] bg-base-dark/5 rounded-2xl flex flex-col justify-between p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-base-dark/[0.02] mix-blend-overlay"></div>
                  
                  {/* Top tag */}
                  <span className="text-[9px] font-sans font-bold tracking-widest text-base-light bg-ocean-teal px-3 py-1.5 rounded-full self-start shadow-sm">
                    {property.tag}
                  </span>

                  {/* Mid Title Overlay */}
                  <div className="text-center font-serif text-3xl tracking-widest text-base-dark/40 group-hover:scale-105 transition-transform duration-500 select-none">
                    {property.title}
                  </div>

                  {/* Bottom Rate */}
                  <div className="font-sans text-xs tracking-widest font-semibold text-base-dark/70 self-end">
                    {property.price}
                  </div>
                </div>
              </div>

              {/* Text Information */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="text-[10px] font-sans font-bold tracking-widest text-ocean-teal uppercase mb-2">
                  {property.location}
                </span>
                <h2 className="text-3xl md:text-4xl font-sans font-black italic tracking-tighter uppercase text-accent-blue mb-6">
                  {property.title}
                </h2>
                <p className="font-sans font-light text-base text-base-dark/80 leading-relaxed mb-8 text-justify">
                  {property.description}
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-sand-accent/20 py-6 mb-8">
                  {property.specs.map((spec, sidx) => (
                    <div key={sidx} className="flex items-center space-x-2 text-xs font-sans text-base-dark/75">
                      <span className="text-primary-green">✦</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <button className="bg-base-dark hover:bg-ocean-teal text-base-light font-sans font-semibold tracking-widest text-xs py-4 px-8 rounded-full transition-all duration-300 self-start shadow-md">
                  VIEW ARCHITECTURAL DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
