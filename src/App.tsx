import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShrimpLogo from './components/ShrimpLogo';
import MenuSection from './components/MenuSection';
import BranchesSection from './components/BranchesSection';
import ReservationSection from './components/ReservationSection';
import { INSTAGRAM_URL, MENU_ITEMS } from './data';
import { BookOpen, Calendar, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds loading time
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, scrollToId?: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (scrollToId) {
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Curated spotlight items for landing preview
  const spotlightItems = MENU_ITEMS.filter(item => 
    item.id === 'e1' || item.id === 'p1' || item.id === 'p2'
  );

  return (
    <div className="min-h-screen premium-gradient-bg selection:bg-brand-yellow/30 relative text-white antialiased font-sans">
      
      {/* 0. Preloader fake loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-brand-navy flex flex-col justify-center items-center select-none"
          >
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              {/* Pulsing Logo */}
              <motion.div
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-8"
              >
                <ShrimpLogo size={100} showText={false} />
              </motion.div>
              
              <h2 className="font-serif text-2xl font-black text-white tracking-widest uppercase mb-1">
                Shrimp Time
              </h2>
              <p className="text-[10px] text-brand-green font-arabic font-black tracking-widest mb-8">
                عيش التجربة
              </p>
              
              <div className="w-full relative">
                {/* Track */}
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  {/* Active progress indicator */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-brand-yellow rounded-full shadow-[0_0_8px_#EAD11B] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Percentage */}
                <span className="text-[10px] font-mono font-black tracking-widest text-brand-yellow mt-3 block text-center">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Global Floating Navbar */}
      <Navbar currentPath={currentPath} navigateTo={navigateTo} />

      {/* 2. Visual Ambient Core Background (Restrained, elegant, non-neon glows) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft elegant amber wash */}
        <div className="absolute top-[8%] right-[12%] w-[450px] h-[450px] bg-brand-yellow/10 rounded-full blur-[150px]" />
        {/* Soft elegant sea mint wash */}
        <div className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence mode="wait">
      {currentPath === '/menu' ? (
        /* ==================== DEDICATED MENU PAGE ==================== */
        <motion.div 
          key="menu-page"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pt-32 pb-4 relative z-10"
        >
          {/* Elegant header */}
          <div className="pt-12 pb-16 px-4 max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-yellow/30 bg-brand-navy/60 text-[10px] md:text-xs font-bold tracking-widest text-brand-yellow uppercase mb-6 shadow-sm">
              <span>Notre Carte Gastronomique</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Sensation de la Mer
            </h1>
            <p className="text-white/60 text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed font-sans uppercase tracking-wider">
              Une fresque gourmande cuisinée à la perfection méditerranéenne
            </p>
            <div className="w-16 h-[1.5px] bg-brand-yellow/40 mx-auto mt-6" />
          </div>

          <MenuSection />
        </motion.div>
      ) : (
        /* ==================== HOMEPAGE / LANDING PAGE ==================== */
        <motion.div 
          key="home-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* 3. Hero Section */}
          <section 
            id="hero" 
            className="min-h-screen relative flex flex-col justify-center items-center px-4 pt-24 pb-16 overflow-hidden"
          >
            {/* Ambient Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-slowly-drifting-water-surface-42938-large.mp4" type="video/mp4" />
            </video>

            {/* Dark elegant premium overlay */}
            <div className="absolute inset-0 bg-brand-navy/85 z-10 pointer-events-none" />

            {/* Soft grid background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.01)_1.5px,transparent_1.5px)] bg-[size:40px_40px] opacity-15 pointer-events-none z-10" />

            {/* Seamless wave divider separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 transform rotate-180">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-[#06152B]">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,72.05,21.84,121.39,30.25,184,41,257.39,68.32,321.39,56.44Z" />
              </svg>
            </div>

            {/* Core Header info stack */}
            <div className="max-w-4xl mx-auto flex flex-col items-center select-none text-center relative z-20 mt-4 px-4">
              
              {/* Regional tag locator */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-yellow/20 bg-brand-navy/90 text-[10px] md:text-xs font-bold tracking-widest text-brand-yellow uppercase mb-8 shadow-md"
              >
                <MapPin size={12} className="text-brand-yellow" />
                <span>La Marsa</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow opacity-40 animate-pulse" />
                <span>L'Aouina</span>
              </motion.div>

              {/* Title Header text string & line */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl md:text-8xl font-black text-white tracking-tight uppercase drop-shadow-2xl"
              >
                Shrimp Time
              </motion.h1>

              {/* Gold/White Separation Line */}
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.8, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="w-48 md:w-64 h-[2px] premium-gold-gradient my-5 md:my-6 rounded-full" 
              />

              {/* Main Subtitle Tagline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-white/90 text-2xl md:text-4xl tracking-wide max-w-xl mx-auto leading-relaxed drop-shadow-lg"
              >
                Live the <span className="text-gold-gradient font-black">expérience</span>
              </motion.p>

              {/* Description Paragraph */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-white/80 text-xs md:text-sm max-w-lg mx-auto mt-4 font-sans leading-relaxed tracking-wider uppercase font-semibold"
              >
                Fruits de mer frais, ambiance premium, deux branches à Tunis
              </motion.p>

              {/* Action Buttons: Gold with Navy Text, 8px border radius */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto px-4 z-30"
              >
                <button
                  onClick={() => navigateTo('/menu')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[8px] font-bold uppercase tracking-widest text-xs text-brand-navy premium-gold-gradient hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg shadow-brand-yellow/20 inline-flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  <span>Voir le Menu</span>
                </button>
                <button
                  onClick={() => scrollToId('reservation')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[8px] font-bold uppercase tracking-widest text-xs text-white border border-white/35 hover:border-brand-yellow hover:text-brand-yellow hover:bg-white/5 active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Calendar size={14} />
                  <span>Réserver</span>
                </button>
              </motion.div>

              {/* Decorative scroll prompt helper */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1, delay: 1.2 }}
                onClick={() => scrollToId('menu')}
                className="hidden md:flex flex-col items-center gap-2 mt-16 cursor-pointer hover:opacity-100 transition-opacity"
              >
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Explorer l'établissement</span>
                <div className="w-6 h-10 rounded-full border border-white/15 p-1 flex justify-center">
                  <div className="w-1.5 h-2 bg-brand-yellow rounded-full animate-bounce mt-1" />
                </div>
              </motion.div>

            </div>
          </section>

          {/* 4. Home Menu Curator (Elegant design-centric spotlight) */}
          <section id="menu" className="py-24 px-4 premium-gradient-bg relative z-10">
            <div className="max-w-6xl mx-auto">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="text-brand-yellow text-xs font-semibold tracking-widest uppercase block mb-3 drop-shadow-md">— L'Art Culinaire —</span>
                <h2 className="font-serif text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">Our Signature Spotlight</h2>
                <p className="text-white/60 text-xs md:text-sm max-w-lg mx-auto mt-4 leading-relaxed font-sans uppercase tracking-wider font-semibold">
                  Un aperçu exclusif de nos plus belles créations côtières.
                </p>
                <div className="w-12 h-[1px] premium-gold-gradient mx-auto mt-6" />
              </motion.div>

              {/* 3 spotlight items grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {spotlightItems.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: idx * 0.15 }}
                    key={item.id} 
                    className="subtle-glass-gold hover:border-brand-yellow/40 hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden flex flex-col h-full cursor-pointer shadow-2xl"
                    onClick={() => navigateTo('/menu')}
                  >
                    <div className="h-52 w-full overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {item.badge && (
                        <span className="absolute top-4 left-4 bg-brand-yellow text-brand-navy font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-baseline gap-2 mb-2">
                          <h3 className="font-serif font-bold text-xl text-white group-hover:text-brand-yellow transition-colors line-clamp-1 drop-shadow-md">
                            {item.name}
                          </h3>
                          <span className="text-gold-gradient font-black text-lg whitespace-nowrap drop-shadow-md">{item.price} <span className="text-xs">TND</span></span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-semibold line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-5">
                        {item.tags?.map(t => (
                          <span key={t} className="text-[9px] bg-white/10 border border-white/5 text-white/80 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Big CTA for Full menu */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center mt-6"
              >
                <button
                  onClick={() => navigateTo('/menu')}
                  className="px-8 py-4 rounded-[8px] premium-gold-gradient text-brand-navy hover:opacity-90 transition-all duration-300 font-bold uppercase tracking-widest text-xs cursor-pointer shadow-lg shadow-brand-yellow/20 inline-flex items-center gap-2"
                >
                  <BookOpen size={14} />
                  <span>Découvrir le menu complet & Composer vos plateaux</span>
                </button>
              </motion.div>

            </div>
          </section>

          {/* 5. Physical branches map view section */}
          <BranchesSection />

          {/* 6. Reservation form component */}
          <ReservationSection />
        </motion.div>
      )}
      </AnimatePresence>

      {/* 7. Shared Dedicated Coastal Footer block */}
      <footer className="bg-brand-navy border-t border-white/5 py-16 px-4 text-center text-sm relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          <ShrimpLogo size={70} showText={false} />
          
          <span className="font-serif text-xl font-bold tracking-widest text-white mt-3 block">SHRIMP TIME TUNISIE</span>
          <span className="text-xs text-brand-green font-arabic block mt-1 tracking-wider">— عيش التجربة —</span>

          {/* Dynamic Social Network block links */}
          <div className="flex items-center gap-5 my-8">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-brand-yellow hover:text-brand-yellow text-white/75 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              title="Rejoignez-nous sur Instagram"
            >
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-brand-yellow hover:text-brand-yellow text-white/75 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              title="Suivez-nous sur Facebook"
            >
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>

          <div className="w-12 h-[1px] bg-white/10 my-4" />

          {/* Footer credentials copy block */}
          <p className="text-white/45 text-xs max-w-md mx-auto leading-relaxed">
            &copy; {new Date().getFullYear()} Shrimp Time Tunisie. Tous droits réservés.<br />
            Spécialités de fruits de mer, seaux de crevettes cajun, pâtes artisanales et poissons frais à Tunis.<br />
            <span className="text-[10px] text-brand-yellow/30 font-bold block mt-1.5 uppercase tracking-widest">Tunis • Sfax • Kelibia</span>
            <span className="mt-4 inline-flex items-center gap-2 text-xs text-white/60 hover:text-brand-yellow transition-colors font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-brand-yellow/30">
              <Mail size={12} className="text-brand-yellow" />
              <span>shrimptime270@gmail.com</span>
            </span>
          </p>

        </div>
      </footer>

    </div>
  );
}
