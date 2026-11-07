import React from 'react';
import { DEPOT_INFO } from '../data/rubberData';
import { MapPin, Truck, Phone, ShieldCheck, Clock, CheckCircle2, Navigation } from 'lucide-react';

export default function DepotLogistics() {
  return (
    <section className="bg-white border-b border-neutral-300 py-16" id="depot">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="border-b border-neutral-300 pb-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                Commercial Presence & Dispatch Operations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-vulcanized tracking-tight">
                Lahore Trade Depot & Nationwide Freight Logistics
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md font-sans">
              Centralized inventory staging in Lahore ensuring continuous roll supplies and bulk container deliveries across all Pakistani manufacturing hubs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Physical Locations */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Retail & Trade Desk */}
            <div className="border border-neutral-300 p-6 bg-latex">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-vulcanized text-white flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  01
                </div>
                <div>
                  <h3 className="text-base font-bold text-vulcanized">
                    Main Trade Desk & Retail Outlet
                  </h3>
                  <p className="text-xs font-mono text-neutral-600 mt-1">
                    {DEPOT_INFO.primaryDepot}
                  </p>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Walk-in commercial counter for physical sample swatches, durometer testing, immediate cut-piece purchases, and wholesale invoice generation.
                  </p>
                </div>
              </div>
            </div>

            {/* Heavy Godown & Transport Hub */}
            <div className="border border-neutral-300 p-6 bg-latex">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-vulcanized text-white flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5">
                  02
                </div>
                <div>
                  <h3 className="text-base font-bold text-vulcanized">
                    Bulk Heavy Godown & Transport Staging
                  </h3>
                  <p className="text-xs font-mono text-neutral-600 mt-1">
                    {DEPOT_INFO.transportHub}
                  </p>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Crane-equipped heavy warehouse storing 50+ metric tons of continuous vulcanized rubber rolls, dairy cow mats, and large industrial sheeting. Direct loading onto intercity goods transport trucks.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Benchmarks */}
            <div className="border border-neutral-300 p-6 bg-white">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                Depot Verification & QA Standards
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Durometer Shore A</strong>
                    <span className="text-neutral-500 font-mono text-[11px]">ASTM D2240 Certified Bench</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Proof Voltage Test</strong>
                    <span className="text-neutral-500 font-mono text-[11px]">33kV Breakdown Chamber</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Thickness Caliper</strong>
                    <span className="text-neutral-500 font-mono text-[11px]">±0.15mm Tolerance Scan</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-neutral-900">Oil Swell Inspection</strong>
                    <span className="text-neutral-500 font-mono text-[11px]">ASTM #3 Oil Test Compliance</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Freight Routes & Transport Schedule */}
          <div className="lg:col-span-6 bg-vulcanized text-white p-6 sm:p-8 border-2 border-neutral-800">
            
            <div className="flex items-center justify-between pb-4 border-b border-steel mb-6">
              <div>
                <span className="text-xs font-mono text-sulfur uppercase tracking-wider">
                  Goods Forwarding Logistics
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                  Intercity Freight Coverage from Lahore
                </h3>
              </div>
              <Truck className="w-6 h-6 text-sulfur" />
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-sans">
              Daily booking via verified Goods Transport Companies (Bilawaja / Al-Makkah / Faisal / New Khan Goods Forwarding) operating from Badami Bagh, Lahore. Direct bilty (bilty tracking number) issued upon dispatch.
            </p>

            {/* Freight Routes List */}
            <div className="space-y-3 mb-8">
              {DEPOT_INFO.freightCoverage.map((route, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-carbon border border-steel text-xs font-mono">
                  <span className="text-zinc-200">{route}</span>
                  <span className="text-sulfur font-semibold">Active Daily</span>
                </div>
              ))}
            </div>

            {/* Dispatch Desk Contact Box */}
            <div className="bg-neutral-900 border border-steel p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-zinc-400 block">Immediate Transport Coordination:</span>
                <a 
                  href={`tel:${DEPOT_INFO.mobileWhatsapp.replace(/\s+/g, '')}`} 
                  className="text-white hover:text-sulfur font-mono font-bold text-sm transition-colors"
                >
                  {DEPOT_INFO.mobileWhatsapp} / {DEPOT_INFO.phonePrimary}
                </a>
              </div>
              <a
                href={`https://wa.me/923004281195?text=Hello%20Ahmad%20Rubber%20Traders,%20I%20would%20like%20to%20inquire%20about%20freight%20and%20stock.`}
                target="_blank"
                rel="noreferrer"
                className="bg-sulfur hover:bg-sulfur-light text-vulcanized font-bold text-xs px-4 py-2.5 transition-colors whitespace-nowrap"
              >
                Direct WhatsApp Dispatch
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

