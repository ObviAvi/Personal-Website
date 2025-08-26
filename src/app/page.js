'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiGmail, SiLeetcode } from "react-icons/si";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Component to wrap elements and add fade-in/slide-up animation on scroll
const AnimatedDiv = ({ children, delay = 0, className = '' }) => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
        ${className} 
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// TimeLine Data
const timelineEvents = [
  {
    type: 'experience',
    title: 'Gen5IoT, USA | 2023 Summer Internship',
    date: 'May 2023 – August 2023 | Plano, TX',
    description: 'Engineered and developed the Gen5IoT IoT Device Management Platform, a scalable solution that facilitates seamless integration, monitoring, and control of a wide range of IoT devices across multiple industries.',
    details: [
      'Key functionalities include real-time data analytics, remote device configuration, and over-the-air firmware updates.',
      'These features were implemented using Java and C++, with database management incorporating SQL and NoSQL JSON objects. Code management and deployment were streamlined through a CI/CD pipeline using Jenkins.',
    ],
    side: 'right',
  },
  {
    type: 'experience',
    title: 'Corporate Partnership with Knudsen Institute | Data Mine Research',
    date: 'August 2024 - April 2025 | Lafayette, IN',
    description: 'The Knudsen Institute is an applied research organization dedicated to developing technology solutions for U.S. manufacturers, aiming to enhance integration into the U.S. Defense Industrial Base at scale.',
    details: [
      'Objective of this project is to train large language models (LLMs) on manufacturing languages in order to improve natural language processing (NLP), natural language understanding (NLU), and natural language generation (NLG) tasks.',
      'This enables the development of smarter applications that can accurately interpret and respond to manufacturing-related communication.',
      'Tools such as BeautifulSoup are used to extract data from HTML and XML files, while PyTorch was utilized for model development and architecture.',
    ],
    side: 'left',
  },
  {
    type: 'experience',
    title: 'Promega Corporation | Summer Internship',
    date: 'May 2025 – August 2025 | Madison WI',
    description: 'Promega Corporation is a biotechnology company that develops and supplies over 4,000 products supporting life science research in areas such as genomics, protein analysis, cellular analysis, drug discovery, and forensic DNA identification.', 
    details: [
      'The goal of this project is to improve instrument reliability by designing a machine learning and statistical anomaly detection system that integrates environmental sensor data (temperature, humidity, particulate matter) to identify conditions in real-time that are linked to low-quality experimental results.',
      'Processed univariate and multivariate data in Python (pandas, NumPy) with cyclical time encoding, performed correlation analysis, and trained ML-based Holt-Winters, K-means Clustering, Isolation Forest, & Variational-Autoencoder models to flag anomalies',
      'Integrated an SHT45 sensor into Discover LLC boards with firmware (C/C++) and hardware modifications; updated host software to log environmental readings in real time alongside instrument metrics'
    ],
    side: 'right',
  },
  // Add more timeline events here as needed
];

// Main App component
export default function App() {

  // State to hold bird animation data
  const [heroLottieData, setHeroLottieData] = useState(null);
  const [flockLottieData, setFlockLottieData] = useState(null);

  // useEffect to fetch Lottie data when the component mounts
  useEffect(() => {

    if (typeof window !== 'undefined') {
      fetch('/OneBird.json')
        .then(response => response.json())
        .then(data => setHeroLottieData(data))
        .catch(error => console.error('Error loading Hero Lottie animation:', error));

      fetch('/FlockBirds.json')
        .then(response => response.json())
        .then(data => setFlockLottieData(data))
        .catch(error => console.error('Error loading Flock Lottie animation:', error));
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200">

      {/* Top of the Website - Name and Bird Animation*/}

      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        {heroLottieData && (
          <div className="absolute inset-0 z-0 opacity-50">
            <Lottie
              animationData={heroLottieData} 
              loop={false} 
              autoplay={true} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="relative z-10 p-4">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">Avi Aggarwal</h1>
          <p className="text-xl sm:text-2xl text-gray-200 drop-shadow-lg max-w-2xl mx-auto">
            Student | Software Developer | Researcher
          </p>
        </div>
      </section>

      {/* Main Content Area */}

      <div className="py-12 px-4">

        {/* Contact Info Section */}

        <AnimatedDiv delay={100}>
          <section className="max-w-full mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/ObviAvi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6 text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/avi-aggarwal-75275828b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6 text-[#50b8e7]" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aggarwal.avi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                aria-label="Email"
              >
                <SiGmail className="w-6 h-6 text-red-400" />
              </a>
              <a
                href="https://www.instagram.com/aviaggarwall/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6 text-pink-500" />
              </a>
              <a
                href="https://leetcode.com/u/Avi_A/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                aria-label="Leetcode"
              >
                <SiLeetcode className="w-6 h-6 text-yellow-200" />
              </a>
            </div>
          </section>
        </AnimatedDiv>


        {/* Education Section */}

        <AnimatedDiv delay={200}>
          <section className="max-w-full mx-auto bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white border-b-2 border-[#50b8e7] pb-3 mb-6">Education</h2>
            <div className="flex flex-col sm:flex-row justify-between">

              {/* Purdue Entry */}

              <div className="w-full sm:w-1/2 sm:pr-4 sm:border-r border-gray-600 mb-6 sm:mb-0">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-300">Purdue University</h3>
                <p className="text-gray-400 mb-3">B.S. in Computer Science | 2024 - Present</p>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Relevant Coursework:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
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

              {/* Liberty High School Entry */}

              <div className="w-full sm:w-1/2 sm:pl-4">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-300">Liberty High School</h3>
                <p className="text-gray-400 mb-3">High School Degree | 2020 - 2024</p>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Accomplishments:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Top 10, Magna Cum Laude</li>
                  <li>National Merit Scholarship Finalist</li>
                  <li>Business Professionals of America (BPA): 2nd in State, 10th in Nationals for Java Programming Event</li>
                  <li>United States Computing Olympiad (USACO): Silver Rank</li>
                  <li>TMEA All-State Violist: Ranked among the top 50 violists in the state of Texas</li>
                  <li>4-Time Symphony Orchestra Violist: 3rd chair in the Dallas-Fort Worth Metropolitan Area</li>
                </ul>
              </div>
            </div>
          </section>
        </AnimatedDiv>

        {/* Timeline Section (Experience and Accomplishments) */}

        <AnimatedDiv delay={400}>
          <section className="max-w-full mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white border-b-2 border-[#50b8e7] pb-3 mb-6 text-center">Experience</h2>

            {/* Timeline Container */}

            <div className="relative wrap overflow-hidden h-full">
              <div className="absolute h-full border border-[#50b8e7] left-1/2 transform -translate-x-1/2"></div>
              {timelineEvents.map((event, index) => (
                <AnimatedDiv key={index} delay={index * 150} className="relative mb-8">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#50b8e7] shadow-xl w-6 h-6 rounded-full"></div>
                  <div className={`flex items-center w-full`}>
                    <div className={`w-1/2 ${event.side === 'left' ? 'order-1 text-right pr-4' : 'order-2 text-left pl-4'}`}>
                      {event.date && (
                        <p className="text-sm font-semibold text-gray-400">
                          {event.date}
                        </p>
                      )}
                    </div>
                    <div className={`w-1/2 ${event.side === 'left' ? 'order-2 text-left pl-4' : 'order-1 text-right pr-4'}`}>
                      <div className="p-4 rounded-lg shadow-xl bg-gray-700 text-left">
                        <h3 className="mb-3 font-bold text-lg sm:text-xl text-white">{event.title}</h3>
                        <p className="text-sm sm:text-base leading-snug text-gray-300 mb-2">{event.description}</p>
                        {event.details && (
                          <ul className={`list-disc text-gray-400 text-sm sm:text-base leading-snug mt-2 space-y-3 ${event.side === 'left' ? 'list-outside sm:list-inside' : 'list-inside'}`}>
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
        
        {/* Skills Section */}

        <AnimatedDiv delay={600}>
          <section className="max-w-full mx-auto bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white border-b-2 border-[#50b8e7] pb-3 mb-6">Skills</h2>
            <p className="text-gray-300 ">
              • Java • Python • C • C++ • React • Node • Tailwind CSS • PyTorch • NLP • HuggingFace • Android • Git • Data Structures • Software Design Patterns • BeautifulSoup • NoSQL • IoT Device Management • Competitive Programming • System Design
            </p>
          </section>
        </AnimatedDiv>

        {/* Projects Section*/}

        <AnimatedDiv delay={700}>
          <section className="max-w-full mx-auto bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white border-b-2 border-[#50b8e7] pb-3 mb-6">Projects</h2>
            <div className="flex flex-col sm:flex-row justify-around space-y-8 sm:space-y-0 sm:space-x-8">

              {/* Folyo Project Entry */}

              <div className="w-full sm:w-1/2">
                <a href="https://folyo-smoky.vercel.app/" target="_blank" rel="noopener noreferrer" className="block mb-6">
                  <img
                    src="/folyo_logo.png"
                    alt="Folyo Logo"
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/1e293b/e2e8f0?text=Folyo+Image' }}
                  />
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-300 mb-2 mt-4 text-center">Folyo</h3>
                  <p className="text-gray-400 text-center">An application that allows people to create and host personal websites without any coding knowlege neccessay</p>
                </a>
              </div>

              {/* Scholar Seek Project Entry */}

              <div className="w-full sm:w-1/2">
                <a href="https://scholar-seek.vercel.app/" target="_blank" rel="noopener noreferrer" className="block mb-6">
                  <img
                    src="/ScholarSeek.png"
                    alt="Scholar Seek Logo"
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                    style={{ maxWidth: '400px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/1e293b/e2e8f0?text=Scholar+Seek+Image' }}
                  />
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-300 mb-2 mt-4 text-center">Scholar Seek</h3>
                  <p className="text-gray-400 text-center">An application that analyzes research papers and finds similar, relevant research.</p>
                </a>
              </div>
              
              {/* VibeMatch Project Entry */}

              <div className="w-full sm:w-1/2">
                <a href="https://github.com/GalacticQuasar/vibe-match" target="_blank" rel="noopener noreferrer" className="block mb-6">
                  <img
                    src="/VibeMatch.png"
                    alt="VibeMatch Logo"
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                    style={{ maxWidth: '300px', maxHeight: '300px', margin: '0 auto' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/1e293b/e2e8f0?text=VibeMatch+Image' }}
                  />
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-300 mb-2 mt-4 text-center">VibeMatch</h3>
                  <p className="text-gray-400 text-center">A web application for analyzing Spotify music taste and finding similar users.</p>
                </a>
              </div>

            </div>
          </section>
        </AnimatedDiv>
        
        {/* Certificates Section */}

        <AnimatedDiv delay={900}>
          <section className="max-w-full mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white border-b-2 border-[#50b8e7] pb-3 mb-6">Certificates</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Oracle Associate Java SE 8 Programmer Certification (1Z0-808)</li>
              <li>Data Structures and Algorithms Course Certificate, UC San Diego</li>
              <li>Java IT Specialist, Certiport</li>
            </ul>
          </section>
        </AnimatedDiv>

        {/* Leadership and Extracurriculars Section */}

        <AnimatedDiv delay={1000}>
          <section className="max-w-full mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white border-b-2 border-[#50b8e7] pb-3 mb-6">Extracurriculars</h2>

            {/* Purdue Ensemble Violist Entry */}

            <div className="flex flex-col sm:flex-row items-center mb-6">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4 ml-auto">
                <img src="/Ensemble.jpg" alt="Purdue Ensemble" className="rounded-lg shadow-md w-full h-auto object-cover" style={{ maxWidth: '400px', maxHeight: '300px', margin: '0 auto' }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x150/1e293b/e2e8f0?text=Ensemble+Image' }} />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-300">Purdue Ensemble Violist</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=YyITIGoMh-E&list=LL&index=3&t=159s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                      className="text-[#50b8e7] hover:underline transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Piano Quintet in E-flat major, Op. 44 by Robert Schumann
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/watch?v=fp8yIZWgeVY&list=LL&index=5&t=6s&ab_channel=PurdueBands%26OrchestrasConcertArchive"
                      className="text-[#50b8e7] hover:underline transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      String Quartet in F Major, Op. 18 #1 by Ludwig van Beethoven
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Purdue Student Science Council (PSSC) Entry */}

            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4 ml-auto">
                <img
                  src="/PSSC.png"
                  alt="PSSC Logo"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                  style={{ maxWidth: '400px', maxHeight: '400px', margin: '0 auto' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/200x150/1e293b/e2e8f0?text=PSSC+Image';
                  }}
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-300">
                  Purdue Student Science Council (PSSC)
                </h3>
                <p className="text-gray-400 mb-3">Network and Career Outreach Officer</p>
                <p className="text-gray-400">
                  Promotes professional growth amongst College of Science students, organizes career fairs, and fosters close relationships among students, faculty, and alumni to further benefit the College of Science and its students.
                </p>
              </div>
            </div>


            {/* Climbing Extracurricular Entry */}

            <div className="mt-8 flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4 ml-auto">
                <img
                  src="/Climbing.jpg"
                  alt="Climbing Activity"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                  style={{ maxWidth: '400px', maxHeight: '300px', margin: '0 auto' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/200x150/1e293b/e2e8f0?text=Climbing+Image';
                  }}
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-300">
                  Rock Climber / Boulderer
                </h3>
                <p className="text-gray-400 mb-3">Active Member of Purdue Rock Climbing Club</p>
                <p className="text-gray-400">
                  A v4 climber (sometimes)
                </p>
              </div>
            </div>

          </section>
        </AnimatedDiv>

        {/* Thank You / Contact Me Section with Flock Animation */}

        <section className="relative max-w-full mx-auto bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl text-center overflow-hidden min-h-[500px] flex items-center justify-center">
          {flockLottieData && (
            <div className="absolute inset-0 z-0 opacity-30">
              <Lottie
                animationData={flockLottieData}
                loop={true}
                autoplay={true}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Thank You!</h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Thank you for taking the time to view my personal website
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              Feel free to reach out!
            </p>
            <p className="text-lg sm:text-xl text-gray-400">
              972-984-8921
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
