import React, { useState, useEffect, useCallback } from 'react';
import { BRANCHES } from '../data';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'menu', 'branches', 'reservation'];
    const h = () => {
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= y) {
          setActiveSection(sections[i]);
          break;
        }
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

  const go = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          transform: hidden && !open ? 'translateY(-100%)' : 'translateY(0)',
          background: scrolled || open ? '#0A1F3F' : 'rgba(10,31,63,0.3)',
          backdropFilter: scrolled || open ? 'blur(16px)' : 'blur(4px)',
          WebkitBackdropFilter: scrolled || open ? 'blur(16px)' : 'blur(4px)',
          borderBottom: scrolled || open ? '1px solid rgba(245,211,0,0.2)' : '1px solid transparent',
          boxShadow: scrolled || open ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between" style={{ height: 80 }}>
          
          {/* Logo Stacked (English + Arabic Tagline) */}
          <button onClick={() => go('hero')} className="flex flex-col items-start text-left cursor-pointer group">
            <span className="font-serif font-black text-lg md:text-xl text-white tracking-wider flex items-center gap-1.5 transition-transform group-hover:scale-[1.02]">
              <span>🦐</span>
              <span>SHRIMP TIME</span>
            </span>
            <span className="text-[#F5D300] text-[11px] md:text-xs font-semibold tracking-widest font-sans pl-6">
              عيش التجربة
            </span>
          </button>

          {/* Desktop Links (Horizontal) */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => go('menu')}
              className={`text-xs uppercase font-extrabold tracking-[0.2em] transition-colors cursor-pointer ${
                activeSection === 'menu' ? 'text-[#F5D300]' : 'text-white/85 hover:text-[#F5D300]'
              }`}
            >
              MENU
            </button>
            <button
              onClick={() => go('branches')}
              className={`text-xs uppercase font-extrabold tracking-[0.2em] transition-colors cursor-pointer ${
                activeSection === 'branches' ? 'text-[#F5D300]' : 'text-white/85 hover:text-[#F5D300]'
              }`}
            >
              BRANCHES
            </button>
            <button
              onClick={() => go('reservation')}
              className={`text-xs uppercase font-extrabold tracking-[0.2em] transition-colors cursor-pointer ${
                activeSection === 'reservation' ? 'text-[#F5D300]' : 'text-white/85 hover:text-[#F5D300]'
              }`}
            >
              BOOK NOW
            </button>
            <a
              href={`tel:${BRANCHES[0].phone}`}
              className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F5D300] hover:text-[#E0C200] transition-colors flex items-center gap-1.5"
            >
              <span>📞</span>
              <span>{BRANCHES[0].phoneDisplay}</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center gap-2 px-3 py-2 border border-white/20 rounded-lg text-white hover:text-[#F5D300] hover:border-[#F5D300] transition-all cursor-pointer bg-white/5"
          >
            <span className="font-sans font-bold text-xs tracking-wider">
              {open ? 'CLOSE' : 'MENU'}
            </span>
            <span className="text-sm">{open ? '✕' : '☰'}</span>
          </button>

        </div>

        {/* Mobile Dropdown Panel */}
        {open && (
          <div className="md:hidden bg-[#051433] border-t border-white/10 px-6 py-6 transition-all duration-300">
            <div className="border-4 border-double border-[#F5D300] rounded-xl p-4 bg-[#0A1F3F]/80">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => go('menu')}
                  className="flex items-center gap-3 text-white font-bold text-sm tracking-widest py-3 border-b border-white/5 hover:text-[#F5D300] text-left cursor-pointer"
                >
                  <span>🍤</span>
                  <span>MENU</span>
                </button>
                <button
                  onClick={() => go('branches')}
                  className="flex items-center gap-3 text-white font-bold text-sm tracking-widest py-3 border-b border-white/5 hover:text-[#F5D300] text-left cursor-pointer"
                >
                  <span>📍</span>
                  <span>BRANCHES</span>
                </button>
                <button
                  onClick={() => go('reservation')}
                  className="flex items-center gap-3 text-white font-bold text-sm tracking-widest py-3 border-b border-white/5 hover:text-[#F5D300] text-left cursor-pointer"
                >
                  <span>📅</span>
                  <span>BOOK NOW</span>
                </button>
                <a
                  href={`tel:${BRANCHES[0].phone}`}
                  className="flex items-center gap-3 text-[#F5D300] font-bold text-sm tracking-widest py-3 hover:text-[#E0C200] text-left"
                >
                  <span>📞</span>
                  <span>CALL +216 {BRANCHES[0].phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
