import React from 'react';
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import BranchesSection from './components/BranchesSection';
import ReservationSection from './components/ReservationSection';
import { INSTAGRAM_URL, BRANCHES } from './data';
import { motion } from 'motion/react';

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-parchment antialiased relative" style={{ backgroundColor: '#080B14' }}>
      {/* ── Global Noise Overlay ── */}
      <div className="noise-overlay" />

      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden noise-section"
        style={{ backgroundColor: '#080B14' }}
      >
        {/* Ambient glow — single amber light source */}
        <div className="absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,211,0,0.06) 0%, transparent 70%)' }}
        />

        {/* Hero bg image — very subtle */}
        <div
          className="absolute inset-0 z-0 opacity-[0.06]"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Left column — Logo + tagline */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-0 pt-32 pb-16">
          
          {/* Logo block — offset, not centered */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <img
              src="/logo.png"
              alt="Shrimp Time"
              className="w-[220px] md:w-[280px] h-auto mb-10"
            />
            <div className="accent-line mb-6" style={{ transformOrigin: 'left' }} />
            <p className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-muted-dark font-medium">
              Vivez l'expérience
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-olive/70 mt-2 font-medium">
              عيش التجربة
            </p>
          </motion.div>

          {/* Right column — Giant title + buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end text-right"
          >
            <h1 className="font-serif text-[14vw] md:text-[10vw] lg:text-[120px] font-black leading-[0.85] tracking-tight text-parchment">
              SHRIMP<br />TIME
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-dark mt-6 max-w-[380px] leading-relaxed font-medium">
              Fruits de mer frais, ambiance premium.<br />
              Deux branches à Tunis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <button onClick={() => scrollTo('menu')} className="btn-primary">
                Voir le Menu
              </button>
              <button onClick={() => scrollTo('reservation')} className="btn-ghost">
                Réserver
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 h-px bg-white/[0.04]" />
      </section>

      {/* ═══════════════ BRANCHES ═══════════════ */}
      <BranchesSection />

      {/* ═══════════════ MENU ═══════════════ */}
      <MenuSection />

      {/* ═══════════════ RESERVATION ═══════════════ */}
      <ReservationSection />

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative py-24 px-8 md:px-16 lg:px-24 noise-section" style={{ backgroundColor: '#080B14' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="h-px bg-white/[0.06] mb-16" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <img src="/logo.png" alt="Shrimp Time" className="h-10 w-auto opacity-70" />
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-dark font-semibold mb-3">
                  Nos Branches
                </p>
                {BRANCHES.map((b) => (
                  <p key={b.id} className="font-serif text-lg text-parchment/60 leading-relaxed">
                    {b.name}<br />
                    <span className="font-sans text-xs text-muted-dark">{b.address}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-6 items-start lg:items-end text-left lg:text-right">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-dark font-semibold mb-3">
                  Contact
                </p>
                <p className="font-serif text-xl text-parchment/80">
                  {BRANCHES[0].phoneDisplay}
                </p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-[0.2em] text-muted-dark hover:text-amber transition-colors duration-300"
              >
                @shrimp_.time
              </a>
            </div>
          </div>

          <div className="h-px bg-white/[0.04] my-10" />

          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-dark/50">
            &copy; {new Date().getFullYear()} Shrimp Time. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
