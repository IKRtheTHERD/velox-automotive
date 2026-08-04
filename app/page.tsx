import React from 'react';
import Link from 'next/link';
import HeroCanvas from '@/components/HeroCanvas';
import VehicleSpinViewer from '@/components/VehicleSpinViewer';
import InteriorHotspots from '@/components/InteriorHotspots';
import SpecsComparator from '@/components/SpecsComparator';
import PressTicker from '@/components/PressTicker';
import ConsultationSection from '@/components/ConsultationSection';
import { getModels, getHotspots, getPressQuotes } from '@/lib/db';
import { Sparkles, ArrowRight, Shield, Zap, Compass, Cpu, VolumeX } from 'lucide-react';

export const revalidate = 0; // dynamic server page

export default function HomePage() {
  const models = getModels();
  const hotspots = getHotspots();
  const pressQuotes = getPressQuotes();

  return (
    <div className="relative bg-obsidian-900 text-velox-text overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <HeroCanvas />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_90%)] pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-obsidian-800/80 backdrop-blur text-gold-400 text-xs font-mono tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            SOVEREIGN SERIES • LIMITED ALLOCATION
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-velox-text font-light tracking-tight leading-tight">
            Motion has never been <br className="hidden sm:block" />
            <span className="italic font-normal text-gold-gradient gold-text-glow">this still.</span>
          </h1>

          <p className="text-sm sm:text-lg text-velox-muted font-light max-w-2xl mx-auto leading-relaxed">
            The world's first fully autonomous electric sanctuary. Engineered above the pinnacle of luxury, where noise drops to 18.2 dB and time belongs exclusively to you.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vehicle"
              className="w-full sm:w-auto px-8 py-4 rounded bg-gold-gradient text-obsidian-950 font-mono font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_25px_rgba(201,169,110,0.3)] flex items-center justify-center gap-2"
            >
              Explore 3D Spin Simulator
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/commission"
              className="w-full sm:w-auto px-8 py-4 rounded border border-gold-500/40 bg-obsidian-800/80 text-gold-400 font-mono text-xs uppercase tracking-[0.2em] hover:bg-gold-500/10 hover:border-gold-400 transition-all flex items-center justify-center gap-2"
            >
              Request Private Commission
            </Link>
          </div>

          {/* Quick Benchmark Stats Ribbon */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-obsidian-750/80 text-center font-mono">
            <div>
              <span className="text-2xl md:text-3xl text-gold-400 font-bold block">18.2 dB</span>
              <span className="text-[10px] text-velox-muted uppercase tracking-widest block mt-1">
                Acoustic Sound Floor
              </span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl text-gold-400 font-bold block">2.4 sec</span>
              <span className="text-[10px] text-velox-muted uppercase tracking-widest block mt-1">
                0–60 mph Acceleration
              </span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl text-gold-400 font-bold block">480 mi</span>
              <span className="text-[10px] text-velox-muted uppercase tracking-widest block mt-1">
                Autonomous Range
              </span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl text-gold-400 font-bold block">Level 5</span>
              <span className="text-[10px] text-velox-muted uppercase tracking-widest block mt-1">
                Neural Quantum Autonomy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3D VEHICLE SPIN SIMULATOR SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-gold-500 uppercase tracking-[0.3em] block">
            EXTERIOR ARCHITECTURE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-velox-text font-light">
            270° Interactive Vehicle Viewer
          </h2>
          <p className="text-xs md:text-sm text-velox-muted font-light">
            Manipulate angle, explore bespoke exterior colorways, and customize studio lighting conditions.
          </p>
        </div>

        <VehicleSpinViewer />
      </section>

      {/* INTERIOR HOTSPOT EXPLORER SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-obsidian-800">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-gold-500 uppercase tracking-[0.3em] block">
            CABIN SANCTUARY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-velox-text font-light">
            Interior Hotspot Architecture
          </h2>
          <p className="text-xs md:text-sm text-velox-muted font-light">
            Explore zero-vibration lounge recliners, quantum sound shielding, and titanium control spheres.
          </p>
        </div>

        <InteriorHotspots hotspots={hotspots} />
      </section>

      {/* SPECIFICATIONS COMPARATOR SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-obsidian-800">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-gold-500 uppercase tracking-[0.3em] block">
            BENCHMARK ANALYSIS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-velox-text font-light">
            Vehicle Specification Comparator
          </h2>
          <p className="text-xs md:text-sm text-velox-muted font-light">
            Compare performance benchmarks, production limits, and acoustic ratings across the VELOX line.
          </p>
        </div>

        <SpecsComparator models={models} />
      </section>

      {/* PRESS TICKER SECTION */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <PressTicker quotes={pressQuotes} />
      </section>

      {/* CONSULTATION CALLOUT SECTION */}
      <ConsultationSection />
    </div>
  );
}
