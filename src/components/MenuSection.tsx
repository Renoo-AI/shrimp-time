import React, { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { ShoppingCart, Sparkles, Plus, Minus, X, Trash2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<'entrées' | 'plats' | 'desserts'>('plats');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isMobilePlateauOpen, setIsMobilePlateauOpen] = useState(false);
  
  // State for the interactive Plateau Builder
  const [plateauItems, setPlateauItems] = useState<{ [id: string]: number }>({});

  const categories = [
    { id: 'entrées', label: 'Entrées', desc: 'Pour éveiller vos papilles' },
    { id: 'plats', label: 'Plats de Signature', desc: 'Fraîcheur des côtes & seaux de crevettes' },
    { id: 'desserts', label: 'Desserts Fins', desc: 'Douceurs pour couronner le festin' }
  ] as const;

  const filteredItems = MENU_ITEMS.filter(item => item.category === selectedCategory);

  // Helper functions for Plateau Builder
  const addToPlateau = (itemId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setPlateauItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromPlateau = (itemId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setPlateauItems(prev => {
      const copy = { ...prev };
      if (!copy[itemId] || copy[itemId] <= 1) {
        delete copy[itemId];
      } else {
        copy[itemId] -= 1;
      }
      return copy;
    });
  };

  const clearPlateau = () => setPlateauItems({});

  // Calculations for Plateau Builder
  const selectedPlateauList = Object.entries(plateauItems).map(([id, quantity]) => {
    const item = MENU_ITEMS.find(m => m.id === id);
    return {
      item,
      quantity,
      subtotal: item ? item.price * (quantity as number) : 0
    };
  }).filter(p => p.item !== undefined) as { item: MenuItem; quantity: number; subtotal: number }[];

  const plateauTotal = selectedPlateauList.reduce((sum, current) => sum + current.subtotal, 0);

  // Send selected preset to the reservation segment
  const handlePreBook = () => {
    const reservationSection = document.getElementById('reservation');
    if (reservationSection) {
      const requestTextarea = document.getElementById('special-requests') as HTMLTextAreaElement | null;
      if (requestTextarea) {
        const itemSummaries = selectedPlateauList.map(p => `${p.quantity}x ${p.item.name}`).join(', ');
        requestTextarea.value = `Pré-sélection d'assiettes (${itemSummaries}). Total prévu: ${plateauTotal} TND.`;
      }
      reservationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24 px-4 relative max-w-7xl mx-auto">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-navy/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <span className="text-brand-yellow uppercase text-xs md:text-sm tracking-widest font-extrabold block mb-2 font-mono">
          L'Aventure Culinaire
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white tracking-tight uppercase">
          Notre Menu Gastronomique
        </h2>
        <p className="text-white/75 text-sm md:text-base max-w-2xl mx-auto mt-4 px-4 font-sans leading-relaxed">
          Chaque ingrédient est sélectionné parmi la pêche du jour auprès des pêcheurs artisans de Sfax, Nabeul et Kelibia pour vous offrir une fraîcheur inégalée.
        </p>
        <div className="w-24 h-[1.5px] premium-gold-gradient mx-auto mt-6" />
      </motion.div>

      {/* Category Navigation Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-1.5 md:gap-3 max-w-4xl mx-auto mb-12 px-2"
      >
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-[8px] transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left cursor-pointer border ${
                isActive
                  ? 'bg-brand-yellow text-brand-navy border-brand-yellow font-black shadow-lg shadow-brand-yellow/15'
                  : 'bg-white/5 text-white/80 border-white/10 hover:border-brand-yellow/30 hover:bg-white/10'
              }`}
            >
              <span className={`text-xs tracking-widest uppercase font-black ${isActive ? 'text-brand-navy' : 'text-brand-yellow'}`}>
                {cat.label}
              </span>
              <span className={`text-[11px] mt-0.5 max-w-[190px] font-semibold leading-normal ${isActive ? 'text-brand-navy/80' : 'text-white/40'}`}>
                {cat.desc}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Main Grid: Left Side menu list, Right Side Plateau Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Seafood Dishes Listing in Dark Mode */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <motion.div layout className="flex flex-col gap-12" id="menu-items-grid">
            <AnimatePresence mode="popLayout">
            {filteredItems.map(item => {
              const countInPlateau = plateauItems[item.id] || 0;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative border-hairline border-b-0 pb-12 flex flex-col md:flex-row items-center gap-8 hover:bg-white/5 transition-all duration-500 cursor-pointer text-white"
                >
                  {/* Dish Image with Gradient overlay */}
                  <div className="relative h-64 md:h-80 w-full md:w-1/2 overflow-hidden bg-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                    
                    {/* Badge and Seat counter overlay */}
                    <div className="absolute top-3 left-3 flex gap-1">
                      {item.badge ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-600 text-white shadow-md">
                          {item.badge}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brand-navy text-brand-yellow border border-brand-yellow/25">
                          Classique
                        </span>
                      )}
                    </div>

                    {countInPlateau > 0 && (
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-[8px] text-[10px] uppercase tracking-wider font-extrabold bg-brand-yellow text-brand-navy shadow-md animate-pulse">
                        {countInPlateau} Sélectionné
                      </span>
                    )}
                  </div>

                  {/* Info Header */}
                  <div className="p-6 md:p-0 flex-1 flex flex-col justify-center text-left w-full">
                    <div>
                      <h3 className="text-xl font-serif font-black text-white group-hover:text-brand-yellow transition-colors leading-tight mb-2 uppercase">
                        {item.name}
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Segment / Price / Order controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                      {/* Price TND */}
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-black font-mono">Prix d'exception</span>
                        <span className="text-xl font-serif font-black text-brand-yellow">
                          {item.price} <span className="text-xs font-semibold text-white/70">TND</span>
                        </span>
                      </div>

                      {/* Quick Add Button with Plus icon */}
                      <button
                        onClick={(e) => addToPlateau(item.id, e)}
                        className="p-2.5 rounded-[8px] text-brand-navy premium-gold-gradient hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-md border border-brand-yellow/10"
                        title="Ajouter au plateau interactif"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Premium Seaside Plateau Builder in Dark Mode */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          id="plateau-builder" 
          className="lg:col-span-4 bg-brand-navy/80 text-white border border-brand-yellow/30 rounded-[12px] p-6 sticky top-28 self-start shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={16} className="text-brand-yellow" />
              <h3 className="text-md font-serif font-black text-white uppercase">Votre Panier de Mer</h3>
            </div>
            {selectedPlateauList.length > 0 && (
              <button
                onClick={clearPlateau}
                className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-widest font-extrabold flex items-center gap-1 cursor-pointer transition-colors border border-red-900 hover:border-red-700 px-2 py-1 rounded-[6px]"
              >
                <Trash2 size={12} />
                <span>Vider</span>
              </button>
            )}
          </div>

          {selectedPlateauList.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-full bg-white/5 text-brand-yellow flex items-center justify-center mx-auto mb-4 border border-white/10">
                <ShoppingCart size={24} />
              </div>
              <h4 className="text-sm font-black text-white uppercase mb-1">Votre Seau est Vide</h4>
              <p className="text-xs text-white/60 leading-relaxed max-w-[200px] mx-auto font-semibold">
                Composez votre festin en ajoutant des plats de signature et simulez le coût total de votre table.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Items listing */}
              <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-3">
                {selectedPlateauList.map(({ item, quantity, subtotal }) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5 gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-white/60 font-semibold font-mono">{item.price} TND l'unité</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-[8px] p-1 border border-white/10">
                      <button
                        onClick={(e) => removeFromPlateau(item.id, e)}
                        className="w-5 h-5 flex items-center justify-center text-white hover:bg-white/10 rounded-[6px] cursor-pointer"
                      >
                        <Minus size={10} strokeWidth={3} />
                      </button>
                      <span className="font-black text-white text-[11px] px-1">{quantity}</span>
                      <button
                        onClick={(e) => addToPlateau(item.id, e)}
                        className="w-5 h-5 flex items-center justify-center text-white hover:bg-white/10 rounded-[6px] cursor-pointer"
                      >
                        <Plus size={10} strokeWidth={3} />
                      </button>
                    </div>

                    <div className="text-right min-w-[55px]">
                      <span className="font-extrabold text-brand-yellow font-mono">{subtotal} TND</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Aggregated Totals */}
              <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-black text-white">
                  <span>Sous-total estimé :</span>
                  <span className="text-lg text-brand-yellow font-mono font-black">{plateauTotal} TND</span>
                </div>
                
                <p className="text-[10px] text-white/50 leading-relaxed text-center italic font-semibold">
                  *Ce prix est une estimation basée sur vos choix en vue de faciliter vos commandes à table.
                </p>

                {/* Primary preset submission action */}
                <button
                  onClick={handlePreBook}
                  className="w-full py-3 rounded-[8px] bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-bold text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} />
                  <span>Ajouter à ma Réservation</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Gastronomic Detailed Modal Dialog in Dark Mode */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/90 backdrop-blur-md animate-fade-in">
          <div className="bg-brand-navy rounded-[12px] p-6 md:p-8 max-w-lg w-full border border-brand-yellow/80 shadow-2xl relative text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer p-2 rounded-full hover:bg-white/10 transition-all z-10"
            >
              <X size={20} />
            </button>

            {/* Immersive Modal Image */}
            <div className="w-full h-56 rounded-[12px] overflow-hidden mb-5 border border-white/15 relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
            </div>

            {/* Content Group */}
            <div className="flex items-center gap-1 text-brand-yellow uppercase text-[10px] tracking-widest font-black mb-3 font-mono">
              <Sparkles size={12} />
              <span>Zoom Saveurs</span>
            </div>

            <h3 className="text-2xl font-serif font-black text-white mb-1 pr-8 leading-tight uppercase">
              {selectedItem.name}
            </h3>

            {/* Badges and Tags row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedItem.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-green-600 text-white">
                  {selectedItem.badge}
                </span>
              )}
              {selectedItem.tags?.map(t => (
                <span key={t} className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/5 text-white/60 border border-white/10">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 bg-white/5 p-4 rounded-[12px] border border-white/10 font-medium">
              {selectedItem.description}
            </p>

            {/* Chef Secret Advice Quote Block */}
            <div className="border-l-2 border-brand-yellow pl-4 italic text-xs mb-6 text-white/70 font-medium">
              <span className="font-black text-brand-yellow block not-italic uppercase mb-0.5 text-[9px] tracking-wider font-mono">Note Culinaire du Chef</span>
              "À associer idéalement avec notre jus de citron de Sfax fraîchement pressé pour révéler la finesse aromatique des crustacés."
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-white/50 uppercase tracking-widest font-black font-mono">Prix Table</span>
                <span className="text-2xl font-serif font-black text-brand-yellow font-mono">
                  {selectedItem.price} TND
                </span>
              </div>

              {/* Add directly to panier */}
              <button
                onClick={() => {
                  addToPlateau(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="px-6 py-3 rounded-[8px] bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md border border-brand-yellow/10"
              >
                Ajouter au Panier (+1)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Sticky Mobile Indicator Bar at the bottom */}
      {selectedPlateauList.length > 0 && (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm animate-fade-in">
          <div 
            onClick={() => setIsMobilePlateauOpen(true)}
            className="bg-brand-yellow text-brand-navy px-5 py-4 rounded-full flex items-center justify-between shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-white/10"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-brand-navy text-brand-yellow w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
                {selectedPlateauList.reduce((acc, p) => acc + p.quantity, 0)}
              </div>
              <span className="text-xs uppercase tracking-widest font-black">Votre Panier de Mer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-xs md:text-sm">{plateauTotal} TND</span>
              <span className="text-xs font-semibold">→</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Mobile Bottom-up Drawer Modal for Panier */}
      {isMobilePlateauOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/85 backdrop-blur-md animate-fade-in">
          <div className="bg-brand-navy rounded-t-[20px] p-6 w-full max-w-lg border-t border-brand-yellow/50 shadow-2xl relative text-white max-h-[85vh] flex flex-col justify-between">
            
            {/* Horizontal notch styling */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-brand-yellow" />
                <h3 className="text-sm font-serif font-black text-white uppercase">Votre Seau de Mer ({selectedPlateauList.reduce((acc, p) => acc + p.quantity, 0)})</h3>
              </div>
              <button 
                onClick={() => setIsMobilePlateauOpen(false)}
                className="text-white/60 hover:text-white cursor-pointer px-2.5 py-1 text-xs uppercase tracking-widest font-bold bg-white/5 rounded-md"
              >
                Fermer
              </button>
            </div>

            {/* Scrollable list content */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 py-2">
              {selectedPlateauList.map(({ item, quantity, subtotal }) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-white/5 gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-white/50 font-mono">{item.price} TND l'unité</p>
                  </div>

                  <div className="flex items-center gap-2 bg-white/5 rounded-[8px] p-1 border border-white/10">
                    <button
                      onClick={(e) => removeFromPlateau(item.id, e)}
                      className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10 rounded-[6px] cursor-pointer"
                    >
                      <Minus size={12} strokeWidth={3} />
                    </button>
                    <span className="font-black text-white text-[12px] px-1">{quantity}</span>
                    <button
                      onClick={(e) => addToPlateau(item.id, e)}
                      className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10 rounded-[6px] cursor-pointer"
                    >
                      <Plus size={12} strokeWidth={3} />
                    </button>
                  </div>

                  <div className="text-right min-w-[55px]">
                    <span className="font-extrabold text-brand-yellow font-mono">{subtotal} TND</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sum section */}
            <div className="border-t border-white/10 pt-4 mt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-black text-white">
                <span>Sous-total estimé :</span>
                <span className="text-lg text-brand-yellow font-mono font-black">{plateauTotal} TND</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={() => {
                    clearPlateau();
                    setIsMobilePlateauOpen(false);
                  }}
                  className="py-3 rounded-[8px] border border-red-500/20 text-red-400 hover:bg-red-500/5 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all"
                >
                  Tout Vider
                </button>
                <button
                  onClick={() => {
                    handlePreBook();
                    setIsMobilePlateauOpen(false);
                  }}
                  className="py-3 rounded-[8px] bg-brand-yellow text-brand-navy text-xs font-black uppercase tracking-widest hover:bg-brand-yellow/90 cursor-pointer transition-all"
                >
                  Réserver
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
