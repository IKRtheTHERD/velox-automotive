'use client';

import React, { useState } from 'react';
import { Hotspot } from '@/lib/db';
import { Sparkles, Info, X, Zap, Shield, Eye, Compass } from 'lucide-react';

interface InteriorHotspotsProps {
  hotspots: Hotspot[];
}

export default function InteriorHotspots({ hotspots }: InteriorHotspotsProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    hotspots[0] || null
  );
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'exterior' | 'drive'>('all');

  const filteredHotspots = hotspots.filter(
    (h) => activeCategory === 'all' || h.category === activeCategory
  );

  return (
    <div className="bg-obsidian-900 border border-obsidian-600 rounded-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-obsidian-700">
        <div>
          <div className="flex items-center gap-2 text-gold-500 font-mono text-xs uppercase tracking-widest mb-1">
            <Compass className="w-3.5 h-3.5" />
            Interactive Cabin & Engineering Architecture
          </div>
          <h3 className="font-serif text-2xl text-velox-text font-light tracking-wide">
            Interior & Autonomous Hotspot Explorer
          </h3>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 bg-obsidian-950 p-1 rounded-lg border border-obsidian-750">
          {(['all', 'interior', 'exterior', 'drive'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-gold-500 text-obsidian-950 font-semibold shadow-md'
                  : 'text-velox-muted hover:text-velox-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotspot Interactive Diagram Map */}
        <div className="lg:col-span-2 relative h-[360px] md:h-[420px] bg-obsidian-950 rounded-xl border border-obsidian-750 p-4 flex items-center justify-center overflow-hidden">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 bg-carbon-weave opacity-25" />

          {/* Schematic Vehicle Topography Diagram */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full max-w-[700px] opacity-80"
          >
            <defs>
              <linearGradient id="diagramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1E22" />
                <stop offset="100%" stopColor="#0A0A0B" />
              </linearGradient>
            </defs>
            {/* Outline of cabin top-down view */}
            <path
              d="M 120 200 Q 200 90, 400 90 Q 600 90, 680 200 Q 600 310, 400 310 Q 200 310, 120 200 Z"
              fill="url(#diagramGrad)"
              stroke="#2A2A2A"
              strokeWidth="2"
            />
            {/* Seats outline */}
            <rect x="260" y="130" width="80" height="60" rx="10" fill="#141414" stroke="#C9A96E" strokeWidth="1" />
            <rect x="260" y="210" width="80" height="60" rx="10" fill="#141414" stroke="#C9A96E" strokeWidth="1" />
            <rect x="440" y="120" width="100" height="70" rx="12" fill="#1A1A1A" stroke="#C9A96E" strokeWidth="1.5" />
            <rect x="440" y="210" width="100" height="70" rx="12" fill="#1A1A1A" stroke="#C9A96E" strokeWidth="1.5" />

            {/* Acoustic Shielding Boundary */}
            <path
              d="M 230 110 L 570 110 L 570 290 L 230 290 Z"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="1"
              strokeDasharray="4,4"
              className="opacity-40 animate-pulse-slow"
            />
          </svg>

          {/* Render Hotspot Markers */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                style={{
                  left: `${hotspot.position_x}%`,
                  top: `${hotspot.position_y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                title={hotspot.title}
              >
                {/* Outer pulsing ring */}
                <span
                  className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                    isSelected ? 'bg-gold-400' : 'bg-gold-500/40'
                  }`}
                />
                {/* Core node button */}
                <div
                  className={`relative w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition-all shadow-lg ${
                    isSelected
                      ? 'border-gold-300 bg-gold-500 text-obsidian-950 shadow-[0_0_20px_rgba(201,169,110,0.6)]'
                      : 'border-gold-500/70 bg-obsidian-900 text-gold-400 hover:border-gold-300 hover:bg-obsidian-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                {/* Label popup on hover */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-obsidian-950 border border-gold-500/50 text-gold-400 text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap z-40 shadow-xl">
                  {hotspot.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Hotspot Detailed Drawer / Info Panel */}
        <div className="bg-obsidian-950 border border-obsidian-750 rounded-xl p-6 flex flex-col justify-between relative">
          {selectedHotspot ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 bg-gold-500/10 px-2.5 py-1 rounded border border-gold-500/30">
                  {selectedHotspot.category}
                </span>
                <span className="text-xs font-mono text-velox-dim">
                  ID: #{selectedHotspot.id}
                </span>
              </div>

              <div>
                <h4 className="font-serif text-xl text-velox-text font-normal mb-2">
                  {selectedHotspot.title}
                </h4>
                <p className="text-xs text-velox-muted leading-relaxed font-light">
                  {selectedHotspot.description}
                </p>
              </div>

              <div className="bg-obsidian-900 p-4 rounded-lg border border-obsidian-750 space-y-1">
                <span className="text-[10px] font-mono text-velox-dim uppercase block">ENGINEERING SPECIFICATION</span>
                <span className="text-sm font-mono text-gold-400 font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold-500" />
                  {selectedHotspot.spec_detail}
                </span>
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-mono text-velox-muted flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-gold-500" />
                  Bespoke material craft & zero-vibration mounting.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-velox-dim">
              <Info className="w-8 h-8 mb-2 text-gold-500/50" />
              <p className="text-xs font-mono">Select any gold hotspot marker on the diagram to inspect engineering specs.</p>
            </div>
          )}

          {/* Quick list selector at bottom */}
          <div className="mt-6 pt-4 border-t border-obsidian-800 space-y-1">
            <span className="text-[10px] font-mono text-velox-dim uppercase block mb-2">HOTSPOT INDEX</span>
            <div className="flex flex-wrap gap-1.5">
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                    selectedHotspot?.id === h.id
                      ? 'bg-gold-500 text-obsidian-950 font-bold'
                      : 'bg-obsidian-850 text-velox-muted hover:text-velox-text'
                  }`}
                >
                  {h.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
