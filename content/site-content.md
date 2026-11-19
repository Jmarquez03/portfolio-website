# Content inventory — marquezengineering.com (Hostinger Website Builder)

Collected 2026-11-18 from the live site, as the source of truth for the rebuild.
Copy will be tightened during the redesign; facts below should be preserved.

## Links
- Resume (PDF): https://assets.zyrosite.com/YKb10LGXxVHprglk/jorge_marquez_resume_swe-mePvb4zqj6ul1NEL.pdf
- LinkedIn: https://www.linkedin.com/in/jorge-marquez-jm2025/
- GitHub: https://github.com/Jmarquez03
- Email: JMarquez@MarquezEngineering.com

## Pages on the current site
| Path | Status |
|---|---|
| `/` Home | public |
| `/about` | public |
| `/contact` | public (form: name, last name, email, message) |
| `/experience` | public (index linking Apple, InvoiceCloud, IEEE STBS, Projects) |
| `/apple` | public |
| `/invoicecloud` | public |
| `/ieee` | password-protected ("under maintenance"), content not collected |
| `/texprep` | password-protected ("under maintenance"), content not collected |
| `/projects` | password-protected, content not collected |

## Home
Headline: **More Than An Engineer**

> Hi, I'm Jorge Marquez. Throughout the past two years, I focused a tremendous amount of effort on growing my technical knowledge. Through this, I have not only learned more about the vast world of technology but about myself as well. Explore my creative and innovative coding and robotics projects. Get inspired by my passion for technology and problem-solving. Discover how I bring ideas to life through coding, AI, and robotics. Come along with me on my path of discovery and growth.

Portfolio cards:
- **Apple** — A dream of mine finally turned into a reality. Point cloud manipulation to control system automation, using Python, C++, and Open3D.
- **InvoiceCloud** — My first internship. Front-end development to SSO; ASP.NET Core and .NET Framework projects using C#, Visual Basic, AngularJS, SAML 2.0, Telerik, and HTML.
- **TEXPREP Robotics Curriculum** — Spreading my love of robotics to future engineers; used Python and Computer Vision to make programming accessible to beginners.
- **IEEE STBS** — Where I began my deep dive into robotics and AI. Went from starting at nothing to president of my university's IEEE branch within a year. Projects with Python, TensorFlow Lite, C++, and MicroPython.
- **Projects** — "Put on your hard hats!" Current and finished projects.

About blurb: I am Jorge Marquez, a passionate coder and robotics enthusiast. With a focus on creating innovative projects, I strive to push the boundaries of technology.

## About
> Deeply passionate about coding, robotics, and all things tech. From a young age, I have immersed myself in the world of technology, constantly seeking to learn and explore new concepts. This passion has driven me to not only pursue personal projects but also gain valuable work experience in the field. Through various internships and personal projects, I have had the privilege of applying my skills and knowledge in real-world settings. … Currently, I am leading a diverse team and spearheading initiatives that foster innovation, knowledge sharing, and professional growth.

Activities:
- Frontera Devs Hackathon
- NASA Space Apps Challenge
- IEEE R5 Robotics Competition (x3)
- IEEE Xtreme (x2)

Work (dates as shown on the site — the pairing looked misaligned in the builder layout; **confirm with Jorge**):
- InvoiceCloud, Inc. — Software Engineer — Jun 2023 – Present
- IEEE South Texas–Brownsville Section — President — Oct 2022 – Present
- IEEE South Texas–Brownsville Section — Secretary
- Apple Inc. — Software Engineering Intern — May 2024 – Aug 2024
- (A "June 2023 – December 2023" date also appears, likely the InvoiceCloud internship.)

Skills: C++, Python, C#, Visual Basic, SQL, HTML, CSS, JavaScript, Computer Vision, Linux, Bash, git, leadership, collaboration, debugging

## Apple — Vision Products Group
Role: Systems Tools Internship · Hardware/Software Engineering Intern

> As an intern at Apple in the Vision Products Group, I worked on projects with substantial impact. As a System Tools Intern I developed software tools aimed at testing hardware.

**Point Clouds** — Advanced point cloud processing to support precision in data collection and system integration. Developed and refined algorithms for noise reduction and object segmentation using Python, C++, and Open3D. Designed a noise-removal algorithm that **reduced point counts by 80%**, streamlining data files and boosting processing efficiency. Implemented clustering (DBSCAN, K-D Tree) to separate point clouds into distinct object clusters, laying a foundation for control-systems integration.

**Control Systems** — Automated control systems for high precision and reliability in data collection. Developed APIs that streamlined system controls for seamless integration with future applications, reducing manual intervention and enabling scalability.

## InvoiceCloud
**Payment Export Tool** — Internal tool letting Client Services send/download payment export files to Billers themselves, instead of engineers pulling them manually (late-confirmed payments could otherwise cause penalties). Started in "Skynet" (ASP.NET Core, C#, AngularJS); midway, SRE leadership required migrating to a .NET Framework 4.8 Web Forms app in VB.NET — code scrapped, logic kept, same deadline. New Figma mockup, multiple stored procedures to guide reps to the right batch, internal Mailgun method to email Excel exports or download locally. **Saved 3+ days per request**; in production, used by hundreds of Client Services reps.

**reCAPTCHA IP Whitelist Tool** — Self-service tool for Client Services to whitelist IPs so Biller reps aren't stuck in reCAPTCHA loops. Built with two other engineers: migrated the whitelist from a .txt file to a database (scalable CRUD), built an ASP.NET Web Forms page with a table showing IP plus date/time added, add/edit dialog with regex validation and duplicate checks, delete with confirmation.

**CRM Okta SSO Integration** — CRM passwords were randomly generated and unmemorable (10+ forgotten-password tickets/week). Implemented SAML 2.0 SSO via Okta in a .NET Framework 4.8 Web Forms app using Sustainsys.Saml2 with very limited docs — worked out assertion handling by exploring the library. Proof of concept logged into the CRM via Okta within a week (part of why the internship was extended). Added an SP-initiated flow to support production and test URLs; per-environment behavior driven by a pipeline environment variable (auto-redirect in prod, Okta button on test, none locally). Was working with platform quality engineering on YAML pipeline config to persist the variable.

## Images on the current site (assets.zyrosite.com)
- Logo SVG: ai-logo-mp83kXbrlviZPzae.svg
- InvoiceCloud logo: invoicecloud-AMqarajobOtNzjlb
- IEEE logo: 2eaec84e75333bf14596e8fa3ee66e68-ALpBVBGEe3t9VloM.png
- Apple logo: apol-ALpo0EXgNOH0VB19.jpeg
- Portrait (hero, in front of car): whatsapp-image-2023-08-05-at-21.43.43-dWxePBKyl1CkGkPD.jpg
- Second portrait: whatsapp-image-2023-08-05-at-21.29.54-YrD1Pq4M5Es0rLvV.jpg
- R5 robot: r5bot-A0xek1wgJlHeONyb.jpg
- TEXPREP robot: robot-mxBj3MJR0Rur9Zbk.jpg
- InvoiceCloud photo: icpic-YX418a2723fnkQVV.jpg
- Apple-era photo: whatsapp-image-2024-10-28-at-1.15.38-am-AMqbbLlj9PhpJyDV.jpeg
- Projects card: Unsplash stock photo (red hard hat) — replace

Note: company logos (Apple, InvoiceCloud, IEEE) are trademarks; the redesign should reference companies by name/typography rather than reusing logo images.
