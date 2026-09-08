import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 82, 90],
    deviceSizes: [420, 640, 828, 1080, 1200, 1600, 1920, 2560, 3200],
    imageSizes: [64, 128, 200, 320, 420, 560],
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
