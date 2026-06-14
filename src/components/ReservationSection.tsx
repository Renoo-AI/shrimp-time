import React, { useState } from 'react';
import { BRANCHES } from '../data';
import { ReservationState } from '../types';
import { MessageSquare, Phone, Calendar, User, Users, Clock, AlignLeft, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReservationSection() {
  const [formData, setFormData] = useState<ReservationState>({
    branchId: 'marsa_zephyr',
    guestCount: 2,
    date: '',
    time: '20:00',
    customerName: '',
    customerPhone: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingChoice, setBookingChoice] = useState<'whatsapp' | 'call'>('whatsapp');

  const selectedBranchObj = BRANCHES.find(b => b.id === formData.branchId) || BRANCHES[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGuestCountChange = (count: number) => {
    setFormData(prev => ({ ...prev, guestCount: count }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Votre nom est requis pour la réservation.';
    }
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Un numéro de téléphone de contact est obligatoire.';
    } else if (!/^[0-9+ ]{8,15}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = 'Format de téléphone invalide (8 chiffres minimum en Tunisie).';
    }
    if (!formData.date) {
      newErrors.date = 'Veuillez choisir une date pour votre table.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const executeReservation = (type: 'whatsapp' | 'call') => {
    if (!validateForm()) return;

    const branchName = selectedBranchObj.name;
    const dateFormatted = formData.date.split('-').reverse().join('/');
    
    if (type === 'whatsapp') {
      const message = `Bonjour Shrimp Time, je souhaite réserver une table pour ce qui suit :
• Établissement: ${branchName}
• Nombre d'invités: ${formData.guestCount} personnes
• Date: ${dateFormatted}
• Heure: ${formData.time}
• Nom client: ${formData.customerName}
• Téléphone: ${formData.customerPhone}
${formData.specialRequests ? `• Demandes spéciales/Plats: ${formData.specialRequests}` : ''}
Merci de me confirmer la disponibilité !`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${selectedBranchObj.phone.replace('+', '')}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    } else {
      window.location.href = `tel:${selectedBranchObj.phone}`;
    }
  };

  return (
    <section id="reservation" className="py-16 md:py-24 px-4 premium-gradient-bg relative">
      {/* Decorative ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10" id="booking-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-brand-yellow uppercase text-xs sm:text-sm tracking-widest font-extrabold block mb-2 font-mono drop-shadow-md">
            Service de Conciergerie
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-white tracking-tight uppercase drop-shadow-lg">
            Réserver une Table
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-4 px-4 font-sans font-semibold leading-relaxed">
            Planifiez votre escale gourmande. Votre demande sera instantanément reliée à notre équipe de service pour validation directe.
          </p>
          <div className="w-16 h-[1.5px] premium-gold-gradient mx-auto mt-6" />
        </motion.div>

        {/* Interactive Booking Panel - Premium Dark Theme, Gold Border */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-[12px] p-6 md:p-10 bg-brand-navy/60 backdrop-blur-md border border-brand-yellow/35 shadow-2xl text-white"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Left Options Form Column */}
            <div className="flex flex-col gap-6">
              
              {/* Branch Selector */}
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                  <MapPin size={14} className="text-brand-yellow" />
                  <span>1. Établissement</span>
                </label>
                <select
                  name="branchId"
                  id="branch-selector"
                  value={formData.branchId}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-[8px] px-4 py-3 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/20 transition-all duration-300 cursor-pointer"
                >
                  {BRANCHES.map(branch => (
                    <option key={branch.id} value={branch.id} className="bg-brand-navy text-white">{branch.name}</option>
                  ))}
                </select>
                <p className="text-[11px] text-white/60 mt-1.5 leading-relaxed font-semibold">
                  Numéro de liaison directe : <span className="text-brand-yellow font-bold">{selectedBranchObj.phoneDisplay}</span>
                </p>
              </div>

              {/* Guest Count Segmented Buttons */}
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                  <Users size={14} className="text-brand-yellow" />
                  <span>2. Nombre d'Invités</span>
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleGuestCountChange(num)}
                      className={`py-3 rounded-[8px] text-sm font-bold transition-all cursor-pointer ${
                        formData.guestCount === num
                          ? 'bg-brand-yellow text-brand-navy scale-105 shadow-md shadow-brand-yellow/15 font-black border border-brand-yellow'
                          : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {num === 6 ? '6+' : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-yellow" />
                    <span>3. Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date-input"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-transparent px-0 py-3 border-0 border-b border-white/20 text-white text-sm focus:outline-none focus:border-brand-yellow focus:ring-0 transition-all duration-500 rounded-none cursor-pointer placeholder-white/30"
                  />
                  {errors.date && (
                    <p className="text-[10px] text-red-400 mt-1 font-bold">{errors.date}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                    <Clock size={14} className="text-brand-yellow" />
                    <span>4. Heure</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-transparent px-0 py-3 border-0 border-b border-white/20 text-white text-sm focus:outline-none focus:border-brand-yellow focus:ring-0 transition-all duration-500 rounded-none cursor-pointer placeholder-white/30"
                  >
                    {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'].map(t => (
                      <option key={t} value={t} className="bg-brand-navy text-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Right Contact Form Column */}
            <div className="flex flex-col gap-6">
              
              {/* Customer Name */}
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                  <User size={14} className="text-brand-yellow" />
                  <span>5. Votre Nom Complet</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Ex: Mohamed Ben Ali"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent px-0 py-3 border-0 border-b border-white/20 text-white text-sm focus:outline-none focus:border-brand-yellow focus:ring-0 transition-all duration-500 rounded-none placeholder-white/30"
                />
                {errors.customerName && (
                  <p className="text-[10px] text-red-400 mt-1 font-bold">{errors.customerName}</p>
                )}
              </div>

              {/* Customer Phone */}
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                  <Phone size={14} className="text-brand-yellow" />
                  <span>6. Numéro de Mobile (+216)</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="Ex: 29 220 220"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full bg-transparent px-0 py-3 border-0 border-b border-white/20 text-white text-sm focus:outline-none focus:border-brand-yellow focus:ring-0 transition-all duration-500 rounded-none placeholder-white/30"
                />
                {errors.customerPhone && (
                  <p className="text-[10px] text-red-400 mt-1 font-bold">{errors.customerPhone}</p>
                )}
              </div>

              {/* Special Request or plate preselected */}
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-white font-black mb-2 flex items-center gap-1.5">
                  <AlignLeft size={14} className="text-brand-yellow" />
                  <span>7. Demandes Spéciales / Plats favoris</span>
                </label>
                <textarea
                  name="specialRequests"
                  id="special-requests"
                  placeholder="Ex: Table en terrasse près du bord de mer, anniversaire, chaises hautes..."
                  rows={2}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="w-full bg-transparent px-0 py-3 border-0 border-b border-white/20 text-white text-sm focus:outline-none focus:border-brand-yellow focus:ring-0 transition-all duration-500 rounded-none resize-none placeholder-white/30"
                />
              </div>

            </div>

          </div>

          <div className="w-full h-[1px] bg-white/10 my-8" />

          {/* Action Choice Segment */}
          <div className="flex flex-col gap-6 items-center">
            
            <span className="text-[11px] tracking-widest text-white/60 uppercase font-black leading-none text-center">
              Choisissez votre moyen de confirmation libre
            </span>

            {/* Selector Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <button
                type="button"
                onClick={() => setBookingChoice('whatsapp')}
                className={`py-3.5 px-5 rounded-[8px] border font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  bookingChoice === 'whatsapp'
                    ? 'bg-brand-yellow text-brand-navy border-brand-yellow'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <MessageSquare size={16} />
                <span>Via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingChoice('call')}
                className={`py-3.5 px-5 rounded-[8px] border font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  bookingChoice === 'call'
                    ? 'bg-brand-yellow text-brand-navy border-brand-yellow'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <Phone size={16} />
                <span>Appel Direct</span>
              </button>
            </div>

            {/* Dynamic Interactive Call to Action button */}
            {bookingChoice === 'whatsapp' ? (
              <button
                onClick={() => executeReservation('whatsapp')}
                className="w-full max-w-md py-4 rounded-[8px] font-black uppercase tracking-wider text-xs text-white bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Confirmer par WhatsApp Direct</span>
              </button>
            ) : (
              <button
                onClick={() => executeReservation('call')}
                className="w-full max-w-md py-4 rounded-[8px] font-black uppercase tracking-wider text-xs text-brand-navy bg-brand-yellow hover:bg-brand-yellow/90 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                <span>Appeler l'établissement directement</span>
              </button>
            )}

            <p className="text-[10px] text-white/60 leading-relaxed text-center max-w-md font-bold uppercase mt-2 flex items-center justify-center gap-1.5 tracking-wider font-mono">
              <ShieldCheck size={12} className="text-brand-yellow" />
              <span>Placement prioritaire bloqué pendant 15 minutes</span>
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
