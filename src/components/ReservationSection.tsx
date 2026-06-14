import React, { useState, useRef } from 'react';
import { BRANCHES, TIME_SLOTS, RESERVATION_FORM_INITIAL } from '../data';
import { motion } from 'motion/react';
import { User, Phone, Users, Calendar, Clock, MapPin, MessageSquare, Cake, Heart, ShieldAlert, Wine, Star, Flame, Check } from 'lucide-react';

export default function ReservationSection() {
  const [f, setF] = useState({ ...RESERVATION_FORM_INITIAL });
  const [e, setE] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const cr = useRef<HTMLDivElement>(null);

  const s = (k: string, v: string | number) => {
    setF((p) => ({ ...p, [k]: v }));
    if (e[k]) setE((p) => ({ ...p, [k]: '' }));
  };

  const vp = (p: string) => {
    const c = p.replace(/[\s\-()]+/g, '');
    return /^\+216[2-9]\d{7}$/.test(c) || /^216[2-9]\d{7}$/.test(c) || /^0[2-9]\d{7}$/.test(c) || /^[2-9]\d{7}$/.test(c);
  };

  const msg = () => {
    const b = BRANCHES.find((x) => x.id === f.branch);
    const dp = f.date.split('-');
    let text = `Bonjour Shrimp Time, Réservation pour ${f.guests} personnes le ${dp[2] || ''}/${dp[1] || ''}/${dp[0] || ''} à ${f.time} à la branche ${b?.name || f.branch} Tel: ${f.phone}`;
    if (f.name.trim()) text += ` Nom: ${f.name}`;
    if (f.requests.trim()) text += ` Demandes: ${f.requests}`;
    return text;
  };

  const confetti = () => {
    if (!cr.current) return;
    const el = cr.current;
    const em = ['🦐', '✨', '🦞', '🦑', '🍋', '🐟', '🦀', '🔥'];
    for (let i = 0; i < 55; i++) {
      const p = document.createElement('span');
      p.textContent = em[Math.floor(Math.random() * em.length)];
      p.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:0;font-size:${Math.random() * 20 + 14}px;animation:confetti-fall ${Math.random() * 2 + 1.8}s ease-out forwards;animation-delay:${Math.random() * 0.6}s;pointer-events:none;`;
      el.appendChild(p);
      setTimeout(() => p.remove(), 2800);
    }
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = 'Votre nom est requis';
    if (!f.phone.trim()) er.phone = 'Numéro requis';
    else if (!vp(f.phone)) er.phone = 'Format invalide (ex: 98 900 372)';
    if (f.guests < 1 || f.guests > 20) er.guests = '1 à 20';
    if (!f.date) er.date = 'Choisissez une date';
    if (!f.time) er.time = 'Choisissez une heure';
    if (Object.keys(er).length) {
      setE(er);
      return;
    }

    const b = BRANCHES.find((x) => x.id === f.branch);
    setTimeout(
      () =>
        window.open(
          `https://wa.me/${(b?.phone || '+21698900372').replace('+', '')}?text=${encodeURIComponent(msg())}`,
          '_blank'
        ),
      500
    );
    setOk(true);
    confetti();
    setF({ ...RESERVATION_FORM_INITIAL });
    setTimeout(() => setOk(false), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="py-20 md:py-28 px-4 md:px-10 bg-[#0A1F3F] text-white relative overflow-hidden">
      <div ref={cr} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,211,0,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-[750px] mx-auto relative z-20">
        
        {/* $1M Outer Reservation Layout */}
        <div className="border-[6px] border-double border-[#F5D300] rounded-3xl p-6 md:p-12 bg-[#081830] shadow-2xl relative">
          
          {/* Header Banners */}
          <div className="text-center mb-8">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5D300]/30 to-transparent mb-6" />
            
            <h2 className="font-serif font-black text-3xl md:text-5xl text-white tracking-tight uppercase mb-2 flex items-center justify-center gap-2.5">
              <Flame size={32} className="text-[#F5D300]" />
              <span>Crack Open Your Table</span>
              <Flame size={32} className="text-[#F5D300]" />
            </h2>
            <p className="text-xs md:text-sm text-white/50 tracking-wider font-sans italic">
              &ldquo;Fresh from the boil — straight to your seat&rdquo;
            </p>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5D300]/30 to-transparent mt-6" />
          </div>

          {/* INNER FORM CONTAINER */}
          <div className="border border-white/10 rounded-2xl p-4 md:p-8 bg-[#091b35] relative mt-10">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#091b35] p-3 rounded-full border border-white/10">
              <img src="/logo.png" alt="" className="h-8 w-auto object-contain brightness-110" />
            </div>

            <form onSubmit={submit} className="flex flex-col gap-8 mt-4" noValidate>
              
              {/* FIELDSET 1: WHO'S EATING? */}
              <fieldset className="border border-white/20 rounded-xl p-5 md:p-6 bg-black/10">
                <legend className="px-3 font-serif font-black tracking-widest text-[#F5D300] uppercase text-xs md:text-sm flex items-center gap-1.5">
                  <User size={14} />
                  <span>WHO&apos;S EATING?</span>
                </legend>

                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <User size={12} className="text-white/40" />
                      <span>Full name</span>
                    </label>
                    <input
                      type="text"
                      value={f.name}
                      onChange={(ev) => s('name', ev.target.value)}
                      placeholder="Ahmed Ben Salem"
                      className="inp"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: e.name ? '1.5px solid #DC2626' : '1.5px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                      }}
                    />
                    {e.name && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Phone size={12} className="text-white/40" />
                      <span>Phone number (WhatsApp)</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-4 rounded-xl text-sm font-semibold text-white/50 bg-white/[0.04] border border-white/[0.08]" style={{ whiteSpace: 'nowrap' }}>
                        +216
                      </span>
                      <input
                        type="tel"
                        value={f.phone}
                        onChange={(ev) => s('phone', ev.target.value)}
                        placeholder="98 900 372"
                        className="inp flex-1"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: e.phone ? '1.5px solid #DC2626' : '1.5px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                        }}
                      />
                    </div>
                    {e.phone && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.phone}</p>}
                  </div>
                </div>
              </fieldset>

              {/* FIELDSET 2: YOUR SEAFEAST */}
              <fieldset className="border border-white/20 rounded-xl p-5 md:p-6 bg-black/10">
                <legend className="px-3 font-serif font-black tracking-widest text-[#F5D300] uppercase text-xs md:text-sm flex items-center gap-1.5">
                  <Flame size={14} />
                  <span>YOUR SEAFEAST</span>
                </legend>

                {/* Pickers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Users size={12} className="text-white/40" />
                      <span>How many?</span>
                    </label>
                    <select
                      value={f.guests}
                      onChange={(ev) => s('guests', parseInt(ev.target.value))}
                      className="sel"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                      }}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} style={{ background: '#0A1F3F' }}>
                          {n} {n === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Calendar size={12} className="text-white/40" />
                      <span>Pick a date</span>
                    </label>
                    <input
                      type="date"
                      value={f.date}
                      min={today}
                      onChange={(ev) => s('date', ev.target.value)}
                      className="inp"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: e.date ? '1.5px solid #DC2626' : '1.5px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                      }}
                    />
                    {e.date && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.date}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Clock size={12} className="text-white/40" />
                      <span>Time</span>
                    </label>
                    <select
                      value={f.time}
                      onChange={(ev) => s('time', ev.target.value)}
                      className="sel"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                      }}
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t} style={{ background: '#0A1F3F' }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <MapPin size={12} className="text-white/40" />
                    <span>Which branch?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => s('branch', b.id)}
                        className={`branch-card text-left flex flex-col p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          f.branch === b.id
                            ? 'border-[#F5D300] bg-[#FFFBE6] text-[#0A1F3F]'
                            : 'border-white/10 bg-white/[0.02] text-white hover:border-white/20'
                        }`}
                      >
                        <span className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className={f.branch === b.id ? 'text-[#0A1F3F]' : 'text-[#F5D300]'} />
                            <span>{b.name}</span>
                          </span>
                          {f.branch === b.id ? <Check size={14} className="text-[#0A1F3F]" /> : <span className="w-3 h-3 rounded-full border border-white/30" />}
                        </span>
                        <span className={`text-[11px] font-sans ${f.branch === b.id ? 'text-[#0A1F3F]/70' : 'text-white/40'}`}>
                          {b.address}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* FIELDSET 3: SPECIAL REQUESTS */}
              <fieldset className="border border-white/20 rounded-xl p-5 md:p-6 bg-black/10">
                <legend className="px-3 font-serif font-black tracking-widest text-[#F5D300] uppercase text-xs md:text-sm flex items-center gap-1.5">
                  <MessageSquare size={14} />
                  <span>SPECIAL REQUESTS (OPTIONAL)</span>
                </legend>

                {/* Helper Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { label: 'Birthday', icon: <Cake size={11} /> },
                    { label: 'Proposal', icon: <Heart size={11} /> },
                    { label: 'Allergies', icon: <ShieldAlert size={11} /> },
                    { label: 'Wine preference', icon: <Wine size={11} /> }
                  ].map((item) => {
                    const tag = item.label;
                    const isSelected = f.requests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          s(
                            'requests',
                            isSelected
                              ? f.requests.replace(tag, '').replace(/\s+/g, ' ').trim()
                              : (f.requests + ' ' + tag).trim()
                          )
                        }
                        className="px-3 py-1.5 rounded-full text-xs font-semibold font-sans transition-all border cursor-pointer flex items-center gap-1"
                        style={{
                          background: isSelected ? 'rgba(245,211,0,0.15)' : 'rgba(255,255,255,0.03)',
                          borderColor: isSelected ? '#F5D300' : 'rgba(255,255,255,0.1)',
                          color: isSelected ? '#F5D300' : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {item.icon}
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>

                <textarea
                  value={f.requests}
                  onChange={(ev) => s('requests', ev.target.value)}
                  placeholder="Celebrating birthday — would love a sea view!"
                  rows={2}
                  className="inp resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                />
              </fieldset>

              {/* FIELDSET 4: CRACK THE BOIL CTA BOX */}
              <div className="border border-white/10 rounded-xl p-4 md:p-6 bg-[#07162c]/80 text-center">
                <div className="text-white/60 font-bold text-xs mb-4 tracking-[0.2em] flex items-center justify-center gap-1.5 select-none uppercase">
                  <Flame size={12} className="text-[#F5D300]" />
                  <span>Crack The Boil</span>
                  <Flame size={12} className="text-[#F5D300]" />
                </div>
                
                <button
                  type="submit"
                  className="w-full border-[6px] border-double border-[#0A1F3F] bg-[#F5D300] hover:bg-[#E0C200] text-[#0A1F3F] rounded-xl p-5 md:p-6 font-serif font-black uppercase transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <div className="text-lg md:text-2xl tracking-wider mb-1 flex items-center justify-center gap-2">
                    <Calendar size={20} />
                    <span>Reserve My Table Now</span>
                  </div>
                  <div className="text-xs font-semibold opacity-90 tracking-wide font-sans normal-case">
                    You&apos;ll receive WhatsApp confirmation in 30s
                  </div>
                </button>
              </div>

              {/* Bottom Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-white/10 rounded-xl p-4 bg-white/[0.01] text-center sm:text-left hover:border-white/20 transition-all duration-300">
                  <span className="font-serif font-black text-sm text-[#F5D300] flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
                    <MessageSquare size={14} />
                    <span>WhatsApp Ready</span>
                  </span>
                  <span className="text-xs text-white/50 font-sans">
                    Confirmation in seconds
                  </span>
                </div>
                <div className="border border-white/10 rounded-xl p-4 bg-white/[0.01] text-center sm:text-left hover:border-white/20 transition-all duration-300">
                  <span className="font-serif font-black text-sm text-[#F5D300] flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
                    <Check size={14} />
                    <span>No Deposit Required</span>
                  </span>
                  <span className="text-xs text-white/50 font-sans">
                    Free cancellation up to 2h before
                  </span>
                </div>
              </div>

              {ok && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm font-bold text-[#F5D300] font-sans"
                >
                  🎉 Réservation envoyée ! Ouverture de WhatsApp...
                </motion.p>
              )}

            </form>
          </div>

          {/* Social Proof Footer */}
          <div className="mt-8 text-center border-t border-white/10 pt-8 text-white/40 text-xs md:text-sm flex flex-col gap-2">
            <p className="font-sans font-semibold flex items-center justify-center gap-1.5">
              <Star size={14} className="text-[#F5D300] fill-[#F5D300]" />
              <span>394 happy crustaceans served this week</span>
              <Star size={14} className="text-[#F5D300] fill-[#F5D300]" />
            </p>
            <p className="font-sans italic opacity-85">
              &ldquo;Best shrimp in Tunisia — the boil is INSANE&rdquo; — Karim, La Marsa
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
