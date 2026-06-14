import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, MENU_NOTE } from '../data';
import { useLang } from './LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [tab, setTab] = useState('seafood_boil');
  const [search, setSearch] = useState('');
  const [imgsLoaded, setImgsLoaded] = useState<Set<string>>(new Set());
  const { lang, t } = useLang();
  const cat = MENU_CATEGORIES.find((c) => c.id === tab);
  let items = MENU_ITEMS.filter((x) => x.category === tab);

  if (search.trim()) {
    const q = search.toLowerCase();
    items = items.filter((x) =>
      x.name.toLowerCase().includes(q) ||
      x.description.toLowerCase().includes(q) ||
      (x.nameAr || '').includes(q) ||
      (x.descriptionAr || '').toLowerCase().includes(q)
    );
  }

  const onImgLoad = (id: string) => setImgsLoaded((s) => new Set(s).add(id));

  const shareUrl = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${encodeURIComponent('🍤 Menu Shrimp Time — ')}${url}`, '_blank');
  };

  return (
    <section id="menu" className="py-20 md:py-[100px] px-5 md:px-10 section-cream" style={{ backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading text-[36px] md:text-[48px] font-bold text-navy">
            {t('Notre Menu', 'قائمة الطعام')}
          </h2>
          {cat?.arabicLabel && (
            <p className="text-sm text-olive mt-1 font-sans font-semibold tracking-wider uppercase">{cat.arabicLabel}</p>
          )}
          <div className="mx-auto mt-3" style={{ width: 60, height: 3, background: '#F5D300' }} />
        </div>

        {/* Search + Share row */}
        <div className="flex gap-3 mb-8 max-w-[400px] mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('Rechercher un plat...', 'ابحث عن طبق...')}
            className="inp text-sm flex-1"
          />
          <button onClick={shareUrl}
            className="btn-yellow text-xs py-2.5 px-4 shrink-0"
            title={t('Partager le menu', 'مشاركة القائمة')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>

        {/* Quick filters */}
        {!search && (
          <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
            {MENU_CATEGORIES.map((c) => {
              const active = tab === c.id;
              return (
                <button key={c.id} onClick={() => setTab(c.id)}
                  className="shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200"
                  style={{ background: active ? '#F5D300' : 'transparent', color: active ? '#0A1F3F' : '#6B7280', border: active ? '2px solid #F5D300' : '1px solid #D1D5DB' }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = '#F5D300'; e.currentTarget.style.color = '#0A1F3F'; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#6B7280'; } }}>
                  {c.label}
                </button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={tab + search} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {items.length === 0 && (
              <p className="text-center text-muted text-sm py-12">{t('Aucun plat trouvé', 'لا توجد نتائج')}</p>
            )}
            {items.map((item, i) => (
              <div key={item.id}>
                <div className="flex items-start justify-between py-5">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      {item.image && !imgsLoaded.has(item.id) && (
                        <div className="w-5 h-5 rounded skeleton shrink-0" />
                      )}
                      <span className="text-xl shrink-0" style={{ display: item.image && !imgsLoaded.has(item.id) ? 'none' : 'inline' }}>{item.emoji}</span>
                      {item.image && (
                        <img src={item.image} alt="" className="hidden" onLoad={() => onImgLoad(item.id)} />
                      )}
                      <h3 className="italic-s text-lg text-navy">
                        {lang === 'ar' && item.nameAr ? item.nameAr : item.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted ml-8">
                      {lang === 'ar' && item.descriptionAr ? item.descriptionAr : item.description}
                    </p>
                  </div>
                  <span className="heading text-lg font-bold shrink-0 pt-1" style={{ color: '#F5D300' }}>
                    {item.price.toFixed(item.price % 1 !== 0 ? 1 : 0)} DT
                  </span>
                </div>
                {i < items.length - 1 && <div className="w-full h-px bg-[#E5E7EB]" />}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {tab === 'seafood_boil' && !search && (
          <div className="mt-8 p-4 rounded-lg text-center" style={{ background: 'rgba(245,211,0,0.06)', border: '1px solid rgba(245,211,0,0.1)' }}>
            <p className="text-sm text-navy/60 font-sans">🍋 {MENU_NOTE}</p>
          </div>
        )}
      </div>
    </section>
  );
}
