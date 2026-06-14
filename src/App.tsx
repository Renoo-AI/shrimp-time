import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MENU_DATA = {
  entrées: [
    { name: 'Crevettes grillées', price: 28, desc: 'Sauce cocktail, citron, salade verte' },
    { name: 'Calamars frits', price: 22, desc: 'Panure légère, sauce tartare' },
    { name: 'Huîtres fraîches', price: 35, desc: 'Citron, vinaigre échalote' },
  ],
  plats: [
    { name: 'Grilled Fish du jour', price: 45, desc: 'Légumes de saison, riz safrané' },
    { name: 'Pâtes aux crevettes', price: 38, desc: 'Sauce crème, tomates confites' },
    { name: 'Homard grillé', price: 120, desc: 'Beurre citronné, herbes fraîches' },
  ],
  desserts: [
    { name: 'Fondant au chocolat', price: 15, desc: 'Cœur coulant, glace vanille' },
    { name: 'Tarte au citron meringuée', price: 14, desc: 'Meringue italienne' },
    { name: 'Glace artisanale', price: 12, desc: 'Parfums du moment' },
  ]
};

const BRANCHES = [
  { id: 'marsa', name: 'LA MARSA', desc: 'Plage, face Zéphyr', phone: '216 71 234 567' },
  { id: 'aouina', name: "L'AOUINA", desc: 'Sous le Centre Médical Aïcha', phone: '216 71 234 568' }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'entrées' | 'plats' | 'desserts'>('plats');
  const [formState, setFormState] = useState({
    branch: 'marsa',
    phone: '',
    guests: '2',
    date: '',
    time: '19:00'
  });
  const [formErrors, setFormErrors] = useState<{phone?: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (formErrors.phone && e.target.name === 'phone') {
      setFormErrors({});
    }
  };

  const submitReservation = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone
    const cleanPhone = formState.phone.replace(/[\s+]/g, '');
    let isValid = false;

    // Check if it starts with 216 and has 8 digits after, or just 8 digits starting with 2,5,9 etc
    if (/^(216)?[2597][0-9]{7}$/.test(cleanPhone)) {
        isValid = true;
    }

    if (!isValid) {
      setFormErrors({ phone: 'Numéro invalide. Ex: 29 123 456' });
      return;
    }

    const branchObj = BRANCHES.find(b => b.id === formState.branch) || BRANCHES[0];
    const targetPhone = branchObj.phone.replace(/[\s+]/g, '');

    const message = `Bonjour Shrimp Time,
Réservation pour ${formState.guests} personnes
le ${formState.date.split('-').reverse().join('/')} à ${formState.time}
à la branche ${branchObj.name}
Tel: ${formState.phone}`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setShowSuccess(true);
    setFormState({ branch: 'marsa', phone: '', guests: '2', date: '', time: '19:00' });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-white text-brand-navy font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[70px] nav-blur z-50 px-4 md:px-10 flex items-center justify-between">
        <div className="h-10 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img src="/logo.png" alt="Shrimp Time logo" className="h-full object-contain" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          <button onClick={() => window.scrollTo(0, 0)} className="hover:text-brand-yellow transition-colors cursor-pointer">Accueil</button>
          <button onClick={() => scrollToId('menu')} className="hover:text-brand-yellow transition-colors cursor-pointer">Menu</button>
          <button onClick={() => scrollToId('branches')} className="hover:text-brand-yellow transition-colors cursor-pointer">Branches</button>
          <button onClick={() => scrollToId('reservation')} className="hover:text-brand-yellow transition-colors cursor-pointer">Réservation</button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed top-[70px] left-0 right-0 bg-brand-navy/95 backdrop-blur-md z-40 flex flex-col p-6 gap-6 text-white border-t border-white/10 shadow-xl"
        >
          <button onClick={() => window.scrollTo(0, 0)} className="text-left text-lg font-medium hover:text-brand-yellow transition-colors duration-300">Accueil</button>
          <button onClick={() => scrollToId('menu')} className="text-left text-lg font-medium hover:text-brand-yellow transition-colors duration-300">Menu</button>
          <button onClick={() => scrollToId('branches')} className="text-left text-lg font-medium hover:text-brand-yellow transition-colors duration-300">Branches</button>
          <button onClick={() => scrollToId('reservation')} className="text-left text-lg font-medium hover:text-brand-yellow transition-colors duration-300">Réservation</button>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen relative flex flex-col items-center justify-center pt-[70px] bg-brand-navy">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-15"
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
          <img src="/logo.png" alt="Shrimp Time" className="w-[80%] max-w-[300px] h-auto mb-4 drop-shadow-2xl" />

          <p className="text-brand-green text-[18px] uppercase tracking-[2px] font-bold mt-4 mb-10">
            Vivez l'expérience
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-6">
            <button onClick={() => scrollToId('menu')} className="btn-primary w-full md:w-auto">
              📖 Voir le Menu
            </button>
            <button onClick={() => scrollToId('reservation')} className="btn-secondary w-full md:w-auto">
              📞 Réserver
            </button>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="py-20 md:py-[100px] px-5 md:px-10 bg-brand-white max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-[36px] md:text-[48px] text-brand-navy font-serif">Nos Branches</h2>
          <div className="w-[60px] h-[3px] bg-brand-yellow mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BRANCHES.map(branch => (
            <motion.div
              key={branch.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-[30px] rounded-[12px] border border-brand-yellow/20 card-shadow bg-white flex flex-col items-center text-center"
            >
              <span className="text-[40px] mb-4">🦐</span>
              <h3 className="text-[24px] font-serif text-brand-navy mb-2">{branch.name}</h3>
              <p className="text-brand-muted text-[16px] mb-6 h-12">{branch.desc}</p>
              <p className="text-brand-navy font-bold text-[18px] mb-6">📞 {branch.phone}</p>
              <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="btn-primary w-full inline-block">
                Appeler
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 md:py-[100px] px-5 md:px-10 bg-brand-light-grey">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[36px] md:text-[48px] text-brand-navy font-serif">Notre Menu</h2>
            <div className="w-[60px] h-[3px] bg-brand-yellow mx-auto mt-2"></div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(['entrées', 'plats', 'desserts'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold capitalize transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-brand-yellow text-brand-navy border border-brand-yellow'
                    : 'border border-brand-navy text-brand-navy hover:bg-brand-yellow/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Menu List */}
          <div className="max-w-[700px] mx-auto bg-white rounded-[12px] p-2 md:p-6 card-shadow border border-brand-yellow/20 min-h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                {MENU_DATA[activeTab].map((item, idx, arr) => (
                  <div key={item.name} className={`py-4 px-2 flex justify-between gap-4 ${idx !== arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex-1">
                      <p className="font-bold text-[16px] text-brand-navy mb-1">{idx === 0 ? '🦐' : idx === 1 ? '🦑' : '🦪'} {item.name}</p>
                      <p className="text-[14px] text-brand-muted">{item.desc}</p>
                    </div>
                    <div className="text-brand-yellow font-bold text-[18px] whitespace-nowrap pt-1">
                      {item.price} DT
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-20 md:py-[100px] px-5 md:px-10 bg-brand-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[36px] md:text-[48px] text-brand-navy font-serif">Réserver une Table</h2>
            <div className="w-[60px] h-[3px] bg-brand-yellow mx-auto mt-2 mb-4"></div>
            <p className="text-[16px] text-brand-muted">Réservez en ligne, sans appel</p>
          </div>

          <form onSubmit={submitReservation} className="max-w-[500px] mx-auto bg-white p-[30px] rounded-[12px] card-shadow border border-brand-yellow/20 flex flex-col gap-5 relative">

            <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center rounded-[12px] text-center p-6 backdrop-blur-sm"
              >
                <span className="text-4xl mb-4">🎉</span>
                <p className="text-lg font-bold text-brand-navy">Redirection vers WhatsApp...</p>
                <p className="text-sm text-brand-muted mt-2">Merci pour votre réservation !</p>
              </motion.div>
            )}
            </AnimatePresence>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-brand-navy">Choisissez votre branche *</label>
              <select
                name="branch"
                value={formState.branch}
                onChange={handleFormChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 bg-white"
              >
                <option value="marsa">La Marsa</option>
                <option value="aouina">L'Aouina</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-brand-navy">📱 Votre numéro de téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleFormChange}
                placeholder="Ex: 29 123 456"
                required
                className={`w-full p-3 rounded-lg border ${formErrors.phone ? 'border-brand-error focus:ring-brand-error/30' : 'border-gray-300 focus:border-brand-yellow focus:ring-brand-yellow/30'} focus:outline-none focus:ring-2 bg-white`}
              />
              {formErrors.phone && <p className="text-brand-error text-xs font-medium">{formErrors.phone}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-brand-navy">👥 Nombre de personnes *</label>
              <select
                name="guests"
                value={formState.guests}
                onChange={handleFormChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 bg-white"
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-brand-navy">📅 Date souhaitée *</label>
              <input
                type="date"
                name="date"
                value={formState.date}
                onChange={handleFormChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-brand-navy">🕐 Heure souhaitée *</label>
              <select
                name="time"
                value={formState.time}
                onChange={handleFormChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 bg-white"
              >
                {['12:00','12:30','13:00','13:30','14:00','14:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              RÉSERVER MAINTENANT →
            </button>
            <p className="text-center text-[14px] text-brand-muted mt-2">
              ⚡ Sans engagement. Confirmation immédiate via WhatsApp.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy py-12 px-5 text-center text-white">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[32px]">🦐</span>
          <p className="font-serif text-[20px] mb-2">Shrimp Time</p>
          <p className="text-[14px] text-white/80">📍 La Marsa & L'Aouina</p>
          <p className="text-[14px] text-white/80">📞 71 234 567 / 71 234 568</p>
          <a href="#" className="text-[14px] text-brand-yellow hover:underline mt-2">📸 @shrimp_.time</a>
          
          <div className="w-[40px] h-[1px] bg-white/20 my-6"></div>
          
          <p className="text-[12px] text-white/50">
            &copy; {new Date().getFullYear()} Shrimp Time. Tous droits réservés.
          </p>
        </div>
      </footer>

      <style>{`

      `}</style>
    </div>
  );
}
