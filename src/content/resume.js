// Single source of truth for resume content.
// Consumed by the web page (src/app/page.js) and the curl TUI (src/app/api/tui/route.js).

export const profile = {
  name: 'Avi Aggarwal',
  handle: 'avi@aggarwal',
  tagline: 'purdue cs · 2024 – present',
  roles: ['Student', 'Software Developer', 'Researcher'],
  site: 'https://www.aviaggarwal.org',
  resumePath: '/Avi_Aggarwal_Resume.pdf',
  blurb:
    "Thanks for stopping by! I'm always open to new opportunities, collaborations, or just meeting new people. Feel free to reach out!",
};

export const links = {
  github: 'https://github.com/ObviAvi?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/avi-aggarwal-75275828b/',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=aggarwal.avi@gmail.com',
  leetcode: 'https://leetcode.com/u/Avi_A/',
  instagram: 'https://www.instagram.com/aviaggarwall/',
};

// Plain forms for terminal output, where a mailto compose URL is useless.
export const contacts = [
  { name: 'github', value: 'github.com/ObviAvi' },
  { name: 'linkedin', value: 'linkedin.com/in/avi-aggarwal-75275828b' },
  { name: 'email', value: 'aggarwal.avi@gmail.com' },
  { name: 'leetcode', value: 'leetcode.com/u/Avi_A' },
  { name: 'instagram', value: 'instagram.com/aviaggarwall' },
];

export const roles = profile.roles;

export const education = [
  {
    school: 'Purdue University',
    degree: 'B.S. in Computer Science',
    dates: '2024 - Present',
    listLabel: 'Relevant Coursework',
    style: 'chips',
    items: [
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
    ],
  },
  {
    school: 'Liberty High School',
    degree: 'High School Degree',
    dates: '2020 - 2024',
    listLabel: 'Accomplishments',
    style: 'bullets',
    items: [
      'Top 10, Magna Cum Laude',
      'National Merit Scholarship Finalist',
      'Business Professionals of America (BPA): 2nd in State, 10th in Nationals for Java Programming Event',
      'United States Computing Olympiad (USACO): Silver Rank',
      'TMEA All-State Violist: Ranked among the top 50 violists in the state of Texas',
      '4-Time Symphony Orchestra Violist: 3rd chair in the Dallas-Fort Worth Metropolitan Area',
    ],
  },
];

export const coursework = education[0].items;
export const highSchoolAccomplishments = education[1].items;

export const timelineEvents = [
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

export const skills = [
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

export const projects = [
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

// Rendered as inline markup on the web page; kept here for the terminal output.
export const extracurriculars = [
  {
    title: 'Purdue Ensemble Violist',
    entries: [
      {
        items: [
          {
            text: 'String Quartet in E Minor, Op. 44 #2 by Felix Mendelssohn',
            url: 'https://www.youtube.com/watch?v=rBQwkIc4TaU&t=790s&ab_channel=PurdueBands%26OrchestrasConcertArchive',
          },
          {
            text: 'Piano Quintet in E-flat major, Op. 44 by Robert Schumann',
            url: 'https://www.youtube.com/watch?v=YyITIGoMh-E&list=LL&index=3&t=159s&ab_channel=PurdueBands%26OrchestrasConcertArchive',
          },
          {
            text: 'String Quartet in F Major, Op. 18 #1 by Ludwig van Beethoven',
            url: 'https://www.youtube.com/watch?v=fp8yIZWgeVY&list=LL&index=5&t=6s&ab_channel=PurdueBands%26OrchestrasConcertArchive',
          },
        ],
      },
    ],
  },
  {
    title: 'Purdue Student Science Council (PSSC)',
    entries: [
      {
        role: 'Webmaster',
        date: 'Jan 2026 - Present',
        description:
          'Created the website for the Purdue Student Science Council (purduesciencestudentcouncil.com). Migrated the database to Firebase and added custom update links so members can update their profiles automatically. Added contact pages and delivered a full modern UI refresh.',
      },
      {
        role: 'Network and Career Outreach Officer',
        description:
          'Promotes professional growth amongst College of Science students, organizes career fairs, and fosters close relationships among students, faculty, and alumni to further benefit the College of Science and its students.',
      },
    ],
  },
  {
    title: 'Rock Climber / Boulderer',
    entries: [
      {
        items: [{ text: 'Active Member of Purdue Rock Climbing Club' }, { text: 'A v4 climber (sometimes)' }],
      },
    ],
  },
];
