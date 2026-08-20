import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', color: '#4FB6C9', fontSize: 24, letterSpacing: 4 }}>
          CLAUDIUS &amp; CO.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', color: '#FFFFFF', fontSize: 94, lineHeight: 1, letterSpacing: -3 }}>
          <span>WE BUILD BRANDS</span>
          <span>FROM IDEA</span>
          <span style={{ color: '#4FB6C9' }}>TO MARKET.</span>
        </div>
        <div style={{ display: 'flex', color: '#8A9296', fontSize: 22, letterSpacing: 2 }}>
          HARARE · ZIMBABWE — INTEGRATED CREATIVE &amp; MARKETING
        </div>
      </div>
    ),
    size,
  );
}
