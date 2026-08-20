import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CaseHero from '@/components/case-study/CaseHero';
import CaseIntro from '@/components/case-study/CaseIntro';
import WhatWeDid from '@/components/case-study/WhatWeDid';
import Blocks from '@/components/case-study/Blocks';
import RelatedWork from '@/components/case-study/RelatedWork';
import Reveal from '@/components/primitives/Reveal';
import { getAllProjects, getProject, getRelatedProjects } from '@/lib/content';
import { projectJsonLd, projectMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return projectMetadata(project);
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project);

  return (
    <>
      <CaseHero project={project} />
      <CaseIntro project={project} />
      <WhatWeDid items={project.whatWeDid} />
      <Blocks blocks={project.blocks} />

      {project.results?.length ? (
        <section className="ground-teal wrap py-[var(--section)]" data-ground="dark">
          <Reveal>
            <h2 className="t-label mb-8 text-teal-100">The outcome</h2>
            {project.results.map((r, i) => (
              <p key={i} className={i === 0 ? 't-display-l mb-8 max-w-[20ch]' : 't-body-l mb-5 text-teal-50/80'}>
                {r}
              </p>
            ))}
          </Reveal>
        </section>
      ) : null}

      {project.credits?.length ? (
        <section className="ground-ink wrap py-[clamp(56px,10vh,120px)]" data-ground="dark">
          <Reveal>
            <h2 className="t-label mb-7 text-teal-300">Credits</h2>
            <dl className="grid gap-x-[var(--gutter)] gap-y-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {project.credits.map((c) => (
                <div key={c.role}>
                  <dt className="t-index mb-1.5 text-white/60">{c.role}</dt>
                  <dd className="t-label">{c.name}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      ) : null}

      <RelatedWork projects={related} />

      <section className="bg-teal-700 wrap py-[clamp(90px,14vh,170px)] text-white" data-ground="dark">
        <Reveal>
          <p className="t-label mb-6 text-teal-100">Next</p>
          <h2 className="t-display-l mb-9 max-w-[16ch]">Have a project that should be impossible to ignore?</h2>
          <Link href="/contact" className="btn btn-lg">
            Start a conversation <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
    </>
  );
}
