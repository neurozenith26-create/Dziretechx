export const caseStudies = [
  {
    id: 1,
    title: 'GenAI Agentic Solution',
    industry: 'Manufacturing',
    problem: 'A multinational manufacturing unit experienced inefficiencies in SAP invoice and purchase order validation, resulting in significant operational effort and inconsistent accuracy.',
    solution: 'A GenAI-based agentic solution was deployed to automate validation, cross-check invoice and PO data, flagging discrepancies in real time, and streamline reviews.',
    metrics: [
      { value: 60, suffix: '%', label: 'Reduction in manual effort' },
      { value: 40, suffix: '%', label: 'Increase in accuracy' },
      { value: 35, suffix: '%', label: 'Increase in compliance' }
    ],
    color: 'amber',
    icon: 'Factory'
  },
  {
    id: 3,
    title: 'End-to-End Integrated System',
    industry: 'Power Sector',
    problem: 'A national corporation lacked a unified platform for managing internal orders. Teams relied on manual data entry and ad hoc sharing across personal devices and messaging apps.',
    solution: 'An end-to-end order management system was implemented to centralize data capture, automate approvals, and replace ad hoc processes with standardized workflow and clear ownership.',
    metrics: [
      { value: 40, suffix: '%', label: 'Reduction in manual errors' },
      { value: 35, suffix: '%', label: 'Faster approval cycle' },
      { value: 100, suffix: '%', label: 'System visibility' }
    ],
    color: 'yellow',
    icon: 'Zap'
  },
  {
    id: 4,
    title: 'AI Self-Service Portal',
    industry: 'Financial Services',
    problem: 'A financial investment company was incurring high operational costs due to heavy reliance on full-time employees and significant call-center charges for routine customer queries.',
    solution: 'We implemented an AI/ML and SEO-driven self-service solution that automated routine customer queries, reducing dependency on human support.',
    metrics: [
      { value: 60, suffix: '%', label: 'Reduced support costs' },
      { value: 0, suffix: '', label: 'Lowered FTE headcount', displayText: 'Significantly' }
    ],
    color: 'emerald',
    icon: 'Landmark'
  },
  {
    id: 5,
    title: 'Intelligent Collections System',
    industry: 'Telecom',
    problem: 'A major telecom operator in the Middle East was facing challenges in collections, customer churn, and upselling efforts that were often targeted at the wrong customer segments.',
    solution: 'We built an intelligent collections system powered by modern data engineering, cloud scalability, and advanced ML models for accurate customer segmentation and churn prevention.',
    metrics: [
      { value: 80, suffix: '%', label: 'Reduced churn' },
      { value: 0, suffix: '', label: 'Revenue increase', displayText: 'Significant' }
    ],
    color: 'cyan',
    icon: 'Radio'
  },
  {
    id: 6,
    title: 'BPM Migration to Camunda',
    industry: 'Enterprise',
    problem: 'The application was built with a legacy BPM tool with extensive customization and no BPMN standards. Business was facing difficulties adding new features for growth.',
    solution: 'We modernized the application using Camunda, removed unnecessary customization and added new features of the latest tool for business needs.',
    metrics: [
      { value: 40, suffix: '%', label: 'Reduced maintenance cost' },
      { value: 30, suffix: '%', label: 'New features added' }
    ],
    color: 'blue',
    icon: 'Workflow'
  },
  {
    id: 7,
    title: 'Pega Infinity Upgrade',
    industry: 'Enterprise',
    problem: 'The application was built with an older version of Pega. The required license was expired and business was facing difficulties maintaining the application.',
    solution: 'We upgraded the Pega application to Pega Infinity 24.1 and improved the UI scheme using the Cosmos theme for enhanced user experience.',
    metrics: [
      { value: 20, suffix: '%', label: 'New features added' },
      { value: 0, suffix: '', label: 'Customer satisfaction', displayText: 'Improved' }
    ],
    color: 'red',
    icon: 'Layers'
  }
];
