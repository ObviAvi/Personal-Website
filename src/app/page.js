'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { SiGmail, SiLeetcode } from 'react-icons/si';

import { SidebarTerminal } from '@/components/ui/sidebar-terminal';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const AnimatedDiv = ({ children, delay = 0, className = '' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`
        scroll-reveal
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Section = ({ id, label, className = '', children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section
      id={id}
      ref={ref}
      className={`
        scroll-reveal border-b border-[var(--rule-soft)] px-5 py-10 sm:px-8 lg:px-14 lg:py-14
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        ${className}
      `}
    >
      {label && (
        <div className="mono mb-5 text-[12px] font-semibold tracking-[0.06em] text-[var(--accent)]">{label}</div>
      )}
      {children}
    </section>
  );
};

const timelineEvents = [
  {
    type: 'experience',
    title: 'Technical Project Lead',
    date: 'Feb 2026 – May 2026 | West Lafayette, Indiana',
    description:
      'Created as a Project Lead for Google Developers Group. Led a team of 8 developers to create a RAG-based AI assistant that helps users check their questions against Purdue University policies and documents (i.e. university rules, handbooks, housing terms, scholarship requirements, etc.) and get accurate, context-specific responses',
    details: [
      'Built a web scraping pipeline to collect text and image data from Purdue University policy websites and documents',
      'Implemented a RAG architecture for multimodal information retrieval and generation using LangChain and Pinecone',
      'Benchmarked different kinds of RAG systems and embedding models (i.e. vanilla, reranker, etc) for speed vs accuracy trade-offs',
      'Added live response streaming, image retrieval, and hosted and open-source embedding model for quick responses and better user experience',
    ],
    side: 'right',
    logo: '/GDG-Logo.jpg',
  },
  {
    type: 'experience',
    title: 'AI Research Engineer',
    date: 'Feb 2026 – May 2026 | West Lafayette, Indiana',
    description:
      'ML@Purdue | Exploring multimodal foundation models for dermatological image analysis for acne grading and scar classification.',
    details: [
      'Convolutional Neural Networks (CNN) and Transformers for medical image analysis',
      'Multimodal foundation model development and evaluation',
      'Dermatological dataset preparation and validation',
    ],
    side: 'left',
    logo: '/MLP-Logo.png',
  },
  {
    type: 'experience',
    title: 'Software Developer',
    date: 'Aug 2025 – Dec 2025 | West Lafayette, Indiana',
    description:
      'Purdue Stack | Developed real-time news feed for Social Stack Exchange (startup) app featuring trending and personalized feeds, keyword search, and user interactions.',
    details: [
      'Built cross-platform mobile application using Expo with React Native',
      'Developed RESTful API with Express.js for news, trending content, and portfolio data delivery',
      'Engineered automated news scraper to aggregate and normalize content from multiple sources',
      'Implemented upvote functionality and user interaction features',
    ],
    side: 'right',
    logo: '/PurdueStack-Logo.jpg',
  },
  {
    type: 'experience',
    title: 'Promega Corporation | Summer Internship |',
    url: 'https://www.promegaconnections.com/is-you-lab-environment-messing-with-your-results-how-to-spot-the-signs-early/',
    linkLabel: 'Promega Connections',
    date: 'May 2025 – August 2025 | Madison WI',
    description:
      'Promega Corporation is a biotechnology company that develops and supplies over 4,000 products supporting life science research in areas such as genomics, protein analysis, cellular analysis, drug discovery, and forensic DNA identification.',
    details: [
      'The goal of this project is to improve instrument reliability by designing a machine learning and statistical anomaly detection system that integrates environmental sensor data (temperature, humidity, particulate matter) to identify conditions in real-time that are linked to low-quality experimental results.',
      'Processed univariate and multivariate data in Python (pandas, NumPy) with cyclical time encoding, performed correlation analysis, and trained ML-based Holt-Winters, K-means Clustering, Isolation Forest, & Variational-Autoencoder models to flag anomalies',
      'Integrated an SHT45 sensor into Discover LLC boards with firmware (C/C++) and hardware modifications; updated host software to log environmental readings in real time alongside instrument metrics',
    ],
    side: 'left',
    logo: '/promega_logo.jpg',
  },
  {
    type: 'experience',
    title: 'Corporate Partnership with Knudsen Institute | Data Mine Research',
    date: 'August 2024 - April 2025 | Lafayette, IN',
    description:
      'The Knudsen Institute is an applied research organization dedicated to developing technology solutions for U.S. manufacturers, aiming to enhance integration into the U.S. Defense Industrial Base at scale.',
    details: [
      'Fine-Tuned Named Entity Recognition (NER) models on manufacturing language to improve Natural Language Processing (NLP) systems that interpret manufacturing-related communication. Additionally, integrated anactive-learning pipeline that allows further refining of the model, particularly in its weakest areas.',
      'This enables the development of smarter applications that can accurately interpret and respond to manufacturing-related communication, particularly in surge environments where assessing manufacturing capabilities is critical.',
      'Tools such as BeautifulSoup and Selenium are used to extract data from HTML and XML files, while PyTorch and HuggingFace were utilized for model development and architecture.',
    ],
    side: 'right',
    logo: '/knudsen-logo.png',
  },
];

const roles = ['Student', 'Software Developer', 'Researcher'];

const coursework = [
  'Data Mining & Machine Learning',
  'Intro to Artificial Intelligence',
  'Data Structures and Algorithms',
  'Computer Architecture',
  'Introduction to Operating Systems',
  'Database Management Systems',
  'Web Information Search & Management',
  'Analysis of Algorithms',
  'AI-Assisted Software Engineering',
  'Object-Oriented Programming',
  'Programming In C',
  'Competitive Programming',
  'Multivariable Calculus/Linear Algebra',
  'Discrete Math',
  'Statistics/Probability',
];

const highSchoolAccomplishments = [
  'Top 10, Magna Cum Laude',
  'National Merit Scholarship Finalist',
  'Business Professionals of America (BPA): 2nd in State, 10th in Nationals for Java Programming Event',
  'United States Computing Olympiad (USACO): Silver Rank',
  'TMEA All-State Violist: Ranked among the top 50 violists in the state of Texas',
  '4-Time Symphony Orchestra Violist: 3rd chair in the Dallas-Fort Worth Metropolitan Area',
];

const skills = [
  'Python', 'TypeScript', 'Java', 'C', 'C++',
  'React', 'Next.js', 'Node.js', 'Express.js', 'FastAPI',
  'Expo / React Native', 'Tailwind CSS', 'Vite',
  'PyTorch', 'HuggingFace', 'NLP',
  'RAG systems', 'LangChain', 'Gemini',
  'Embedding models', 'Pinecone',
  'Agent orchestration', 'Modal',
  'Pandas', 'NumPy', 'scikit-learn',
  'Supabase', 'Firebase',
  'BeautifulSoup', 'Selenium',
  'Git', 'Data structures', 'Software design patterns', 'System design',
  'IoT & embedded systems', 'Competitive programming',
];

const projects = [
  {
    title: 'BoilerCheck',
    href: 'https://boiler-check.vercel.app/',
    repoUrl: 'https://github.com/ObviAvi/BoilerCheck',
    imageSrc: 'https://raw.githubusercontent.com/ObviAvi/BoilerCheck/main/Boilercheck.png',
    imageAlt: 'BoilerCheck screenshot',
    placeholder: 'BoilerCheck',
    description:
      'A RAG-based AI assistant that helps users check their questions against Purdue University policies and documents and get accurate, context-specific responses. Ask in plain English and get concise answers with numbered citations to the exact sections, plus image retrieval, streaming responses, and a full scrape-to-vector pipeline.',
    tags: [
      'Next.js',
      'FastAPI',
      'RAG',
      'LangChain',
      'Embedding models',
      'Pinecone',
      'Gemini',
      'Firebase',
      'Output streaming',
      'Web scraping',
    ],
  },
  {
    title: 'machine(learn);',
    href: 'https://www.youtube.com/watch?v=KX_1jF8S62s&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fwww.akashravandhu.com%2F',
    repoUrl: 'https://github.com/DevashishDas3/machine-learn',
    imageSrc: '/machine-learn-cover.png',
    imageAlt: 'machine(learn); project preview',
    placeholder: 'machine+learn',
    description:
      'Automated ML project which uses agent swarms to train models and find the best solution for a given ML task. Includes an approach planning agent, implementation and hyperparameter tuning agent swarm, and reporting on Modal GPU infrastructure with a Supabase-backed realtime dashboard for dataset upload and live run updates.',
    tags: [
      'Agent swarm',
      'Machine learning',
      'Next.js',
      'Modal',
      'Supabase',
      'Python',
      'FastAPI',
      'Realtime dashboard',
      'GPU inference',
    ],
  },
  {
    title: 'Clariti',
    href: 'https://www.youtube.com/watch?v=WK_HOLkgd_Y',
    repoUrl: 'https://github.com/ObviAvi/Clariti',
    imageSrc: 'https://raw.githubusercontent.com/ObviAvi/Clariti/master/frontend/assets/images/clariti-transparent-beige.png',
    imageAlt: 'Clariti logo',
    placeholder: 'Clariti',
    description:
      'A smart memory-sharing and recall app for people living with dementia. It turns photos, voice notes, and written memories into a living, searchable library. Includes voice Q&A with RAG, facial recognition, Gemini image descriptions, and family groups with join codes (created for HackIllinois 2026).',
    tags: [
      'Expo / React Native',
      'FastAPI',
      'RAG',
      'Semantic search',
      'Voice Q&A',
      'Facial recognition',
      'Supabase + pgvector',
      'Modal (GPU)',
      'ElevenLabs',
      'Accessibility-first UI',
    ],
  },
  {
    title: 'Nook',
    href: 'https://nook-inky.vercel.app/',
    repoUrl: 'https://github.com/ObviAvi/Nook',
    imageSrc: '/nook-cover.png',
    imageAlt: 'Nook neighborhood search preview',
    placeholder: 'Nook',
    description:
      'Purdue Claude Hackathon Winner! Built in just 2 hours, a React and Mapbox prototype for comparing rentals to nearby services from OpenStreetMap3D neighborhood maps, live POIs by category, preference-weighted listing ranks, and a cinematic globe landing, built to help users find the perfect place to live.',
    tags: [
      'Vite',
      'Mapbox GL',
      'Overpass API',
      '3D maps & globe',
      'Preference-weighted ranking',
      'OpenStreetMap',
    ],
  },
  {
    title: 'Folyo',
    href: 'https://folyo-smoky.vercel.app/',
    repoUrl: null,
    imageSrc: '/folyo_logo.png',
    imageAlt: 'Folyo logo',
    placeholder: 'Folyo+Image',
    description:
      'An end-to-end pipeline that allows people to create, refine, and host their own personal website without any coding knowledge necessary.',
    tags: [
      'No-code UX',
      'End-to-end pipeline',
      'Iterative refinement',
      'Hosted deployment',
      'Content generation',
      'Personal sites',
    ],
  },
  {
    title: 'Scholar Seek',
    href: 'https://scholar-seek.vercel.app/',
    repoUrl: 'https://github.com/GalacticQuasar/scholar-seek',
    imageSrc: '/ScholarSeek.png',
    imageAlt: 'Scholar Seek logo',
    placeholder: 'Scholar+Seek+Image',
    description:
      'An application that analyzes research papers with keyword analysis and finds similar, relevant research to help users discover and build on related scholarly works.',
    tags: [
      'Next.js',
      'Gemini',
      'CORE API',
      'Keyword extraction',
      'PDF parsing',
      'Paper similarity',
      'Streaming UI',
      'Research discovery',
    ],
  },
];

const navItems = [
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'extracurriculars', label: 'extracurriculars' },
  { id: 'contact', label: 'contact' },
];

const socialLinks = [
  {
    name: 'github',
    href: 'https://github.com/ObviAvi?tab=repositories',
    label: 'GitHub',
    Icon: FaGithub,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/avi-aggarwal-75275828b/',
    label: 'LinkedIn',
    Icon: FaLinkedin,
  },
  {
    name: 'email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aggarwal.avi@gmail.com',
    label: 'Email',
    Icon: SiGmail,
  },
  {
    name: 'leetcode',
    href: 'https://leetcode.com/u/Avi_A/',
    label: 'Leetcode',
    Icon: SiLeetcode,
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/aviaggarwall/',
    label: 'Instagram',
    Icon: FaInstagram,
  },
];

const chipClass =
  'mono rounded-[5px] border border-[var(--rule-soft)] bg-[var(--panel-alt)] px-2.5 py-[5px] text-[11px] text-[var(--ink-soft)]';

const pillIconClass =
  'flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[5px] border border-[var(--rule)] bg-[var(--panel-alt)] text-[var(--accent)]';

const heroPaths = [
  { d: 'M-100,760 L1700,560', width: 1.5, dash: '14 10', duration: '40s', offset: 1200, tone: 'accent' },
  { d: 'M-100,300 L1700,540', width: 1, dash: '8 14', duration: '55s', offset: 1400, tone: 'accent' },
  { d: 'M-100,140 L1700,60', width: 1, dash: '4 10', duration: '65s', offset: 900, tone: 'muted' },
  { d: 'M-100,620 L900,-100', width: 1, dash: '6 12', duration: '50s', offset: 1100, tone: 'muted' },
];

export default function App() {
  const [heroLottieData, setHeroLottieData] = useState(null);
  const [flockLottieData, setFlockLottieData] = useState(null);
  const [isMobileView, setIsMobileView] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedRole, setTypedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [collapsedProjects, setCollapsedProjects] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = (event) => {
      setIsMobileView(event.matches);
    };

    setIsMobileView(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateViewport);

    return () => {
      mediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isMobileView === null) return;

    if (isMobileView) {
      setHeroLottieData(null);
      setFlockLottieData(null);
      return;
    }

    fetch('/OneBird.json')
      .then((response) => response.json())
      .then((data) => setHeroLottieData(data))
      .catch((error) => console.error('Error loading Hero Lottie animation:', error));

    fetch('/FlockBirds.json')
      .then((response) => response.json())
      .then((data) => setFlockLottieData(data))
      .catch((error) => console.error('Error loading Flock Lottie animation:', error));
  }, [isMobileView]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextIsDark = storedTheme ? storedTheme === 'dark' : prefersDark;

    setIsDarkMode(nextIsDark);
    document.documentElement.setAttribute('data-theme', nextIsDark ? 'dark' : 'light');
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !themeReady) return;

    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, themeReady]);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 60 : 110;
    const pause = !isDeleting && charIndex === current.length ? 1400 : speed;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setTypedRole(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedRole(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((r) => (r + 1) % roles.length);
      }
    }, pause);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return false;

    const headerOffset = window.innerWidth >= 1024 ? 24 : 76;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (sectionId) => (event) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  const heroBirdStyle = {
    opacity: isDarkMode ? 0.16 : 0.12,
    filter: 'sepia(1) saturate(5) hue-rotate(-18deg) brightness(0.85)',
    mixBlendMode: isDarkMode ? 'screen' : 'multiply',
  };

  const footerBirdStyle = {
    opacity: isDarkMode ? 0.8 : 0.55,
    filter: 'brightness(0) saturate(100%) invert(66%) sepia(46%) saturate(683%) hue-rotate(346deg) brightness(94%) contrast(93%)',
    mixBlendMode: isDarkMode ? 'screen' : 'multiply',
  };

  const themeToggle = (
    <button
      type="button"
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] border border-[var(--rule)] bg-[var(--panel-alt)] text-[var(--accent)] hover:opacity-80"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDarkMode ? <FaSun className="h-3 w-3" /> : <FaMoon className="h-3 w-3" />}
    </button>
  );

  const resumeButton = (extraClass = '') => (
    <a
      href="/Avi_Aggarwal_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      download
      className={`mono rounded-[6px] bg-[var(--cta-bg)] px-4 py-[9px] text-center text-[12px] font-semibold text-[var(--cta-fg)] transition-colors hover:bg-[var(--cta-bg-hover)] ${extraClass}`}
    >
      resume.pdf ↓
    </a>
  );

  const socialRow = (onNavigate) =>
    socialLinks.map(({ name, href, label, Icon }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="mono group flex items-center gap-[9px] text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
        aria-label={label}
      >
        <span className={`${pillIconClass} transition-colors group-hover:border-[var(--accent)]`}>
          <Icon className="h-[13px] w-[13px]" aria-hidden />
        </span>
        {name}
      </a>
    ));

  return (
    <div className="theme-transition min-h-screen w-full bg-[var(--page-bg)] text-[var(--ink)]">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[300px] flex-col gap-6 overflow-y-auto border-r border-[var(--rule-soft)] bg-[var(--panel)] px-6 py-8 lg:flex">
        <div>
          <div className="flex items-center gap-2.5">
            <p className="mono text-[19px] font-bold text-[var(--ink)]">avi@aggarwal</p>
            {themeToggle}
          </div>
          <p className="mono mt-1 text-[12px] text-[var(--accent)]">~ $ whoami</p>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleNavClick(item.id)}
              className="mono text-[13px] text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
            >
              <span className="text-[var(--muted)]">{String(index + 1).padStart(2, '0')}</span>
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </nav>

        <SidebarTerminal
          scrollToSection={scrollToSection}
          scrollToTop={scrollToTop}
          toggleTheme={() => setIsDarkMode((prev) => !prev)}
          isDarkMode={isDarkMode}
        />

        <div className="flex flex-col gap-[9px]">
          {socialRow()}
          {resumeButton('mt-2')}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--rule-soft)] bg-[var(--header-bg)] backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="mono text-[16px] font-bold text-[var(--ink)]">avi@aggarwal</p>
            <p className="mono text-[11px] text-[var(--accent)]">~ $ whoami</p>
          </div>
          <div className="flex items-center gap-3">
            {themeToggle}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border border-[var(--rule)] bg-[var(--panel-alt)]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="flex flex-col gap-[4px]">
                <span className={`block h-[1.5px] w-[13px] bg-[var(--ink)] transition-all duration-300 ${menuOpen ? 'translate-y-[5.5px] rotate-45' : ''}`} />
                <span className={`block h-[1.5px] w-[13px] bg-[var(--ink)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] w-[13px] bg-[var(--ink)] transition-all duration-300 ${menuOpen ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-[var(--rule-soft)] bg-[var(--panel)] px-5 pb-5 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    handleNavClick(item.id)(event);
                    setMenuOpen(false);
                  }}
                  className="mono text-[13px] text-[var(--ink-soft)]"
                >
                  <span className="text-[var(--muted)]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="ml-3">{item.label}</span>
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-[9px] border-t border-[var(--rule-soft)] pt-4">
              {socialRow(() => setMenuOpen(false))}
              {resumeButton('mt-2 w-fit')}
            </div>
          </nav>
        )}
      </header>

      <main className="lg:ml-[300px]">
        {/* Hero */}
        <section className="relative flex min-h-[calc(100vh-58px)] items-center justify-center overflow-hidden border-b border-[var(--rule-soft)] lg:min-h-screen">
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.28]"
            preserveAspectRatio="none"
            viewBox="0 0 1600 900"
            aria-hidden
          >
            {heroPaths.map((path) => (
              <path
                key={path.d}
                d={path.d}
                fill="none"
                stroke={path.tone === 'accent' ? 'var(--accent)' : 'var(--muted)'}
                strokeWidth={path.width}
                strokeDasharray={path.dash}
                strokeDashoffset={path.offset}
                className="hero-path"
                style={{ animationDuration: path.duration }}
              />
            ))}
          </svg>

          {!isMobileView && heroLottieData && (
            <div className="pointer-events-none absolute inset-y-[6%] inset-x-[8%] z-[1] overflow-hidden" style={heroBirdStyle}>
              <Lottie animationData={heroLottieData} loop={false} autoplay className="no-theme-transition h-full w-full" />
            </div>
          )}

          <div className="relative z-[3] px-6 text-center">
            <p className="mono text-[12px] tracking-[0.06em] text-[var(--accent)]">purdue cs · 2024 – present</p>
            <h1 className="mono mt-4 text-[44px] font-bold leading-[1.05] text-[var(--ink)] sm:text-[60px] lg:text-[68px]">
              Avi Aggarwal
            </h1>
            <p className="mono mt-5 min-h-[30px] text-[17px] text-[var(--muted)] sm:text-[22px]">
              <span>{typedRole}</span>
              <span className="caret-blink ml-1 inline-block h-[18px] w-[10px] translate-y-[2px] bg-[var(--accent)] sm:h-[20px] sm:w-[11px]" />
            </p>
          </div>

          <div className="scroll-cue mono absolute bottom-8 left-1/2 -translate-x-1/2 text-[20px] text-[var(--muted)]">↓</div>
        </section>

        {/* Education */}
        <Section id="education" label="// EDUCATION">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-[21px] font-semibold text-[var(--ink)]">Purdue University</h3>
              <p className="mono mt-1 text-[13px] text-[var(--muted)]">B.S. in Computer Science | 2024 - Present</p>
              <p className="mono mt-4 text-[12px] text-[var(--accent)]">Relevant Coursework:</p>
              <div className="mt-3 flex flex-wrap gap-[7px]">
                {coursework.map((course) => (
                  <span key={course} className={chipClass}>
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[21px] font-semibold text-[var(--ink)]">Liberty High School</h3>
              <p className="mono mt-1 text-[13px] text-[var(--muted)]">High School Degree | 2020 - 2024</p>
              <p className="mono mt-4 text-[12px] text-[var(--accent)]">Accomplishments:</p>
              <ul className="mt-3 list-disc space-y-1 pl-[18px] text-[13px] leading-[1.9] text-[var(--muted)]">
                {highSchoolAccomplishments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" label="// EXPERIENCE">
          <div className="relative pl-6">
            <div className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--rule)]" />
            {timelineEvents.map((event, index) => (
              <AnimatedDiv key={index} delay={index * 100} className="relative mb-9 last:mb-0">
                <span className="absolute -left-6 top-[6px] h-[9px] w-[9px] rounded-full bg-[var(--accent)]" />
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                  {event.logo && (
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[8px] border border-[var(--rule)] bg-[var(--panel-alt)]">
                      <img src={event.logo} alt={event.title} className="h-full w-full object-contain p-1" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="flex flex-wrap items-baseline text-[16px] font-semibold text-[var(--ink)]">
                        <span>{event.title}</span>
                        {event.url && (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 font-normal text-[var(--accent)] underline decoration-[var(--tag-border)] underline-offset-2 hover:opacity-80"
                            aria-label={`${event.title} - ${event.linkLabel || 'more info'}`}
                          >
                            {event.linkLabel || 'More ↗'}
                          </a>
                        )}
                      </h3>
                      {event.date && <span className="mono text-[11px] text-[var(--muted)]">{event.date}</span>}
                    </div>
                    <p className="mt-2 max-w-[720px] text-[13px] leading-[1.6] text-[var(--ink-soft)]">{event.description}</p>
                    {event.details && (
                      <ul className="mt-2.5 max-w-[720px] list-disc space-y-1 pl-[18px] text-[12.5px] leading-[1.8] text-[var(--muted)]">
                        {event.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" label="// PROJECTS">
          <div className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const isExpanded = !collapsedProjects.includes(index);
              const shortTags = project.tags.slice(0, 3);
              const restTags = project.tags.slice(3);

              return (
                <div
                  key={project.title}
                  className="overflow-hidden rounded-[10px] border border-[var(--rule)] bg-[var(--panel)] transition-colors hover:border-[var(--tag-border)]"
                >
                  <div className="relative aspect-[16/10] bg-[var(--page-bg)]">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                      aria-label={`Open ${project.title}`}
                    >
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        className="h-full w-full object-contain p-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/400x250/d9d2be/141109?text=${project.placeholder}`;
                        }}
                      />
                    </a>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono absolute right-2 top-2 flex items-center gap-1.5 rounded-[6px] border border-[var(--rule)] bg-[var(--panel-alt)] px-2 py-1 text-[10.5px] text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        aria-label={`${project.title} GitHub repository`}
                        title="View repository"
                      >
                        <FaGithub className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        repo
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedProjects((current) =>
                        current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
                      )
                    }
                    className="w-full cursor-pointer px-[18px] py-4 text-left"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${project.title}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-semibold text-[var(--ink)]">{project.title}</h3>
                      <span className="mono text-[15px] text-[var(--accent)]">{isExpanded ? '–' : '+'}</span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {shortTags.map((tag) => (
                        <span
                          key={tag}
                          className="mono rounded-[5px] border border-[var(--tag-border)] bg-[var(--panel-alt)] px-2 py-1 text-[10.5px] text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-3 text-[12.5px] leading-[1.7] text-[var(--muted)]">{project.description}</p>
                        {restTags.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {restTags.map((tag) => (
                              <span
                                key={tag}
                                className="mono rounded-[5px] border border-[var(--rule)] bg-[var(--panel-alt)] px-2 py-1 text-[10.5px] text-[var(--muted)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" label="// SKILLS">
          <div className="flex flex-wrap gap-[9px]">
            {skills.map((skill) => (
              <span
                key={skill}
                className={`${chipClass} transition-colors hover:border-[var(--tag-border)] hover:text-[var(--ink)]`}
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* About / Extracurriculars */}
        <Section id="extracurriculars" label="// EXTRACURRICULARS">
          <div className="flex flex-col gap-[18px]">
            <div className="rounded-[10px] border border-[var(--rule)] bg-[var(--panel)] p-4 sm:p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="w-full shrink-0 overflow-hidden rounded-[8px] border border-[var(--rule)] bg-[var(--panel-alt)] sm:w-1/3">
                  <img
                    src="/Ensemble.jpg"
                    alt="Purdue Ensemble"
                    className="h-full max-h-[300px] w-full object-cover [filter:grayscale(0.35)_contrast(1.05)]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/d9d2be/141109?text=Ensemble+Image';
                    }}
                  />
                </div>
                <div className="w-full sm:w-2/3">
                <h3 className="text-[17px] font-semibold text-[var(--ink)]">Purdue Ensemble Violist</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-[18px] text-[13px] leading-[1.7] text-[var(--muted)]">
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=rBQwkIc4TaU&t=790s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                      className="underline decoration-[var(--tag-border)] underline-offset-2 transition-colors hover:text-[var(--accent)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      String Quartet in E Minor, Op. 44 #2 by Felix Mendelssohn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=YyITIGoMh-E&list=LL&index=3&t=159s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                      className="underline decoration-[var(--tag-border)] underline-offset-2 transition-colors hover:text-[var(--accent)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Piano Quintet in E-flat major, Op. 44 by Robert Schumann
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=fp8yIZWgeVY&list=LL&index=5&t=6s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                      className="underline decoration-[var(--tag-border)] underline-offset-2 transition-colors hover:text-[var(--accent)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      String Quartet in F Major, Op. 18 #1 by Ludwig van Beethoven
                    </a>
                  </li>
                </ul>
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--rule)] bg-[var(--panel)] p-4 sm:p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="w-full shrink-0 overflow-hidden rounded-[8px] border border-[var(--rule)] bg-[var(--panel-alt)] sm:w-1/3">
                  <img
                    src="/PSSC.png"
                    alt="PSSC Logo"
                    className="h-full max-h-[300px] w-full object-cover [filter:grayscale(0.35)_contrast(1.05)]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/d9d2be/141109?text=PSSC+Image';
                    }}
                  />
                </div>
                <div className="w-full sm:w-2/3">
                <h3 className="text-[17px] font-semibold text-[var(--ink)]">Purdue Student Science Council (PSSC)</h3>

                <div className="mt-3 border-t border-[var(--rule-soft)] pt-3">
                  <p className="text-[13px] font-semibold text-[var(--ink)]">Webmaster</p>
                  <p className="mono mt-1 text-[11px] text-[var(--muted)]">Jan 2026 - Present</p>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[var(--muted)]">
                    Created the website for the Purdue Student Science Council (
                    <a
                      href="https://purduesciencestudentcouncil.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[var(--tag-border)] underline-offset-2 transition-colors hover:text-[var(--accent)]"
                    >
                      purduesciencestudentcouncil.com
                    </a>
                    ). Migrated the database to Firebase and added custom update links so members can update their profiles automatically. Added contact pages and delivered a full modern UI refresh.
                  </p>
                </div>

                <div className="mt-3 border-t border-[var(--rule-soft)] pt-3">
                  <p className="text-[13px] font-semibold text-[var(--ink)]">Network and Career Outreach Officer</p>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[var(--muted)]">
                    Promotes professional growth amongst College of Science students, organizes career fairs, and fosters close relationships among students, faculty, and alumni to further benefit the College of Science and its students.
                  </p>
                </div>
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border border-[var(--rule)] bg-[var(--panel)] p-4 sm:p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="w-full shrink-0 overflow-hidden rounded-[8px] border border-[var(--rule)] bg-[var(--panel-alt)] sm:w-1/3">
                  <img
                    src="/Climbing.jpg"
                    alt="Climbing Activity"
                    className="h-full max-h-[300px] w-full object-cover [filter:grayscale(0.35)_contrast(1.05)]"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/d9d2be/141109?text=Climbing+Image';
                    }}
                  />
                </div>
                <div className="w-full sm:w-2/3">
                  <h3 className="text-[17px] font-semibold text-[var(--ink)]">Rock Climber / Boulderer</h3>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[var(--muted)]">Active Member of Purdue Rock Climbing Club</p>
                  <p className="mt-1 text-[13px] leading-[1.7] text-[var(--muted)]">A v4 climber (sometimes)</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <section id="contact" className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
          {!isMobileView && flockLottieData && (
            <div className="pointer-events-none absolute inset-0 z-0" style={footerBirdStyle}>
              <Lottie animationData={flockLottieData} loop autoplay className="no-theme-transition h-full w-full" />
            </div>
          )}

          <div className="relative z-[2] mx-auto max-w-2xl px-6 py-12 text-center">
            <h2 className="mono text-[28px] font-bold text-[var(--ink)] sm:text-[34px]">Let&apos;s Connect!</h2>
            <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-[1.7] text-[var(--muted)]">
              Thanks for stopping by! I&apos;m always open to new opportunities, collaborations, or just meeting new people
            </p>
            <p className="mx-auto mt-2 max-w-[460px] text-[15px] leading-[1.7] text-[var(--muted)]">Feel free to reach out!</p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {socialLinks.map(({ name, href, label, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--rule)] bg-[var(--panel)] text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--panel-alt)]"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
