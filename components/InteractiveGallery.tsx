'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const angles = [
  { id: 'side', name: 'Side Profile', src: '/assets/gallery/img1.jpg' },
  { id: 'rear', name: 'Rear Aerofoil', src: '/assets/gallery/img2.jpg' },
  { id: 'quarter', name: '3/4 Stance', src: '/assets/gallery/img3.jpg' },
  { id: 'front', name: 'Front Fascia', src: '/assets/gallery/img4.jpg' },
];

export default function InteractiveGallery() {
  const [activeId, setActiveId] = useState(angles[0].id);

  return (
    <section className="py-32 bg-obsidian-950 relative border-t border-obsidian-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-velox-text mb-6">
            Static Dimensions
          </h2>
          <p className="text-velox-muted max-w-2xl mx-auto text-sm tracking-wide">
            Explore the aerodynamic sculpting of the VELOX Sanctuary I from every critical angle. High-fidelity renders capturing the obsidian carbon weave and gold-infused striking lines.
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-obsidian-800 shadow-2xl" style={{ aspectRatio: '16/9' }}>
          
          {/* Images */}
          {angles.map((angle) => (
            <div
              key={angle.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeId === angle.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={angle.src}
                alt={angle.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}

          {/* Controls Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            {angles.map((angle) => (
              <button
                key={angle.id}
                onClick={() => setActiveId(angle.id)}
                className={`px-6 py-2 rounded-full text-xs font-mono tracking-widest transition-all ${
                  activeId === angle.id
                    ? 'bg-gold-500 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(201,169,110,0.5)]'
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {angle.name}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
