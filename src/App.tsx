import React, { useEffect, useRef } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import BranchesSection from './components/BranchesSection';
import ReservationSection from './components/ReservationSection';
import SocialProof from './components/SocialProof';
import StructuredData from './components/StructuredData';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import { INSTAGRAM_URL, BRANCHES, RESTAURANT_EMAIL, RESTAURANT_HOURS } from './data';
import { motion } from 'motion/react';

const VID = [1, 2, 3][Math.floor(Math.random() * 3)];
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const PARTICLES = ['🦐', '🍋', '🦞', '✨', '🦑', '🐟', '🦀', '🦪'];

function ParticleField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    const spawn = () => {
      const el = document.createElement('span');
      el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
      const size = Math.random() * 20 + 14;
      const left = Math.random() * 100;
      const dur = Math.random() * 8 + 8;
      const delay = Math.random() * 4;
      el.style.cssText = `
        position:absolute; left:${left}%; bottom:-40px;
        font-size:${size}px; opacity:0;
        animation: float-up ${dur}s ease-in ${delay}s infinite;
        pointer-events:none;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), (dur + delay) * 1000);
    };
    for (let i = 0; i < 20; i++) spawn();
    const interval = setInterval(spawn, 1200);
    return () => clearInterval(interval);
  }, []);
  return <div ref={ref} className="absolute inset-0 z-[3] overflow-hidden pointer-events-none" />;
}

function AppContent() {
  return (
    <main id="main-content" className="min-h-screen antialiased font-sans" role="main" style={{ background: '#0A1F3F' }}>
      <Navbar />

      {/* ═══════════════ CINEMATIC HERO ═══════════════ */}
      <ErrorBoundary>
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0A1F3F' }}>
          
          {/* Full-bleed video */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
            poster="/hero-bg.jpg"
            style={{ filter: 'brightness(0.55) saturate(1.3) contrast(1.05)' }}>
            <source src={`/${VID}.mp4`} type="video/mp4" />
          </video>

          {/* Rich overlay — deep at edges, lighter at center */}
          <div className="absolute inset-0 z-[1]" style={{
            background: `
              radial-gradient(ellipse at center, rgba(10,31,63,0.2) 0%, rgba(10,31,63,0.55) 50%, rgba(10,31,63,0.85) 100%),
              linear-gradient(to bottom, rgba(10,31,63,0.3) 0%, rgba(10,31,63,0.4) 50%, rgba(10,31,63,0.7) 100%)
            `
          }} />

          {/* Floating particles */}
          <ParticleField />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full pt-12">
            
            {/* Logo — animated glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 md:mb-16"
            >
              <img
                src="/logo.png"
                alt="Shrimp Time"
                className="w-[180px] md:w-[260px] h-auto mx-auto"
                style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
              />
            </motion.div>

            {/* Headline — staggered word reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[14vw] md:text-[130px] text-white tracking-tight leading-[0.82]"
              style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
            >
              Fruits de<br />Mer Frais
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="label mt-8 text-yellow"
            >
              La Marsa & L'Aouina — Tunis
            </motion.p>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
              style={{ width: 60, height: 2, background: '#F5D300', borderRadius: 1 }}
            />

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-5 mt-16"
            >
              <button onClick={() => go('menu')} className="btn-yellow text-base px-12 py-5">
                <span className="text-lg">🦐</span> Voir le Menu
              </button>
              <button onClick={() => go('reservation')} className="btn-ghost text-base px-12 py-5">
                <span className="text-lg">📅</span> Réserver une Table
              </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mt-20 md:mt-28 flex flex-col items-center gap-4"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-sans font-semibold">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center pt-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-yellow/50" />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom wave transition to next section */}
          <div className="wave-divider z-[4]" style={{ bottom: -1 }}>
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z" fill="#FFFFFF" />
            </svg>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary><BranchesSection /></ErrorBoundary>
      <ErrorBoundary><SocialProof /></ErrorBoundary>
      <ErrorBoundary><MenuSection /></ErrorBoundary>
      <ErrorBoundary><ReservationSection /></ErrorBoundary>

      {/* Footer */}
      <ErrorBoundary>
        <footer className="py-20 px-6 md:px-10" style={{ background: '#060C17' }} role="contentinfo">
          <div className="max-w-[1200px] mx-auto text-center">
            <img src="/logo.png" alt="Shrimp Time" className="h-10 w-auto mx-auto mb-6" style={{ filter: 'brightness(2)' }} loading="lazy" />
            <p className="font-serif text-lg font-bold tracking-widest text-white mb-1">SHRIMP TIME</p>
            <p className="text-xs text-olive font-sans font-semibold tracking-wider mb-6">عيش التجربة</p>
            <p className="text-sm text-white/45 mb-2">📍 {BRANCHES.map(b => b.name).join(' & ')}</p>
            <p className="text-sm text-white/45 mb-4">
              📞 <a href={`tel:${BRANCHES[0].phone}`} className="hover:text-yellow transition-colors">{BRANCHES[0].phoneDisplay}</a> · ✉️ {RESTAURANT_EMAIL}
            </p>
            <p className="text-sm text-white/25 mb-6">{RESTAURANT_HOURS}</p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-yellow transition-colors font-sans font-semibold">📸 @shrimp_.time</a>
              <a href="https://www.facebook.com/profile.php?id=61559768967974" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-yellow transition-colors font-sans font-semibold">🟦 Facebook</a>
            </div>
            <div className="w-12 h-px bg-white/8 mx-auto mb-6" />
            <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} Shrimp Time. Tous droits réservés.</p>
          </div>
        </footer>
      </ErrorBoundary>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <StructuredData />
        <AppContent />
        <FloatingWhatsApp />
        <BackToTop />
      </LanguageProvider>
    </ThemeProvider>
  );
}
