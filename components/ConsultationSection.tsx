'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

export default function ConsultationSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-obsidian-800">
      <div className="bg-obsidian-950 border border-gold-500/30 rounded-2xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-[0_0_50px_rgba(201,169,110,0.1)]">
        {/* Background ambient gold gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            BESPOKE COMMISSIONING
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-velox-text font-light leading-tight">
            Reserve your private sanctuary <br className="hidden sm:block" />
            in the Sovereign Series.
          </h2>

          <p className="text-xs sm:text-sm text-velox-muted font-light max-w-xl mx-auto leading-relaxed">
            Annual production is strictly limited to preserves uncompromised bespoke quality and individual exclusivity. Contact our Zurich or London Atelier to reserve your allocation slot.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-10 py-4 rounded bg-gold-gradient text-obsidian-950 font-mono font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_30px_rgba(201,169,110,0.3)] flex items-center justify-center gap-2"
            >
              Book Private Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-velox-dim">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
              Confidential Concierge Protocol
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-500" />
              256-Bit Encrypted Record
            </span>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
