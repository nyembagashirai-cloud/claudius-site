import { Suspense } from 'react';
import type { Metadata } from 'next';
import SplitLines from '@/components/primitives/SplitLines';
import WorkIndex from '@/components/work/WorkIndex';
import { getAllProjects } from '@/lib/content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work from Claudius & Co. — brand development, packaging, experiential marketing, ' +
    'retail execution, content and digital for brands across Zimbabwe and the region.',
  alternates: { canonical: '/work' },
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <section className="ground-ink wrap min-h-screen pb-[var(--section)] pt-[clamp(120px,20vh,220px)]" data-ground="dark">
      <p className="t-label mb-5 text-teal-300">Index — {projects.length} projects</p>
      <SplitLines as="h1" className="t-display-xl mb-[clamp(32px,6vh,72px)]" lines={['WORK']} immediate />
      <Suspense fallback={null}>
        <WorkIndex projects={projects} />
      </Suspense>
    </section>
  );
}
