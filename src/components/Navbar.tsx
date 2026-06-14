import React, { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS, BRANCHES } from '../data';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.id);
    const h = () => {
      const y = window.scrollY + 120;
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
      setScrolled(y > 40);
      setHidden(y > prevY && y > 300);
      prevY = y;
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  const go = useCallback((id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          transform: hidden && !open ? 'translateY(-100%)' : 'translateY(0)',
          background: scrolled ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
        }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: 68 }}>
          
          <button onClick={() => go('hero')} className="relative group cursor-pointer" aria-label="Shrimp Time — Accueil">
            <img src="/logo.png" alt="Shrimp Time" className="h-9 w-auto transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              style={{ filter: scrolled ? 'none' : 'brightness(2) drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button key={link.id} onClick={() => go(link.id)}
                  className="relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                  style={{ color: isActive ? '#F5D300' : scrolled ? '#0A1F3F' : '#fff', opacity: isActive ? 1 : scrolled ? 0.65 : 0.85, fontWeight: isActive ? 700 : 600 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#F5D300'; e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? '#F5D300' : scrolled ? '#0A1F3F' : '#fff'; e.currentTarget.style.opacity = isActive ? '1' : scrolled ? '0.65' : '0.85'; }}>
                  {link.label}
                  {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 20, height: 2, background: '#F5D300', animation: 'fadeIn 0.3s ease' }} />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${BRANCHES[0].phone}`}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer"
              style={{ color: scrolled ? '#0A1F3F' : '#fff', opacity: 0.7 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F5D300'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = scrolled ? '#0A1F3F' : '#fff'; e.currentTarget.style.opacity = '0.7'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              {BRANCHES[0].phoneDisplay}
            </a>

            <button onClick={() => go('reservation')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer"
              style={{ background: '#F5D300', color: '#0A1F3F' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#E0C200'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(245,211,0,0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F5D300'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book
            </button>

            <button onClick={() => setOpen(!open)} className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg hover:bg-black/5 transition-colors" aria-label={open ? 'Fermer' : 'Menu'}
              style={{ color: scrolled ? '#0A1F3F' : '#fff' }}>
              <div className="flex flex-col gap-[5px]">
                <span className="block w-[22px] h-[2px] bg-current rounded-full transition-all duration-300" style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                <span className="block w-[22px] h-[2px] bg-current rounded-full transition-all duration-200" style={{ opacity: open ? 0 : 1 }} />
                <span className="block w-[22px] h-[2px] bg-current rounded-full transition-all duration-300" style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white">
          <div className="flex justify-end px-6 pt-6">
            <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-navy" aria-label="Fermer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 -mt-12">
            {NAV_LINKS.map((link, i) => (
              <button key={link.id} onClick={() => go(link.id)} className="heading text-3xl md:text-4xl tracking-tight transition-all duration-300 cursor-pointer"
                style={{ color: activeSection === link.id ? '#F5D300' : '#0A1F3F', animation: `slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards ${0.3 + i * 0.08}s`, opacity: 0 }}>
                {link.label}
              </button>
            ))}
            <button onClick={() => go('reservation')} className="btn-yellow mt-6 text-base py-4 px-10 rounded-xl"
              style={{ animation: `slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards ${0.3 + NAV_LINKS.length * 0.08}s`, opacity: 0 }}>
              📅 Book Now
            </button>
            <a href={`tel:${BRANCHES[0].phone}`} className="text-sm text-muted font-semibold mt-2"
              style={{ animation: `slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards ${0.35 + NAV_LINKS.length * 0.08}s`, opacity: 0 }}>
              📞 {BRANCHES[0].phoneDisplay}
            </a>
          </div>
          <div className="text-center pb-10">
            <img src="/logo.png" alt="" className="h-8 w-auto mx-auto opacity-20" />
          </div>
        </div>
      )}
    </>
  );
}
