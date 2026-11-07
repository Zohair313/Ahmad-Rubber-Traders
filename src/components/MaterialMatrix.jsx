import React, { useState } from 'react';
import { COMPOUNDS } from '../data/rubberData';
import { Check, Flame, Droplet, Sun, Zap, ArrowRight, Shield } from 'lucide-react';

export default function MaterialMatrix() {
  const [filter, setFilter] = useState('all');

  const filteredCompounds = COMPOUNDS.filter((c) => {
    if (filter === 'oil') return c.oilResistance === 'Superior' || c.oilResistance === 'Good';
    if (filter === 'temp') return parseInt(c.tempRange.split('to +')[1]) >= 110;
    if (filter === 'weather') return c.weatherResistance === 'Outstanding' || c.weatherResistance === 'Supreme' || c.weatherResistance === 'Excellent';
    if (filter === 'abrasion') return c.abrasionResistance === 'Outstanding' || c.abrasionResistance === 'High';
    return true;
  });

  return (
    <section className="bg-latex border-b border-neutral-300 py-16" id="matrix">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="border-b border-neutral-300 pb-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                Material Science & Chemical Grading
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-vulcanized tracking-tight">
                Elastomer Compound Selection Matrix
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md font-sans">
              Compare chemical compatibility, tensile resilience, and operating temperature profiles across Ahmad Rubber Traders’ core polymer stocks.
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-neutral-500 mr-2">Filter by chemical profile:</span>
          
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all ${
              filter === 'all'
                ? 'bg-vulcanized text-white border-vulcanized'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            All Compounds ({COMPOUNDS.length})
          </button>

          <button
            onClick={() => setFilter('oil')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all flex items-center gap-1.5 ${
              filter === 'oil'
                ? 'bg-vulcanized text-white border-vulcanized'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <Droplet className="w-3.5 h-3.5 text-amber-500" />
            <span>Petroleum & Oil Resistant</span>
          </button>

          <button
            onClick={() => setFilter('temp')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all flex items-center gap-1.5 ${
              filter === 'temp'
                ? 'bg-vulcanized text-white border-vulcanized'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>High Temperature (&gt;110°C)</span>
          </button>

          <button
            onClick={() => setFilter('weather')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all flex items-center gap-1.5 ${
              filter === 'weather'
                ? 'bg-vulcanized text-white border-vulcanized'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-orange-500" />
            <span>Ozone & UV Resistant</span>
          </button>

          <button
            onClick={() => setFilter('abrasion')}
            className={`px-3 py-1.5 text-xs font-mono border transition-all flex items-center gap-1.5 ${
              filter === 'abrasion'
                ? 'bg-vulcanized text-white border-vulcanized'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Heavy Abrasion & Chute Wear</span>
          </button>
        </div>

        {/* Tabular Technical Matrix */}
        <div className="overflow-x-auto border border-neutral-300 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-vulcanized text-caliper font-mono text-[11px] uppercase tracking-wider border-b border-steel">
                <th className="py-3 px-4 font-bold">Compound & Code</th>
                <th className="py-3 px-4">Polymer Base</th>
                <th className="py-3 px-3">Hardness (Shore A)</th>
                <th className="py-3 px-3">Tensile (MPa)</th>
                <th className="py-3 px-3">Thermal Range</th>
                <th className="py-3 px-3">Specific Gravity</th>
                <th className="py-3 px-4">Chemical Strengths</th>
                <th className="py-3 px-4">Primary Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredCompounds.map((item) => (
                <tr key={item.id} className="hover:bg-latex/80 transition-colors">
                  
                  {/* Compound Name & Code */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-neutral-900 text-sulfur px-2 py-0.5 border border-neutral-700 text-xs">
                        {item.code}
                      </span>
                      <div>
                        <div className="font-bold text-vulcanized text-sm">{item.name}</div>
                        <div className="text-[11px] text-neutral-500 font-mono">{item.badge}</div>
                      </div>
                    </div>
                  </td>

                  {/* Polymer Base */}
                  <td className="py-3.5 px-4 font-mono text-neutral-700">
                    {item.polymer}
                  </td>

                  {/* Hardness */}
                  <td className="py-3.5 px-3 font-mono font-bold text-neutral-900 whitespace-nowrap">
                    {item.hardnessRange}
                  </td>

                  {/* Tensile */}
                  <td className="py-3.5 px-3 font-mono font-bold text-neutral-900 whitespace-nowrap">
                    {item.tensileStrength}
                  </td>

                  {/* Temperature */}
                  <td className="py-3.5 px-3 font-mono text-neutral-800 whitespace-nowrap">
                    {item.tempRange}
                  </td>

                  {/* Density */}
                  <td className="py-3.5 px-3 font-mono font-semibold text-neutral-900">
                    {item.specificGravity} g/cm³
                  </td>

                  {/* Chemical Ratings */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500">Petroleum Oil:</span>
                        <span className={`font-semibold ${
                          item.oilResistance === 'Superior' ? 'text-emerald-700' :
                          item.oilResistance === 'Good' ? 'text-blue-700' : 'text-neutral-400'
                        }`}>
                          {item.oilResistance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500">Acid/Alkali:</span>
                        <span className={`font-semibold ${
                          item.acidResistance === 'Superior' ? 'text-emerald-700' :
                          item.acidResistance === 'Good' ? 'text-blue-700' : 'text-neutral-400'
                        }`}>
                          {item.acidResistance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500">Ozone/UV:</span>
                        <span className={`font-semibold ${
                          item.weatherResistance === 'Supreme' || item.weatherResistance === 'Outstanding' ? 'text-emerald-700' :
                          item.weatherResistance === 'Excellent' ? 'text-blue-700' : 'text-neutral-400'
                        }`}>
                          {item.weatherResistance}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Primary Application */}
                  <td className="py-3.5 px-4 text-neutral-700 text-xs leading-relaxed max-w-xs">
                    {item.primaryUses}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 font-mono gap-2">
          <span>Standards Compliance: ASTM D2000 (SAE J200) Classification System for Rubber Materials.</span>
          <span>Compound certifications available upon trade delivery.</span>
        </div>

      </div>
    </section>
  );
}

