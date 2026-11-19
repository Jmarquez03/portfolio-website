# portfolio-website

Source for [marquezengineering.com](https://marquezengineering.com), Jorge Marquez's engineering portfolio.

**Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, and React Three Fiber (three.js) for the interactive point-cloud scenes.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Structure

- `src/data.ts`: all site content (roles, case studies, projects, skills). Edit this to update the site.
- `src/components/PointCloud.tsx`: the 3D scan (hero animation and the interactive lab on `/work/apple`)
- `src/pages/`: home, case study (`/work/:slug`) and 404
- `public/.htaccess`: Apache rewrite so client-side routes work on Hostinger
- `public/files/`: resume PDF
- `content/site-content.md`: inventory of the old Website Builder site

## Deploy (Hostinger)

`npm run build`, then upload the contents of `dist/` (including `.htaccess`) to `public_html`.
