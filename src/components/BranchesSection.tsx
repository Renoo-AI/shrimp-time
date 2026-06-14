import React from 'react';
import { BRANCHES } from '../data';
import { motion } from 'motion/react';

export default function BranchesSection() {
  return (
    <section id="branches" className="py-24 md:py-32 px-6 md:px-10" style={{ background: '#F8F6F2' }}>
      <div className="max-w-[1000px] mx-auto">
        
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl mb-4 block">🦐</motion.span>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="heading text-4xl md:text-5xl text-navy">
            Nos Branches
          </motion.h2>
          <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            className="mx-auto mt-6" style={{ width: 48, height: 3, background: '#F5D300', borderRadius: 2 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRANCHES.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-8 md:p-10 rounded-xl border border-yellow/20 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-4xl mb-4 block">🦐</span>
              <h3 className="heading text-xl text-navy uppercase tracking-wide mb-2">{b.name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">{b.address}</p>
              <p className="text-sm text-muted mb-6">📞 {b.phoneDisplay}</p>
              <a href={`tel:${b.phone}`}
                className="inline-block btn-yellow text-sm py-3 px-8">
                Appeler
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
