import React, { useState, useRef, useEffect } from 'react';
import { BRANCHES, TIME_SLOTS, RESERVATION_FORM_INITIAL } from '../data';
import { motion } from 'motion/react';

const LS_KEY = 'shrimptime_reservation';

function loadSaved() {
  try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveToLS(d: typeof RESERVATION_FORM_INITIAL) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {}
}

export default function ReservationSection() {
  const [f, setF] = useState(() => loadSaved() || { ...RESERVATION_FORM_INITIAL });
  const [e, setE] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const cr = useRef<HTMLDivElement>(null);

  useEffect(() => { saveToLS(f); }, [f]);

  const s = (k: string, v: string | number) => { setF((p) => ({ ...p, [k]: v })); if (e[k]) setE((p) => ({ ...p, [k]: '' })); };

  const vp = (p: string) => { const c = p.replace(/[\s\-()]+/g, ''); return /^\+216[2-9]\d{7}$/.test(c) || /^216[2-9]\d{7}$/.test(c) || /^0[2-9]\d{7}$/.test(c) || /^[2-9]\d{7}$/.test(c); };

  const msg = () => {
    const b = BRANCHES.find((x) => x.id === f.branch);
    const dp = f.date.split('-');
    let t = `Bonjour Shrimp Time, Réservation pour ${f.guests} personnes le ${dp[2] || ''}/${dp[1] || ''}/${dp[0] || ''} à ${f.time} à la branche ${b?.name || f.branch} Tel: ${f.phone}`;
    if (f.name.trim()) t += ` Nom: ${f.name}`;
    if (f.requests.trim()) t += ` Demandes: ${f.requests}`;
    return t;
  };

  const confetti = () => {
    if (!cr.current) return;
    const el = cr.current;
    const em = ['🦐', '✨', '🦞', '🦑', '🍋', '🐟', '🦀'];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('span');
      p.textContent = em[Math.floor(Math.random() * em.length)];
      p.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:0;font-size:${Math.random() * 22 + 14}px;animation:confetti-fall ${Math.random() * 2.2 + 1.5}s ease-out forwards;animation-delay:${Math.random() * 0.6}s;pointer-events:none;`;
      el.appendChild(p);
      setTimeout(() => p.remove(), 3000);
    }
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = 'Votre nom est requis';
    if (!f.phone.trim()) er.phone = 'Numéro de téléphone requis';
    else if (!vp(f.phone)) er.phone = 'Numéro tunisien invalide (ex: 98 900 372)';
    if (f.guests < 1 || f.guests > 20) er.guests = '1 à 20 personnes';
    if (!f.date) er.date = 'Date requise';
    if (!f.time) er.time = 'Heure requise';
    if (Object.keys(er).length) { setE(er); return; }

    setSubmitting(true);
    const b = BRANCHES.find((x) => x.id === f.branch);
    setTimeout(() => {
      window.open(`https://wa.me/${(b?.phone || '+21698900372').replace('+', '')}?text=${encodeURIComponent(msg())}`, '_blank');
      setSubmitting(false);
    }, 500);
    setOk(true); confetti(); localStorage.removeItem(LS_KEY); setF({ ...RESERVATION_FORM_INITIAL }); setTimeout(() => setOk(false), 3500);
  };

  const today = new Date().toISOString().split('T')[0];
  const hasSaved = !!loadSaved();

  return (
    <section id="reservation" className="py-24 md:py-36 px-5 md:px-10 relative" style={{ backgroundColor: '#FFFFFF' }}>
      <div ref={cr} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

      <div className="max-w-[520px] mx-auto relative z-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="heading text-[40px] md:text-[56px] font-bold text-navy">Réserver une Table</h2>
          <div className="mx-auto mt-4 mb-4" style={{ width: 64, height: 3, background: '#F5D300', borderRadius: 2 }} />
          <p className="text-base text-muted">Réservez en ligne, sans appel</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white p-8 md:p-10 rounded-2xl"
          style={{ border: '1px solid rgba(245,211,0,0.12)', boxShadow: '0 4px 28px rgba(0,0,0,0.04)' }}
        >
          {hasSaved && !ok && (
            <div className="mb-6 p-4 rounded-xl text-sm text-center font-sans font-medium border"
              style={{ background: 'rgba(245,211,0,0.06)', borderColor: 'rgba(245,211,0,0.15)' }}>
              🦐 Vos informations ont été restaurées de votre dernière visite.
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
            
            {/* Branch toggle cards */}
            <div>
              <label className="label text-navy mb-3 block">Choisissez votre branche *</label>
              <div className="flex gap-3">
                {BRANCHES.map((b) => (
                  <button key={b.id} type="button" onClick={() => s('branch', b.id)}
                    className={`branch-card ${f.branch === b.id ? 'active' : ''}`}>
                    <span className="text-xl mb-1.5 block">{f.branch === b.id ? '🟢' : '⚪'}</span>
                    <p className="text-sm font-bold text-navy">{b.name}</p>
                    <p className="text-[11px] text-muted mt-1">{b.phoneDisplay}</p>
                  </button>
                ))}
              </div>
              {e.branch && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.branch}</p>}
            </div>

            {/* Name */}
            <div>
              <label className="label text-navy mb-3 block">👤 Votre nom complet *</label>
              <input type="text" value={f.name} onChange={(ev) => s('name', ev.target.value)}
                placeholder="Ahmed Ben Salem" className="inp" style={e.name ? { borderColor: '#DC2626' } : {}} />
              {e.name && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="label text-navy mb-3 block">📱 Votre numéro de téléphone *</label>
              <input type="tel" value={f.phone} onChange={(ev) => s('phone', ev.target.value)}
                placeholder="98 900 372" className="inp" style={e.phone ? { borderColor: '#DC2626' } : {}} />
              {e.phone && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.phone}</p>}
            </div>

            {/* Guests */}
            <div>
              <label className="label text-navy mb-3 block">👥 Nombre de personnes *</label>
              <select value={f.guests} onChange={(ev) => s('guests', parseInt(ev.target.value))} className="sel">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label text-navy mb-3 block">📅 Date *</label>
                <input type="date" value={f.date} min={today} onChange={(ev) => s('date', ev.target.value)}
                  className="inp" style={e.date ? { borderColor: '#DC2626' } : {}} />
                {e.date && <p className="text-xs text-error mt-1.5 font-sans font-medium">{e.date}</p>}
              </div>
              <div>
                <label className="label text-navy mb-3 block">🕐 Heure *</label>
                <select value={f.time} onChange={(ev) => s('time', ev.target.value)} className="sel">
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Requests */}
            <div>
              <label className="label text-navy mb-3 block">💬 Demandes spéciales</label>
              <textarea value={f.requests} onChange={(ev) => s('requests', ev.target.value)}
                placeholder="Anniversaire, allergie, préférence..." rows={2} className="inp resize-none" />
            </div>

            {/* Submit */}
            <button type="submit" disabled={submitting}
              className="btn-yellow w-full text-base py-4 mt-3 justify-center"
              style={submitting ? { opacity: 0.6, cursor: 'wait' } : {}}>
              {submitting ? (
                <><svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg> Envoi en cours...</>
              ) : (
                <>Réserver maintenant →</>
              )}
            </button>

            {ok && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-olive font-semibold font-sans">
                🎉 Réservation envoyée ! Ouverture de WhatsApp...
              </motion.p>
            )}
          </form>
        </motion.div>

        <p className="text-center mt-5 text-sm text-muted flex items-center justify-center gap-1.5 font-sans">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Sans engagement. Confirmation immédiate via WhatsApp.
        </p>
      </div>
    </section>
  );
}
