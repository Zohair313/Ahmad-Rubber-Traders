import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MaterialMatrix from './components/MaterialMatrix';
import RollWeightCalculator from './components/RollWeightCalculator';
import ProductCatalog from './components/ProductCatalog';
import DepotLogistics from './components/DepotLogistics';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteItems, setQuoteItems] = useState([
    {
      id: 'ART-CM-24',
      title: 'Diamond-Grip Heavy Dairy Cow Mat (24mm)',
      compound: 'SBR / Natural Rubber Blend',
      dimensions: '4ft x 6ft (1220mm x 1830mm) • 24mm',
      quantity: 10,
      unitWeight: '48 kg/mat',
      calculatedWeight: '480.0',
      categoryName: 'Dairy & Livestock'
    }
  ]);

  const handleAddToQuote = (item) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id && i.dimensions === item.dimensions);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + 1;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleAddCalculatedItem = (item) => {
    setQuoteItems((prev) => [...prev, item]);
    setIsQuoteOpen(true);
  };

  const handleRemoveItem = (index) => {
    setQuoteItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateQuantity = (index, qty) => {
    if (qty < 1) return;
    setQuoteItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = qty;
      return updated;
    });
  };

  const handleClearAll = () => {
    setQuoteItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-latex selection:bg-sulfur selection:text-white">
      <Header 
        onOpenQuote={() => setIsQuoteOpen(true)}
        quoteItemsCount={quoteItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
      />
      
      <main className="flex-1">
        <Hero onSelectSpecimenForCalc={() => {
          const el = document.getElementById('calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
        <ProductCatalog onAddToQuote={handleAddToQuote} />
        <MaterialMatrix />
        <RollWeightCalculator onAddCalculatedItem={handleAddCalculatedItem} />
        <DepotLogistics />
      </main>

      <Footer />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        items={quoteItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearAll={handleClearAll}
      />
    </div>
  );
}

