import React from 'react';
import { BRANCHES } from '../data';
import { motion } from 'motion/react';

export default function BranchesSection() {
  return (
    <section id="branches" className="relative py-28 md:py-36 px-8 md:px-16 lg:px-24" style={{ backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section header — asymmetric */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-light mb-4 font-semibold"
          >
            Tunis, Tunisie
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-black text-ink tracking-tight"
          >
            Nos Branches
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="accent-line mt-8"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Branch cards — asymmetric grid, not equal */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-1">
          {BRANCHES.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-10 md:p-14 transition-colors duration-500 hover:bg-amber/[0.03]"
            >
              {/* Thin top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-ink/[0.08]" />

              <span className="font-serif text-7xl md:text-8xl font-black text-ink/[0.06] leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="mt-6 md:mt-8">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink tracking-tight">
                  {branch.name}
                </h3>
                <p className="font-sans text-sm text-muted-light mt-3 leading-relaxed max-w-[320px]">
                  {branch.address}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <a
                  href={`tel:${branch.phone}`}
                  className="font-sans text-sm font-semibold text-ink hover:text-amber transition-colors duration-200 tracking-tight"
                >
                  {branch.phoneDisplay}
                </a>
                <a
                  href={`tel:${branch.phone}`}
                  className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-light hover:text-ink transition-colors duration-200 font-semibold"
                >
                  Appeler →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
