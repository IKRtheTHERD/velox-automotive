import React from 'react';
import SpecsComparator from '@/components/SpecsComparator';
import ConsultationSection from '@/components/ConsultationSection';
import { getModels } from '@/lib/db';
import { SlidersHorizontal } from 'lucide-react';

export const revalidate = 0;

export default function SpecsPage() {
  const models = getModels();

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-widest uppercase">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          TECHNICAL SPECIFICATIONS MATRIX
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-velox-text font-light">
          Vehicle Specifications Comparator
        </h1>
        <p className="text-xs md:text-sm text-velox-muted font-light">
          Query the mock database to compare acceleration, range, NVH noise floors, and annual allocation limits across all VELOX models.
        </p>
      </div>

      <SpecsComparator models={models} />

      <ConsultationSection />
    </div>
  );
}
