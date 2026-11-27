// ============================================================================
// CENTRALIZED PORTFOLIO CONFIG
// Edit your bio, gun spray cards, projects, skills, experience & links here.
// ============================================================================

export const PALETTE = {
  lime: {
    bg: '#C6F432',
    text: '#111111',
    subText: 'rgba(17, 17, 17, 0.72)',
    pillBg: 'rgba(17, 17, 17, 0.09)',
  },
  orange: {
    bg: '#FF6B1A',
    text: '#111111',
    subText: 'rgba(17, 17, 17, 0.78)',
    pillBg: 'rgba(17, 17, 17, 0.1)',
  },
  blue: {
    bg: '#3B6BFF',
    text: '#FFFFFF',
    subText: 'rgba(255, 255, 255, 0.82)',
    pillBg: 'rgba(255, 255, 255, 0.18)',
  },
  pink: {
    bg: '#FF4FA3',
    text: '#111111',
    subText: 'rgba(17, 17, 17, 0.75)',
    pillBg: 'rgba(17, 17, 17, 0.1)',
  },
  purple: {
    bg: '#7B5CFF',
    text: '#FFFFFF',
    subText: 'rgba(255, 255, 255, 0.84)',
    pillBg: 'rgba(255, 255, 255, 0.18)',
  },
  black: {
    bg: '#111111',
    text: '#F4F4F0',
    subText: 'rgba(244, 244, 240, 0.72)',
    pillBg: 'rgba(244, 244, 240, 0.14)',
  },
  white: {
    bg: '#FFFFFF',
    text: '#111111',
    subText: 'rgba(17, 17, 17, 0.68)',
    pillBg: 'rgba(17, 17, 17, 0.08)',
  },
};

export const PROFILE = {
  name: 'Adarsh Kesharwani',
  firstName: 'Adarsh',
  brandMark: 'adarsh.k',
  role: 'Software Developer',
  status: 'Available for work',
  city: 'Prayagraj, India',
  timezone: 'Asia/Kolkata',
  tagline:
    'Final-year B.Tech CSE builder crafting fast REST APIs, real-time dashboards, and open-source tools for Wikimedia & the web.',
  bio:
    "I'm a backend-focused full-stack developer who likes turning messy workflows into crisp, reliable software. Over the past year I've engineered an institutional grading system serving 200+ students annually, cut API retrieval latency by 20% at a logistics startup, and merged 20+ patches into MediaWiki Core & extensions.",
  avatar: '/images/optimized/AdarshP.webp',
  resumeUrl: '/Adarsh_Resume.pdf',
  email: 'kesharwaniadarsh24@gmail.com',
  githubUsername: 'Adarsh240-feb',
  socials: [
    {
      name: 'GitHub',
      handle: '@Adarsh240-feb',
      url: 'https://github.com/Adarsh240-feb',
      color: 'black',
    },
    {
      name: 'LinkedIn',
      handle: 'adarsh-kesharwani',
      url: 'https://www.linkedin.com/in/adarsh-kesharwani-bba666315',
      color: 'blue',
    },
    {
      name: 'Wikimedia Gerrit',
      handle: 'Akaza24',
      url: 'https://gerrit.wikimedia.org/r/q/owner:Akaza24',
      color: 'lime',
    },
    {
      name: 'Instagram',
      handle: '@return_adarshhhh',
      url: 'https://www.instagram.com/return_adarshhhh',
      color: 'pink',
    },
  ],
};

export const STATS = [
  { value: '20+', label: 'MediaWiki Patches Merged', color: 'lime' },
  { value: '200+', label: 'Students Served / Year', color: 'blue' },
  { value: '20%', label: 'API Latency Reduced', color: 'orange' },
  { value: '50+', label: 'Students Mentored', color: 'purple' },
];

export const PROJECTS = [
  {
    id: 'link2logistics',
    title: 'Link2Logistics',
    category: 'Full-Stack',
    color: 'orange',
    image: '/images/optimized/link2logistics.webp',
    summary:
      'B2B warehouse marketplace & commercial admin dashboard connecting warehouse owners and merchants across India with real-time inventory oversight.',
    tags: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/link2logistics001/WareHouse-Hub',
    live: 'https://www.link2logistics.com/',
    impact: '20% faster retrieval via caching',
  },
  {
    id: 'uit-map',
    title: 'UIT-MAP',
    category: 'Backend',
    color: 'blue',
    image: '/images/optimized/uit.webp',
    summary:
      'Institution-approved virtual project diary & rubric evaluation platform digitizing final-year project grading for ~200 students every year.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Adarsh240-feb/UIT-MAP',
    live: 'https://uitmap.com/',
    impact: '40% less manual grading time',
  },
  {
    id: 'wikiclubtech-uit',
    title: 'WikiClubTech UIT',
    category: 'Full-Stack',
    color: 'purple',
    image: '/images/optimized/WikiMainLogo.webp',
    imageFit: 'contain',
    summary:
      'Community platform for WikiClubTech UIT featuring a live contribution board tracking real-time Wikimedia patches by club members.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Apps Script'],
    github: 'https://github.com/Adarsh240-feb/WikiWebsite',
    live: 'https://wikiclubtechuit.org/',
    impact: '50+ contributors onboarded',
  },
  {
    id: 'gerrit-it',
    title: 'Gerrit-It',
    category: 'Open Source',
    color: 'lime',
    image: '/images/optimized/gerrit-it.webp',
    summary:
      'Contributor analytics and reporting platform for Wikimedia Gerrit — tracking patches authored, code reviews conducted, and verified reports.',
    tags: ['Vite', 'Gerrit API', 'Wikimedia', 'Toolforge', 'Analytics'],
    github: 'https://github.com/Adarsh240-feb/Gerrit-It',
    live: 'https://gerrit-it.toolforge.org/',
    impact: 'Live on Wikimedia Toolforge',
  },
  {
    id: 'commons-collage-studio',
    title: 'Commons Collage Studio',
    category: 'Creative Tool',
    color: 'pink',
    image: '/images/optimized/wikicommons-collage-studio.webp',
    summary:
      'Browser-based image editing & collage studio for Wikimedia Commons with custom layouts, non-destructive color grading, and attribution exports.',
    tags: ['JavaScript', 'Canvas API', 'Wikimedia Commons', 'Toolforge'],
    github: 'https://github.com/Adarsh240-feb/WikiCommonCollageStudio',
    live: 'https://wikicommons-collage-studio.toolforge.org/',
    impact: 'Client-side Canvas engine',
  },
  {
    id: 'brain-tumor-detection',
    title: 'Brain Tumor Detection',
    category: 'AI / Backend',
    color: 'black',
    image: null, // Uses crisp built-in MRI Grad-CAM UI mockup
    summary:
      'FastAPI backend serving EfficientNet-B3 MRI classification and Grad-CAM explainable tumor localization heatmaps to a Next.js frontend.',
    tags: ['Python', 'FastAPI', 'TensorFlow', 'OpenCV', 'Next.js', 'MongoDB'],
    github: 'https://github.com/Adarsh240-feb',
    live: null,
    impact: 'B.Tech Major Project',
  },
];

// Cards sprayed by the Portfolio Gun — each links directly to a section or project!
export const GUN_CARDS = [
  { label: 'LINK2LOGISTICS', sub: 'B2B WAREHOUSE API', color: 'orange', target: '#project-link2logistics', size: 'lg' },
  { label: 'UIT-MAP', sub: '200+ STUDENTS / YR', color: 'blue', target: '#project-uit-map', size: 'md' },
  { label: 'GERRIT-IT', sub: 'WIKIMEDIA ANALYTICS', color: 'lime', target: '#project-gerrit-it', size: 'md' },
  { label: 'COLLAGE STUDIO', sub: 'CANVAS ENGINE', color: 'pink', target: '#project-commons-collage-studio', size: 'lg' },
  { label: 'WIKICLUB TECH', sub: 'LIVE LEADERBOARD', color: 'purple', target: '#project-wikiclubtech-uit', size: 'md' },
  { label: 'BRAIN MRI AI', sub: 'FASTAPI + GRAD-CAM', color: 'black', target: '#project-brain-tumor-detection', size: 'lg' },
  { label: '20+ MERGED', sub: 'MEDIAWIKI CORE', color: 'lime', target: '#experience', size: 'md' },
  { label: 'REST APIS', sub: 'NODE & FASTAPI', color: 'blue', target: '#toolbox', size: 'sm' },
  { label: 'REACT + NEXT', sub: 'FRONTEND SYSTEMS', color: 'white', target: '#toolbox', size: 'md' },
  { label: 'MONGODB + SQL', sub: 'DATA MODELING', color: 'orange', target: '#toolbox', size: 'md' },
  { label: 'TYPESCRIPT', sub: 'TYPE-SAFE CODE', color: 'purple', target: '#toolbox', size: 'sm' },
  { label: 'PYTHON', sub: 'BACKEND & ML', color: 'pink', target: '#toolbox', size: 'sm' },
  { label: 'PHP + GERRIT', sub: 'OPEN SOURCE', color: 'white', target: '#experience', size: 'md' },
  { label: 'SHIPPED', sub: 'PRODUCTION APPS', color: 'black', target: '#work', size: 'sm' },
  { label: '50+ MENTORED', sub: 'TECH LEADERSHIP', color: 'lime', target: '#about', size: 'md' },
  { label: "LET'S BUILD", sub: 'AVAILABLE NOW', color: 'orange', target: '#contact', size: 'sm' },
];

export const SKILLS_ROW_1 = [
  { name: 'Node.js', color: 'lime' },
  { name: 'Express.js', color: 'black' },
  { name: 'FastAPI', color: 'blue' },
  { name: 'React.js', color: 'white' },
  { name: 'Next.js', color: 'black' },
  { name: 'TypeScript', color: 'purple' },
  { name: 'JavaScript', color: 'lime' },
  { name: 'Python', color: 'orange' },
  { name: 'PHP', color: 'pink' },
  { name: 'Java', color: 'orange' },
];

export const SKILLS_ROW_2 = [
  { name: 'MongoDB', color: 'lime' },
  { name: 'PostgreSQL', color: 'blue' },
  { name: 'MySQL', color: 'white' },
  { name: 'Firebase', color: 'orange' },
  { name: 'Tailwind CSS', color: 'pink' },
  { name: 'REST APIs', color: 'purple' },
  { name: 'Gerrit', color: 'black' },
  { name: 'Phabricator', color: 'white' },
  { name: 'Git & GitHub', color: 'black' },
  { name: 'Cloudinary', color: 'blue' },
  { name: 'n8n', color: 'pink' },
  { name: 'Apps Script', color: 'lime' },
];

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    color: 'lime',
    description:
      'Audit bottlenecks, real user workflows, and data constraints before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Design',
    color: 'pink',
    description:
      'Sketch crisp interfaces, clean API contracts, and normalized database schemas built to stay readable.',
  },
  {
    num: '03',
    title: 'Build',
    color: 'blue',
    description:
      'Write modular backend services and responsive UIs with caching, validation, and thoughtful edge-case handling.',
  },
  {
    num: '04',
    title: 'Ship',
    color: 'orange',
    description:
      'Deploy to production, iterate through peer code reviews, monitor real latency, and keep polishing.',
  },
];

export const EXPERIENCE = [
  {
    role: 'Full Stack Developer Intern',
    org: 'Vetro GlobalEdge LLP',
    period: 'Feb 2026 – May 2026',
    location: 'Remote',
    color: 'orange',
    bullets: [
      'Built the commercial admin dashboard and Node.js/Express/MongoDB APIs for Link2Logistics, giving warehouse owners and merchants real-time inventory visibility.',
      'Reduced data retrieval latency by 20% through optimized caching and query design.',
      'Streamlined merchant–supplier coordination and automated inventory logging workflows.',
    ],
  },
  {
    role: 'Open Source Contributor',
    org: 'Wikimedia Foundation',
    period: 'Sep 2025 – Present',
    location: 'Remote',
    color: 'lime',
    bullets: [
      'Submitted 45 patches in one year, with 20+ merged into MediaWiki Core and 10+ extensions including CampaignEvents, CheckUser, MassMessage, UploadWizard, Translate, and ContentTranslation.',
      'Authored PHP and JavaScript changes and iterated through strict peer code reviews on Gerrit.',
      'Tracked, reproduced, and triaged community issues on Wikimedia Phabricator.',
    ],
  },
  {
    role: 'Technical Lead',
    org: 'WikiClub Tech-UIT',
    period: 'Aug 2025 – Present',
    location: 'Prayagraj',
    color: 'purple',
    bullets: [
      'Founded the campus open-source chapter and mentored 50+ students through hands-on Gerrit and Git workflows.',
      'Engineered the WikiClubTech UIT platform featuring a live contribution leaderboard.',
    ],
  },
  {
    role: 'Core Team Member & Volunteer',
    org: 'GDG & TFUG Prayagraj',
    period: '2025 – Present',
    location: 'Prayagraj',
    color: 'blue',
    bullets: [
      'Help organize regional developer meetups, technical workshops, and boot camps.',
      'Selected volunteer for Wiki Conference India 2026 (Kochi).',
    ],
  },
];

export const EDUCATION = {
  institution: 'United Institute of Technology, Prayagraj',
  degree: 'B.Tech in Computer Science & Engineering',
  period: '2023 – 2027',
  highlights: [
    'Invited to Graduation Day — Road to Wiki Cohort 2',
    'Top 7 — 6th Technovation Hackathon, Sharda University',
    'Top 10 Finalist — State Level Hackathon, United University',
    '2nd Position — College-Level Programming Contest',
  ],
};
