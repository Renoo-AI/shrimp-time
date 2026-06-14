import React from 'react';
import { BRANCHES } from '../data';
import { MapPin, Clock, Phone, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function BranchesSection() {
  const [activeBranchId, setActiveBranchId] = React.useState('marsa_zephyr');
  
  const activeBranch = BRANCHES.find(b => b.id === activeBranchId) || BRANCHES[0];

  return (
    <section id="branches" className="py-16 md:py-24 px-4 premium-gradient-bg relative">
      {/* Visual background ripple overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,209,27,0.06),rgba(0,0,0,0))] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-brand-yellow uppercase text-[11px] sm:text-xs tracking-widest font-extrabold block mb-2 font-mono drop-shadow-md">
            Nos Établissements en Tunisie
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white tracking-tight uppercase drop-shadow-lg">
            Trois Adresses d'Exception
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-4 px-2 font-sans font-semibold leading-relaxed">
            Découvrez nos trois tables d'exception à Tunis. Choisissez un établissement ci-dessous pour voir ses horaires, son adresse et ses détails.
          </p>
          <div className="w-16 h-[1.5px] premium-gold-gradient mx-auto mt-6" />
        </motion.div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto">
          {BRANCHES.map((branch) => {
            const isActive = branch.id === activeBranchId;
            const label = branch.id === 'marsa_plage' ? 'Plage' : branch.id === 'marsa_zephyr' ? 'Zéphir' : 'Ville';
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`py-3 px-6 rounded-[12px] border text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md flex-1 min-w-[120px] ${
                  isActive 
                    ? 'premium-gold-gradient text-brand-navy border-brand-yellow font-black' 
                    : 'bg-brand-navy/60 text-white/70 border-brand-yellow/20 hover:border-brand-yellow/60 hover:text-white'
                }`}
              >
                <MapPin size={14} className={isActive ? 'text-brand-navy' : 'text-brand-yellow'} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Branch Details Card */}
        <motion.div
          key={activeBranch.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-[16px] bg-brand-navy/60 backdrop-blur-md text-white border border-brand-yellow/35 hover:border-brand-yellow hover:shadow-2xl hover:shadow-brand-yellow/10 transition-all duration-300 overflow-hidden shadow-xl max-w-4xl mx-auto"
        >
          {/* Visual Top Bar decoration */}
          <div className="h-1.5 w-full premium-gold-gradient" />

          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
            {/* Left Column: Info & Actions */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/5 text-white border border-white/10">
                    {activeBranch.id === 'marsa_plage' ? 'Plage' : activeBranch.id === 'marsa_zephyr' ? 'Zéphir' : 'Ville'}
                  </span>
                </div>

                <h3 className="text-xl md:text-3xl font-serif font-black text-white hover:text-brand-yellow transition-colors mb-1 leading-tight uppercase">
                  {activeBranch.name}
                </h3>
                <p className="text-brand-yellow font-arabic font-bold text-xs md:text-sm mb-4">
                  {activeBranch.id === 'marsa_zephyr' 
                    ? 'فرع المرسى (قبالة زفير)' 
                    : activeBranch.id === 'marsa_plage' 
                    ? 'فرع المرسى (قبالة قبة الهواء)' 
                    : 'فرع العوينة (تحت مصحة عائشة)'}
                </p>

                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-sans font-medium">
                  {activeBranch.ambiance}
                </p>
              </div>

              {/* Call and Maps Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href={activeBranch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-[8px] premium-gold-gradient hover:opacity-90 active:scale-95 text-brand-navy font-black text-xs uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Compass size={14} />
                  <span>Google Maps</span>
                </a>
                
                <a 
                  href={`tel:${activeBranch.phone}`}
                  className="flex-1 py-3 rounded-[8px] bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/25 font-black text-xs uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Phone size={14} className="text-brand-yellow" />
                  <span>Appeler ({activeBranch.phoneDisplay})</span>
                </a>
              </div>
            </div>

            {/* Right Column: Address and Operating Hours Info */}
            <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-[12px] p-6 flex flex-col justify-center gap-6">
              {/* Hourly block */}
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-black leading-none mb-1.5 font-mono">Horaires</span>
                  <span className="text-xs sm:text-sm text-white font-semibold leading-relaxed">{activeBranch.hours}</span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              {/* Address block */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-black leading-none mb-1.5 font-mono">Notre Adresse</span>
                  <span className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">{activeBranch.address}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
