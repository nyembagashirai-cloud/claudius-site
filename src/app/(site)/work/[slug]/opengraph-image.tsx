import { ImageResponse } from 'next/og';
import { getProject } from '@/lib/content';

export const alt = 'Claudius & Co. case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function CaseOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#075467',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', color: '#B6E2EA', fontSize: 24, letterSpacing: 4 }}>
          CLAUDIUS &amp; CO. — CASE STUDY
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', color: '#FFFFFF' }}>
          <span style={{ fontSize: 30, letterSpacing: 4, color: '#B6E2EA', marginBottom: 18 }}>
            {project?.client ?? ''}
          </span>
          <span style={{ fontSize: 78, lineHeight: 1.02, letterSpacing: -2 }}>
            {project?.title ?? 'Selected work'}
          </span>
        </div>
        <div style={{ display: 'flex', color: '#B6E2EA', fontSize: 22, letterSpacing: 2 }}>
          {project?.services.slice(0, 5).join('  ·  ') ?? ''}
        </div>
      </div>
    ),
    size,
  );
}
