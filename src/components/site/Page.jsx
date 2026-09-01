// ============================================================================
// THE PAGE
// ============================================================================
// Section order follows the designer's file, with our content mapped onto it:
//
//   hero (pinned)          → headline, tagline, chips, stats
//   statement (pinned)     → About: intro scrub, expertise cards, commitment
//   rail (pinned)          → Case studies, six of them, scrolled horizontally
//   founder (pinned)       → Leadership
//   services (pinned)      → The four capabilities, stepped
//   marquee                → tagline band
//   impact (circle wipe)   → measured delivery figures
//   scene (parallax)       → Vision & Mission
//   why us (columns)       → four advantages + the key stats
//   how we work (columns)  → five-step engagement
//   team (scatter)         → founder + seven specialists, role counts
//   products (spotlight)   → live product, one track each
//   faq                    → tabbed accordion
//   cta (cube)             → closing call to action
//   contact                → details + enquiry form
//   footer

import { useEffect } from 'react';
import { useSceneMode, useSceneRefreshOnLoad } from '../../hooks/useScrollScene';
import { ChromeProvider } from './Chrome';
import { Sprite } from './Sprite';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { AboutQuote } from './AboutQuote';
import { CaseRail } from './CaseRail';
import { Founder } from './Founder';
import { CapabilitiesPinned } from './CapabilitiesPinned';
import { Marquee } from './Marquee';
import { ImpactReveal } from './ImpactReveal';
import { MissionScene } from './MissionScene';
import { ColumnsSection } from './Columns';
import { TeamScatter } from './TeamScatter';
import { ProductSpotlight } from './ProductSpotlight';
import { Faq } from './Faq';
import { FinalCta } from './FinalCta';
import { ContactSection } from './ContactSection';
import { SiteFooter } from './SiteFooter';
import { BackToTop } from './BackToTop';
import { ContactModal } from './ContactModal';
import { StructuredData } from './StructuredData';
import { whyUsData } from '../../data/companyInfo';
import { processSteps, processOutro, whyStats } from '../../data/siteContent';
import '../../styles/site.css';

export const Page = () => {
  const mode = useSceneMode();
  useSceneRefreshOnLoad();

  // The page owns the document background, so overscroll never flashes white.
  useEffect(() => {
    document.documentElement.classList.add('dz-page');
    return () => document.documentElement.classList.remove('dz-page');
  }, []);

  return (
    <ChromeProvider>
      <div className={`dz ${mode === 'auto' ? 'auto' : ''}`}>
        <Sprite />
        <StructuredData />
        <Nav />

        <main>
          <Hero />
          <AboutQuote />
          <CaseRail />
          <Founder />
          <CapabilitiesPinned />
          <Marquee />
          <ImpactReveal />
          <MissionScene />

          <ColumnsSection
            id="why-us"
            tone="light"
            headingId="why-h"
            label="Our Advantage"
            heading={
              <>
                Why Choose <span className="o">Dzire Techx</span>
                <br />
                for cloud &amp; AI
              </>
            }
            lede="Backed by experience, driven by innovation."
            items={whyUsData.map((w) => ({ title: w.title, body: w.description, icon: w.icon }))}
            stats={whyStats}
          />

          <ColumnsSection
            id="process"
            tone="ink"
            headingId="process-h"
            label="How We Work"
            heading={
              <>
                From first <span className="o">assessment</span>
                <br />
                to a system in production
              </>
            }
            lede="Five steps, drawn straight from the capabilities above — no surprises between the first conversation and go-live."
            items={processSteps.map((s) => ({ n: s.n, title: s.title, body: s.body }))}
            outro={
              <>
                {processOutro.a}
                <br />
                <span className="o">{processOutro.b}</span>
              </>
            }
          />

          <TeamScatter />
          <ProductSpotlight />
          <Faq />
          <FinalCta />
          <ContactSection />
        </main>

        <SiteFooter />
        <BackToTop />
        <ContactModal />
      </div>
    </ChromeProvider>
  );
};

export default Page;
