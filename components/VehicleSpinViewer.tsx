'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Sun, Moon, Sparkles, Layers, Sliders, Shield, Eye } from 'lucide-react';

interface Colorway {
  id: string;
  name: string;
  bodyColor: string;
  accentColor: string;
  metalFinish: string;
  desc: string;
}

const COLORWAYS: Colorway[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    bodyColor: '#0F0F10',
    accentColor: '#C9A96E',
    metalFinish: 'Polished Carbon & Gold Inlay',
    desc: 'Deep obsidian black monocoque with brushed warm gold aerodynamic trim.',
  },
  {
    id: 'titanium',
    name: 'Machined Titanium',
    bodyColor: '#262A30',
    accentColor: '#E8E0D0',
    metalFinish: 'Bespoke Satin Titanium',
    desc: 'Aerospace grade titanium alloy finish with silvered glass canopy.',
  },
  {
    id: 'sovereign-gold',
    name: 'Sovereign Gold Leaf',
    bodyColor: '#1F1A12',
    accentColor: '#E2C68A',
    metalFinish: '24K Gold Dust Flake',
    desc: 'Hand-applied 24-karat gold leaf flake infused directly into the acoustic carbon shell.',
  },
  {
    id: 'carbon-matte',
    name: 'Matte Carbon Weave',
    bodyColor: '#121315',
    accentColor: '#A88950',
    metalFinish: 'Raw 3K Twill Carbon',
    desc: 'Exposed structural carbon twill with matte ceramic protective coating.',
  },
];

const LIGHTING_MODES = [
  { id: 'midnight', name: 'Midnight Runway', glow: 'rgba(201, 169, 110, 0.4)' },
  { id: 'studio', name: 'Studio Gold', glow: 'rgba(226, 198, 138, 0.6)' },
  { id: 'horizon', name: 'Dawn Horizon', glow: 'rgba(232, 224, 208, 0.5)' },
];

export default function VehicleSpinViewer() {
  const [rotationAngle, setRotationAngle] = useState(45); // 0 to 360 degrees
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(COLORWAYS[0]);
  const [lightingMode, setLightingMode] = useState(LIGHTING_MODES[0]);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const angleAtStartRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-spin timer
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Sync video to rotation angle
  useEffect(() => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (rotationAngle / 360) * videoRef.current.duration;
    }
  }, [rotationAngle]);

  // Touch & Mouse Drag handlers for 360 spin
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    startXRef.current = e.clientX;
    angleAtStartRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    let newAngle = (angleAtStartRef.current + deltaX * 0.5) % 360;
    if (newAngle < 0) newAngle += 360;
    setRotationAngle(Math.round(newAngle));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert rotation angle into visual scale and perspective transforms
  const rad = (rotationAngle * Math.PI) / 180;
  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);

  return (
    <div className="bg-obsidian-900 border border-obsidian-600 rounded-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting glow based on mode */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${lightingMode.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Top Header Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-obsidian-700 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-gold-500 font-mono text-xs uppercase tracking-widest mb-1">
            <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
            3D Vehicle Spin Simulator
          </div>
          <h3 className="font-serif text-2xl text-velox-text font-light tracking-wide">
            VELOX Sanctuary I — 270° Interactive View Switcher
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`px-4 py-2 rounded text-xs font-mono tracking-wider transition-all border ${
              isAutoSpinning
                ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-semibold shadow-[0_0_15px_rgba(201,169,110,0.4)]'
                : 'bg-obsidian-800 text-gold-400 border-gold-500/30 hover:border-gold-400'
            }`}
          >
            {isAutoSpinning ? 'Pause Auto Spin' : 'Auto 360° Spin'}
          </button>
        </div>
      </div>

      {/* 3D Canvas / Render Display Box */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[360px] md:h-[440px] bg-obsidian-950 rounded-lg border border-obsidian-750 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden group"
      >
        {/* Grid lines floor projection */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Rotation Angle Overlay Badge */}
        <div className="absolute top-4 left-4 z-20 bg-obsidian-900/80 backdrop-blur border border-obsidian-600 px-3 py-1.5 rounded text-[11px] font-mono text-gold-400 flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>Angle: {Math.round(rotationAngle)}°</span>
          <span className="text-velox-dim">| Drag horizontal to rotate</span>
        </div>

        {/* Lighting Mode Badge */}
        <div className="absolute top-4 right-4 z-20 bg-obsidian-900/80 backdrop-blur border border-obsidian-600 px-3 py-1.5 rounded text-[11px] font-mono text-velox-muted flex items-center gap-2">
          <Sun className="w-3.5 h-3.5 text-gold-400" />
          <span>{lightingMode.name}</span>
        </div>

        {/* 3D Vehicle Rendering Container (SVG / Canvas Dynamic Silhouette) */}
        <div
          className="relative transition-transform duration-75 flex items-center justify-center"
          style={{
            transform: `perspective(1000px) scale(${1 + Math.abs(cosVal) * 0.08})`,
          }}
        >
          {/* Floor Shadow */}
          <div
            className="absolute bottom-[-20px] w-[320px] md:w-[480px] h-[40px] rounded-full blur-xl opacity-80 transition-all duration-300"
            style={{
              backgroundColor: selectedColorway.accentColor,
              transform: `scaleX(${0.8 + Math.abs(cosVal) * 0.4})`,
            }}
          />

          {/* Video Vehicle Representation */}
          <video
            ref={videoRef}
            src="/assets/car_spin.mp4"
            muted
            playsInline
            className="w-full max-w-[600px] mix-blend-screen drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
            onLoadedMetadata={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = (rotationAngle / 360) * videoRef.current.duration;
              }
            }}
          />
        </div>

        {/* Drag Instruction Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-obsidian-900/90 border border-obsidian-600 px-4 py-1.5 rounded-full text-[10px] font-mono text-gold-400 opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Drag or move slider below to rotate 360°
        </div>
      </div>

      {/* Rotation Angle Slider Control */}
      <div className="mt-6 space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-velox-muted">
          <span>0° Front</span>
          <span>90° Side Profile</span>
          <span>180° Rear Apex</span>
          <span>270° 3/4 View</span>
          <span>360° Full Loop</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={rotationAngle}
          onChange={(e) => {
            setIsAutoSpinning(false);
            setRotationAngle(parseInt(e.target.value));
          }}
          className="w-full h-1.5 bg-obsidian-750 rounded-lg appearance-none cursor-pointer accent-gold-500 focus:outline-none"
        />
      </div>

      {/* Angle Presets Bar */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center relative z-10">
        {[
          { label: 'Front 3/4', angle: 45 },
          { label: 'Side Profile', angle: 90 },
          { label: 'Rear Aerofoil', angle: 180 },
          { label: 'Rear 3/4', angle: 225 },
          { label: 'Overhead Canopy', angle: 315 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              setIsAutoSpinning(false);
              setRotationAngle(preset.angle);
            }}
            className={`px-3 py-1 rounded text-[11px] font-mono transition-all border ${
              rotationAngle === preset.angle
                ? 'bg-gold-500/20 text-gold-400 border-gold-400 font-semibold'
                : 'bg-obsidian-800 text-velox-muted border-obsidian-600 hover:text-velox-text'
            }`}
          >
            {preset.label} ({preset.angle}°)
          </button>
        ))}
      </div>

      {/* Colorway & Lighting Selectors Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-obsidian-700 relative z-10">
        {/* Exterior Colorway Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            Bespoke Exterior Colorways
          </div>

          <div className="grid grid-cols-2 gap-3">
            {COLORWAYS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedColorway(c)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedColorway.id === c.id
                    ? 'border-gold-400 bg-gold-500/10 shadow-[0_0_15px_rgba(201,169,110,0.15)]'
                    : 'border-obsidian-700 bg-obsidian-800/80 hover:border-obsidian-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-4 h-4 rounded-full border border-gold-500/40 inline-block"
                    style={{ backgroundColor: c.accentColor }}
                  />
                  <span className="text-xs font-serif text-velox-text">{c.name}</span>
                </div>
                <p className="text-[10px] text-velox-muted font-mono">{c.metalFinish}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-velox-dim font-light italic">
            "{selectedColorway.desc}"
          </p>
        </div>

        {/* Studio Lighting Environment Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest">
            <Sun className="w-4 h-4" />
            Studio Lighting Environment
          </div>

          <div className="flex flex-col gap-2">
            {LIGHTING_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setLightingMode(mode)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                  lightingMode.id === mode.id
                    ? 'border-gold-400 bg-obsidian-800 text-gold-400 font-medium'
                    : 'border-obsidian-750 bg-obsidian-950 text-velox-muted hover:text-velox-text'
                }`}
              >
                <span>{mode.name}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: mode.glow }}
                />
              </button>
            ))}
          </div>

          <div className="bg-obsidian-950 p-3 rounded border border-obsidian-750 text-[11px] font-mono text-velox-muted flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold-500 flex-shrink-0" />
            <span>NVH Aerodynamic Rating: 18.2 dB sound floor at 120 mph glide speed.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
