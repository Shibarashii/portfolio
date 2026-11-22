import ojtCertificate from '../../accomplishments/DOST OJT Certificate of Completion.pdf?url'
import cv from '../../curriculum_vitae/src/CurriculumVitae.pdf?url'

export type Group<T> = { heading: string; items: T[] }

export type School = { school: string; degree: string; years: string }

export type Link = { label: string; url: string }

export type Project = {
  title: string
  summary: string
  stack: string[]
  dates: string
  repo?: string
  link?: string
  built: string[]
}

export type Role = { role: string; org: string; start: string; end?: string; bullets: string[]; pdf?: string }

export type Credential = { title: string; issuer: string; date: string; pdfs?: { label: string; url: string }[] }

export const email = 'seanrei.ethan23@gmail.com'

export const github: Link = { label: 'GitHub', url: 'https://github.com/Shibarashii' }
export const linkedin: Link = { label: 'LinkedIn', url: 'https://www.linkedin.com/in/seanrei-valdeabella' }
export const cvLink: Link = { label: 'CV', url: cv }

// TODO: draft from the CV, for Seanrei to edit
export const whoIAm: Group<string> = {
  heading: 'Who I Am',
  items: [
    'I’m a Computer Science graduate of Laguna State Polytechnic University, where I majored in Intelligent Systems. I build full-stack web applications and machine learning models. I interned as a back-end developer at the Department of Science and Technology, working on microservices and REST APIs in TypeScript and Node.js, and I managed the three-person team behind my undergraduate thesis.',
  ],
}

export const education: Group<School> = {
  heading: 'Education',
  items: [
    {
      school: 'Laguna State Polytechnic University',
      degree: 'Bachelor of Science in Computer Science, Major in Intelligent Systems',
      years: 'Graduated July 2026',
    },
    {
      school: 'Saint Thomas Montessori Learning Center',
      degree: 'Secondary Education',
      years: 'Graduated May 2022',
    },
  ],
}

export const projects: Group<Project>[] = [
  {
    heading: 'Web Applications',
    items: [
      {
        title: 'PC Flipper Toolkit',
        summary: 'Tracks the profit on every PC you flip, from the parts you buy to the final sale.',
        stack: ['React', 'TypeScript', 'Django REST Framework', 'PostgreSQL'],
        dates: '2026',
        repo: 'https://github.com/Shibarashii/pc-flipper-toolkit',
        link: 'https://pc-flipper-toolkit.vercel.app',
        built: [
          'Tracks each build from planning to sold: its parts, bundles and extra costs, with the profit and margin as they add up.',
          'Searches the EasyPC and PC Express catalogues while you edit a part, and fills in the price and shop you pick.',
          'Writes the build as a Facebook Marketplace post, with each part, its condition and the price.',
          'Stores money as Decimal and sends it as strings, so totals are exact to the centavo.',
          'Runs on Vercel (frontend), Render (API) and Neon (database), with a demo that needs no sign-up.',
        ],
      },
      {
        // TODO: Seanrei's wording. Private repo, so no source link. Replace before the next push.
        title: 'ESPA',
        summary: 'TODO',
        stack: ['TODO'],
        dates: '2026',
        built: ['TODO'],
      },
      {
        title: 'Hitboxd',
        summary: 'Letterboxd, but for games.',
        stack: ['Python', 'Django'],
        dates: '2026',
        repo: 'https://github.com/Shibarashii/hitboxd',
        built: [
          'Searches games through the RAWG API, with pagination, and saves each opened game to the database so it is fetched only once.',
          'Lets members rate games from 1 to 5, with one log entry per member and game.',
          'Has sign-up and login, a member list, and profiles with a picture, featured games, followers and following.',
        ],
      },
    ],
  },
  {
    heading: 'Machine Learning',
    items: [
      {
        title: 'Nail Feature Classifier',
        summary:
          'Deep learning image classification of nail features, built for the thesis “Probabilistic Detection of Systemic Diseases Using Deep Learning on Fingernail Biomarkers.”',
        stack: ['Python', 'PyTorch', 'Grad-CAM'],
        dates: 'Sep to Nov 2025',
        repo: 'https://github.com/Shibarashii/nail-feature-classifier',
        built: [
          'Implemented configurable model factories and training strategies, including baseline, from-scratch, full fine-tuning, and gradual layer unfreezing.',
          'Built evaluation, model-comparison, Grad-CAM interpretability, and reproducibility tools to assess performance and visualize relevant nail-image features.',
        ],
      },
      {
        title: 'DAMA Braille Converter',
        summary: 'Turns photos of Filipino and English Grade 1 Braille into plain text.',
        stack: ['Python', 'YOLO', 'Flask', 'OpenCV', 'LLM'],
        dates: 'Dec 2025',
        repo: 'https://github.com/Shibarashii/DAMA-Filipino-Braille-Converter',
        built: [
          'Developed a YOLO-based OCR system that detects Filipino and English Grade 1 Braille characters and converts them into structured text using LLM-assisted processing.',
          'Integrated the Braille detection model with Flask to provide image-based Braille recognition and text conversion.',
          'Implemented bilingual text processing features, including line and sentence organization, Filipino/English spell checking, LLM-based error correction, missing-character detection, confidence scoring, and detailed reporting.',
        ],
      },
    ],
  },
  {
    heading: 'Desktop Applications',
    items: [
      {
        title: 'Automated Barangay Clearance System',
        summary: 'Generates printable barangay clearances from citizen data in Google Forms and Google Sheets.',
        stack: ['C#', '.NET', 'Windows Forms', 'SQLite'],
        dates: 'Dec 2024',
        repo: 'https://github.com/Shibarashii/automated-barangay-clearance-system',
        built: [
          'Led full-stack development of a password-protected desktop application that automated barangay clearance generation by syncing citizen data from Google Forms and Google Sheets.',
          'Implemented SQLite-based offline storage, smart multi-field search, approval workflows, date-filtered records history, real-time document previews, PDF printing, and .xlsx export using ClosedXML.',
          'Built secure configuration features, including SHA-256 password authentication, password recovery codes, dynamic Google Sheets settings, and service-account JSON key management.',
        ],
      },
      {
        title: 'Task Management System',
        summary: 'Manages projects, tasks and users, with role-based access and progress tracking.',
        stack: ['C#', '.NET', 'Windows Forms', 'MySQL', 'SendGrid'],
        dates: 'Dec 2023',
        repo: 'https://github.com/Shibarashii/task-management-system',
        built: [
          'Built and maintained the backend, authoring the database schema and SQL deployment scripts for reproducible environment setup.',
          'Implemented core business logic and data integrity features: automated project progress and deadline-driven status updates, role-based access control, and a soft-delete cascade to prevent orphaned records.',
          'Integrated SendGrid-based password recovery and image compression/preview for task completion submissions, and added server-side validation plus search/filter/sort support to improve reliability and usability.',
        ],
      },
      {
        title: 'Community Suggestion and Feedback System',
        summary: 'Lets community members send suggestions to their barangay, with an admin inbox that flags spam.',
        stack: ['C#', '.NET', 'Windows Forms', 'MySQL'],
        dates: 'Dec 2023',
        repo: 'https://github.com/Shibarashii/community-suggestion-and-feedback-system',
        built: [
          'Developed and maintained the backend architecture and database schema, implementing secure admin authentication, mail lifecycle operations (inbox, starred, spam, trash), and dashboard queries to surface key metrics.',
          'Designed and implemented a simple keyword-based spam detection system and blacklist management that loads spam words from the database and uses regex word-boundary matching across email, subject, and body to compute a spam score and flag submissions; included admin controls to manage the blacklist and restore false positives.',
          'Implemented robust input and attachment handling for submissions, enforcing validation rules, support for image attachments, and provided SQL import and connection configuration for easy local deployment.',
        ],
      },
    ],
  },
  { heading: 'Hardware & Homelab', items: [] },
]

export const experience: Group<Role>[] = [
  {
    heading: 'Work & Internships',
    items: [
      {
        role: 'Back-End Developer Intern',
        org: 'Department of Science and Technology (remote, based in Taguig City, Philippines)',
        start: 'January 2026',
        end: 'April 2026',
        bullets: [
          'Developed and maintained microservices and REST APIs using TypeScript and Node.js.',
          'Implemented user stories across backend services, translating requirements into features.',
          'Integrated Apache Kafka to support reliable asynchronous communication between microservices.',
          'Created comprehensive unit tests with Jest to improve code reliability and regression coverage.',
          'Conducted code reviews focused on maintainability, performance, and adherence to backend development standards.',
          'Facilitated knowledge-transfer sessions for peers and new team members on backend systems and development practices.',
        ],
        pdf: ojtCertificate,
      },
    ],
  },
  {
    heading: 'Leadership',
    items: [
      {
        role: 'Project Manager and Model Developer',
        org: 'Undergraduate Thesis, LSPU Santa Cruz',
        start: '2025',
        end: '2026',
        bullets: [
          'Directed a three-person project team, coordinating task assignments, roles, deadlines, project scope, and timeline.',
          'Managed team communication and served as the central point for progress updates, task coordination, and conflict resolution.',
          'Maintained project momentum and team morale through active coordination, clear communication, and timely support.',
        ],
      },
      {
        role: 'Team Leader, Lead Developer',
        org: 'Software Engineering, LSPU Santa Cruz',
        start: '2025',
        end: '2026',
        bullets: [
          'Oversaw project progress by coordinating team members, assigning tasks, and tracking development priorities.',
          'Contributed the majority of the codebase, implementing core features and functionality.',
          'Analyzed and reviewed team members’ code to ensure quality and consistency before merging changes into the main codebase.',
        ],
      },
    ],
  },
]

export const writeToMe: Group<string> = {
  heading: 'Write to Me',
  items: ['Hiring, or have a question about a project? Send me an email and I’ll write back.'],
}

export const findMeOnline: Group<Link> = { heading: 'Find Me Online', items: [linkedin, github, cvLink] }
