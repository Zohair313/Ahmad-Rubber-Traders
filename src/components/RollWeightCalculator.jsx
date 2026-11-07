import React, { useState } from 'react';
import { Scale, Info, Check, ArrowRight, RefreshCw, FileText } from 'lucide-react';
import { COMPOUNDS } from '../data/rubberData';

const COMMON_THICKNESSES = [1.5, 3.0, 5.0, 6.0, 10.0, 12.0, 18.0, 24.0];
const COMMON_WIDTHS = [1.0, 1.2, 1.4, 1.5, 2.0];
const COMMON_LENGTHS = [5.0, 10.0, 15.0, 20.0];

export default function RollWeightCalculator({ onAddCalculatedItem }) {
  const [selectedCompoundId, setSelectedCompoundId] = useState('nbr');
  const [customDensity, setCustomDensity] = useState('');
  const [thickness, setThickness] = useState(3.0);
  const [width, setWidth] = useState(1.2);
  const [length, setLength] = useState(10.0);
  const [quantity, setQuantity] = useState(1);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const activeCompound = COMPOUNDS.find((c) => c.id === selectedCompoundId) || COMPOUNDS[0];
  const density = customDensity !== '' ? parseFloat(customDensity) || 1.35 : activeCompound.specificGravity;

  // Rubber roll weight formula:
  // Weight (kg) = Length (m) * Width (m) * Thickness (mm) * Density (g/cm³)
  const areaPerRoll = length * width; // m²
  const weightPerRoll = areaPerRoll * thickness * density; // kg
  const totalWeight = weightPerRoll * quantity; // kg
  const totalArea = areaPerRoll * quantity;

  // Safe manual handling threshold in logistics is typically 25kg per person
  const getHandlingCategory = (kg) => {
    if (kg <= 25) return { text: 'Manual 1-person carry compliant', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (kg <= 60) return { text: '2-person team lift required', color: 'text-amber-800 bg-amber-50 border-amber-200' };
    return { text: 'Heavy roll: Mechanical forklift / crane hoist mandatory', color: 'text-rose-800 bg-rose-50 border-rose-200' };
  };

  const handling = getHandlingCategory(weightPerRoll);

  const handleTransferToRFQ = () => {
    const item = {
      title: `${activeCompound.name} Sheet Roll (${thickness}mm)`,
      compound: activeCompound.name,
      dimensions: `${length}m Length x ${width}m Width x ${thickness}mm Thick`,
      quantity: quantity,
      calculatedWeight: totalWeight.toFixed(1),
      unitWeight: weightPerRoll.toFixed(1),
      density: density,
      categoryName: 'Calculated Custom Roll'
    };
    onAddCalculatedItem(item);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <section className="bg-white border-b border-neutral-300 py-16" id="calculator">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="border-b border-neutral-300 pb-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                Engineering & Logistics Tool
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-vulcanized tracking-tight">
                Industrial Roll Weight & Freight Estimator
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md font-sans">
              Precision volumetric calculator based on standard specific gravity tolerances (ASTM D297). Determines single roll weight and total consignment mass for goods transport dispatch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Compound Selection */}
            <div>
              <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                1. Select Elastomer Compound
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COMPOUNDS.map((c) => {
                  const isSelected = selectedCompoundId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedCompoundId(c.id);
                        setCustomDensity('');
                      }}
                      className={`text-left p-2.5 border transition-all text-xs ${
                        isSelected
                          ? 'border-vulcanized bg-neutral-900 text-white font-medium'
                          : 'border-neutral-300 bg-latex text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <div className="font-mono text-[11px] text-zinc-400">{c.code}</div>
                      <div className="font-bold truncate mt-0.5">{c.name}</div>
                      <div className="font-mono text-[10px] text-zinc-400 mt-1">
                        ρ = {c.specificGravity} g/cm³
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Specific Gravity Override */}
            <div className="bg-latex p-3 border border-neutral-300 flex items-center justify-between text-xs">
              <span className="text-neutral-700">
                Active Density: <span className="font-mono font-bold text-vulcanized">{density.toFixed(2)} g/cm³</span> ({activeCompound.polymer})
              </span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-mono text-[11px]">Override ρ:</span>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="3.0"
                  placeholder={activeCompound.specificGravity.toString()}
                  value={customDensity}
                  onChange={(e) => setCustomDensity(e.target.value)}
                  className="w-20 px-2 py-1 text-xs font-mono bg-white border border-neutral-300 focus:outline-none focus:border-vulcanized"
                />
              </div>
            </div>

            {/* 2. Thickness (mm) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
                  2. Thickness Gauge (mm)
                </label>
                <span className="font-mono text-xs font-bold text-vulcanized bg-caliper px-2 py-0.5 border border-neutral-300">
                  {thickness} mm
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMON_THICKNESSES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setThickness(t)}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                      thickness === t
                        ? 'border-vulcanized bg-vulcanized text-white font-bold'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {t} mm
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1.0"
                max="30.0"
                step="0.5"
                value={thickness}
                onChange={(e) => setThickness(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-300 rounded-none appearance-none cursor-pointer accent-vulcanized"
              />
            </div>

            {/* 3. Width & Length Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Width */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
                    Roll Width (Meters)
                  </label>
                  <span className="font-mono text-xs font-bold text-vulcanized">
                    {width} m ({(width * 3.28084).toFixed(1)} ft)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COMMON_WIDTHS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWidth(w)}
                      className={`px-2.5 py-1 text-xs font-mono border ${
                        width === w
                          ? 'border-vulcanized bg-vulcanized text-white'
                          : 'border-neutral-300 bg-white text-neutral-700'
                      }`}
                    >
                      {w}m
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="3.0"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 1.0)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-neutral-300 focus:outline-none focus:border-vulcanized"
                />
              </div>

              {/* Length */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
                    Continuous Length (Meters)
                  </label>
                  <span className="font-mono text-xs font-bold text-vulcanized">
                    {length} m ({(length * 3.28084).toFixed(1)} ft)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COMMON_LENGTHS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLength(l)}
                      className={`px-2.5 py-1 text-xs font-mono border ${
                        length === l
                          ? 'border-vulcanized bg-vulcanized text-white'
                          : 'border-neutral-300 bg-white text-neutral-700'
                      }`}
                    >
                      {l}m
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 1.0)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-neutral-300 focus:outline-none focus:border-vulcanized"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Consignment Quantity (Rolls / Sheets)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-32 px-3 py-2 text-sm font-mono bg-white border border-neutral-300 font-bold focus:outline-none focus:border-vulcanized"
                />
                <span className="text-xs text-neutral-500 font-sans">
                  Total surface coverage: <strong className="font-mono text-neutral-800">{totalArea.toFixed(1)} m²</strong> ({(totalArea * 10.7639).toFixed(1)} sq. ft.)
                </span>
              </div>
            </div>

          </div>

          {/* Results Column: The Technical Tonnage Readout */}
          <div className="lg:col-span-5">
            <div className="bg-vulcanized text-white p-6 border-2 border-neutral-800">
              
              <div className="flex items-center justify-between pb-3 border-b border-steel mb-5">
                <span className="text-xs font-mono text-sulfur tracking-wider">
                  Volumetric Specification Output
                </span>
                <Scale className="w-4 h-4 text-sulfur" />
              </div>

              {/* Primary Output: Net Weight */}
              <div className="mb-6 bg-carbon p-4 border border-steel">
                <div className="text-xs font-mono text-zinc-400">Total Consignment Net Weight</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                    {totalWeight.toFixed(1)}
                  </span>
                  <span className="font-mono text-lg text-sulfur font-bold">KG</span>
                </div>
                {totalWeight >= 1000 && (
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    Equivalent to {(totalWeight / 1000).toFixed(2)} Metric Tons
                  </div>
                )}
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-5">
                <div className="bg-neutral-900 p-2.5 border border-steel">
                  <div className="text-zinc-500">Weight Per Roll</div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    {weightPerRoll.toFixed(1)} kg
                  </div>
                </div>

                <div className="bg-neutral-900 p-2.5 border border-steel">
                  <div className="text-zinc-500">Area Per Roll</div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    {areaPerRoll.toFixed(1)} m²
                  </div>
                </div>

                <div className="bg-neutral-900 p-2.5 border border-steel">
                  <div className="text-zinc-500">Total Volume</div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    {((totalArea * (thickness / 1000))).toFixed(3)} m³
                  </div>
                </div>

                <div className="bg-neutral-900 p-2.5 border border-steel">
                  <div className="text-zinc-500">Roll Count</div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    {quantity} {quantity === 1 ? 'Roll' : 'Rolls'}
                  </div>
                </div>
              </div>

              {/* Handling Advisory */}
              <div className={`p-3 border text-xs font-mono mb-6 ${handling.color}`}>
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Depot Handling Advisory:</span>
                </div>
                <div className="mt-1 pl-5 text-[11px] font-sans">
                  {handling.text} for {weightPerRoll.toFixed(1)} kg/roll.
                </div>
              </div>

              {/* Transfer Button */}
              <button
                onClick={handleTransferToRFQ}
                className="w-full bg-sulfur hover:bg-sulfur-light text-vulcanized font-bold text-sm py-3 px-4 border border-sulfur-dark flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Transfer this spec to trade quote</span>
              </button>

              {copiedNotification && (
                <div className="mt-2 text-xs text-emerald-400 font-mono text-center flex items-center justify-center gap-1 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Transferred to Trade Requisition Drawer!</span>
                </div>
              )}

              <div className="text-[11px] text-zinc-400 mt-4 leading-normal font-sans">
                Notice: Specific gravity values are standard production averages conforming to ASTM D297. Tolerances of ±5% may apply depending on filler loading and vulcanization pressure.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

