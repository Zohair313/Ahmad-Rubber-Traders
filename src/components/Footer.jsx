import React from 'react';
import { DEPOT_INFO } from '../data/rubberData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-vulcanized text-caliper border-t-2 border-neutral-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-steel">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-sulfur text-vulcanized flex items-center justify-center font-display font-black text-xl tracking-tighter">
                ART
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white uppercase">
                Ahmad Rubber Traders
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-sans">
              Specialized wholesale stockist and distributor of heavy-gauge vulcanized rubber, agricultural dairy mats, switchboard safety flooring, and synthetic industrial elastomers. Serving Pakistan's industrial, textile, and agricultural sectors from Lahore.
            </p>

            <div className="font-mono text-xs text-zinc-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-sulfur inline-block"></span>
                <span>Tax & Commercial Reg: Lahore Chamber of Commerce</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-sulfur inline-block"></span>
                <span>Depot Testing: ASTM D2240 Durometer Verified</span>
              </div>
            </div>
          </div>

          {/* Depot & Logistics Contact */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm font-display mb-3">
              Lahore Depot Coordinates
            </h4>

            <div className="flex items-start gap-2.5 text-zinc-300">
              <MapPin className="w-4 h-4 text-sulfur flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans text-xs">Trade Counter:</strong>
                <span>{DEPOT_INFO.primaryDepot}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-zinc-300">
              <MapPin className="w-4 h-4 text-sulfur flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans text-xs">Bulk Transport Staging:</strong>
                <span>{DEPOT_INFO.transportHub}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-300 pt-2">
              <Phone className="w-4 h-4 text-sulfur flex-shrink-0" />
              <span>{DEPOT_INFO.mobileWhatsapp} / {DEPOT_INFO.phonePrimary}</span>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-300">
              <Clock className="w-4 h-4 text-sulfur flex-shrink-0" />
              <span>{DEPOT_INFO.workingHours}</span>
            </div>
          </div>

          {/* Quick Technical Links */}
          <div className="lg:col-span-3 space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm font-display mb-3">
              Technical Navigation
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#specimen-inspector" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
                  <span>▪ Tactile Surface Inspector</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
                  <span>▪ Roll Weight & Area Estimator</span>
                </a>
              </li>
              <li>
                <a href="#matrix" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
                  <span>▪ Elastomer Compound Matrix</span>
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
                  <span>▪ Dairy Cow Mats (24mm)</span>
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
                  <span>▪ 33kV Electrical Safety Mats</span>
                </a>
              </li>
              <li>
                <a href="#depot" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
                  <span>▪ Nationwide Bilty Cargo Booking</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Trade Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} Ahmad Rubber Traders. All industrial specifications reserved.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Material Standards: ASTM / IEC</span>
            <span>•</span>
            <span>Lahore, Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

