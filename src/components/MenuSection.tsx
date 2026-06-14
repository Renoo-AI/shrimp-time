import React from 'react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

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
          <span>{item.emoji}</span>
          <span>{item.name}</span>
        </span>
        <span className="flex-1 border-b border-dotted border-white/20 mx-2 self-center min-w-[30px]" />
        <span className="font-serif text-base md:text-lg font-bold text-[#F5D300] shrink-0 whitespace-nowrap">
          {item.price} DT
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-0.5 pl-6 gap-0.5 md:gap-4">
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
            <span className="text-5xl mb-4 block animate-bounce" style={{ animationDuration: '3s' }}>🦐</span>
            <h1 className="font-serif text-3xl md:text-5xl tracking-[0.2em] font-extrabold uppercase text-white mb-2">
              S H R I M P &nbsp; T I M E
            </h1>
            <h2 className="text-[#F5D300] text-xl md:text-2xl font-semibold tracking-wider mb-6">
              عيش التجربة
            </h2>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />
          </div>

          {/* INNER MENU BOX */}
          <div className="border border-white/10 rounded-2xl p-4 md:p-8 bg-[#091b35]">
            
            {/* Tagline */}
            <div className="text-center mb-8">
              <span className="text-[#F5D300] font-serif italic text-base md:text-xl">
                🍋 &ldquo;Fresh from the boil — straight to your plate&rdquo; 🍋
              </span>
            </div>

            {/* Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Category: Seafood Boil */}
              <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-[#07162c]/60 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
                  <span className="text-xl">🍤</span>
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
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
                  <span className="text-xl">🍗</span>
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
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
                  <span className="text-xl">🥗</span>
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
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
                  <span className="text-xl">🍹</span>
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
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-lg">🧂</span>
                <h3 className="font-serif font-black tracking-wide text-lg md:text-xl text-white uppercase">
                  Sauces
                </h3>
              </div>
              <div className="w-full h-[1px] bg-white/10 my-3" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 max-w-2xl mx-auto text-sm">
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>🧄</span> <span>Sauce maison</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>🌶️</span> <span>Sauce Cajun</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>🍋</span> <span>Sauce citronnée</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>🫒</span> <span>Sauce tartare</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>🔥</span> <span>Sauce harissa</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-1 px-3 bg-white/[0.03] rounded-lg text-white/80">
                  <span>🥒</span> <span>Sauce algérienne</span>
                </div>
              </div>
              <div className="text-[#F5D300] font-serif text-sm tracking-[0.15em] uppercase mt-2">
                ─────────── 3 DT each ───────────
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-8 border border-white/10 rounded-xl p-4 md:p-6 bg-white/[0.02] text-center">
              <div className="text-white/60 font-bold text-sm mb-4 tracking-[0.2em] flex items-center justify-center gap-2">
                🦐 🔥 🍋 CRACK THE BOIL 🍋 🔥 🦐
              </div>
              
              <button
                onClick={scrollToBook}
                className="w-full border-4 border-double border-[#F5D300] bg-transparent text-[#F5D300] hover:bg-[#F5D300] hover:text-[#0A1F3F] rounded-xl p-6 shadow-xl cursor-pointer transition-all duration-300 group"
              >
                <div className="font-serif font-black text-xl md:text-2xl uppercase tracking-wider mb-2 group-hover:scale-102 transition-transform">
                  🍤 Order Now — Reserve Your Table 🍤
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-3 text-xs md:text-sm font-semibold opacity-90">
                  <span>✅ WhatsApp order</span>
                  <span className="hidden sm:inline opacity-40">·</span>
                  <span>📞 +216 98 900 372</span>
                  <span className="hidden sm:inline opacity-40">·</span>
                  <span>Takeaway available</span>
                </div>
              </button>
            </div>

          </div>

          {/* Bottom Social Proof Info */}
          <div className="mt-8 text-center border-t border-white/10 pt-8 flex flex-col items-center gap-4 text-xs md:text-sm text-white/40">
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <span>⭐ 4.4 ★ (394 reviews)</span>
              <span>·</span>
              <span>&ldquo;Best seafood boil in Tunisia&rdquo;</span>
              <span>·</span>
              <span>Fresh daily</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 items-center opacity-70">
              <span>📍 La Marsa Plage</span>
              <span>·</span>
              <span>📍 L&apos;Aouina Cité El Wahat</span>
              <span>·</span>
              <span>📞 +216 98 900 372</span>
            </div>
            <div className="text-[#F5D300]/80 tracking-wide font-medium mt-1">
              🦐 SHRIMP TIME · عيش التجربة · contact@shrimptime.tn · © 2026
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
