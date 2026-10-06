# Maha Kanwal - Portfolio (React + Vite)

The original HTML/Tailwind portfolio converted to React, with React Bits backgrounds,
three.js / WebGL scenes, 3D tilt sections, a playable mini game and the new SkillSphere section.

## Run it

```bash
npm install
npm run dev       # local dev server  -> http://localhost:5173
npm run build     # production build  -> /dist (upload this folder to any static host)
npm run preview   # preview the production build
```

Node 18+ recommended.

## Edit your content - one file

Everything you are likely to change lives in **`src/data/portfolio.js`**:

| What | Key |
| --- | --- |
| WhatsApp number (used by "Enroll On WhatsApp" + contact) | `profile.whatsapp` (digits only, e.g. `923194743468`) |
| LinkedIn / Instagram / Facebook links | `links.linkedin`, `links.instagram`, `links.facebook` - **replace the placeholders** |
| Hero typing words | `typingWords` |
| Projects + tabs (Frontend / AI / Mobile Apps) | `projects`, `projectTabs` - `category: 'frontend'`, `'ai'` or `'mobile'`; add `live` and `github` links per project |
| SkillSync description + link | inside `projects` (currently a "coming soon" placeholder) |
| Gallery photos | put photos in `public/img/gallery/` and list them in `galleryItems` |
| Current roles (HR Manager @ Comet Tech, Freelance, ...) | `currentRoles` |
| Skills orbit, experience, stats | `skills`, `experience`, `aboutStats` |

## Page structure

| Section | File | Notes |
| --- | --- | --- |
| Loader + fold transition | `components/Loader.jsx` | same as original |
| Hero | `sections/Hero.jsx` | original design and typewriter, React Bits **TechText** on "MAHA" (hover / drag the letters), upgraded buttons |
| The Creative Engine (about) | `sections/About.jsx` | original design + React Bits **Galaxy** background |
| Currently Online | `sections/NowSection.jsx` | clean role cards with status, title, organisation and summary |
| Technical Trajectory (education) | `sections/Education.jsx` | same content as 3D bento cards |
| Architecting the Legacy (experience) | `sections/Experience.jsx` | original layout kept + React Bits **Threads** bg; stacked version on phones |
| Beyond the Interface (skills orbit) | `sections/Skills.jsx` | original behaviour + React Bits **DotGrid** bg |
| Tech marquee | `sections/TechMarquee.jsx` | React Bits **LogoLoop** |
| Proven Deployment (projects) | `sections/Projects.jsx` | React Bits **GooeyNav** tabs + 3D flip cards |
| Off The Clock | `sections/OffTheClock.jsx` | creativity cards |
| Captured Moments | `sections/Gallery.jsx` | React Bits **CircularGallery** (drag / swipe / scroll) |
| SkillSphere | `sections/SkillSphere.jsx` | three.js globe (`three/SkillGlobe.jsx`) + React Bits **LightRays**, WhatsApp enroll |
| Bug Hunter game | `sections/Game.jsx` | playable canvas game (mouse / touch / arrow keys) |
| Contact | `sections/Contact.jsx` | React Bits **Orb** panel, reason chips, email or WhatsApp sending, copy email, original "zuu zuu" sound + chat bubble (`components/ContactNudge.jsx`) |
| Theme switcher | `components/ThemeSwitcher.jsx`, `theme/themes.js` | palette button in the navbar - Rose, Sky Blue, Teal, Lavender, Peach, White. Choice is remembered in the browser. Add or edit themes in `theme/themes.js` |
| Cursor | `components/Cursor.jsx` | accent dot + trailing ring + short comet tail; click / tap burst with sparks and XP pops |

React Bits components live in `src/components/reactbits/` (small patches are commented in the code).
Heavy WebGL backgrounds are wrapped in `LazyMount` so they only run while on screen.

## Credits

- React Bits components by David Haz - https://reactbits.dev (MIT + Commons Clause)
- Tech logos from Devicon - https://devicon.dev (MIT)
