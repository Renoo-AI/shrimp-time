import React from 'react';
import { BRANCHES } from '../data';
import { motion } from 'motion/react';

export default function BranchesSection() {
  return (
    <section id="branches" className="py-24 md:py-36 px-5 md:px-10 relative" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1100px] mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="heading text-[40px] md:text-[56px] font-bold text-navy">Nos Branches</h2>
          <div className="mx-auto mt-4" style={{ width: 64, height: 3, background: '#F5D300', borderRadius: 2 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRANCHES.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white p-10 md:p-12 rounded-2xl border border-yellow/[0.12] hover:-translate-y-2 hover:shadow-xl transition-all duration-400 cursor-default relative overflow-hidden"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
            >
              {/* Decorative number */}
              <span className="absolute -top-4 -right-2 text-[140px] font-serif font-black text-navy/[0.015] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <span className="text-5xl block mb-6">🦐</span>
                <h3 className="heading text-2xl md:text-3xl font-bold text-navy mb-3 uppercase tracking-tight">{branch.name}</h3>
                <p className="text-base text-muted leading-relaxed mb-6 max-w-[320px]">{branch.address}</p>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(245,211,0,0.1)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5D300" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-navy/70 font-sans">{branch.phoneDisplay}</span>
                </div>

                <a href={`tel:${branch.phone}`}
                  className="btn-yellow text-sm py-3.5 px-10 inline-flex group/btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover/btn:scale-110 transition-transform">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Appeler
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
