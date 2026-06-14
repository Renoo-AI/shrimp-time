import React, { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS, BRANCHES } from '../data';
import { useLang } from './LanguageContext';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, setLang, t } = useLang();
  const { theme, toggle: toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.id);
    const h = () => {
      const y = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= y) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  let prevY = 0;
  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > prevY && y > 400);
      prevY = y;
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const go = useCallback((id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, []);

  const linkLabels: Record<string, string> = {
    hero: t('Accueil', 'الرئيسية'),
    menu: t('Menu', 'القائمة'),
    branches: t('Branches', 'الفروع'),
    reservation: t('Réservation', 'حجز'),
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-400"
        style={{
          height: scrolled ? 64 : 80,
          transform: hidden && !open ? 'translateY(-100%)' : 'translateY(0)',
          background: scrolled ? 'rgba(10,31,63,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245,211,0,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          <button onClick={() => go('hero')} className="flex items-center gap-2 cursor-pointer shrink-0">
            <img src="/logo.png" alt="Shrimp Time" className="h-10 w-auto transition-all duration-400"
              style={{ filter: scrolled ? 'none' : 'brightness(2) drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }} />
          </button>

          <div className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.id;
              const isLast = i === NAV_LINKS.length - 1;
              return (
                <React.Fragment key={link.id}>
                  <button onClick={() => go(link.id)}
                    className="text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer px-4 py-2 whitespace-nowrap"
                    style={{ color: isActive ? '#F5D300' : '#fff', opacity: isActive ? 1 : 0.8 }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#F5D300'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? '#F5D300' : '#fff'; e.currentTarget.style.opacity = isActive ? '1' : '0.8'; }}>
                    {linkLabels[link.id] || link.label}
                  </button>
                  {!isLast && <span className="text-white/15 text-xs select-none mx-1">|</span>}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button onClick={toggleTheme} className="hidden md:flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors hover:bg-white/10"
              aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
              title={isDark ? 'Mode clair' : 'Mode sombre'}
              style={{ color: scrolled ? '#fff' : '#fff' }}>
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            {/* Language toggle */}
            <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors hover:bg-white/10 text-xs font-bold"
              style={{ color: scrolled ? '#fff' : '#fff' }}
              aria-label={lang === 'fr' ? 'العربية' : 'Français'}
              title={lang === 'fr' ? 'العربية' : 'Français'}>
              {lang === 'fr' ? 'AR' : 'FR'}
            </button>

            <button onClick={() => go('reservation')}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-sans text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer"
              style={{ background: '#F5D300', color: '#0A1F3F' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#E0C200'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F5D300'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {t('Réserver', 'احجز')}
            </button>

            <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer" aria-label="Menu" style={{ color: '#fff' }}>
              <span className="block w-[22px] h-[2px] bg-current rounded-full transition-all duration-300" style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span className="block w-[22px] h-[2px] bg-current rounded-full transition-all duration-200" style={{ opacity: open ? 0 : 1 }} />
              <span className="block w-[22px] h-[2px] bg-current rounded-full transition-all duration-300" style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-navy">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer text-2xl">&times;</button>
          {NAV_LINKS.map((link, i) => (
            <button key={link.id} onClick={() => go(link.id)}
              className="heading text-3xl text-white/80 hover:text-yellow transition-colors cursor-pointer"
              style={{ animation: `slideUp 0.4s ease forwards ${0.2 + i * 0.07}s`, opacity: 0 }}>
              {linkLabels[link.id] || link.label}
            </button>
          ))}
          <button onClick={() => go('reservation')} className="btn-yellow mt-4 text-base py-4 px-10 rounded-xl" style={{ animation: `slideUp 0.4s ease forwards ${0.2 + NAV_LINKS.length * 0.07}s`, opacity: 0 }}>
            📅 {t('Réserver', 'احجز')}
          </button>
          <div className="flex items-center gap-4 mt-4" style={{ animation: `slideUp 0.4s ease forwards ${0.25 + NAV_LINKS.length * 0.07}s`, opacity: 0 }}>
            <button onClick={toggleTheme} className="text-white/60 hover:text-white transition-colors text-sm font-bold">{isDark ? '☀️' : '🌙'}</button>
            <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} className="text-white/60 hover:text-yellow transition-colors text-sm font-bold">{lang === 'fr' ? 'AR' : 'FR'}</button>
          </div>
        </div>
      )}
    </>
  );
}
