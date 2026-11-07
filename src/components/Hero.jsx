import React, { useState } from 'react';
import { ShieldCheck, Ruler, Truck, ArrowDown, ChevronRight, Activity } from 'lucide-react';

const SPECIMENS = [
  {
    id: 'diamond',
    name: 'Diamond Tread',
    class: 'texture-diamond',
    material: 'Natural Rubber / SBR Blend',
    durometer: 65,
    tensile: '8.5 MPa',
    density: '1.42 g/cm³',
    temp: '-25°C to +75°C',
    patternDesc: 'Raised anti-slip diamond lugs for maximum mechanical traction in wet or muddy livestock environments.',
    bestFor: 'Dairy Barn Pathways, Livestock Trailers, Walkways'
  },
  {
    id: 'coin',
    name: 'Studded Coin',
    class: 'texture-coin',
    material: 'High-Wear Synthetic SBR',
    durometer: 68,
    tensile: '7.0 MPa',
    density: '1.48 g/cm³',
    temp: '-20°C to +70°C',
    patternDesc: '25mm circular coin studs engineered to withstand concentrated pedestrian and rolling cart traffic without edge curling.',
    bestFor: 'Gyms, Commercial Entrances, Industrial Corridors'
  },
  {
    id: 'ribbed',
    name: 'Industrial Fine Rib',
    class: 'texture-ribbed',
    material: 'Dielectric Insulation Elastomer',
    durometer: 60,
    tensile: '15.0 MPa',
    density: '1.30 g/cm³',
    temp: '-30°C to +90°C',
    patternDesc: 'Parallel longitudinal fluting that catches moisture and grit while providing certified electrical arc isolation.',
    bestFor: '33kV Electrical Switchboard Safety, Machine Runways'
  },
  {
    id: 'groove',
    name: 'Drainage Channel',
    class: 'texture-groove',
    material: 'Heavy Crumb & Virgin Rubber',
    durometer: 70,
    tensile: '8.0 MPa',
    density: '1.45 g/cm³',
    temp: '-15°C to +75°C',
    patternDesc: 'Deep underside gutter channels facilitating rapid waste fluid discharge and thermal insulation from concrete dampness.',
    bestFor: 'Cattle Sheds, Stud Stables, Milking Parlours'
  },
  {
    id: 'smooth',
    name: 'Calendered Smooth',
    class: 'texture-smooth',
    material: '100% Virgin Nitrile (NBR)',
    durometer: 70,
    tensile: '10.5 MPa',
    density: '1.35 g/cm³',
    temp: '-25°C to +105°C',
    patternDesc: 'Ultra-uniform calendered surface with tight thickness tolerance for precision die-cut fluid sealing gaskets.',
    bestFor: 'Petrochemical Gaskets, Fuel Flanges, Hydraulic Seals'
  }
];

export const Hero = ({ onSelectSpecimenForCalc }) => {
  const [activeSpecimen, setActiveSpecimen] = useState(SPECIMENS[0]);

  return (
    <section className="bg-latex border-b border-neutral-300 relative overflow-hidden" id="specimen-inspector">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Industrial Brief */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 border border-neutral-400 bg-white px-3 py-1 text-xs font-mono text-neutral-800 w-fit mb-6">
              <span className="w-2 h-2 bg-sulfur inline-block"></span>
              <span>Raw Material Stockist • Lahore Depot</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-vulcanized leading-[1.08] mb-5 tracking-tight">
              Heavy-gauge vulcanized rubber, continuous rolls and livestock mats.
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl mb-8">
              Direct wholesale supply from Lahore’s primary rubber trade hub. Mill-certified elastomer compounds, heavy livestock comfort mats, and precision gasketting sheets cut to exact mill dimensional tolerances.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a 
                href="#calculator"
                className="bg-vulcanized hover:bg-carbon text-white font-medium text-sm px-6 py-3.5 border border-steel transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Calculate roll weight and freight</span>
              </a>
              <a 
                href="#catalog"
                className="bg-white hover:bg-neutral-100 text-vulcanized font-medium text-sm px-6 py-3.5 border border-neutral-400 transition-colors"
              >
                <span>Explore product inventory</span>
              </a>
            </div>

            {/* Factual Trade Metrics Grid */}
            <div className="grid grid-cols-3 border-t border-b border-neutral-300 py-4 bg-white/60">
              <div className="pr-4 border-r border-neutral-300">
                <div className="font-mono text-2xl font-bold text-vulcanized">500+</div>
                <div className="text-xs text-neutral-600 font-sans mt-0.5">Mats in depot ready for dispatch</div>
              </div>
              <div className="px-4 border-r border-neutral-300">
                <div className="font-mono text-2xl font-bold text-vulcanized">1.5 – 50mm</div>
                <div className="text-xs text-neutral-600 font-sans mt-0.5">Thickness range in stock</div>
              </div>
              <div className="pl-4">
                <div className="font-mono text-2xl font-bold text-vulcanized">33 kV</div>
                <div className="text-xs text-neutral-600 font-sans mt-0.5">Max certified proof voltage</div>
              </div>
            </div>

          </div>

          {/* Right Column: Memorable Interactive Specimen Inspector */}
          <div className="lg:col-span-6">
            <div className="bg-vulcanized text-white border-2 border-neutral-800 p-5 sm:p-7 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-steel mb-5">
                <div>
                  <span className="text-xs font-mono text-sulfur uppercase tracking-wider block">
                    Interactive Material Gauge
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Tactile surface specimen and compound inspector
                  </h2>
                </div>
                <span className="font-mono text-xs bg-steel px-2 py-1 text-zinc-300 border border-neutral-700">
                  REF: {activeSpecimen.id.toUpperCase()}
                </span>
              </div>

              {/* Texture Selection Tabs */}
              <div className="grid grid-cols-5 gap-1.5 mb-5">
                {SPECIMENS.map((spec) => {
                  const isSelected = activeSpecimen.id === spec.id;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => setActiveSpecimen(spec)}
                      className={`text-left p-2 border transition-all text-xs flex flex-col justify-between ${
                        isSelected 
                          ? 'border-sulfur bg-neutral-900 text-white shadow-inner' 
                          : 'border-steel bg-carbon/60 text-zinc-400 hover:text-zinc-200 hover:border-neutral-600'
                      }`}
                    >
                      <div className={`w-full h-8 mb-2 border border-neutral-700 ${spec.class}`}></div>
                      <span className="font-mono font-medium truncate block leading-tight">
                        {spec.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Physical Swatch Box */}
              <div className="border border-steel bg-black relative mb-5 p-4 sm:p-6 overflow-hidden">
                <div className="absolute top-2 right-2 z-10 bg-vulcanized/90 px-2 py-1 border border-neutral-700 text-zinc-300 font-mono text-xs">
                  Physical Simulation: 1:1 Scale
                </div>

                <div className="h-44 w-full flex items-center justify-center relative rounded-sm overflow-hidden border border-neutral-800 shadow-2xl">
                  {/* Texture viewport */}
                  <div className={`absolute inset-0 ${activeSpecimen.class}`}></div>
                  
                  {/* Subtle lighting cast */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none"></div>

                  <div className="relative z-10 bg-vulcanized/95 border border-steel p-3 max-w-xs text-center backdrop-blur-sm">
                    <div className="font-mono text-xs text-sulfur font-semibold">{activeSpecimen.material}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{activeSpecimen.name} Pattern</div>
                    <div className="text-xs text-zinc-300 mt-1 font-mono">ASTM Hardness: {activeSpecimen.durometer}° Shore A</div>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 mt-3 font-sans leading-relaxed">
                  {activeSpecimen.patternDesc}
                </p>
              </div>

              {/* Technical Property Readouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 font-mono text-xs">
                <div className="bg-carbon p-2.5 border border-steel">
                  <div className="text-zinc-400 text-[11px]">Hardness (Shore A)</div>
                  <div className="text-white text-base font-bold mt-1 flex items-baseline gap-1">
                    <span>{activeSpecimen.durometer}°</span>
                    <span className="text-[10px] text-zinc-400">±5</span>
                  </div>
                </div>

                <div className="bg-carbon p-2.5 border border-steel">
                  <div className="text-zinc-400 text-[11px]">Tensile Strength</div>
                  <div className="text-white text-base font-bold mt-1">
                    {activeSpecimen.tensile}
                  </div>
                </div>

                <div className="bg-carbon p-2.5 border border-steel">
                  <div className="text-zinc-400 text-[11px]">Specific Gravity</div>
                  <div className="text-white text-base font-bold mt-1">
                    {activeSpecimen.density}
                  </div>
                </div>

                <div className="bg-carbon p-2.5 border border-steel">
                  <div className="text-zinc-400 text-[11px]">Thermal Limits</div>
                  <div className="text-white text-base font-bold mt-1 truncate">
                    {activeSpecimen.temp}
                  </div>
                </div>
              </div>

              {/* Durometer Shore A Gauge Bar */}
              <div className="bg-carbon p-3 border border-steel mb-5">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-400">Shore A Hardness Spectrum</span>
                  <span className="text-sulfur font-bold">{activeSpecimen.durometer}° Shore A</span>
                </div>
                <div className="h-2 w-full bg-neutral-900 border border-neutral-700 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-sulfur to-rose-600"
                    style={{ width: '100%' }}
                  ></div>
                  {/* Needle indicator */}
                  <div 
                    className="absolute -top-1 w-2.5 h-4 bg-white border border-black shadow"
                    style={{ left: `${(activeSpecimen.durometer / 100) * 100}%`, transform: 'translateX(-50%)' }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-300 mt-1.5">
                  <span>30° (Soft Gasket)</span>
                  <span>60° (Tire Tread)</span>
                  <span>80° (Machinery Pad)</span>
                  <span>100° (Ebonite)</span>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="flex items-center justify-between text-xs pt-2">
                <div className="text-zinc-300 truncate mr-2">
                  <span className="text-zinc-400 font-mono">Recommended: </span>
                  <span className="text-white font-medium">{activeSpecimen.bestFor}</span>
                </div>
                <a
                  href="#calculator"
                  className="text-sulfur hover:text-white font-mono flex items-center gap-1 transition-colors whitespace-nowrap"
                >
                  <span>Load into weight calc</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Hero;

