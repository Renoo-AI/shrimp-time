import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MENU_NOTE } from '../data';
import { useLang } from './LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [tab, setTab] = useState('seafood_boil');
  const [search, setSearch] = useState('');
  const { lang, t } = useLang();
  const cat = MENU_CATEGORIES.find((c) => c.id === tab);
  let items = MENU_ITEMS.filter((x) => x.category === tab);

  if (search.trim()) {
    const q = search.toLowerCase();
    items = items.filter((x) =>
      x.name.toLowerCase().includes(q) || x.description.toLowerCase().includes(q) ||
      (x.nameAr || '').includes(q) || (x.descriptionAr || '').toLowerCase().includes(q)
    );
  }

  const shareMenu = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent('🍤 Menu Shrimp Time — ' + window.location.href)}`, '_blank');
  };

  return (
    <section id="menu" className="py-24 md:py-36 px-5 md:px-10 relative" style={{ backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[900px] mx-auto relative z-10">
        
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="heading text-[40px] md:text-[56px] font-bold text-navy">
            {t('Notre Menu', 'قائمة الطعام')}
          </motion.h2>
          {cat?.arabicLabel && (
            <p className="text-sm text-olive mt-2 font-sans font-semibold tracking-wider uppercase">{cat.arabicLabel}</p>
          )}
          <div className="mx-auto mt-4" style={{ width: 64, height: 3, background: '#F5D300', borderRadius: 2 }} />
        </div>

        {/* Search + Share */}
        <div className="flex gap-3 mb-10 max-w-[400px] mx-auto">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={t('Rechercher...', 'ابحث...')}
              className="inp text-sm pl-10" />
          </div>
          <button onClick={shareMenu} className="btn-yellow text-xs py-3 px-4 shrink-0" title={t('Partager', 'مشاركة')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>

        {/* Tabs */}
        {!search && (
          <div className="flex justify-center gap-2 md:gap-3 mb-16 overflow-x-auto pb-2">
            {MENU_CATEGORIES.map((c) => {
              const active = tab === c.id;
              return (
                <button key={c.id} onClick={() => setTab(c.id)}
                  className="shrink-0 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-250"
                  style={{ background: active ? '#F5D300' : '#fff', color: active ? '#0A1F3F' : '#6B7280', border: active ? '2px solid #F5D300' : '1.5px solid #E5E7EB', fontWeight: active ? 700 : 600 }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = '#F5D300'; e.currentTarget.style.color = '#0A1F3F'; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280'; } }}>
                  {c.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div key={tab + search} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            {items.length === 0 && (
              <p className="text-center text-muted text-sm py-16 font-sans">{t('Aucun résultat', 'لا توجد نتائج')}</p>
            )}
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="menu-item group flex items-start gap-5 py-6 border-b border-gray-100 last:border-0"
              >
                {/* Image thumbnail */}
                {item.image && (
                  <div className="hidden sm:block w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={item.image} alt={item.name} loading="lazy"
                      className="menu-item-img w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                  </div>
                )}

                <div className="flex-1 min-w-0 flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg shrink-0">{item.emoji}</span>
                      <h3 className="italic-s text-lg md:text-xl text-navy group-hover:text-yellow/80 transition-colors duration-200">
                        {lang === 'ar' && item.nameAr ? item.nameAr : item.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted leading-relaxed ml-7">
                      {lang === 'ar' && item.descriptionAr ? item.descriptionAr : item.description}
                    </p>
                  </div>
                  <span className="menu-price price-tag text-xl md:text-2xl shrink-0 pt-0.5 transition-transform duration-300" style={{ color: '#F5D300' }}>
                    {item.price.toFixed(item.price % 1 !== 0 ? 1 : 0)}
                    <span className="text-[10px] font-medium text-muted/60 ml-1 align-super tracking-normal font-sans">DT</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {tab === 'seafood_boil' && !search && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-12 p-5 rounded-xl text-center" style={{ background: 'rgba(245,211,0,0.06)', border: '1px solid rgba(245,211,0,0.1)' }}>
            <p className="text-sm text-navy/55 font-sans tracking-wide">🍋 {MENU_NOTE}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
