import localFont from 'next/font/local';

/**
 * Archivo — variable (wght 100–900, wdth 62–125).
 * Self-hosted: no third-party request, no layout shift, works offline.
 */
export const archivo = localFont({
  src: [
    { path: '../fonts/archivo-var.woff2', weight: '100 900', style: 'normal' },
    { path: '../fonts/archivo-var-ext.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

/** IBM Plex Mono — eyebrows, indices, metadata, filters. */
export const plexMono = localFont({
  src: [
    { path: '../fonts/plex-mono-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/plex-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
