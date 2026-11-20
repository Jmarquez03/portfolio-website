export const profile = {
  name: 'Jorge Marquez',
  role: 'Software Engineer',
  location: 'Austin, TX',
  email: 'jmarquez@marquezengineering.com',
  linkedin: 'https://www.linkedin.com/in/jorge-marquez-jm2025/',
  github: 'https://github.com/Jmarquez03',
}

/** Two tailored resumes; every resume link opens a chooser */
export const resumes = [
  {
    id: 'swe',
    title: 'Software Engineering',
    blurb: 'Backend, systems and full-stack roles',
    href: '/files/Jorge_Marquez_Resume_Software_Engineering.pdf',
    filename: 'Jorge Marquez Resume Software Engineering.pdf',
  },
  {
    id: 'robotics',
    title: 'Embedded Systems and Robotics',
    blurb: 'Robotics, autonomy and embedded firmware roles',
    href: '/files/Jorge_Marquez_Resume_Robotics.pdf',
    filename: 'Jorge Marquez Resume Robotics.pdf',
  },
]

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
  /** CSS object-position for the case study photo crop */
  imagePosition?: string
  /** Taller frame for portrait photos (CSS aspect-ratio), 16 / 9 by default */
  imageAspect?: string
  /** Interactive demo on the case study page */
  lab?: 'pointcloud' | 'diff'
}

export const roles: Role[] = [
  {
    slug: 'oracle',
    company: 'Oracle',
    title: 'Software Engineer',
    place: 'Austin, TX',
    dates: 'Jun 2026 – Sep 2026',
    stack: ['Kitchen Display System', 'POS integration', 'Offline resilience', 'Code review', 'End-to-end testing'],
    metric: { value: 'Offline', label: 'orders keep reaching the kitchen in an outage' },
    summary:
      'Kept restaurant kitchens cooking through internet outages in Oracle’s Food and Beverage unit, and fixed data-integrity defects in order processing.',
    bullets: [
      'Engineered architectural changes that keep the Kitchen Display System (KDS) controller working offline, so orders flow from the point of sale to the kitchen with no internet connection.',
      'Resolved a deep-seated logic defect that sent duplicate modifier data payloads with orders.',
      'Ran rigorous peer code reviews to keep the enterprise codebase healthy.',
      'Worked closely with QA to build end-to-end test cycles for these fixes.',
    ],
    story: [
      {
        heading: 'The kitchen went dark with the internet',
        body: [
          'I worked in Oracle’s Food and Beverage Global Industries Unit (FBGIU), which builds the systems restaurants run on. When the network dropped, the Kitchen Display System crashed. The KDS controller depended on an internet connection it should never have needed, so the kitchen stopped receiving orders and could not cook them until the connection came back.',
        ],
      },
      {
        heading: 'Taking the internet out of the loop',
        body: [
          'I traced the crash to updates the controller made that required the internet and were not needed to run the kitchen. Removing them let the KDS controller keep talking to the point-of-sale system during an outage.',
          'Now ordering, cooking and serving carry on uninterrupted when the internet goes down, which is exactly when a busy restaurant can least afford to stop.',
        ],
      },
      {
        heading: 'Data integrity and code health',
        body: [
          'I also fixed a logic defect that duplicated modifier data, the add-ons and changes attached to an item, in order payloads. Alongside the fixes, I reviewed teammates’ code and worked with QA to build end-to-end test cycles that keep these failures from coming back.',
        ],
      },
    ],
  },
  {
    slug: 'oracle-intern',
    company: 'Oracle',
    title: 'Software Engineering Intern',
    place: 'Austin, TX',
    dates: 'May 2025 – Aug 2025',
    stack: ['C#', 'WPF', 'Reflection', 'Multithreading', 'OS mutexes', 'Regression testing', 'Jira'],
    metric: { value: '40%', label: 'less debugging and triage time' },
    summary:
      'Turned RecNPlay, an internal C# WPF record-and-replay harness, from a bare proof of concept into a regression tool: exact-pace replay, window-scoped capture, editable and shareable recordings, and a 4-way diff that isolates regressions.',
    bullets: [
      'Built out nearly all of RecNPlay, an internal C# WPF record-and-replay regression harness. The proof of concept could only find UI controls and record and replay clicks on them; the rest of the feature set is mine.',
      'Timestamped every interaction so a recording replays at exactly the pace the user worked, not as fast as the harness can click.',
      'Added window finding so recording and reflection are locked to the right application window: input in other windows is never captured, and backend values come only from the app under test.',
      'Built recording editing (adjust timestamps, delete actions) and save to file, so a recording can be sent to anyone and replayed on their machine.',
      'Added a defect reproduction list generator that writes the steps for the QA report on the Jira ticket.',
      'Engineered an in-memory 4-way differential detection engine that captures, compares and reconciles runtime and UI states across multi-threaded operations to isolate regressions automatically.',
      'Synchronized the asynchronous record and replay pipelines with OS mutexes, eliminating intermittent race conditions.',
      'Built configuration management utilities that automate environment setup, cutting developer debugging and triage time by 40%.',
    ],
    lab: 'diff',
    image: '/images/oracle-intern.jpg',
    imagePosition: 'center 72%',
    story: [
      {
        heading: 'Where RecNPlay started',
        body: [
          'When I picked it up, RecNPlay was a proof of concept. It could find UI components and record and play back clicks on them, and that was all. There was no sense of timing, no way to fix a recording, and nothing that told you whether a replay had passed.',
          'Over the internship I built it into something QA could rely on. The work on these pages, from timing and window scoping to editing, sharing, reporting and the diff engine, is what I added.',
        ],
      },
      {
        heading: 'Recordings you can trust',
        body: [
          'Every action now carries a timestamp, so replays run at the pace the user actually worked. Window finding picks the correct window before anything is recorded and scopes reflection to it, so a stray click in another app or a value read from the wrong window never ends up in a recording.',
          'Recordings became editable and portable: adjust a delay, delete a mistaken action, save the session to a file and send it to a teammate to replay. When a replay exposes a bug, RecNPlay writes the reproduction steps for the Jira ticket’s QA report.',
        ],
      },
      {
        heading: 'Letting the regression find itself',
        body: [
          'The last piece was telling people what went wrong. The 4-way diff engine compares runtime and UI state from the recording and the replay, and the pattern of disagreement points to the kind of bug. OS mutexes keep those captures consistent across threads. Try a simplified version below.',
        ],
      },
    ],
  },
  {
    slug: 'apple',
    company: 'Apple',
    title: 'Software Systems Engineering Intern',
    place: 'Sunnyvale, CA',
    dates: 'May 2024 – Aug 2024',
    stack: ['Python', 'Open3D', 'DBSCAN', 'K-D trees', 'C++', 'Robot control APIs'],
    metric: { value: '80%', label: 'smaller point-cloud payloads' },
    summary:
      'Cleaned and segmented noisy optical scans of multi-layer glass components in Python, then built the C++ control API for the robots that capture the data.',
    bullets: [
      'Designed a Python and Open3D noise-removal algorithm for optical point clouds distorted by layered glass, cutting point counts and downstream compute by 80%.',
      'Clustered the cleaned clouds with DBSCAN and K-D trees so each part could be handled as an isolated object for ray tracing.',
      'Built ingestion and filtering pipelines for streaming sensor telemetry, cutting processing latency by more than 50%.',
      'Was put in charge of the robotic data-capture control systems and wrote a C++ API that developers script in Python.',
    ],
    image: '/images/apple.jpg',
    // the sign is taller than a 16:9 slice of this portrait photo
    imageAspect: '4 / 3',
    imagePosition: 'center 92%',
    lab: 'pointcloud',
    story: [
      {
        heading: 'Point clouds',
        body: [
          'In the Vision Products Group I worked as a systems tools intern, writing software that tests hardware. The process starts with a scanner that uses light to build a point cloud of an object: millions of 3D samples. The part being scanned was made of several layers of glass, which left the resulting clouds full of distortion and noise.',
          'My job was to clean them up and separate what was left into distinct objects. Working only in Python with Open3D, I designed a noise-removal algorithm that cut point counts by 80%, shrinking data files and speeding up everything downstream. I then clustered the remaining points with DBSCAN and K-D trees, so each piece could be treated as its own object. Those isolated objects went on to ray tracing, which another team owned.',
        ],
      },
      {
        heading: 'Control systems',
        body: [
          'I was then put in charge of the control systems: the robots that perform the data capture. I automated them by writing an API in C++ that wraps the system controls, which developers can drive from Python scripts. Future applications could integrate without manual steps, which made data capture more accurate and consistent and easier to scale across projects.',
        ],
      },
    ],
  },
  {
    slug: 'invoicecloud',
    company: 'InvoiceCloud',
    title: 'Software Engineering Intern',
    place: 'Remote',
    dates: 'May 2023 – Dec 2023',
    stack: ['VB.NET', 'C#', 'ASP.NET Web Forms', 'SQL stored procedures', 'SAML 2.0', 'Okta'],
    metric: { value: '5 min', label: 'turnaround on requests that used to take days' },
    summary:
      'Built self-service CRM tools that cut payment-export and IP-allowlist requests from days to five minutes, and replaced IT-issued CRM passwords with Okta single sign-on.',
    bullets: [
      'Built a Payment Export Tool in the CRM so Client Services can generate payment exports themselves, replacing development-team tickets that took days with a five-minute task.',
      'Shipped it on deadline after a mid-project move from ASP.NET Core and AngularJS to a .NET Framework 4.8 Web Forms app in VB.NET, with stored procedures guiding reps to the right batch and Excel exports sent by email.',
      'Moved the reCAPTCHA IP allowlist from an engineer-edited text file into a database with a CRM page for Client Services, with validation, duplicate checks and confirmed deletes. Turnaround went from days to minutes.',
      'Replaced IT-generated CRM passwords with SAML 2.0 single sign-on through Okta, so users sign in with the Okta account they already have instead of waiting on IT for resets.',
      'Added an environment-aware sign-in flow: redirect to Okta in production, an Okta button on test servers, none on local builds.',
    ],
    image: '/images/invoicecloud.jpg',
    imagePosition: 'center 100%',
    story: [
      {
        heading: 'Payment export tool',
        body: [
          'When a payment cleared after its batch had settled, billers sometimes saw a paid customer as unpaid. Fixing that took a payment export, and the only way to get one was to send a ticket to the development team, who pulled the data from the database by hand. Turnaround took days.',
          'We built a tool in the CRM that let Client Services generate and download those exports themselves. Halfway through, the project had to move from ASP.NET Core and AngularJS to a .NET Framework 4.8 Web Forms app in VB.NET, with the same deadline. We kept the logic, rebuilt the front end from a new Figma mockup, used stored procedures to guide reps to the right batch, and emailed Excel exports through the company mail service. It shipped to production, and a request that used to take days now takes about five minutes.',
        ],
      },
      {
        heading: 'reCAPTCHA IP allowlist',
        body: [
          "Billers' support staff kept getting stuck in reCAPTCHA loops. The allowlist that exempted them was a text file only engineers could edit, so every new IP meant a ticket to the development team and days of waiting.",
          'With two other engineers I moved the allowlist into a database with full CRUD and built a page in the CRM for Client Services: a table with the date and time each IP was added, an add and edit dialog with regex and duplicate checks, and delete with confirmation. Now support enters the IP address themselves, and it takes about five minutes.',
        ],
      },
      {
        heading: 'CRM single sign-on with Okta',
        body: [
          'CRM passwords were random strings generated by the IT department. Anyone who forgot theirs had to ask IT for a new one, which meant more than ten reset tickets a week and long waits to get back in. It was not safe either: people saved the passwords in notepads and on sticky notes.',
          'My partner and I added SAML 2.0 SSO through Okta to a .NET Framework 4.8 Web Forms app using Sustainsys.Saml2, whose documentation was thin enough that we mapped the assertion handling by working through the library ourselves. Users now sign in to the CRM with the Okta account they already have.',
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
  /** Deployed site, shown next to the code link */
  live?: string
  image?: string
  /** CSS object-position for the featured photo crop */
  imagePosition?: string
}

export const projects: Project[] = [
  {
    name: 'Autonomous firefighting robot',
    kind: 'IEEE robotics · Engineering lead',
    dates: 'Oct 2024 – Feb 2025',
    blurb:
      'A mobile robot that finds and fights fires in unmapped arenas. I led its perception, state estimation and path planning: ROS 2 and Nav2 fuse 2D LiDAR, wheel odometry and an IMU for real-time SLAM and obstacle avoidance, while my microcontroller drivers close the motor loop for precise trajectories and fast target alignment.',
    stack: ['ROS 2', 'Nav2', 'LiDAR SLAM', 'Embedded'],
    image: '/images/firefighter-slam.jpg',
    imagePosition: '100% center',
  },
  {
    name: 'Autonomous Navigation Platform',
    kind: 'Robotics · Software lead',
    dates: 'Oct 2023 – Feb 2024',
    blurb:
      'Embedded firmware for an autonomous ground rover on an ESP32 and Raspberry Pi. A BNO055 IMU drives closed-loop drift correction, ultrasonic sensors avoid obstacles and place the robot in the arena, and OpenCV color detection finds each target, sending alignment over UART. The same alignment docks it on an inductor coil for wireless charging.',
    stack: ['C++', 'Python', 'ESP32', 'Raspberry Pi', 'OpenCV'],
    href: 'https://github.com/Jmarquez03/RobotMovementCode',
    image: '/images/autonav-rover.jpg',
    imagePosition: 'center 85%',
  },
  {
    name: 'Autonomous drone and rover search',
    kind: 'IEEE robotics · Software lead',
    dates: 'Oct 2022 – Mar 2023',
    blurb:
      'A drone and ground rover that hunt QR-coded targets together. A YOLOv3 model I trained on 1,000+ box images runs on a Jetson Nano to spot boxes; the drone closes in on distance estimates and scans each code with OpenCV, then reverse vectorization brings the rover to it after a touch-and-go.',
    stack: ['Python', 'OpenCV', 'YOLOv3', 'Jetson Nano'],
    href: 'https://github.com/Jmarquez03/JetsonNanoCode',
    image: '/images/r5-robot.jpg',
    imagePosition: 'center 15%',
  },
  {
    name: 'zLyrics',
    kind: 'Full-stack web app · Co-developer',
    dates: '2026',
    blurb:
      'Lyric videos and music metadata from asynchronous REST APIs, kept fast with client-side caching and error handling. When the API has no lyrics, OpenAI Whisper transcribes the track with timestamps.',
    stack: ['TypeScript', 'React', 'REST APIs', 'OpenAI Whisper'],
    href: 'https://github.com/Zavalaesteban1/zLyrcis',
    live: 'https://z-lyrcis.vercel.app/login',
  },
  {
    name: 'Dead Last',
    kind: 'Game · 3D roguelike shooter',
    dates: '2026',
    blurb:
      'An isometric twin-stick roguelike in Unity 6. I built the core loop, projectile physics and inventory, NavMesh enemy AI that tracks, flanks and scales hordes, and an event-driven HUD with live reticles, health and ammo.',
    stack: ['Unity 6', 'C#', 'NavMesh AI', 'UGUI'],
    href: 'https://github.com/Jmarquez03/Dead-Last',
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
