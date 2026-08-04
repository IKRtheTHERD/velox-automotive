'use client';

import React, { useState, useEffect } from 'react';
import { PressQuote } from '@/lib/db';
import { Quote, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface PressTickerProps {
  quotes: PressQuote[];
}

export default function PressTicker({ quotes }: PressTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  if (!quotes || quotes.length === 0) return null;

  const currentQuote = quotes[currentIndex];

  return (
    <div className="bg-obsidian-950 border border-obsidian-750 rounded-xl p-8 md:p-12 relative overflow-hidden my-16 shadow-2xl">
      {/* Background Gold Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <div className="w-10 h-10 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 mx-auto flex items-center justify-center">
          <Quote className="w-5 h-5" />
        </div>

        <blockquote className="font-serif text-xl md:text-3xl text-velox-text font-light leading-relaxed italic">
          "{currentQuote.quote}"
        </blockquote>

        <div className="pt-2 flex flex-col items-center">
          <span className="font-mono text-gold-400 text-sm font-semibold tracking-widest uppercase">
            {currentQuote.publication}
          </span>
          <span className="text-[11px] font-mono text-velox-dim mt-0.5">
            {currentQuote.author}
          </span>
        </div>

        {/* Carousel Dots & Prev/Next Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length)}
            className="p-2 text-velox-dim hover:text-gold-400 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-8 bg-gold-500'
                    : 'w-2 bg-obsidian-700 hover:bg-obsidian-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % quotes.length)}
            className="p-2 text-velox-dim hover:text-gold-400 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
