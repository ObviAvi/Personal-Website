'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { SiGmail, SiLeetcode } from 'react-icons/si';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
const FloatingPaths = dynamic(
  () => import('@/components/ui/background-paths').then((module) => module.FloatingPaths),
  { ssr: false }
);

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

const timelineEvents = [
  {
    type: 'experience',
    title: 'Technical Project Lead',
    date: 'Feb 2026 – Present | West Lafayette, Indiana',
    description:
      'Google Developers Group | An AI assistant that helps users check their questions against Purdue University policies and documents (i.e. university rules, handbooks, housing terms, scholarship requirements, etc.)',
    details: [
      'Web scraping for data collection',
      'RAG architecture for information retrieval and generation',
      'Agentic Loop for additional information gathering and clarification',
    ],
    side: 'right',
    logo: '/GDG-Logo.jpg',
  },
  {
    type: 'experience',
    title: 'AI Research Engineer',
    date: 'Feb 2026 – Present | West Lafayette, Indiana',
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

export default function App() {
  const [heroLottieData, setHeroLottieData] = useState(null);
  const [flockLottieData, setFlockLottieData] = useState(null);
  const [isMobileView, setIsMobileView] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

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

  const handleNavClick = (sectionId) => (event) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerOffset = 84;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const heroBirdStyle = isDarkMode
    ? {
        opacity: 0.46,
        filter: 'brightness(1) contrast(1.05) saturate(1.05) hue-rotate(6deg)',
      }
    : {
        opacity: 0.7,
        filter: 'brightness(0.8) contrast(1.15) saturate(0.9)',
      };

  const footerBirdStyle = isDarkMode
    ? {
        opacity: 0.82,
        filter: 'invert(1) sepia(0.5) saturate(0.75) hue-rotate(-8deg) brightness(1.72) contrast(1.12)',
        mixBlendMode: 'screen',
      }
    : {
        opacity: 0.32,
        filter: 'brightness(0.95) contrast(1.05)',
      };

  return (
    <div className="theme-transition min-h-screen w-full bg-[var(--page-bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--header-bg)] backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
          <p className="text-xl font-semibold tracking-[0.16em]">AVI AGGARWAL</p>
          <nav className="hidden items-center gap-8 text-[17px] md:flex">
            <a href="#experience" onClick={handleNavClick('experience')} className="hover:opacity-70">Experience</a>
            <a href="#projects" onClick={handleNavClick('projects')} className="hover:opacity-70">Projects</a>
            <a href="#about" onClick={handleNavClick('about')} className="hover:opacity-70">About Me</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] hover:opacity-80"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="h-4 w-4 text-[var(--accent)]" /> : <FaMoon className="h-4 w-4 text-[var(--ink)]" />}
            </button>
            <a
              href="/Avi_Aggarwal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="rounded-2xl bg-[var(--cta-bg)] px-5 py-2 text-[15px] font-medium text-[var(--cta-fg)] transition-colors hover:bg-[var(--cta-bg-hover)]"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden border-b border-[var(--rule)] text-center">
        {!isMobileView && (
          <div className="absolute inset-0 z-0 opacity-55">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
        )}

        {!isMobileView && heroLottieData && (
          <div className="absolute inset-0 z-0" style={heroBirdStyle}>
            <Lottie animationData={heroLottieData} loop={false} autoplay className="no-theme-transition h-full w-full object-cover" />
          </div>
        )}

        <div className="relative z-10 p-4">
          <h1 className="text-5xl font-extrabold text-[var(--ink)] drop-shadow-sm sm:text-7xl">Avi Aggarwal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-[var(--ink-soft)] sm:text-2xl">
            Student | Software Developer | Researcher
          </p>
        </div>
      </section>

      <div className="px-4 py-12">
        <AnimatedDiv delay={100}>
          <section className="mx-auto mb-12 max-w-full rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="https://github.com/ObviAvi?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] p-2 transition-colors duration-200 hover:opacity-80"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6 text-[var(--ink)]" />
              </a>
              <a
                href="https://www.linkedin.com/in/avi-aggarwal-75275828b/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] p-2 transition-colors duration-200 hover:opacity-80"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6 text-[var(--ink)]" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aggarwal.avi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] p-2 transition-colors duration-200 hover:opacity-80"
                aria-label="Email"
              >
                <SiGmail className="h-6 w-6 text-[var(--ink)]" />
              </a>
              <a
                href="https://www.instagram.com/aviaggarwall/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] p-2 transition-colors duration-200 hover:opacity-80"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6 text-[var(--ink)]" />
              </a>
              <a
                href="https://leetcode.com/u/Avi_A/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] p-2 transition-colors duration-200 hover:opacity-80"
                aria-label="Leetcode"
              >
                <SiLeetcode className="h-6 w-6 text-[var(--ink)]" />
              </a>
              <a
                href="/Avi_Aggarwal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center rounded-full bg-[var(--cta-bg)] px-4 py-2 font-semibold text-[var(--cta-fg)] shadow-sm transition-colors duration-200 hover:bg-[var(--cta-bg-hover)]"
              >
                Resume
              </a>
            </div>
          </section>
        </AnimatedDiv>

        <AnimatedDiv delay={200}>
          <section className="mx-auto mb-12 max-w-full rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 border-b border-[var(--rule)] pb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Education</h2>
            <div className="flex flex-col justify-between sm:flex-row">
              <div className="mb-6 w-full sm:mb-0 sm:w-1/2 sm:border-r sm:border-[var(--rule)] sm:pr-4">
                <h3 className="text-xl font-medium text-[var(--ink)] sm:text-2xl">Purdue University</h3>
                <p className="mb-3 text-[var(--ink-soft)]">B.S. in Computer Science | 2024 - Present</p>
                <h4 className="mb-2 text-lg font-medium text-[var(--ink)]">Relevant Coursework:</h4>
                <ul className="list-inside list-disc space-y-1 text-[var(--ink-soft)]">
                  <li>Data Structures and Algorithms</li>
                  <li>Computer Architecture</li>
                  <li>Introduction to Computer Systems</li>
                  <li>Object-Oriented Programming</li>
                  <li>Web Application Development</li>
                  <li>Parallel and Sequential Data Modelling</li>
                  <li>Programming in C</li>
                  <li>Multivariable Calculus</li>
                  <li>Discrete Math</li>
                  <li>Statistical Methods</li>
                  <li>Linear Algebra</li>
                </ul>
              </div>

              <div className="w-full sm:w-1/2 sm:pl-4">
                <h3 className="text-xl font-medium text-[var(--ink)] sm:text-2xl">Liberty High School</h3>
                <p className="mb-3 text-[var(--ink-soft)]">High School Degree | 2020 - 2024</p>
                <h4 className="mb-2 text-lg font-medium text-[var(--ink)]">Accomplishments:</h4>
                <ul className="list-inside list-disc space-y-1 text-[var(--ink-soft)]">
                  <li>Top 10, Magna Cum Laude</li>
                  <li>National Merit Scholarship Finalist</li>
                  <li>
                    Business Professionals of America (BPA): 2nd in State, 10th in Nationals for Java Programming Event
                  </li>
                  <li>United States Computing Olympiad (USACO): Silver Rank</li>
                  <li>TMEA All-State Violist: Ranked among the top 50 violists in the state of Texas</li>
                  <li>4-Time Symphony Orchestra Violist: 3rd chair in the Dallas-Fort Worth Metropolitan Area</li>
                </ul>
              </div>
            </div>
          </section>
        </AnimatedDiv>

        <AnimatedDiv delay={400}>
          <section id="experience" className="mx-auto mb-12 max-w-full rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 border-b border-[var(--rule)] pb-3 text-center text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Experience
            </h2>

            <div className="relative h-full overflow-hidden">
              <div className="absolute left-1/2 hidden h-full -translate-x-1/2 transform border border-[var(--rule)] md:block"></div>
              {timelineEvents.map((event, index) => (
                <AnimatedDiv key={index} delay={index * 150} className="relative mb-8">
                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[var(--accent)] shadow-sm md:block"></div>

                  <div className="w-full md:hidden">
                    <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-muted)] p-4 text-left shadow-sm">
                      {event.logo && (
                        <div className="mb-3 flex justify-center">
                          <img
                            src={event.logo}
                            alt={event.title}
                            className="h-30 rounded border border-[var(--rule)] object-contain shadow-sm"
                          />
                        </div>
                      )}
                      {event.date && <p className="mb-2 text-sm font-semibold text-[var(--ink-soft)]">{event.date}</p>}
                      <h3 className="mb-3 flex flex-wrap items-baseline text-lg font-bold text-[var(--ink)] sm:text-xl">
                        <span>{event.title}</span>
                        {event.url && (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-lg text-[var(--ink)] underline decoration-[var(--accent)] decoration-[1px] underline-offset-2 sm:text-xl"
                            aria-label={`${event.title} - ${event.linkLabel || 'more info'}`}
                          >
                            {event.linkLabel || 'More ↗'}
                          </a>
                        )}
                      </h3>
                      <p className="mb-2 text-sm leading-snug text-[var(--ink-soft)] sm:text-base">{event.description}</p>
                      {event.details && (
                        <ul className="mt-2 list-inside list-disc space-y-3 text-sm leading-snug text-[var(--ink-soft)] sm:text-base">
                          {event.details.map((detail, detailIndex) => (
                            <li key={detailIndex}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="hidden w-full items-center md:flex">
                    <div className={`w-1/2 ${event.side === 'left' ? 'order-1 pr-4 text-right' : 'order-2 pl-4 text-left'}`}>
                      {event.logo && (
                        <div className={`mb-3 flex ${event.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                          <img
                            src={event.logo}
                            alt={event.title}
                            className="h-30 rounded border border-[var(--rule)] object-contain shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                    <div className={`w-1/2 ${event.side === 'left' ? 'order-2 pl-4 text-left' : 'order-1 pr-4 text-right'}`}>
                      <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-muted)] p-4 text-left shadow-sm">
                        {event.date && <p className="mb-3 text-sm font-semibold text-[var(--ink-soft)]">{event.date}</p>}
                        <h3 className="mb-3 flex items-baseline text-lg font-bold text-[var(--ink)] sm:text-xl">
                          <span>{event.title}</span>
                          {event.url && (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-lg text-[var(--ink)] underline decoration-[var(--accent)] decoration-[1px] underline-offset-2 sm:text-xl"
                              aria-label={`${event.title} - ${event.linkLabel || 'more info'}`}
                            >
                              {event.linkLabel || 'More ↗'}
                            </a>
                          )}
                        </h3>
                        <p className="mb-2 text-sm leading-snug text-[var(--ink-soft)] sm:text-base">{event.description}</p>
                        {event.details && (
                          <ul
                            className={`list-disc text-sm leading-snug text-[var(--ink-soft)] sm:text-base ${event.side === 'left' ? 'list-outside sm:list-inside' : 'list-inside'} mt-2 space-y-3`}
                          >
                            {event.details.map((detail, detailIndex) => (
                              <li key={detailIndex}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedDiv>
              ))}
            </div>
          </section>
        </AnimatedDiv>

        <AnimatedDiv delay={700}>
          <section id="projects" className="mx-auto mb-12 max-w-full rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 border-b border-[var(--rule)] pb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Projects</h2>
            <div className="flex flex-col justify-around space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <a href="https://folyo-smoky.vercel.app/" target="_blank" rel="noopener noreferrer" className="mb-6 block">
                  <img
                    src="/folyo_logo.png"
                    alt="Folyo Logo"
                    className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/e4dfd3/101010?text=Folyo+Image';
                    }}
                  />
                  <h3 className="mt-4 mb-2 text-center text-xl font-medium text-[var(--ink)] sm:text-2xl">Folyo</h3>
                  <p className="text-center text-[var(--ink-soft)]">
                    An end-to-end pipeline that allows people to create, refine, and host their own personal website without any coding knowledge necessary.
                  </p>
                </a>
              </div>

              <div className="w-full sm:w-1/2">
                <a href="https://scholar-seek.vercel.app/" target="_blank" rel="noopener noreferrer" className="mb-6 block">
                  <img
                    src="/ScholarSeek.png"
                    alt="Scholar Seek Logo"
                    className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                    style={{ maxWidth: '400px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/e4dfd3/101010?text=Scholar+Seek+Image';
                    }}
                  />
                  <h3 className="mt-4 mb-2 text-center text-xl font-medium text-[var(--ink)] sm:text-2xl">Scholar Seek</h3>
                  <p className="text-center text-[var(--ink-soft)]">
                    An application that analyzes research papers with keyword analysis and finds similar, relevant research to help users discover and build on related scholarly works.
                  </p>
                </a>
              </div>

              <div className="w-full sm:w-1/2">
                <a href="https://github.com/ObviAvi/Purdue_RAG" target="_blank" rel="noopener noreferrer" className="mb-6 block">
                  <img
                    src="/PurdueRAG.png"
                    alt="Purdue RAG Logo"
                    className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/e4dfd3/101010?text=Purdue+RAG+Image';
                    }}
                  />
                  <h3 className="mt-4 mb-2 text-center text-xl font-medium text-[var(--ink)] sm:text-2xl">Purdue RAG Chatbot</h3>
                  <p className="text-center text-[var(--ink-soft)]">
                    Application designed to provide tailored advice about Purdue University. Leverages RAG architecture to pull relevant insights from an embedding model trained on Purdue's subreddit.
                  </p>
                </a>
              </div>

              <div className="w-full sm:w-1/2">
                <a href="https://github.com/GalacticQuasar/vibe-match" target="_blank" rel="noopener noreferrer" className="mb-6 block">
                  <img
                    src="/VibeMatch.png"
                    alt="VibeMatch Logo"
                    className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300/e4dfd3/101010?text=VibeMatch+Image';
                    }}
                  />
                  <h3 className="mt-4 mb-2 text-center text-xl font-medium text-[var(--ink)] sm:text-2xl">VibeMatch</h3>
                  <p className="text-center text-[var(--ink-soft)]">
                    A web application that analyzes your top Spotify tracks, providing detailed insights into your music preferences as well as connecting you with others who share similar tastes.
                  </p>
                </a>
              </div>
            </div>
          </section>
        </AnimatedDiv>

        <section id="about" className="mx-auto mb-12 max-w-full">
          <div className="grid gap-6 lg:grid-cols-2">
            <AnimatedDiv delay={600}>
              <section className="h-full rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 border-b border-[var(--rule)] pb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Skills</h2>
                <p className="text-[var(--ink-soft)]">
                  • Java • Python • C • C++ • React • Node • Next.js • Tailwind CSS • PyTorch • NLP • HuggingFace • Scikit-Learn • Pandas • Supabase • Git • Data Structures • Software Design Patterns • System Design • BeautifulSoup • NoSQL • IoT Device Management • Competitive Programming • System Design
                </p>
              </section>
            </AnimatedDiv>

            <AnimatedDiv delay={900}>
              <section className="h-full rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 border-b border-[var(--rule)] pb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Certificates</h2>
                <ul className="list-inside list-disc space-y-1 text-[var(--ink-soft)]">
                  <li>Oracle Associate Java SE 8 Programmer Certification (1Z0-808)</li>
                  <li>Data Structures and Algorithms Course Certificate, UC San Diego</li>
                  <li>Java IT Specialist, Certiport</li>
                </ul>
              </section>
            </AnimatedDiv>

            <AnimatedDiv delay={1000} className="lg:col-span-2">
              <section className="rounded-2xl border border-[var(--rule)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 border-b border-[var(--rule)] pb-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                  Extracurriculars
                </h2>

                <div className="mb-6 rounded-xl border border-[var(--rule)] bg-[var(--surface-muted)] p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col items-center sm:flex-row">
                    <div className="ml-auto mb-4 w-full sm:mb-0 sm:mr-4 sm:w-1/3">
                      <img
                        src="/Ensemble.jpg"
                        alt="Purdue Ensemble"
                        className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                        style={{ maxWidth: '400px', maxHeight: '300px', margin: '0 auto' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/200x150/e4dfd3/101010?text=Ensemble+Image';
                        }}
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="text-xl font-medium text-[var(--ink)] sm:text-2xl">Purdue Ensemble Violist</h3>
                      <ul className="list-inside list-disc space-y-1 text-[var(--ink-soft)]">
                        <li>
                          <a
                            href="https://www.youtube.com/watch?v=rBQwkIc4TaU&t=790s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                            className="text-[var(--ink)] underline transition-colors duration-300 hover:opacity-70"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            String Quartet in E Minor, Op. 44 #2 by Felix Mendelssohn
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/watch?v=YyITIGoMh-E&list=LL&index=3&t=159s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                            className="text-[var(--ink)] underline transition-colors duration-300 hover:opacity-70"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Piano Quintet in E-flat major, Op. 44 by Robert Schumann
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/watch?v=fp8yIZWgeVY&list=LL&index=5&t=6s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                            className="text-[var(--ink)] underline transition-colors duration-300 hover:opacity-70"
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

                <div className="mb-6 rounded-xl border border-[var(--rule)] bg-[var(--surface-muted)] p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col items-center sm:flex-row">
                    <div className="ml-auto mb-4 w-full sm:mb-0 sm:mr-4 sm:w-1/3">
                      <img
                        src="/PSSC.png"
                        alt="PSSC Logo"
                        className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                        style={{ maxWidth: '400px', maxHeight: '400px', margin: '0 auto' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/200x150/e4dfd3/101010?text=PSSC+Image';
                        }}
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="text-xl font-medium text-[var(--ink)] sm:text-2xl">Purdue Student Science Council (PSSC)</h3>
                      
                      <div className="mb-4 mt-4 border-t border-[var(--rule)] pt-4">
                        <p className="mb-2 font-semibold text-[var(--ink)]">Webmaster</p>
                        <p className="mb-2 text-sm text-[var(--ink-soft)]">Jan 2026 - Present</p>
                        <p className="text-[var(--ink-soft)]">
                          Created the website for the Purdue Student Science Council (
                          <a
                            href="https://purduesciencestudentcouncil.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--ink)] underline transition-colors duration-300 hover:opacity-70"
                          >
                            purduesciencestudentcouncil.com
                          </a>
                          ). Migrated the database to Firebase and added custom update links so members can update their profiles automatically. Added contact pages and delivered a full modern UI refresh.
                        </p>
                      </div>

                      <div className="border-t border-[var(--rule)] pt-4">
                        <p className="mb-2 font-semibold text-[var(--ink)]">Network and Career Outreach Officer</p>
                        <p className="text-[var(--ink-soft)]">
                          Promotes professional growth amongst College of Science students, organizes career fairs, and fosters close relationships among students, faculty, and alumni to further benefit the College of Science and its students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-muted)] p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col items-center sm:flex-row">
                    <div className="ml-auto mb-4 w-full sm:mb-0 sm:mr-4 sm:w-1/3">
                      <img
                        src="/Climbing.jpg"
                        alt="Climbing Activity"
                        className="h-auto w-full rounded-lg border border-[var(--rule)] object-cover shadow-sm"
                        style={{ maxWidth: '400px', maxHeight: '400px', margin: '0 auto' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/200x150/e4dfd3/101010?text=Climbing+Image';
                        }}
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <h3 className="text-xl font-medium text-[var(--ink)] sm:text-2xl">Rock Climber / Boulderer</h3>
                      <p className="mb-3 text-[var(--ink-soft)]">Active Member of Purdue Rock Climbing Club</p>
                      <p className="text-[var(--ink-soft)]">A v4 climber (sometimes)</p>
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedDiv>
          </div>
        </section>

        <section className="relative flex min-h-[500px] max-w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--footer-bg)] p-6 text-center shadow-sm sm:p-8">
          {!isMobileView && flockLottieData && (
            <div className="absolute inset-0 z-0" style={footerBirdStyle}>
              <Lottie animationData={flockLottieData} loop autoplay className="no-theme-transition h-full w-full object-cover" />
            </div>
          )}

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Thank You!</h2>
            <p className="text-lg text-[var(--ink-soft)] sm:text-xl">Thank you for taking the time to view my personal website</p>
            <p className="mb-6 text-lg text-[var(--ink-soft)] sm:text-xl">Feel free to reach out!</p>
            <p className="text-lg text-[var(--ink-soft)] sm:text-xl">972-984-8921</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/ObviAvi?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--cta-bg)] px-4 py-2 text-[var(--cta-fg)] hover:bg-[var(--cta-bg-hover)]"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/avi-aggarwal-75275828b/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--cta-bg)] px-4 py-2 text-[var(--cta-fg)] hover:bg-[var(--cta-bg-hover)]"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aggarwal.avi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--cta-bg)] px-4 py-2 text-[var(--cta-fg)] hover:bg-[var(--cta-bg-hover)]"
                aria-label="Email"
              >
                <SiGmail className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/aviaggarwall/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--cta-bg)] px-4 py-2 text-[var(--cta-fg)] hover:bg-[var(--cta-bg-hover)]"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://leetcode.com/u/Avi_A/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[var(--cta-bg)] px-4 py-2 text-[var(--cta-fg)] hover:bg-[var(--cta-bg-hover)]"
                aria-label="Leetcode"
              >
                <SiLeetcode className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
