import React, { useState, useRef } from 'react';
import { BRANCHES, TIME_SLOTS, RESERVATION_FORM_INITIAL } from '../data';
import { motion } from 'motion/react';

export default function ReservationSection() {
  const [form, setForm] = useState({ ...RESERVATION_FORM_INITIAL });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  const set = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validateTunisianPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-()]+/g, '');
    if (/^\+216/.test(cleaned)) return /^\+216[2-9]\d{7}$/.test(cleaned);
    if (/^216/.test(cleaned)) return /^216[2-9]\d{7}$/.test(cleaned);
    if (/^0/.test(cleaned)) return /^0[2-9]\d{7}$/.test(cleaned);
    return /^[2-9]\d{7}$/.test(cleaned);
  };

  const buildWhatsAppMessage = (): string => {
    const branch = BRANCHES.find((b) => b.id === form.branch);
    const branchName = branch ? branch.name : form.branch;
    const dateParts = form.date.split('-');
    const dateFormatted = `${dateParts[2] || ''}/${dateParts[1] || ''}/${dateParts[0] || ''}`;
    return `Bonjour Shrimp Time, R\u00e9servation pour ${form.guests} personnes le ${dateFormatted} \u00e0 ${form.time} \u00e0 la branche ${branchName} Tel: ${form.phone}`;
  };

  const launchConfetti = () => {
    if (!confettiRef.current) return;
    const container = confettiRef.current;
    const emojis = ['🦐', '✨', '🦞', '🦑', '🍋'];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('span');
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.cssText = `
        position: absolute; left: ${Math.random() * 100}%; top: 0;
        font-size: ${Math.random() * 20 + 14}px;
        animation: confetti-fall ${Math.random() * 2 + 1.5}s ease-out forwards;
        animation-delay: ${Math.random() * 0.5}s;
        pointer-events: none;
      `;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!form.branch) errs.branch = 'Choisissez une branche';
    if (!form.phone.trim()) {
      errs.phone = 'Numéro requis';
    } else if (!validateTunisianPhone(form.phone)) {
      errs.phone = 'Numéro tunisien invalide';
    }
    if (form.guests < 1 || form.guests > 20) errs.guests = '1–20 personnes';
    if (!form.date) errs.date = 'Date requise';
    if (!form.time) errs.time = 'Heure requise';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const branch = BRANCHES.find((b) => b.id === form.branch);
    const phone = branch ? branch.phone.replace('+', '') : '21698900372';
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

    setSuccess(true);
    launchConfetti();
    setForm({ ...RESERVATION_FORM_INITIAL });

    setTimeout(() => window.open(waUrl, '_blank'), 600);
    setTimeout(() => setSuccess(false), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="relative py-28 md:py-36 px-8 md:px-16 lg:px-24 noise-section" style={{ backgroundColor: '#080B14' }}>
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

      <div className="max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          
          {/* Left — Heading + context */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-dark mb-4 font-semibold"
            >
              Service de Conciergerie
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl font-black text-parchment tracking-tight"
            >
              Réserver une Table
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="accent-line mt-8"
              style={{ transformOrigin: 'left' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-sans text-sm text-muted-dark mt-8 leading-relaxed max-w-[300px]"
            >
              Réservez en ligne, sans appel. Confirmation immédiate via WhatsApp.
            </motion.p>
          </div>

          {/* Right — Brutalist form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Branch */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-dark mb-3 font-semibold">
                  Branche
                </label>
                <select
                  value={form.branch}
                  onChange={(e) => set('branch', e.target.value)}
                  className="brutal-select"
                >
                  <option value="">-- Sélectionnez --</option>
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                {errors.branch && <p className="font-sans text-xs text-error mt-2">{errors.branch}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-dark mb-3 font-semibold">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="98 900 372"
                  className="brutal-input"
                />
                {errors.phone && <p className="font-sans text-xs text-error mt-2">{errors.phone}</p>}
              </div>

              {/* Guests + Date row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-dark mb-3 font-semibold">
                    Personnes
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => set('guests', parseInt(e.target.value))}
                    className="brutal-select"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-dark mb-3 font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => set('date', e.target.value)}
                    className="brutal-input"
                  />
                  {errors.date && <p className="font-sans text-xs text-error mt-2">{errors.date}</p>}
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-dark mb-3 font-semibold">
                  Heure
                </label>
                <select
                  value={form.time}
                  onChange={(e) => set('time', e.target.value)}
                  className="brutal-select"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary w-full mt-4">
                Réserver maintenant →
              </button>

              {success && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-xs text-olive text-center"
                >
                  Réservation envoyée. Ouverture de WhatsApp...
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
