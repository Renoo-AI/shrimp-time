import React, { useState, useRef } from 'react';
import { BRANCHES, TIME_SLOTS, RESERVATION_FORM_INITIAL } from '../data';
import { motion } from 'motion/react';

export default function ReservationSection() {
  const [f, setF] = useState({ ...RESERVATION_FORM_INITIAL });
  const [e, setE] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const cr = useRef<HTMLDivElement>(null);

  const s = (k: string, v: string | number) => { setF((p) => ({ ...p, [k]: v })); if (e[k]) setE((p) => ({ ...p, [k]: '' })); };

  const vp = (p: string) => { const c = p.replace(/[\s\-()]+/g, ''); if (/^\+216/.test(c)) return /^\+216[2-9]\d{7}$/.test(c); if (/^216/.test(c)) return /^216[2-9]\d{7}$/.test(c); if (/^0/.test(c)) return /^0[2-9]\d{7}$/.test(c); return /^[2-9]\d{7}$/.test(c); };

  const msg = () => {
    const b = BRANCHES.find((x) => x.id === f.branch);
    const dp = f.date.split('-');
    return `Bonjour Shrimp Time, Réservation pour ${f.guests} personnes le ${dp[2] || ''}/${dp[1] || ''}/${dp[0] || ''} à ${f.time} à la branche ${b?.name || f.branch} Tel: ${f.phone}`;
  };

  const confetti = () => {
    if (!cr.current) return;
    const el = cr.current;
    const em = ['🦐', '✨', '🦞', '🦑', '🍋'];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('span');
      p.textContent = em[Math.floor(Math.random() * em.length)];
      p.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:0;font-size:${Math.random() * 18 + 12}px;animation:confetti-fall ${Math.random() * 2 + 1.5}s ease-out forwards;animation-delay:${Math.random() * 0.5}s;pointer-events:none;`;
      el.appendChild(p);
      setTimeout(() => p.remove(), 2500);
    }
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const er: Record<string, string> = {};
    if (!f.branch) er.branch = 'Choisissez une branche';
    if (!f.phone.trim()) er.phone = 'Numéro requis';
    else if (!vp(f.phone)) er.phone = 'Numéro tunisien invalide';
    if (f.guests < 1 || f.guests > 20) er.guests = '1–20 personnes';
    if (!f.date) er.date = 'Date requise';
    if (!f.time) er.time = 'Heure requise';
    if (Object.keys(er).length) { setE(er); return; }

    const b = BRANCHES.find((x) => x.id === f.branch);
    setTimeout(() => window.open(`https://wa.me/${(b?.phone || '+21698900372').replace('+', '')}?text=${encodeURIComponent(msg())}`, '_blank'), 500);
    setOk(true); confetti(); setF({ ...RESERVATION_FORM_INITIAL }); setTimeout(() => setOk(false), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="py-24 md:py-32 px-6 md:px-10 relative" style={{ background: '#F8F6F2' }}>
      <div ref={cr} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

      <div className="max-w-[500px] mx-auto relative z-20">
        
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="text-center mb-12"
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl mb-4 block">🍋</motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="heading text-4xl md:text-5xl text-navy">
            Réserver une Table
          </motion.h2>
          <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            className="mx-auto mt-6 mb-4" style={{ width: 48, height: 3, background: '#F5D300', borderRadius: 2 }} />
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-muted text-sm">
            Réservez en ligne, sans appel
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl border border-yellow/20 shadow-sm"
        >
          <form onSubmit={submit} className="flex flex-col gap-5">
            
            <div>
              <label className="label-s text-navy mb-2 block">Branche *</label>
              <select value={f.branch} onChange={(ev) => s('branch', ev.target.value)} className="sel">
                <option value="">— Sélectionnez —</option>
                {BRANCHES.map((b) => <option key={b.id} value={b.id}>{b.name} — {b.phoneDisplay}</option>)}
              </select>
              {e.branch && <p className="text-xs text-error mt-1 font-sans">{e.branch}</p>}
            </div>

            <div>
              <label className="label-s text-navy mb-2 block">📱 Téléphone *</label>
              <input type="tel" value={f.phone} onChange={(ev) => s('phone', ev.target.value)} placeholder="98 900 372" className="inp" />
              {e.phone && <p className="text-xs text-error mt-1 font-sans">{e.phone}</p>}
            </div>

            <div>
              <label className="label-s text-navy mb-2 block">👥 Personnes *</label>
              <select value={f.guests} onChange={(ev) => s('guests', parseInt(ev.target.value))} className="sel">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-s text-navy mb-2 block">📅 Date *</label>
                <input type="date" value={f.date} min={today} onChange={(ev) => s('date', ev.target.value)} className="inp" />
                {e.date && <p className="text-xs text-error mt-1 font-sans">{e.date}</p>}
              </div>
              <div>
                <label className="label-s text-navy mb-2 block">🕐 Heure *</label>
                <select value={f.time} onChange={(ev) => s('time', ev.target.value)} className="sel">
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-yellow w-full mt-2 justify-center text-base py-4">
              Réserver maintenant →
            </button>
          </form>
        </motion.div>

        {ok && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 text-sm text-olive font-semibold font-sans">
            Réservation envoyée ! Ouverture de WhatsApp...
          </motion.p>
        )}

        <p className="text-center mt-4 text-xs text-muted font-sans">
          ⚡ Sans engagement. Confirmation immédiate via WhatsApp.
        </p>
      </div>
    </section>
  );
}
