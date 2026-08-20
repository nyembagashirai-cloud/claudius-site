import type { Metadata, Viewport } from 'next';
import { archivo, plexMono } from '@/lib/fonts';
import { baseMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: '#075467',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
