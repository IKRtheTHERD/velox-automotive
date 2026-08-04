import React from 'react';
import ConsultationSection from '@/components/ConsultationSection';
import { Sparkles, Clock, ShieldCheck, Check, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CommissionPage() {
  const steps = [
    {
      step: '01',
      title: 'Confidential Atelier Consultation',
      desc: 'Connect with a Senior Client Concierge in Zurich, London, or Dubai to establish your personal biometric profile and vehicle requirements.',
    },
    {
      step: '02',
      title: 'Neural & Acoustic Calibration',
      desc: 'Bespoke tuning of cabin sound floor isolation, olfactory ambient diffuser scents, and autonomous route guidance neural preferences.',
    },
    {
      step: '03',
      title: 'Swiss Handcrafted Assembly',
      desc: 'Your vehicle enters individual handcrafted assembly over 12 weeks with live photographic progress reports delivered to your private portal.',
    },
    {
      step: '04',
      title: 'Private Track or Helipad Handover',
      desc: 'Receive your vehicle via private track delivery or enclosed climate-controlled flight transport anywhere in the world.',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-20">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          BESPOKE ORDER TIMELINE
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-velox-text font-light">
          Private Commission & Concierge
        </h1>
        <p className="text-xs md:text-sm text-velox-muted font-light">
          The four-stage path from initial confidential consultation to global private track delivery.
        </p>
      </div>

      {/* 4-Step Process Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.step}
            className="bg-obsidian-950 border border-obsidian-750 p-6 rounded-xl space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-colors"
          >
            <div className="text-4xl font-serif text-gold-500/40 group-hover:text-gold-400 font-bold transition-colors">
              {s.step}
            </div>
            <h3 className="font-serif text-xl text-velox-text font-light">{s.title}</h3>
            <p className="text-xs text-velox-muted font-light leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Embedded Booking Modal Trigger Section */}
      <ConsultationSection />
    </div>
  );
}
