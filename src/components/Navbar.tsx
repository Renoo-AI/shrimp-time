import React, { useState, useEffect } from 'react';
import ShrimpLogo from './ShrimpLogo';
import { BRAND_COLORS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigateTo: (path: string, scrollToId?: string) => void;
}

export default function Navbar({ currentPath, navigateTo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (currentPath === '/menu') {
      setActiveSection('menu');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'menu', 'branches', 'reservation'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      if (currentPath === '/menu') {
        navigateTo('/');
      } else {
        const el = document.getElementById('hero');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'menu') {
      if (currentPath !== '/menu') {
        navigateTo('/menu');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // branches or reservation
      if (currentPath === '/menu') {
        navigateTo('/', id);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl transition-all duration-300 rounded-full px-5 md:px-8 py-2 md:py-3 flex items-center justify-between border ${
          isScrolled
            ? 'bg-brand-navy/90 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(234,209,27,0.15)] border-brand-yellow/30'
            : 'bg-brand-navy/30 backdrop-blur-md border-white/10'
        }`}
        id="app-navbar"
      >
        {/* Brand Trigger with Mini SVG Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ShrimpLogo size={42} showText={false} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-white text-base tracking-widest leading-none group-hover:text-brand-yellow transition-colors duration-300">
              SHRIMP TIME
            </span>
            <span className="text-[9px] text-brand-green font-arabic font-black self-start tracking-widest mt-0.5">
              عيش التجربة
            </span>
          </div>
        </div>

        {/* Desktop Anchor Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'hero', label: 'Accueil' },
            { id: 'menu', label: 'Notre Menu' },
            { id: 'branches', label: 'Branches' },
            { id: 'reservation', label: 'Réservation' },
          ].map(item => {
            const isItemActive = (currentPath === '/menu' && item.id === 'menu') || (currentPath === '/' && activeSection === item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-black tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer hover:text-brand-yellow ${
                  isItemActive ? 'text-brand-yellow' : 'text-white/80'
                }`}
              >
                {item.label}
                {isItemActive && (
                  <motion.span 
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-yellow rounded-full shadow-[0_0_8px_#EAD11B]" 
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA Ring with Olive/Lemon Accent */}
        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('reservation')}
            className="px-5 py-2.5 rounded-[30px] font-black text-[10px] tracking-widest uppercase cursor-pointer text-brand-navy premium-gold-gradient shadow-[0_4px_15px_rgba(234,209,27,0.3)] hover:shadow-[0_4px_20px_rgba(234,209,27,0.5)] transition-all flex items-center gap-2"
          >
            <Calendar size={12} />
            <span>Réserver maintenant</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Burger button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-white hover:text-brand-yellow focus:outline-none cursor-pointer transition-colors duration-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Glass Drawer Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-2xl flex flex-col justify-center items-center p-8"
          >
            {/* Logo element inside drawer */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 select-none text-center"
            >
              <div className="inline-block">
                <ShrimpLogo size={90} showText={false} />
              </div>
              <div className="mt-4">
                <span className="font-serif text-2xl font-black text-white tracking-widest block">SHRIMP TIME</span>
                <span className="text-xs text-brand-green font-arabic block mt-1 tracking-wider">— عيش التجربة —</span>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              {[
                { id: 'hero', label: 'Accueil' },
                { id: 'menu', label: 'Le Menu Gastronomique' },
                { id: 'branches', label: 'Nos Branches' },
                { id: 'reservation', label: 'Réserver une Table' },
              ].map((item, index) => {
                const isItemActive = (currentPath === '/menu' && item.id === 'menu') || (currentPath === '/' && activeSection === item.id);
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-3 px-6 w-full text-center text-sm font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
                      isItemActive
                        ? 'text-brand-navy bg-brand-yellow font-black shadow-[0_4px_15px_rgba(234,209,27,0.3)]'
                        : 'text-white/80 hover:bg-white/5 border border-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNavClick('reservation')}
                className="mt-4 w-full py-3.5 rounded-[30px] font-black uppercase tracking-widest text-xs text-brand-navy premium-gold-gradient shadow-[0_4px_15px_rgba(234,209,27,0.3)] hover:shadow-[0_4px_20px_rgba(234,209,27,0.5)] transition-all flex items-center justify-center gap-2 border-none"
              >
                <Calendar size={14} />
                <span>RÉSERVER UNE TABLE</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
