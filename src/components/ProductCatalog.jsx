import React, { useState } from 'react';
import { PRODUCTS } from '../data/rubberData';
import { Check, Plus, ShieldCheck, Ruler, ArrowRight, Layers } from 'lucide-react';

export default function ProductCatalog({ onAddToQuote }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedThicknesses, setSelectedThicknesses] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleSelectThickness = (productId, thk) => {
    setSelectedThicknesses((prev) => ({
      ...prev,
      [productId]: thk
    }));
  };

  const handleAddProduct = (product) => {
    const selectedThk = selectedThicknesses[product.id] || product.thicknessOptions[0];
    const item = {
      id: product.id,
      title: `${product.title} (${selectedThk})`,
      compound: product.compound,
      dimensions: `${product.standardSize} • ${selectedThk}`,
      quantity: 1,
      categoryName: product.categoryName,
      unitWeight: product.weightPerUnit,
      hardness: product.hardness
    };
    onAddToQuote(item);

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="bg-latex border-b border-neutral-300 py-16" id="catalog">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="border-b border-neutral-300 pb-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                Wholesale Inventory & Stock Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-vulcanized tracking-tight">
                Verified Industrial Products & Livestock Mats
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md font-sans">
              Continuous stock ready for immediate loading from our Lahore trade godown or nationwide cargo dispatch.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', name: 'All Inventory' },
            { id: 'dairy', name: 'Dairy & Livestock Mats' },
            { id: 'industrial', name: 'Industrial & Flooring' },
            { id: 'gasket', name: 'Gaskets & Flanges' },
            { id: 'footwear', name: 'Footwear & EVA' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono border transition-all ${
                activeCategory === cat.id
                  ? 'bg-vulcanized text-white border-vulcanized font-bold'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const activeThk = selectedThicknesses[product.id] || product.thicknessOptions[0];
            const isAdded = addedIds[product.id];

            return (
              <div 
                key={product.id}
                className="bg-white border border-neutral-300 p-6 flex flex-col justify-between hover:border-neutral-500 transition-colors"
              >
                <div>
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4 text-xs font-mono">
                    <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 border border-neutral-300 font-bold">
                      {product.id}
                    </span>
                    <span className="text-neutral-500">{product.categoryName}</span>
                  </div>

                  {/* Surface Texture Swatch Bar */}
                  <div className="h-16 w-full mb-4 border border-neutral-300 relative overflow-hidden flex items-center justify-between px-4">
                    <div className={`absolute inset-0 ${
                      product.pattern === 'diamond' ? 'texture-diamond' :
                      product.pattern === 'coin' ? 'texture-coin' :
                      product.pattern === 'ribbed' ? 'texture-ribbed' :
                      product.pattern === 'groove' ? 'texture-groove' : 'texture-smooth'
                    }`}></div>
                    
                    <div className="relative z-10 bg-vulcanized/90 text-white px-2 py-1 text-[11px] font-mono border border-steel">
                      {product.patternName}
                    </div>
                  </div>

                  {/* Title & Compound */}
                  <h3 className="text-lg font-bold text-vulcanized mb-1 tracking-tight">
                    {product.title}
                  </h3>
                  <div className="text-xs font-mono text-neutral-600 mb-3">
                    Polymer Base: <span className="text-neutral-900 font-semibold">{product.compound}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Thickness Selection Chips */}
                  <div className="mb-4">
                    <label className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                      Available Thicknesses:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.thicknessOptions.map((thk) => (
                        <button
                          key={thk}
                          onClick={() => handleSelectThickness(product.id, thk)}
                          className={`px-2 py-1 text-xs font-mono border transition-all ${
                            activeThk === thk
                              ? 'bg-vulcanized text-white border-vulcanized font-bold'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-neutral-400'
                          }`}
                        >
                          {thk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technical Spec Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-latex p-3 border border-neutral-200 mb-4">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Standard Roll/Size</span>
                      <span className="font-semibold text-neutral-900">{product.standardSize}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Hardness (Shore A)</span>
                      <span className="font-semibold text-neutral-900">{product.hardness}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Tensile Strength</span>
                      <span className="font-semibold text-neutral-900">{product.tensileStrength}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Mass / Density</span>
                      <span className="font-semibold text-neutral-900">{product.weightPerUnit}</span>
                    </div>
                  </div>

                  {/* Key Engineering Features */}
                  <ul className="space-y-1 mb-5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2">
                        <span className="text-sulfur font-bold font-mono">▪</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Bottom CTA */}
                <div className="border-t border-neutral-200 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>{product.stockStatus}</span>
                  </div>

                  <button
                    onClick={() => handleAddProduct(product)}
                    className={`px-4 py-2.5 text-xs font-mono font-bold transition-all border flex items-center justify-center gap-1.5 ${
                      isAdded
                        ? 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-vulcanized hover:bg-carbon text-white border-vulcanized'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to RFQ</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-sulfur" />
                        <span>Add {activeThk} to RFQ</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

