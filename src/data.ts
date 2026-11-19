export const profile = {
  name: 'Jorge Marquez',
  role: 'Software Engineer',
  location: 'Austin, TX',
  email: 'jmarquez@marquezengineering.com',
  linkedin: 'https://www.linkedin.com/in/jorge-marquez-jm2025/',
  github: 'https://github.com/Jmarquez03',
  resume: '/files/Jorge_Marquez_Resume.pdf',
}

export type Role = {
  slug: string
  company: string
  title: string
  place: string
  dates: string
  stack: string[]
  metric: { value: string; label: string }
  summary: string
  bullets: string[]
  /** Long-form case study sections, shown on /work/:slug */
  story?: { heading: string; body: string[] }[]
  image?: string
  /** Shows the interactive point-cloud lab on the case study page */
  lab?: boolean
}

export const roles: Role[] = [
  {
    slug: 'oracle',
    company: 'Oracle',
    title: 'Software Engineer',
    place: 'Austin, TX',
    dates: 'Jun 2026 – Sep 2026',
    stack: ['Python', 'C#', 'Distributed systems', 'Event telemetry', 'Microservices'],
    metric: { value: '35%', label: 'fewer inter-service request drops' },
    summary:
      'Built distributed backend services and asynchronous event pipelines for high-volume transactional data.',
    bullets: [
      'Engineered distributed backend services and asynchronous event pipelines processing high-volume transactional data.',
      'Architected deterministic state-recovery services that reconcile edge operational nodes across network partitions, eliminating data loss.',
      'Isolated network socket routing bottlenecks and added automated health telemetry, cutting inter-service request drops by 35%.',
      'Built automated diagnostic workflows with AI tools (Cursor, Copilot, LLM APIs) to speed up defect isolation and telemetry inspection.',
    ],
  },
  {
    slug: 'oracle-intern',
    company: 'Oracle',
    title: 'Software Engineering Intern',
    place: 'Austin, TX',
    dates: 'May 2025 – Aug 2025',
    stack: ['C++', 'Multithreading', 'State validation', 'Regression testing'],
    metric: { value: '40%', label: 'less compute overhead' },
    summary:
      'Wrote an in-memory 4-way differential engine in C++ that cross-validates distributed data snapshots in real time.',
    bullets: [
      'Developed a high-performance in-memory 4-way differential engine in C++ to cross-validate distributed data snapshots in real time.',
      'Tuned memory footprints and thread synchronization primitives for a 40% reduction in compute overhead.',
      'Authored automated regression suites that guarantee deterministic data fidelity across high-scale distributed deployments.',
    ],
  },
  {
    slug: 'apple',
    company: 'Apple',
    title: 'Software Systems Engineering Intern',
    place: 'Sunnyvale, CA',
    dates: 'May 2024 – Aug 2024',
    stack: ['Python', 'C++', 'Open3D', 'DBSCAN', 'K-D trees', 'Streaming pipelines'],
    metric: { value: '80%', label: 'smaller point-cloud payloads' },
    summary:
      'Built point-cloud filtering and clustering pipelines for sensor telemetry in the Vision Products Group.',
    bullets: [
      'Built ingestion and filtering pipelines for streaming sensor telemetry, cutting processing latency by more than 50%.',
      'Automated spatial clustering and vector operations in Python, reducing payload size and downstream compute by 80%.',
      'Wrote validation harnesses that catch ingestion drift and schema regressions before release cycles.',
    ],
    image: '/images/apple.jpg',
    lab: true,
    story: [
      {
        heading: 'Point clouds',
        body: [
          'In the Vision Products Group I worked as a systems tools intern, writing software that tests hardware. Most of it centered on point clouds: millions of 3D samples from sensors, many of them noise.',
          'Using Python, C++ and Open3D I designed a noise-removal algorithm that cut point counts by 80%, which shrank data files and sped up everything downstream. I then implemented clustering with DBSCAN and K-D trees to split each cloud into distinct objects, a foundation for later control-systems work.',
        ],
      },
      {
        heading: 'Control systems',
        body: [
          'I also automated the control systems behind data collection. I wrote APIs that wrapped the system controls so future applications could integrate without manual steps, which made data capture more accurate and consistent and easier to scale across projects.',
        ],
      },
    ],
  },
  {
    slug: 'invoicecloud',
    company: 'InvoiceCloud',
    title: 'Software Engineering Intern',
    place: 'Remote',
    dates: 'May 2023 – Aug 2023',
    stack: ['C#', 'VB.NET', 'ASP.NET', 'SAML 2.0', 'Okta', 'SQL'],
    metric: { value: '3+ days', label: 'saved per payment export' },
    summary:
      'Shipped self-service internal tools and Okta SSO for an enterprise cloud billing platform.',
    bullets: [
      'Built automated onboarding and configuration workflows for an enterprise cloud billing app, cutting setup from days to minutes.',
      'Integrated SAML 2.0 single sign-on and role-based access control, hardening enterprise authentication.',
      'Wrote integration tests and optimized relational SQL queries to protect transactional data consistency.',
    ],
    image: '/images/invoicecloud.jpg',
    story: [
      {
        heading: 'Payment export tool',
        body: [
          'When a payment cleared after its batch had settled, billers sometimes saw a paid customer as unpaid. Fixing that meant an engineer pulling an export file by hand for Client Services.',
          'We built a page in the internal app that let Client Services send and download those files themselves. Halfway through, the project had to move from ASP.NET Core and AngularJS to a .NET Framework 4.8 Web Forms app in VB.NET, with the same deadline. We kept the logic, rebuilt the front end from a new Figma mockup, used stored procedures to guide reps to the right batch, and emailed Excel exports through the company mail service. It shipped to production and turned a three-day process into an instant one for hundreds of reps.',
        ],
      },
      {
        heading: 'reCAPTCHA IP allowlist',
        body: [
          "Billers' support staff kept getting stuck in reCAPTCHA loops, and the allowlist that exempted them was a text file only engineers could edit. With two other engineers I moved it into a database with full CRUD and built a Web Forms page for Client Services: a table with the date and time each IP was added, an add and edit dialog with regex and duplicate checks, and delete with confirmation.",
        ],
      },
      {
        heading: 'CRM single sign-on with Okta',
        body: [
          'CRM passwords were random strings nobody could remember, generating more than ten reset tickets a week. My partner and I added SAML 2.0 SSO through Okta to a .NET Framework 4.8 Web Forms app using Sustainsys.Saml2, whose documentation was thin enough that we mapped the assertion handling by working through the library ourselves.',
          'The proof of concept logged into the CRM through Okta within a week. We then added a service-provider-initiated flow for the production and test URLs, and a pipeline variable that switches behavior per environment: redirect to Okta in production, an Okta button on test servers, none on local builds.',
        ],
      },
    ],
  },
]

export type Project = {
  name: string
  kind: string
  dates?: string
  blurb: string
  stack: string[]
  href?: string
  image?: string
}

export const projects: Project[] = [
  {
    name: 'Autonomous Navigation Platform',
    kind: 'Robotics · Software lead',
    dates: '2023 – 2024',
    blurb:
      'Real-time control software running closed-loop algorithms at 100 Hz on spatial sensor telemetry, with a binary serialization protocol that streams telemetry at sub-millisecond overhead.',
    stack: ['C++', 'Python', 'Sensor fusion', 'Concurrency'],
    href: 'https://github.com/Jmarquez03/RobotMovementCode',
    image: '/images/r5-robot.jpg',
  },
  {
    name: 'zLyrics',
    kind: 'Full-stack web app',
    dates: '2026',
    blurb:
      'A production React app serving real-time data from asynchronous REST APIs in under 150 ms, kept responsive with client-side caching, debounced requests and memoized state.',
    stack: ['TypeScript', 'React', 'REST APIs'],
  },
  {
    name: 'Robotics curriculum with computer vision',
    kind: 'TEXPREP · Teaching',
    blurb:
      'A beginner robotics curriculum that uses Python and computer vision to make programming approachable for students meeting code for the first time.',
    stack: ['Python', 'OpenCV', 'Robotics'],
    href: 'https://github.com/Jmarquez03/ComputerVisionWorkshop',
    image: '/images/texprep-robot.jpg',
  },
  {
    name: 'Dreem',
    kind: 'Mobile app',
    blurb:
      'A dream journal for iOS, Android and web that tags every entry with the moon phase and offers AI interpretations through GPT-4o-mini.',
    stack: ['React Native', 'Expo', 'OpenAI API'],
    href: 'https://github.com/Jmarquez03/Dreem',
  },
  {
    name: 'Edge AI on Jetson Nano',
    kind: 'IEEE robotics',
    blurb:
      'On-device machine learning on an NVIDIA Jetson Nano, written in Python with TensorFlow Lite during my IEEE robotics work.',
    stack: ['Python', 'TensorFlow Lite', 'Jetson'],
    href: 'https://github.com/Jmarquez03/JetsonNanoCode',
  },
  {
    name: 'Advising Assistant',
    kind: 'Web app',
    blurb:
      'An ASP.NET web app with a C# and SQL backend built around the student advising process.',
    stack: ['C#', 'ASP.NET', 'SQL'],
    href: 'https://github.com/Jmarquez03/AdvisingAssistant',
  },
]

export const skills = {
  Languages: ['Python', 'C++', 'C#', 'SQL', 'TypeScript', 'JavaScript', 'Bash'],
  Systems: ['Distributed systems', 'Real-time data pipelines', 'High-throughput APIs', 'Concurrency', 'LLM and agent integration'],
  Tools: ['Git', 'Docker', 'Linux', 'Azure DevOps', 'GitHub Actions', 'Open3D', 'React'],
}

export const activities = [
  'IEEE Region 5 Robotics Competition, 3 times',
  'IEEEXtreme programming competition, 2 times',
  'NASA Space Apps Challenge',
  'Frontera Devs Hackathon',
]
