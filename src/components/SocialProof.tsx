import React from 'react';
import { motion } from 'motion/react';

const REVIEWS = [
  { name: 'Karim, La Marsa', text: '"Best shrimp in Tunisia — the boil is INSANE. Fresh, generous portions, and the cajun sauce is perfect."', stars: 5 },
  { name: 'Sarra, Tunis', text: '"Très bonne expérience ! Fruits de mer accompagnés de riz savoureux, avec des produits clairement frais et bien préparés."', stars: 5 },
  { name: 'Mehdi, L\'Aouina', text: '"Deuxième visite et toujours aussi bon. Quantité, variété et fraîcheur au rendez-vous. Le service est top."', stars: 5 },
];

export default function SocialProof() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-10" style={{ background: '#F8F6F2' }}>
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="label text-muted mb-3">Ce que nos clients disent</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-3xl">⭐</span>
            <span className="heading text-3xl text-navy">4.4</span>
            <span className="text-sm text-muted font-sans">sur 394 avis Google</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="review-card text-left"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-yellow text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-navy/80 leading-relaxed italic font-sans mb-3">{r.text}</p>
              <p className="text-xs text-muted font-semibold font-sans">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
