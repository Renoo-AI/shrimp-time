import React, { useState, useRef } from 'react';
import { BRANCHES, TIME_SLOTS, RESERVATION_FORM_INITIAL } from '../data';
import { motion } from 'motion/react';

export default function ReservationSection() {
  const [f, setF] = useState({ ...RESERVATION_FORM_INITIAL });
  const [e, setE] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const cr = useRef<HTMLDivElement>(null);

  const s = (k: string, v: string | number) => { setF((p) => ({ ...p, [k]: v })); if (e[k]) setE((p) => ({ ...p, [k]: '' })); };

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
    if (Object.keys(er).length) { setE(er); return; }

    const b = BRANCHES.find((x) => x.id === f.branch);
    setTimeout(() => window.open(`https://wa.me/${(b?.phone || '+21698900372').replace('+', '')}?text=${encodeURIComponent(msg())}`, '_blank'), 500);
    setOk(true); confetti(); setF({ ...RESERVATION_FORM_INITIAL }); setTimeout(() => setOk(false), 3000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="py-24 md:py-36 px-6 md:px-10 relative" style={{ background: '#0A1F3F' }}>
      <div ref={cr} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

      {/* Ambient light */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,211,0,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-[600px] mx-auto relative z-20">

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.12 }}
          className="text-center mb-14"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-4xl mb-4"
          >
            🦐🍋🦐🍋🦐
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="heading text-4xl md:text-6xl text-white"
          >
            🔥 Crack Open Your Table 🔥
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.5 } }}
            className="text-sm text-white/40 mt-3 font-sans italic"
          >
            "Fresh from the boil — straight to your seat"
          </motion.p>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-6" style={{ width: 56, height: 2, background: '#F5D300', borderRadius: 2 }} />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
            
            {/* ══ YOUR DETAILS ══ */}
            <div className="bg-white/[0.04] rounded-xl p-6 md:p-8 border border-white/[0.06]">
              <p className="label-s text-white/40 mb-5">👤 Your Details</p>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-white/70 mb-2">Full name</label>
                <input
                  type="text" value={f.name} onChange={(ev) => s('name', ev.target.value)}
                  placeholder="Ahmed Ben Salem"
                  className="inp" style={{ background: 'rgba(255,255,255,0.04)', border: e.name ? '1.5px solid #DC2626' : '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
                {e.name && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">📞 Phone (WhatsApp)</label>
                <div className="flex gap-2">
                  <span className="flex items-center px-4 rounded-xl text-sm font-semibold text-white/50 bg-white/[0.04] border border-white/[0.08]" style={{ whiteSpace: 'nowrap' }}>+216</span>
                  <input
                    type="tel" value={f.phone} onChange={(ev) => s('phone', ev.target.value)}
                    placeholder="98 900 372"
                    className="inp flex-1" style={{ background: 'rgba(255,255,255,0.04)', border: e.phone ? '1.5px solid #DC2626' : '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>
                {e.phone && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.phone}</p>}
              </div>
            </div>

            {/* ══ YOUR SEAFEAST ══ */}
            <div className="bg-white/[0.04] rounded-xl p-6 md:p-8 border border-white/[0.06]">
              <p className="label-s text-white/40 mb-5">🍤 Your Seafeast</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2">👥 Guests</label>
                  <select value={f.guests} onChange={(ev) => s('guests', parseInt(ev.target.value))}
                    className="sel" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => <option key={n} value={n} style={{ background: '#0A1F3F' }}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2">📅 Date</label>
                  <input type="date" value={f.date} min={today} onChange={(ev) => s('date', ev.target.value)}
                    className="inp" style={{ background: 'rgba(255,255,255,0.04)', border: e.date ? '1.5px solid #DC2626' : '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  {e.date && <p className="text-xs text-error mt-1.5">{e.date}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2">⏰ Time</label>
                  <select value={f.time} onChange={(ev) => s('time', ev.target.value)}
                    className="sel" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                    {TIME_SLOTS.map(t => <option key={t} value={t} style={{ background: '#0A1F3F' }}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Branch toggle cards */}
              <label className="block text-xs font-semibold text-white/50 mb-3">📍 Which branch?</label>
              <div className="flex gap-3">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => s('branch', b.id)}
                    className={`branch-card ${f.branch === b.id ? 'active' : ''}`}
                    style={{
                      background: f.branch === b.id ? '#FFFBE6' : 'rgba(255,255,255,0.03)',
                      borderColor: f.branch === b.id ? '#F5D300' : 'rgba(255,255,255,0.1)',
                      color: f.branch === b.id ? '#0A1F3F' : '#fff',
                    }}
                  >
                    <span className="text-xl mb-1 block">{f.branch === b.id ? '🟢' : '⚪'}</span>
                    <p className="text-sm font-bold">{b.name}</p>
                    <p className="text-[11px] opacity-60 mt-0.5">{b.address}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ══ SPECIAL REQUESTS ══ */}
            <div className="bg-white/[0.04] rounded-xl p-6 md:p-8 border border-white/[0.06]">
              <p className="label-s text-white/40 mb-3">💬 Special Requests (optional)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['🎂 Birthday', '💍 Proposal', '🚫 Allergies', '🍷 Wine pref'].map(t => (
                  <button key={t} type="button" onClick={() => s('requests', f.requests.includes(t) ? f.requests.replace(t, '').trim() : (f.requests + ' ' + t).trim())}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border cursor-pointer"
                    style={{
                      background: f.requests.includes(t) ? 'rgba(245,211,0,0.15)' : 'rgba(255,255,255,0.03)',
                      borderColor: f.requests.includes(t) ? '#F5D300' : 'rgba(255,255,255,0.1)',
                      color: f.requests.includes(t) ? '#F5D300' : 'rgba(255,255,255,0.5)',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
              <textarea
                value={f.requests} onChange={(ev) => s('requests', ev.target.value)}
                placeholder="Celebrating birthday — sea view please..."
                rows={2}
                className="inp resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', color: '#fff' }}
              />
            </div>

            {/* ══ CTA BOX ══ */}
            <div className="cta-box">
              <div className="flex items-center justify-center gap-2 text-navy/70 font-bold text-sm mb-3">
                🦐 🔥 🍋 CRACK THE BOIL 🍋 🔥 🦐
              </div>
              <button type="submit"
                className="w-full py-5 rounded-xl font-sans font-black text-lg uppercase tracking-wider cursor-pointer transition-all duration-200"
                style={{ background: '#0A1F3F', color: '#F5D300', border: '3px solid #0A1F3F' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#152D54'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#0A1F3F'; }}>
                🍤 Reserve My Table Now 🍤
              </button>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4 text-[11px] font-semibold text-navy/60">
                <span>✅ WhatsApp confirmation in 30 seconds</span>
                <span className="hidden sm:inline text-navy/20">|</span>
                <span>❌ No deposit · Free cancellation up to 2h</span>
              </div>
            </div>

            {ok && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm font-bold text-yellow font-sans">
                🎉 Réservation envoyée ! Ouverture de WhatsApp...
              </motion.p>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="trust-badge" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff' }}>
                <span>💬</span> <span className="text-xs">WhatsApp ready — instant confirm</span>
              </div>
              <div className="trust-badge" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff' }}>
                <span>🎉</span> <span className="text-xs">No deposit — cancel free up to 2h</span>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/20 font-sans mb-2">⭐ 394 happy crustaceans served this week ⭐</p>
          <p className="text-xs text-white/15 italic font-sans">
            "Best shrimp in Tunisia — the boil is INSANE" — Karim, La Marsa
          </p>
        </div>
      </div>
    </section>
  );
}
