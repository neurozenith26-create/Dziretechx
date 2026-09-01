// ============================================================================
// STRUCTURED DATA (SEO)
// ============================================================================
// index.html already ships the Organization / WebSite / Service graph as static
// markup. This adds the parts that are generated from the data files, so they
// can never drift from what the page actually says:
//
//   FAQPage    — every question and answer rendered in the FAQ section
//   ItemList   — the case studies, as the work the organization has delivered
//
// It renders inside the page, so the build-time prerender bakes it into the
// served HTML and crawlers see it without executing JavaScript.

import { faq, companyInfo } from '../../data/siteContent';
import { caseStudies } from '../../data/caseStudies';

const SITE = 'https://www.dziretechx.com/';

const buildGraph = () => {
  const questions = [...faq.general, ...faq.services].map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE}#faq`,
        mainEntity: questions,
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE}#case-studies`,
        name: `${companyInfo.shortName} case studies`,
        itemListElement: caseStudies.map((study, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: study.title,
            about: study.industry,
            description: `${study.problem} ${study.solution}`,
            creator: { '@id': `${SITE}#organization` },
          },
        })),
      },
    ],
  };
};

export const StructuredData = () => (
  <script
    type="application/ld+json"
    // Content is built from local data files only — no user input reaches it.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGraph()) }}
  />
);

export default StructuredData;
