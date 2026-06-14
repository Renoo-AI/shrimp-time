import React from 'react';
import { motion } from 'motion/react';

const REVIEWS = [
  { name: 'Karim, La Marsa', text: 'Best shrimp in Tunisia — the boil is INSANE. Fresh, generous portions, and the cajun sauce is perfect.', stars: 5 },
  { name: 'Sarra, Tunis', text: 'Très bonne expérience ! Fruits de mer accompagnés de riz savoureux, avec des produits clairement frais.', stars: 5 },
  { name: 'Mehdi, L\'Aouina', text: 'Deuxième visite et toujours aussi bon. Quantité, variété et fraîcheur au rendez-vous.', stars: 5 },
];

export default function SocialProof() {
  return (
    <section className="py-20 md:py-28 px-5 md:px-10 relative" style={{ background: '#F8F6F2' }}>
      <div className="max-w-[900px] mx-auto text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl text-yellow">★</span>
            ))}
          </div>
          <p className="heading text-3xl md:text-4xl text-navy mb-1">4.4</p>
          <p className="text-sm text-muted font-sans font-medium">sur 394 avis Google</p>
          <div className="mx-auto mt-6" style={{ width: 48, height: 3, background: '#F5D300', borderRadius: 2 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-6 md:p-7 rounded-xl text-left border border-yellow/[0.08] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-yellow text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-navy/75 leading-relaxed italic font-sans mb-4">"{r.text}"</p>
              <p className="text-xs text-muted font-semibold font-sans">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
