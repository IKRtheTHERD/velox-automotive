import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'VELOX Automotive — Autonomous Luxury Mobility',
  description:
    'Digital flagship showroom for VELOX, ultra-luxury electric autonomous vehicles engineered for ultimate silence, bespoke craftsmanship, and sovereign sanctuary.',
  keywords: [
    'VELOX',
    'Autonomous Electric Vehicle',
    'Ultra Luxury EV',
    'Sovereign Mobility',
    'Rolls Royce Autonomous',
    'Bespoke EV Sanctuary',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian-900 text-velox-text antialiased min-h-screen flex flex-col font-sans">
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
