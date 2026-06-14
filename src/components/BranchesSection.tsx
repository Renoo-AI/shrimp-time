import React from 'react';
import { BRANCHES } from '../data';
import { MapPin, Phone } from 'lucide-react';

export default function BranchesSection() {
  return (
    <section id="branches" className="py-24 md:py-36 px-6 md:px-10" style={{ background: '#F8F6F2' }}>
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Shrimp Time Logo" className="h-14 w-auto object-contain" />
          </div>
          <h2 className="heading text-4xl md:text-5xl text-navy uppercase tracking-wide">
            Nos Branches
          </h2>
          <div
            className="mx-auto mt-6"
            style={{ width: 48, height: 3, background: '#F5D300', borderRadius: 2 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="card-hover bg-white p-8 md:p-10 rounded-2xl border border-yellow/[0.12] shadow-sm cursor-default"
            >
              {/* Icon + Badge row */}
              <div className="flex items-center gap-3 mb-5">
                <MapPin size={32} className="text-[#F5D300]" />
                <span className="label-s text-[10px] text-olive bg-olive/5 px-3 py-1 rounded-full font-bold">
                  Tunis
                </span>
              </div>

              <h3 className="heading text-xl md:text-2xl text-navy uppercase tracking-wide mb-2">
                {b.name}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5 max-w-[300px] font-sans">
                {b.address}
              </p>

              {/* Phone display */}
              <div className="flex items-center gap-2 mb-6 text-muted">
                <Phone size={14} />
                <span className="text-sm font-medium font-sans">{b.phoneDisplay}</span>
              </div>

              {/* CTA */}
              <a
                href={`tel:${b.phone}`}
                className="btn-yellow text-sm py-3 px-8 inline-flex items-center gap-2"
              >
                <Phone size={14} />
                <span>Appeler</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
