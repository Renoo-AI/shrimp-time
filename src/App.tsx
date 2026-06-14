import React from 'react';
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import BranchesSection from './components/BranchesSection';
import ReservationSection from './components/ReservationSection';
import { INSTAGRAM_URL, BRANCHES } from './data';
import { motion } from 'motion/react';

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function App() {
  return (
    <main className="min-h-screen antialiased bg-white text-navy">
      <Navbar />

      {/* ═══════════ HERO — Full-bleed seafood, bright + welcoming ═══════════ */}
      <section id="hero" className="relative min-h-[105vh] flex items-center justify-center overflow-hidden">
        <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.35) saturate(1.1)' }} />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/50 via-navy/30 to-navy/70" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full pt-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
            <img src="/logo.png" alt="Shrimp Time" className="w-[180px] md:w-[240px] h-auto mx-auto mb-16 md:mb-20 drop-shadow-2xl" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="display text-[12vw] md:text-[110px] text-white tracking-tight leading-[0.85] drop-shadow-lg">
            Fruits de<br />Mer Frais
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="label-s text-yellow mt-8 tracking-[0.2em]">
            La Marsa & L'Aouina — Tunis
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-12">
            <button onClick={() => go('menu')} className="btn-yellow">Voir le Menu</button>
            <button onClick={() => go('reservation')}
              className="btn-ghost text-white border-white hover:bg-white hover:text-navy">
              Réserver une Table
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="mt-20 md:mt-24 flex items-center gap-3 text-white/50 text-xs font-sans">
            <span className="w-8 h-px bg-white/20" />
            Scroll
            <span className="w-8 h-px bg-white/20" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BRANCHES ═══════════ */}
      <BranchesSection />

      {/* ═══════════ MENU ═══════════ */}
      <MenuSection />

      {/* ═══════════ RESERVATION ═══════════ */}
      <ReservationSection />

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-20 px-6 md:px-10" style={{ background: '#0A1F3F' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <img src="/logo.png" alt="Shrimp Time" className="h-10 w-auto mb-6 brightness-200" />
              <div className="flex flex-col gap-1">
                {BRANCHES.map((b) => (
                  <p key={b.id} className="italic-s text-base text-white/60">{b.name} — {b.address}</p>
                ))}
              </div>
              <a href={`tel:${BRANCHES[0].phone}`} className="label-s text-yellow mt-6 block">
                {BRANCHES[0].phoneDisplay}
              </a>
            </div>
            <div className="flex flex-col gap-4 items-start md:items-end">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="label-s text-white/50 hover:text-yellow transition-colors">
                Instagram @shrimp_.time
              </a>
              <p className="text-xs text-white/20 font-sans">&copy; {new Date().getFullYear()} Shrimp Time. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
