import React from 'react';
import Link from 'next/link';
import { Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian-950 border-t border-obsidian-600 text-velox-muted py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold-500/40 flex items-center justify-center bg-obsidian-800">
              <span className="font-serif font-bold text-gold-500 text-sm">V</span>
            </div>
            <span className="font-serif tracking-[0.35em] text-velox-text text-xl font-light">
              VELOX
            </span>
          </div>
          <p className="text-xs text-velox-muted font-light leading-relaxed">
            Autonomous mobility engineered above the pinnacle of luxury. Private sanctuaries for sovereign minds.
          </p>
          <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">
            "Motion has never been this still."
          </p>
        </div>

        {/* Navigation Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">Flagship Models</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/vehicle" className="hover:text-velox-text transition-colors flex items-center gap-1">
                VELOX Sanctuary I <ArrowUpRight className="w-3 h-3 text-gold-500" />
              </Link>
            </li>
            <li>
              <Link href="/vehicle" className="hover:text-velox-text transition-colors flex items-center gap-1">
                VELOX Sanctuary II Apex <ArrowUpRight className="w-3 h-3 text-gold-500" />
              </Link>
            </li>
            <li>
              <Link href="/vehicle" className="hover:text-velox-text transition-colors flex items-center gap-1">
                VELOX Sovereign Spectre <ArrowUpRight className="w-3 h-3 text-gold-500" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Engineering Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">Engineering & Tech</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/philosophy" className="hover:text-velox-text transition-colors">
                18.2 dB NVH Acoustic Shielding
              </Link>
            </li>
            <li>
              <Link href="/philosophy" className="hover:text-velox-text transition-colors">
                Level 5 Neural Autonomous Core
              </Link>
            </li>
            <li>
              <Link href="/specs" className="hover:text-velox-text transition-colors">
                Full Technical Specifications
              </Link>
            </li>
            <li>
              <Link href="/commission" className="hover:text-velox-text transition-colors">
                Bespoke Atelier Commissioning
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Concierge & Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">Client Concierge</h4>
          <p className="text-xs leading-relaxed">
            Geneva â€¢ London â€¢ Tokyo â€¢ Dubai â€¢ Silicon Valley
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-mono text-velox-dim block">GLOBAL HEADQUARTERS</span>
            <span className="text-xs text-velox-text">VELOX Automotive S.A., Zurich</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-obsidian-750 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-velox-dim gap-4">
        <div className="flex flex-col gap-1">
          <p>Â© 2025 SimaVision x Ibrahim. All rights reserved.</p>
          <p>MADE BY IBRAHIM K.R</p>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-velox-muted cursor-pointer">Privacy Protocol</span>
          <span className="hover:text-velox-muted cursor-pointer">Terms of Bespoke Order</span>
          <span className="hover:text-velox-muted cursor-pointer">Autonomous Regulatory Disclosures</span>
        </div>
      </div>
    </footer>
  );
}

