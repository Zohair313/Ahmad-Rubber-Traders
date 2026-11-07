import React, { useState } from 'react';
import { Phone, MapPin, Layers, Scale, Clock, ShieldCheck, ShoppingCart } from 'lucide-react';
import { DEPOT_INFO } from '../data/rubberData';

export default function Header({ onOpenQuote, quoteItemsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-neutral-300 bg-white sticky top-0 z-40">
      {/* Top Industrial Dispatch Bar */}
      <div className="bg-vulcanized text-caliper text-xs border-b border-steel px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-mono text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-sulfur" />
              <span>Lahore Depot: Wachowali Bazaar, Shah Alam</span>
            </span>
            <span className="hidden md:inline-block text-zinc-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-sulfur" />
              <span>Goods Carrier Dispatch: Mon – Sat 09:30 – 19:30 PKT</span>
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <a 
              href={`tel:${DEPOT_INFO.mobileWhatsapp.replace(/\s+/g, '')}`} 
              className="text-caliper hover:text-sulfur transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-sulfur" />
              <span>Trade Desk: {DEPOT_INFO.mobileWhatsapp}</span>
            </a>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Stock Ready</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-vulcanized text-white flex items-center justify-center font-display font-black text-xl tracking-tighter border-2 border-sulfur">
            ART
          </div>
          <div>
            <div className="font-display font-black text-xl tracking-tight text-vulcanized uppercase flex items-center gap-2">
              <span>Ahmad Rubber Traders</span>
            </div>
            <p className="text-xs text-neutral-600 font-mono tracking-tight">
              EST. LAHORE • WHOLESALE ELASTOMERS & DAIRY MATS
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-neutral-800">
          <a href="#specimen-inspector" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-neutral-500" />
            <span>Tactile Specimen</span>
          </a>
          <a href="#catalog" className="hover:text-sulfur transition-colors">
            Product Inventory
          </a>
          <a href="#matrix" className="hover:text-sulfur transition-colors">
            Elastomer Matrix
          </a>
          <a href="#calculator" className="hover:text-sulfur transition-colors flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-neutral-500" />
            <span>Roll Weight Calc</span>
          </a>
          <a href="#depot" className="hover:text-sulfur transition-colors">
            Depot & Logistics
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuote}
            className="bg-vulcanized hover:bg-carbon text-white font-medium text-xs sm:text-sm px-4 py-2.5 border border-steel flex items-center gap-2 shadow-sm transition-all hover:border-sulfur"
          >
            <ShoppingCart className="w-4 h-4 text-sulfur" />
            <span>Trade Inquiry Requisition</span>
            {quoteItemsCount > 0 && (
              <span className="bg-sulfur text-vulcanized font-mono font-bold text-xs px-1.5 py-0.2 rounded-none">
                {quoteItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

