'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.8,
      // Ease-In-Out S-Curve: starts slow, accelerates smoothly, then glides to a gradual stop
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
