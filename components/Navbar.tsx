'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Sparkles, Menu, X } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Flagship', href: '/' },
    { name: 'Philosophy', href: '/philosophy' },
    { name: '3D Vehicle & Hotspots', href: '/vehicle' },
    { name: 'Specifications', href: '/specs' },
    { name: 'Bespoke Commission', href: '/commission' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian-900/90 backdrop-blur-md border-b border-obsidian-600/50 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-obsidian-950/90 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-gold-500/40 flex items-center justify-center bg-obsidian-800 group-hover:border-gold-400 group-hover:shadow-[0_0_12px_rgba(201,169,110,0.3)] transition-all">
              <span className="font-serif font-bold text-gold-500 text-sm tracking-tighter">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.35em] text-velox-text text-lg font-light group-hover:text-gold-400 transition-colors">
                VELOX
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gold-500 uppercase -mt-1 font-mono">
                AUTOMOTIVE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-mono transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-velox-muted hover:text-velox-text'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 shadow-[0_0_8px_#C9A96E]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setConsultationOpen(true)}
              className="relative group overflow-hidden px-5 py-2.5 rounded border border-gold-500/40 bg-obsidian-800 text-gold-400 text-xs font-mono tracking-[0.15em] uppercase hover:text-obsidian-950 transition-colors duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(201,169,110,0.4)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Private Consultation
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gold-500 hover:text-gold-400 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-obsidian-900 border-b border-obsidian-600 px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-[0.2em] font-mono text-velox-muted hover:text-gold-400 py-2 border-b border-obsidian-750"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setConsultationOpen(true);
              }}
              className="w-full mt-4 px-5 py-3 rounded border border-gold-500 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Private Consultation
            </button>
          </div>
        )}
      </header>

      {/* Private Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
