import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MENU_NOTE } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<string>('seafood_boil');
  const activeCat = MENU_CATEGORIES.find((c) => c.id === activeTab);
  const items = MENU_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="menu" className="relative py-28 md:py-36 px-8 md:px-16 lg:px-24 noise-section" style={{ backgroundColor: '#0F1A2E' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-dark mb-4 font-semibold"
          >
            L'Art Culinaire
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-black text-parchment tracking-tight"
          >
            Notre Menu
          </motion.h2>
          {activeCat?.arabicLabel && (
            <p className="font-sans text-sm text-muted-dark mt-2 tracking-wider">
              {activeCat.arabicLabel}
            </p>
          )}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="accent-line mt-8"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Tabs — thin underline style, not pills */}
        <div className="flex gap-10 md:gap-16 mb-16 overflow-x-auto pb-2">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative shrink-0 pb-3 font-sans text-sm uppercase tracking-[0.15em] font-semibold cursor-pointer transition-colors duration-200"
              style={{ color: activeTab === cat.id ? '#E8E4DB' : '#7A8190' }}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.span
                  layoutId="menu-underline"
                  className="absolute bottom-0 left-0 w-full h-px bg-amber"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Menu items — editorial list, not cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group py-8 border-b border-white/[0.05] flex items-start gap-5"
              >
                {/* Image thumbnail — only on desktop for items with images */}
                {item.image && (
                  <div className="hidden md:block w-[72px] h-[72px] shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm opacity-50">{item.emoji}</span>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-parchment group-hover:text-amber transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-muted-dark mt-1.5 leading-relaxed max-w-[340px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Price — dramatic */}
                  <span className="font-serif text-xl md:text-2xl font-black text-amber shrink-0 pt-0.5 tabular-nums">
                    {item.price.toFixed(item.price % 1 !== 0 ? 1 : 0)}
                    <span className="font-sans text-[10px] font-medium text-muted-dark ml-0.5 align-super">DT</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Sauce note */}
        {activeTab === 'seafood_boil' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 py-5 px-0 border-l-2 border-amber/20 pl-6"
          >
            <p className="font-sans text-xs text-muted-dark tracking-wide">{MENU_NOTE}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
