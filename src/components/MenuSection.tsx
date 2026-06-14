import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MENU_NOTE } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [tab, setTab] = useState('seafood_boil');
  const cat = MENU_CATEGORIES.find((c) => c.id === tab);
  const items = MENU_ITEMS.filter((x) => x.category === tab);

  return (
    <section id="menu" className="py-24 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-[900px] mx-auto">
        
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl mb-4 block">🦞</motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="heading text-4xl md:text-5xl text-navy">
            Notre Menu
          </motion.h2>
          {cat?.arabicLabel && (
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.5 } }}
              className="text-sm text-olive mt-2 font-sans font-semibold tracking-wider uppercase">
              {cat.arabicLabel}
            </motion.p>
          )}
          <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            className="mx-auto mt-6" style={{ width: 48, height: 3, background: '#F5D300', borderRadius: 2 }} />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 md:gap-4 mb-14 overflow-x-auto pb-2">
          {MENU_CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setTab(c.id)}
              className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200"
              style={{
                background: tab === c.id ? '#F5D300' : 'transparent',
                color: tab === c.id ? '#0A1F3F' : '#6B7280',
                border: tab === c.id ? '2px solid #F5D300' : '1px solid #D1D5DB',
              }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            
            {items.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-4 py-5 border-b border-gray-100 last:border-0"
              >
                {item.image && (
                  <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg shrink-0">{item.emoji}</span>
                    <h3 className="italic-s text-lg text-navy">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted ml-7">{item.description}</p>
                </div>
                <span className="heading text-lg text-yellow shrink-0 pt-0.5 tabular-nums">
                  {item.price.toFixed(item.price % 1 !== 0 ? 1 : 0)} DT
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {tab === 'seafood_boil' && (
          <div className="mt-8 p-4 rounded-lg text-center" style={{ background: 'rgba(245,211,0,0.08)' }}>
            <p className="text-sm text-navy/70 font-sans">{MENU_NOTE}</p>
          </div>
        )}
      </div>
    </section>
  );
}
