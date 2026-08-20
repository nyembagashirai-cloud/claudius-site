import Hero from '@/components/home/Hero';
import SelectedWork from '@/components/home/SelectedWork';
import StatementBand from '@/components/home/StatementBand';
import ExperientialStrip from '@/components/home/ExperientialStrip';
import ApproachSequence from '@/components/home/ApproachSequence';
import ClientWall from '@/components/home/ClientWall';
import ContactCta from '@/components/home/ContactCta';
import { getAllProjects, getClients, getFeaturedProjects } from '@/lib/content';

export const revalidate = 3600;

/**
 * Seven movements. The work is the hero; About is a nav item, not a section.
 */
export default async function HomePage() {
  const [featured, all, clients] = await Promise.all([
    getFeaturedProjects(),
    getAllProjects(),
    getClients(),
  ]);

  return (
    <>
      <Hero />
      <SelectedWork projects={featured} total={all.length} />
      <StatementBand
        lines={['WE DON’T JUST', 'MARKET BRANDS.', 'WE HELP', 'BUILD THEM.']}
        accentFrom={2}
        ground="ink"
      />
      <ExperientialStrip />
      <ApproachSequence />
      <ClientWall clients={clients} />
      <ContactCta />
    </>
  );
}
