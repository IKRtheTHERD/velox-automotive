import React from 'react';
import VehicleSpinViewer from '@/components/VehicleSpinViewer';
import InteriorHotspots from '@/components/InteriorHotspots';
import ConsultationSection from '@/components/ConsultationSection';
import { getHotspots } from '@/lib/db';
import { RotateCw } from 'lucide-react';

export const revalidate = 0;

export default function VehiclePage() {
  const hotspots = getHotspots();

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-widest uppercase">
          <RotateCw className="w-3.5 h-3.5" />
          DIGITAL FLAGSHIP STUDIO
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-velox-text font-light">
          3D Vehicle Customizer & Hotspot Explorer
        </h1>
        <p className="text-xs md:text-sm text-velox-muted font-light">
          Interactively rotate the 270°/360° vehicle spin simulator, switch studio lighting and exterior colorways, and inspect cabin engineering hotspots.
        </p>
      </div>

      {/* 3D Spin Simulator */}
      <VehicleSpinViewer />

      {/* Hotspots Section */}
      <InteriorHotspots hotspots={hotspots} />

      <ConsultationSection />
    </div>
  );
}
