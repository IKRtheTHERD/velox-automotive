'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      // Using lerp instead of duration/easing provides organic momentum stacking
      // and eliminates the feeling of "lag" on initial scroll.
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
