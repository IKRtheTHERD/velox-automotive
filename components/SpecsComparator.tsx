'use client';

import React, { useState } from 'react';
import { Model } from '@/lib/db';
import { SlidersHorizontal, Check, Zap, Shield, Sparkles, Trophy } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

interface SpecsComparatorProps {
  models: Model[];
}

export default function SpecsComparator({ models }: SpecsComparatorProps) {
  const [selectedModel1, setSelectedModel1] = useState<Model>(models[0] || models);
  const [selectedModel2, setSelectedModel2] = useState<Model>(models[1] || models[0]);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [targetModel, setTargetModel] = useState<string>('VELOX Sanctuary I');

  const handleCommissionClick = (modelName: string) => {
    setTargetModel(modelName);
    setConsultationModalOpen(true);
  };

  interface SpecRow {
    key: keyof Model;
    label: string;
    format: (val: any) => string;
  }

  const specRows: SpecRow[] = [
    { key: 'price_starting', label: 'Starting Bespoke Price', format: (val: number) => `$${val.toLocaleString()}` },
    { key: 'acceleration_0_60', label: '0–60 mph Acceleration', format: (val: number) => `${val} seconds` },
    { key: 'top_speed_mph', label: 'Maximum Velocity', format: (val: number) => `${val} mph` },
    { key: 'range_miles', label: 'Autonomous Range', format: (val: number) => `${val} miles` },
    { key: 'nvh_rating_db', label: 'Cabin NVH Sound Floor', format: (val: number) => `${val} dB (Ultra-Quiet)` },
    { key: 'power_hp', label: 'Total Neural Motors Output', format: (val: number) => `${val.toLocaleString()} HP` },
    { key: 'battery_kwh', label: 'Solid-State Battery Pack', format: (val: number) => `${val} kWh` },
    { key: 'autonomous_level', label: 'Autonomous Core Rating', format: (val: string) => val },
    { key: 'annual_production_limit', label: 'Global Annual Allocation', format: (val: number) => `${val} Units Only` },
  ];

  return (
    <div className="bg-obsidian-900 border border-obsidian-600 rounded-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-obsidian-700">
        <div>
          <div className="flex items-center gap-2 text-gold-500 font-mono text-xs uppercase tracking-widest mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Database Specification Query
          </div>
          <h3 className="font-serif text-2xl text-velox-text font-light tracking-wide">
            Model Specifications Comparator
          </h3>
        </div>
        <p className="text-xs text-velox-muted max-w-md font-light">
          Compare engineering benchmarks, acoustic ratings, and autonomous capabilities across the VELOX flagship line.
        </p>
      </div>

      {/* Model Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Model 1 Selector */}
        <div className="bg-obsidian-950 p-4 rounded-lg border border-obsidian-750 space-y-2">
          <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest block">
            Primary Model
          </label>
          <select
            value={selectedModel1.slug}
            onChange={(e) => {
              const m = models.find((mod) => mod.slug === e.target.value);
              if (m) setSelectedModel1(m);
            }}
            className="w-full bg-obsidian-900 border border-gold-500/40 rounded px-3 py-2 text-sm font-serif text-velox-text focus:outline-none focus:border-gold-400"
          >
            {models.map((m) => (
              <option key={m.id} value={m.slug}>
                {m.name} — ${m.price_starting.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Model 2 Selector */}
        <div className="bg-obsidian-950 p-4 rounded-lg border border-obsidian-750 space-y-2">
          <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest block">
            Comparison Model
          </label>
          <select
            value={selectedModel2.slug}
            onChange={(e) => {
              const m = models.find((mod) => mod.slug === e.target.value);
              if (m) setSelectedModel2(m);
            }}
            className="w-full bg-obsidian-900 border border-gold-500/40 rounded px-3 py-2 text-sm font-serif text-velox-text focus:outline-none focus:border-gold-400"
          >
            {models.map((m) => (
              <option key={m.id} value={m.slug}>
                {m.name} — ${m.price_starting.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-obsidian-700 bg-obsidian-950/80 text-xs font-mono uppercase tracking-widest text-gold-400">
              <th className="p-4 font-normal">Engineering Benchmark</th>
              <th className="p-4 font-normal w-1/3 text-left">{selectedModel1.name}</th>
              <th className="p-4 font-normal w-1/3 text-left">{selectedModel2.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-800 text-xs">
            {specRows.map((row, idx) => {
              const val1 = selectedModel1[row.key as keyof Model];
              const val2 = selectedModel2[row.key as keyof Model];
              const formattedVal1 = row.format(val1 as any);
              const formattedVal2 = row.format(val2 as any);

              return (
                <tr key={row.key} className={idx % 2 === 0 ? 'bg-obsidian-900/50' : 'bg-obsidian-950/30'}>
                  <td className="p-4 font-mono text-velox-muted flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    {row.label}
                  </td>
                  <td className="p-4 font-serif text-sm text-velox-text font-normal">
                    <span className="text-gold-400 font-mono font-medium">{formattedVal1}</span>
                  </td>
                  <td className="p-4 font-serif text-sm text-velox-text font-normal">
                    <span className="text-gold-400 font-mono font-medium">{formattedVal2}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-obsidian-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-velox-dim">
          <Trophy className="w-4 h-4 text-gold-500" />
          <span>All data verified by VELOX Sovereign Engineering Standards (ISO 9001:2026).</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleCommissionClick(selectedModel1.name)}
            className="px-5 py-2.5 rounded bg-gold-500 text-obsidian-950 text-xs font-mono font-semibold tracking-wider uppercase hover:bg-gold-400 transition-colors shadow-lg"
          >
            Commission {selectedModel1.name}
          </button>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialModel={targetModel}
      />
    </div>
  );
}
