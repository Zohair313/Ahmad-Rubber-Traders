import React, { useState } from 'react';
import { X, Trash2, Printer, Send, Check, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { DEPOT_INFO } from '../data/rubberData';

export default function QuoteModal({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onClearAll }) {
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [phone, setPhone] = useState('');
  const [dispatchType, setDispatchType] = useState('cargo');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculate total gross weight from items
  const totalWeightKg = items.reduce((acc, item) => {
    const itemWeight = parseFloat(item.calculatedWeight || item.unitWeight) || 0;
    return acc + (itemWeight * (item.quantity || 1));
  }, 0);

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!buyerName || !phone) {
      alert('Please provide your name and phone number so our Lahore trade desk can process your quotation.');
      return;
    }

    const itemsSummary = items.map((it, idx) => 
      `${idx + 1}. ${it.title} | Qty: ${it.quantity} | Specs: ${it.dimensions || 'Standard'}`
    ).join('\n');

    const message = 
`*AHMAD RUBBER TRADERS - TRADE INQUIRY RFQ*
----------------------------------------
*Buyer:* ${buyerName}
*Enterprise / Mill:* ${companyName || 'Not specified'}
*Destination City:* ${city}
*Contact Phone:* ${phone}
*Dispatch Preference:* ${dispatchType === 'cargo' ? 'Nationwide Goods Cargo Transport' : 'Lahore Depot Pickup'}

*ITEMS REQUESTED:*
${itemsSummary}

*Total Estimated Weight:* ${totalWeightKg > 0 ? `${totalWeightKg.toFixed(1)} KG` : 'Calculated on order'}
${specialInstructions ? `*Notes:* ${specialInstructions}` : ''}
----------------------------------------
Please provide current stock availability, ex-depot rate, and estimated delivery schedule.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923004281195?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border-2 border-vulcanized w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-vulcanized text-white px-6 py-4 flex items-center justify-between border-b border-steel">
          <div>
            <span className="font-mono text-xs text-sulfur uppercase tracking-wider block">
              Official Commercial RFQ
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Trade Inquiry & Batch Quotation Requisition
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Items Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs font-bold text-neutral-700 uppercase tracking-wider">
                1. Requisition Items ({items.length})
              </h3>
              {items.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs font-mono text-rose-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear list</span>
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="border border-dashed border-neutral-300 p-8 text-center bg-latex text-neutral-500 font-mono text-xs">
                No items added to your trade requisition yet. Add products from the catalog or compute custom rolls with the Roll Weight Calculator.
              </div>
            ) : (
              <div className="border border-neutral-300 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-latex font-mono text-neutral-600 border-b border-neutral-300">
                      <th className="py-2.5 px-3">Item Specification</th>
                      <th className="py-2.5 px-3">Polymer / Hardness</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Mass (KG)</th>
                      <th className="py-2.5 px-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50">
                        <td className="py-3 px-3">
                          <div className="font-bold text-vulcanized">{item.title}</div>
                          <div className="text-[11px] font-mono text-neutral-500">{item.dimensions}</div>
                        </td>
                        <td className="py-3 px-3 font-mono text-neutral-700">
                          {item.compound} {item.hardness ? `(${item.hardness})` : ''}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="1"
                            max="500"
                            value={item.quantity || 1}
                            onChange={(e) => onUpdateQuantity(idx, parseInt(e.target.value) || 1)}
                            className="w-14 px-1.5 py-1 text-center font-mono border border-neutral-300 text-xs font-bold"
                          />
                        </td>
                        <td className="py-3 px-3 font-mono text-right font-semibold text-neutral-900">
                          {item.calculatedWeight ? `${(item.calculatedWeight * item.quantity).toFixed(1)} kg` : item.unitWeight || 'TBD'}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-neutral-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {items.length > 0 && totalWeightKg > 0 && (
              <div className="mt-2 text-right font-mono text-xs text-neutral-700">
                Estimated Net Consignment Weight: <strong className="text-vulcanized font-bold">{totalWeightKg.toFixed(1)} KG</strong>
              </div>
            )}
          </div>

          {/* Trade Contact Details Form */}
          <form onSubmit={handleSendWhatsApp} className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-neutral-700 uppercase tracking-wider">
              2. Consignee & Dispatch Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-mono text-neutral-700 mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-vulcanized font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-neutral-700 mb-1">
                  Company / Mill / Dairy Farm Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Al-Rehman Textile Mills"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-vulcanized font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-neutral-700 mb-1">
                  Destination City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-vulcanized font-sans bg-white"
                >
                  <option value="Lahore">Lahore (Depot Pickup or Local Transport)</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Gujranwala">Gujranwala</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Karachi">Karachi Port & Industrial Hub</option>
                  <option value="Rawalpindi / Islamabad">Rawalpindi / Islamabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Other Punjab / Sindh / KPK">Other Region</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-neutral-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-vulcanized font-mono"
                />
              </div>
            </div>

            {/* Dispatch Preference */}
            <div>
              <label className="block font-mono text-neutral-700 text-xs mb-2">
                Logistics & Handover Preference:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className={`flex items-start gap-2.5 p-3 border cursor-pointer ${
                  dispatchType === 'cargo' ? 'border-vulcanized bg-latex' : 'border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="dispatch"
                    value="cargo"
                    checked={dispatchType === 'cargo'}
                    onChange={() => setDispatchType('cargo')}
                    className="mt-0.5 accent-vulcanized"
                  />
                  <div>
                    <strong className="block text-neutral-900">Nationwide Goods Transport Dispatch</strong>
                    <span className="text-neutral-500 text-[11px]">Forwarded from Badami Bagh terminal with carrier bilty</span>
                  </div>
                </label>

                <label className={`flex items-start gap-2.5 p-3 border cursor-pointer ${
                  dispatchType === 'pickup' ? 'border-vulcanized bg-latex' : 'border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="dispatch"
                    value="pickup"
                    checked={dispatchType === 'pickup'}
                    onChange={() => setDispatchType('pickup')}
                    className="mt-0.5 accent-vulcanized"
                  />
                  <div>
                    <strong className="block text-neutral-900">Direct Lahore Depot Pickup</strong>
                    <span className="text-neutral-500 text-[11px]">Collect directly from Wachowali Bazaar shop/godown</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block font-mono text-neutral-700 text-xs mb-1">
                Custom Slitting, Hole-Punching, or Test Certificate Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Require 33kV electrical breakdown test report, or cut roll into specific strip widths."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-vulcanized text-xs font-sans"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-neutral-300 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto px-4 py-2.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-mono flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Requisition Slip</span>
              </button>

              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full sm:w-auto px-6 py-3 bg-vulcanized hover:bg-carbon text-white font-bold text-xs sm:text-sm border border-steel flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-sulfur" />
                <span>Transmit to Lahore Trade Desk via WhatsApp</span>
              </button>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Trade inquiry opened! Our Lahore representative will respond with invoice rates and dispatch schedule.</span>
              </div>
            )}
          </form>

        </div>

      </div>
    </div>
  );
}

