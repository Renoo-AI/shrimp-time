import React from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { ChefHat, Flame, Sparkles, GlassWater, Calendar, Star, Phone, MapPin, Citrus, Check } from 'lucide-react';

export default function MenuSection() {
  const seafoodBoil = MENU_ITEMS.filter((x) => x.category === 'seafood_boil');
  const crispy = MENU_ITEMS.filter((x) => x.category === 'crispy');
  const sides = MENU_ITEMS.filter((x) => x.category === 'sides');
  const drinks = MENU_ITEMS.filter((x) => x.category === 'drinks');

  const scrollToBook = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderItem = (item: MenuItem) => (
    <div key={item.id} className="mb-4 last:mb-0">
      <div className="flex items-baseline justify-between gap-1">
        <span className="font-serif italic text-base md:text-lg text-white font-medium flex items-center gap-1.5 shrink-0">
          <span>{item.name}</span>
        </span>
        <span className="flex-1 border-b border-dotted border-white/20 mx-2 self-center min-w-[30px]" />
        <span className="font-serif text-base md:text-lg font-bold text-[#F5D300] shrink-0 whitespace-nowrap">
          {item.price} DT
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-0.5 pl-2 gap-0.5 md:gap-4">
        {item.description && (
          <span className="text-white/50 text-xs md:text-sm font-sans">
            {item.description}
          </span>
        )}
        {item.nameAr && (
          <span className="text-[#F5D300]/90 text-xs md:text-sm font-sans dir-rtl text-right self-stretch md:self-auto md:ml-auto">
            {item.nameAr}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-20 md:py-28 px-4 md:px-10 bg-[#0A1F3F] text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,211,0,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,211,0,0.03) 0%, transparent 70%)' }} />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* $1M Menu Page Card Wrapper */}
        <div className="border-[6px] border-double border-[#F5D300] rounded-3xl p-6 md:p-12 bg-[#081830] shadow-2xl relative">
          
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Shrimp Time Logo" className="h-16 w-auto mx-auto mb-4 object-contain brightness-110" />
            <h1 className="font-serif text-3xl md:text-5xl tracking-[0.2em] font-extrabold uppercase text-white mb-2">
              S H R I M P &nbsp; T I M E
            </h1>
            <h2 className="text-[#F5D300] text-xl md:text-2xl font-semibold tracking-wider mb-6 font-sans">
              عيش التجربة
            </h2>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />
          </div>

          {/* INNER MENU BOX */}
          <div className="border border-white/10 rounded-2xl p-4 md:p-8 bg-[#091b35]">
            
            {/* Tagline */}
            <div className="text-center mb-8 flex items-center justify-center gap-2">
              <Citrus size={16} className="text-[#F5D300]" />
              <span className="text-[#F5D300] font-serif italic text-base md:text-xl">
                &ldquo;Fresh from the boil — straight to your plate&rdquo;
              </span>
              <Citrus size={16} className="text-[#F5D300]" />
            </div>

            {/* Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Category: Seafood Boil */}
              <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-[#07162c]/60 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-3 mb-5">
                  <ChefHat size={20} className="text-[#F5D300]" />
                  <h3 className="font-serif font-black tracking-wide text-lg md:text-xl text-white uppercase">
                    Seafood Boil
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {seafoodBoil.map(renderItem)}
                </div>
              </div>

              {/* Category: Crispy Selection */}
              <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-[#07162c]/60 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-3 mb-5">
                  <Flame size={20} className="text-[#F5D300]" />
                  <h3 className="font-serif font-black tracking-wide text-lg md:text-xl text-white uppercase">
                    Crispy Selection
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {crispy.map(renderItem)}
                </div>
              </div>

              {/* Category: Sides */}
              <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-[#07162c]/60 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-3 mb-5">
                  <Sparkles size={20} className="text-[#F5D300]" />
                  <h3 className="font-serif font-black tracking-wide text-lg md:text-xl text-white uppercase">
                    Sides
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {sides.map(renderItem)}
                </div>
              </div>

              {/* Category: Drinks */}
              <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-[#07162c]/60 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-3 mb-5">
                  <GlassWater size={20} className="text-[#F5D300]" />
                  <h3 className="font-serif font-black tracking-wide text-lg md:text-xl text-white uppercase">
                    Drinks
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {drinks.map(renderItem)}
                </div>
              </div>

            </div>

            {/* Sauces Row */}
            <div className="border border-white/10 rounded-xl p-6 mt-8 bg-[#07162c]/60 hover:border-white/20 transition-colors duration-300 text-center">
              <div className="flex items-center justify-center gap-2.5 mb-4">
                <Sparkles size={18} className="text-[#F5D300]" />
                <h3 className="font-serif font-black tracking-wide text-lg md:text-xl text-white uppercase">
                  Sauces
                </h3>
              </div>
              <div className="w-full h-[1px] bg-white/10 my-3" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 max-w-2xl mx-auto text-sm">
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>Sauce maison</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>Sauce Cajun</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>Sauce citronnée</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>Sauce tartare</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>Sauce harissa</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>Sauce algérienne</span>
                </div>
              </div>
              <div className="text-[#F5D300] font-serif text-sm tracking-[0.15em] uppercase mt-2">
                ─────────── 3 DT each ───────────
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-8 border border-white/10 rounded-xl p-4 md:p-6 bg-white/[0.02] text-center flex flex-col items-center">
              <div className="text-white/60 font-bold text-xs mb-4 tracking-[0.2em] flex items-center justify-center gap-2 select-none uppercase">
                <Flame size={14} className="text-[#F5D300]" />
                <span>Crack The Boil</span>
                <Flame size={14} className="text-[#F5D300]" />
              </div>
              
              <button
                onClick={scrollToBook}
                className="w-full border-4 border-double border-[#F5D300] bg-transparent text-[#F5D300] hover:bg-[#F5D300] hover:text-[#0A1F3F] rounded-xl p-6 shadow-xl cursor-pointer transition-all duration-300 group"
              >
                <div className="font-serif font-black text-xl md:text-2xl uppercase tracking-wider mb-2 group-hover:scale-102 transition-transform flex items-center justify-center gap-2">
                  <Calendar size={20} />
                  <span>Order Now — Reserve Your Table</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-3 text-xs md:text-sm font-semibold opacity-90">
                  <span className="flex items-center gap-1"><Check size={13} /> WhatsApp order</span>
                  <span className="hidden sm:inline opacity-40">·</span>
                  <span className="flex items-center gap-1"><Phone size={13} /> +216 98 900 372</span>
                  <span className="hidden sm:inline opacity-40">·</span>
                  <span>Takeaway available</span>
                </div>
              </button>
            </div>

          </div>

          {/* Bottom Social Proof Info */}
          <div className="mt-8 text-center border-t border-white/10 pt-8 flex flex-col items-center gap-4 text-xs md:text-sm text-white/40">
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <span className="flex items-center gap-1">
                <Star size={12} className="text-[#F5D300] fill-[#F5D300] align-middle" /> 
                <span>4.4 ★ (394 reviews)</span>
              </span>
              <span>·</span>
              <span>&ldquo;Best seafood boil in Tunisia&rdquo;</span>
              <span>·</span>
              <span>Fresh daily</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 items-center opacity-70">
              <span className="flex items-center gap-1"><MapPin size={12} /> La Marsa Plage</span>
              <span>·</span>
              <span><MapPin size={12} /> L&apos;Aouina Cité El Wahat</span>
              <span>·</span>
              <span><Phone size={12} /> +216 98 900 372</span>
            </div>
            <div className="text-[#F5D300]/80 tracking-wide font-medium mt-1 flex items-center gap-1.5 justify-center">
              <img src="/logo.png" alt="" className="h-4 w-auto brightness-110 object-contain inline-block" />
              <span>SHRIMP TIME · عيش التجربة · contact@shrimptime.tn · © 2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
