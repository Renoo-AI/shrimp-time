import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: 68 }}>
          <button onClick={() => go('hero')} className="cursor-pointer">
            <img src="/logo.png" alt="Shrimp Time" className="h-9 w-auto" />
          </button>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}
                className="label-s text-navy/70 hover:text-yellow transition-colors cursor-pointer"
                style={{ color: scrolled ? '#0A1F3F' : '#fff', opacity: scrolled ? 0.7 : 0.85 }}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => go('reservation')}
              className="hidden md:flex btn-yellow text-xs py-2.5 px-5">
              Réserver
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 cursor-pointer" aria-label="Menu"
              style={{ color: scrolled ? '#0A1F3F' : '#fff' }}>
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect width="22" height="2" rx="1" fill="currentColor"/>
                <rect y="7" width="22" height="2" rx="1" fill="currentColor"/>
                <rect y="14" width="22" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 p-2 text-navy text-2xl cursor-pointer">&times;</button>
          {NAV_LINKS.map((l, i) => (
            <button key={l.id} onClick={() => go(l.id)}
              className="heading text-3xl text-navy hover:text-yellow transition-colors cursor-pointer"
              style={{ animation: `fadeIn 0.4s ease forwards ${i * 0.08}s`, opacity: 0 }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
