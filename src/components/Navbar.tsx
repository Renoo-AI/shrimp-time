import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const now = window.scrollY;
      if (now > lastScroll && now > 200) setVisible(false);
      else setVisible(true);
      lastScroll = now;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-transform duration-500"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          background: 'rgba(8, 11, 20, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between" style={{ height: '64px' }}>
          {/* Logo mini */}
          <button onClick={() => scrollTo('hero')} className="cursor-pointer">
            <img src="/logo.png" alt="Shrimp Time" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-sans text-xs uppercase tracking-[0.2em] text-muted-dark hover:text-amber transition-colors duration-200 cursor-pointer font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-muted-dark transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-muted-dark transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-muted-dark transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10" style={{ backgroundColor: '#080B14' }}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-serif text-3xl text-parchment/80 hover:text-amber transition-colors cursor-pointer"
              style={{ animation: `fade-up 0.5s ease forwards ${i * 0.08}s`, opacity: 0 }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
