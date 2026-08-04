import React from 'react';
import { VolumeX, Shield, Cpu, Sparkles, Feather, Compass } from 'lucide-react';
import ConsultationSection from '@/components/ConsultationSection';

export default function PhilosophyPage() {
  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5" />
          BRAND MANIFESTO & ENGINEERING PHILOSOPHY
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-velox-text font-light leading-tight">
          Silence is the ultimate luxury.
        </h1>
        <p className="text-sm md:text-base text-velox-muted font-light leading-relaxed">
          In an era of noise, VELOX was conceived as a kinetic sanctuary. We do not design cars for driver engagement — we design sovereign space for total peace of mind.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-obsidian-950 border border-obsidian-750 p-8 rounded-xl space-y-4 hover:border-gold-500/40 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
            <VolumeX className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-velox-text font-light">
            18.2 dB Acoustic Isolation
          </h3>
          <p className="text-xs text-velox-muted leading-relaxed font-light">
            Using active anti-resonance quantum acoustic shielding, exterior ambient noise, tire roar, and wind turbulence are neutralized at atomic frequencies before entering the cabin.
          </p>
        </div>

        <div className="bg-obsidian-950 border border-obsidian-750 p-8 rounded-xl space-y-4 hover:border-gold-500/40 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-velox-text font-light">
            Neural Autonomous Core
          </h3>
          <p className="text-xs text-velox-muted leading-relaxed font-light">
            Powered by dual optical Lidar and quantum neural algorithms executing 2.4 quadrillion calculations per second, delivering flawless Level 5 autonomous navigation without human intervention.
          </p>
        </div>

        <div className="bg-obsidian-950 border border-obsidian-750 p-8 rounded-xl space-y-4 hover:border-gold-500/40 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
            <Feather className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-velox-text font-light">
            Obsidian & Gold Craft
          </h3>
          <p className="text-xs text-velox-muted leading-relaxed font-light">
            Hand-assembled by master artisans in Zurich. Featuring unblemished Nordic leather recliners, aerospace titanium controls, and optional 24-karat gold thread structural weaving.
          </p>
        </div>
      </div>

      {/* Editorial Deep Dive */}
      <div className="bg-obsidian-950 border border-obsidian-750 rounded-2xl p-8 md:p-14 space-y-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-gold-500 uppercase tracking-widest block">
            BESPOKE ENGINEERING
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-velox-text font-light">
            "We do not build machines. We build time."
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-velox-muted font-light leading-relaxed">
          <p>
            When autonomous technology reaches perfection, vehicle controls become optional. The VELOX cabin eliminates steering columns, instrument panels, and driver friction by default, replacing them with zero-gravity lounge seating, biometric air ionization, and electrochromic privacy glass.
          </p>
          <p>
            Every VELOX Sanctuary vehicle is handcrafted in limited annual allocations. Owners have direct access to their personal Atelier Master in Switzerland to select bespoke leather hides, custom scent profiles, and neural drive parameters.
          </p>
        </div>
      </div>

      <ConsultationSection />
    </div>
  );
}
