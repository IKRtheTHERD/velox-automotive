'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModel?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  initialModel = 'VELOX Sanctuary I',
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country: '',
    contact_method: 'Private Concierge Call',
    contact_info: '',
    preferred_timeframe: 'Q3 2026',
    model_interest: initialModel,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    bookingId: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedBooking({
          bookingId: data.bookingId,
          message: data.message,
        });
      } else {
        setErrorMessage(data.message || 'Failed to submit consultation booking request.');
      }
    } catch (err) {
      setErrorMessage('Network or server error while submitting booking request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedBooking(null);
    setErrorMessage(null);
    setFormData({
      full_name: '',
      email: '',
      country: '',
      contact_method: 'Private Concierge Call',
      contact_info: '',
      preferred_timeframe: 'Q3 2026',
      model_interest: initialModel,
      notes: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/40 rounded-xl shadow-[0_0_50px_rgba(201,169,110,0.15)] overflow-hidden">
        {/* Top Gold Accent Bar */}
        <div className="h-1 bg-gold-gradient" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-velox-muted hover:text-gold-400 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedBooking ? (
          /* Confirmation View */
          <div className="p-8 md:p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full border border-gold-400 bg-gold-500/10 text-gold-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-gold-500 uppercase tracking-widest block mb-1">
                CONFIDENTIAL RECORD CREATED
              </span>
              <h3 className="font-serif text-2xl text-velox-text font-light">
                Private Consultation Reserved
              </h3>
            </div>

            <p className="text-xs text-velox-muted leading-relaxed max-w-md mx-auto">
              {submittedBooking.message}
            </p>

            <div className="bg-obsidian-950 p-4 rounded border border-obsidian-750 max-w-sm mx-auto font-mono text-xs">
              <span className="text-velox-dim block text-[10px] uppercase">BOOKING REFERENCE ID</span>
              <span className="text-gold-400 font-bold text-sm">{submittedBooking.bookingId}</span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-6 py-2.5 rounded bg-gold-500 text-obsidian-950 text-xs font-mono font-semibold uppercase tracking-wider hover:bg-gold-400 transition-colors"
              >
                Return to Showroom
              </button>
            </div>
          </div>
        ) : (
          /* Consultation Booking Form View */
          <div className="p-6 md:p-10 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gold-500 uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Confidential Atelier Request
              </div>
              <h3 className="font-serif text-2xl text-velox-text font-light">
                Private Consultation & Bespoke Commission
              </h3>
              <p className="text-xs text-velox-muted font-light mt-1">
                Connect directly with a Senior VELOX Client Concierge. All inquiries remain strictly encrypted.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono rounded">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Lord Alistair Harrington"
                    className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. harrington@sovereign.co.uk"
                    className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Switzerland, United Kingdom, USA"
                    className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none"
                  />
                </div>

                {/* Contact Phone / Info */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                    Direct Contact Phone / Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact_info}
                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                    placeholder="e.g. +44 20 7946 0912"
                    className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Model Interest */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                    Flagship Model of Interest
                  </label>
                  <select
                    value={formData.model_interest}
                    onChange={(e) => setFormData({ ...formData, model_interest: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none"
                  >
                    <option value="VELOX Sanctuary I">VELOX Sanctuary I ($620,000)</option>
                    <option value="VELOX Sanctuary II Apex">VELOX Sanctuary II Apex ($780,000)</option>
                    <option value="VELOX Sovereign Spectre">VELOX Sovereign Spectre ($950,000)</option>
                  </select>
                </div>

                {/* Delivery Timeframe */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                    Preferred Allocation Timeframe
                  </label>
                  <select
                    value={formData.preferred_timeframe}
                    onChange={(e) => setFormData({ ...formData, preferred_timeframe: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none"
                  >
                    <option value="Immediate Delivery">Immediate Delivery (Available Stock)</option>
                    <option value="Q3 2026">Q3 2026 Allocation</option>
                    <option value="Q4 2026">Q4 2026 Allocation</option>
                    <option value="2027 Bespoke Build">2027 Bespoke Build Slot</option>
                  </select>
                </div>
              </div>

              {/* Bespoke Notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gold-400 uppercase tracking-wider block">
                  Bespoke Atelier Customization Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention preferred interior leather finishes, gold leaf inlay requests, or private track handover preferences..."
                  className="w-full bg-obsidian-950 border border-obsidian-750 focus:border-gold-400 rounded px-3 py-2 text-velox-text focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-velox-dim">
                  <Lock className="w-3.5 h-3.5 text-gold-500" />
                  <span>256-bit Encrypted Sovereign Protocol</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 rounded bg-gold-gradient text-obsidian-950 font-mono font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,169,110,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Transmitting Confidential Request...'
                  ) : (
                    <>
                      Submit Confidential Request
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
