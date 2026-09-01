// ============================================================================
// SITE CONTENT — derived copy for the scroll-driven layout
// ============================================================================
// Everything in this file is DERIVED from facts already recorded elsewhere in
// the repo (companyInfo.js, capabilities.js, caseStudies.js, products.js) or
// from copy that already shipped on the previous site. Nothing here is
// invented. Each block notes where it comes from so it stays easy to verify.

import { capabilities } from './capabilities';
import { companyInfo, whyUsData, teamRoles } from './companyInfo';
import { caseStudies } from './caseStudies';
import { products } from './products';

// ── Primary navigation ──────────────────────────────────────────────────────
// The seven items the site has always had, in their original order. These sit
// in the centre of the bar and are handed over from the hero panel as its
// track finishes.
export const primaryNav = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#capabilities' },
  { name: 'Our Products', href: '#products' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Our Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

// The drawer lists everything, including the two sections the new layout adds.
export const navLinks = [
  ...primaryNav.slice(0, 5),
  { name: 'How We Work', href: '#process' },
  ...primaryNav.slice(5),
  { name: 'FAQ', href: '#faq' },
];

// ── Hero ────────────────────────────────────────────────────────────────────
// Headline, sub-headline, description and stats are the previous hero verbatim.
export const hero = {
  headline: ['Innovating', 'the Future', 'with Cloud & AI'],
  backdrop: ["Enterprise-Grade", "Cloud Solutions &", "AI-Driven Innovation"],
  morphTitle: ['Secure, Scalable &', 'Intelligent Systems'],
  morphSub: companyInfo.tagline,
  description:
    'Enterprise-grade cloud solutions and AI-driven innovations. Building scalable, secure, and intelligent systems that transform your business.',
  stats: [
    { value: '15+', label: 'Years', subLabel: 'Experience' },
    { value: '7+', label: 'Industries', subLabel: 'Served' },
    { value: '60%', label: 'Cost', subLabel: 'Reduction' },
  ],
};

// ── Marquee ─────────────────────────────────────────────────────────────────
export const marqueeText = companyInfo.tagline; // "Innovating the Future with Cloud & AI"

// ── Impact reveal (circle wipe + counter) ───────────────────────────────────
// Figures are the headline metrics from caseStudies.js, case study 1
// ("GenAI Agentic Solution", Manufacturing).
export const impact = {
  label: 'Measured delivery',
  count: 60,
  suffix: '%',
  lead: 'reduction in manual effort.',
  body:
    'On a multinational manufacturing floor, a GenAI agentic solution took over SAP invoice and purchase-order validation — cross-checking every document, flagging discrepancies in real time and lifting accuracy by 40% and compliance by 35%.',
  footnotes: [
    { value: '40%', label: 'Increase in accuracy' },
    { value: '35%', label: 'Increase in compliance' },
  ],
};

// ── How we work ─────────────────────────────────────────────────────────────
// The five steps below are a restatement of capabilities.features — every
// bullet in this list appears verbatim in capabilities.js. The mapping is
// noted on each step so it can be traced back.
export const processSteps = [
  {
    n: '1',
    title: 'Assess',
    body: 'AI readiness assessment and business alignment. We start by understanding where you are, what your systems can carry today, and which opportunities are worth pursuing first.',
    from: 'AI Strategy — “AI readiness assessment”, “Business alignment”',
  },
  {
    n: '2',
    title: 'Design',
    body: 'Solution architecture and strategy development. Business needs are translated into a technical strategy with a clear architecture, scope and sequence.',
    from: 'AI Strategy — “Solution architecture”, “Strategy development”',
  },
  {
    n: '3',
    title: 'Build',
    body: 'Proof-of-concept demonstrations and model development. We prove the approach on your data before committing to a full build, then develop the production models and services.',
    from: 'Cloud-Based Solutions — “Proof-of-concept demonstrations”; AI Implementation — “Model development”',
  },
  {
    n: '4',
    title: 'Integrate',
    body: 'System integration, seamless adoption and legacy modernization. Intelligent automation is wired into the systems you already run — cloud-native, on-prem or third-party.',
    from: 'AI Implementation — “System integration”; Cloud — “Seamless adoption strategies”; Modernization — “Legacy modernization”',
  },
  {
    n: '5',
    title: 'Optimize',
    body: 'Scalability assurance, performance monitoring and optimization. Once live, we keep the system measured, tuned and ready for the next order of magnitude.',
    from: 'AI Implementation — “Scalability assurance”, “Performance monitoring”; Cloud — “Performance optimization”',
  },
];

export const processOutro = {
  a: 'From assessment to optimization,',
  b: 'transformation stays measurable.',
};

// ── Why us stats ────────────────────────────────────────────────────────────
export const whyStats = [
  { value: '15+', label: 'Years of', subLabel: 'Excellence' },
  { value: '7+', label: 'Industries', subLabel: 'Served' },
  { value: '100%', label: 'Client', subLabel: 'Satisfaction' },
  { value: 'CMM5', label: 'Level', subLabel: 'Expertise' },
];

// ── FAQ ─────────────────────────────────────────────────────────────────────
// Answers are assembled from companyInfo.js, capabilities.js and
// caseStudies.js. The `src` note on each records where the facts come from.
export const faq = {
  general: [
    [
      'What does Dzire Techx do?',
      'We empower businesses to thrive in the digital era through cutting-edge Cloud Solutions and AI-driven innovations. Our team specializes in building scalable, secure, and intelligent systems that transform ideas into impactful results.',
      'aboutContent.intro',
    ],
    [
      'Which industries have you delivered in?',
      'Manufacturing, the power sector, financial services, telecom and broader enterprise IT. Our case studies cover SAP invoice validation on a manufacturing floor, an order management platform for a national power corporation, a self-service portal for a financial investment company, an intelligent collections system for a Middle East telecom operator, and two enterprise platform modernizations.',
      'caseStudies.js — industries',
    ],
    [
      'Who will actually work on my project?',
      'A team with an average of 15+ years of experience from multinational CMM5 companies. The group is made up of senior AI architects, AI architects, AI engineers, senior developers and developers, led directly by our founder.',
      'whyUsData[0]; teamRoles',
    ],
    [
      'What kind of results have your clients seen?',
      'Up to 60% reduction in manual effort with 40% higher accuracy and 35% better compliance in manufacturing; 40% fewer manual errors, 35% faster approval cycles and 100% system visibility in the power sector; 60% lower support costs in financial services; and 80% reduced churn in telecom.',
      'caseStudies.js — metrics',
    ],
    [
      'Can you work with our existing and legacy systems?',
      'Yes — that is a core part of what we do. Our team explores combining AI, intelligent automation and digitization with legacy systems, cloud-native platforms, on-premise estates and third-party intelligent systems.',
      'whyUsData[3] — System Integration',
    ],
    [
      'Where are you based?',
      `${companyInfo.contact.location}.`,
      'companyInfo.contact.location',
    ],
    [
      'Are you a registered company?',
      `Yes. ${companyInfo.name}, CIN ${companyInfo.cin}.`,
      'companyInfo.name / companyInfo.cin',
    ],
  ],
  services: [
    [
      'What services do you offer?',
      'Four core capabilities: Cloud-Based Solutions, AI Strategy, AI Implementation and Enterprise Modernization. Each is described in full in the Services section above, along with what is included.',
      'capabilities.js',
    ],
    [
      'How does an engagement start?',
      'With an AI readiness assessment and business alignment, so we agree on where the value is before anything is built. From there we move to solution architecture and strategy development, then a proof-of-concept on your own data.',
      'capabilities.js — AI Strategy & Cloud features',
    ],
    [
      'Do you run proofs-of-concept before a full build?',
      'Yes. We design and deliver proof-of-concept demonstrations and tailored solutions that maximize the potential of cloud platforms, so the approach is validated before the full engagement.',
      'capabilities[0].description',
    ],
    [
      'Can you migrate or upgrade our BPM platform?',
      'Yes. We migrate BPM workloads to Camunda and upgrade Pega to the latest Infinity releases — we have delivered a Camunda modernization that cut maintenance cost by 40%, and a Pega Infinity 24.1 upgrade with a Cosmos-theme UI refresh.',
      'capabilities[3]; caseStudies 6 & 7',
    ],
    [
      'How do you approach back-office automation?',
      'Through process automation, data centralization, process orchestration, and consultation delivered by building intelligent / AI agents around your existing operations.',
      'whyUsData[2] — Backoffice Management',
    ],
    [
      'Do you build your own products as well?',
      products.length
        ? `Yes. ${products[0].name} is live today — ${products[0].description.split('. ')[0]}. You can open it from the Products section.`
        : 'Yes — our live products are listed in the Products section.',
      'products.js',
    ],
    [
      'Do you provide ongoing support after go-live?',
      'Yes. Our consultancy and support services ensure seamless adoption and optimized performance for every client, and we stay engaged through performance monitoring and scalability assurance.',
      'capabilities[0].description; capabilities[2].features',
    ],
    [
      'How do we get in touch?',
      `Email ${companyInfo.contact.email} or call ${companyInfo.contact.phone}. You can also use the enquiry form on this page — we get back to you within 24 hours.`,
      'companyInfo.contact; previous Contact section copy',
    ],
  ],
};

export const faqTabs = [
  { key: 'general', label: 'General' },
  { key: 'services', label: 'Services & Engagement' },
];

// ── Trust indicators (final CTA) ────────────────────────────────────────────
export const trustIndicators = [
  'Enterprise Security',
  'Scalable Architecture',
  'AI-Powered Solutions',
];

// ── Footer ──────────────────────────────────────────────────────────────────
export const footerColumns = [
  {
    title: 'Services',
    links: capabilities.map((c) => ({ name: c.title, href: '#capabilities' })),
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Why Dzire Techx', href: '#why-us' },
      { name: 'Our Team', href: '#team' },
      { name: 'Our Products', href: '#products' },
    ],
  },
];

export { capabilities, companyInfo, whyUsData, caseStudies, products, teamRoles };
