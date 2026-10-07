// ---------------------------------------------------------------
// All editable portfolio content lives here.
// Update links / numbers in this one file - no need to touch components.
// ---------------------------------------------------------------

export const profile = {
  name: 'Maha Kanwal',
  nickname: 'Mahi',
  email: 'mskanwal47@gmail.com',
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: '923194743468',
  location: 'Karachi, Pakistan',
  currentRole: 'HR Manager',
  currentCompany: 'Comet Tech'
};

const waText = encodeURIComponent(
  "Hi Maha! I found your portfolio and I'd like to enroll in SkillSphere coding classes."
);
const waHire = encodeURIComponent("Hi Maha! I saw your portfolio and I'd like to discuss a project with you.");

export const links = {
  whatsappEnroll: `https://wa.me/${profile.whatsapp}?text=${waText}`,
  whatsappHire: `https://wa.me/${profile.whatsapp}?text=${waHire}`,
  email: `mailto:${profile.email}`,
  // TODO: replace with your real profile URLs
  linkedin: 'https://www.linkedin.com/in/your-profile',
  instagram: 'https://www.instagram.com/your-profile',
  facebook: 'https://www.facebook.com/your-profile'
};

export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: links.linkedin },
  { id: 'instagram', label: 'Instagram', href: links.instagram },
  { id: 'facebook', label: 'Facebook', href: links.facebook },
  { id: 'whatsapp', label: 'WhatsApp', href: links.whatsappHire },
  { id: 'mail', label: 'Email', href: links.email }
];

export const typingWords = [
  'Software Engineer',
  'AI Developer',
  'HR Manager @ Comet Tech',
  'Full Stack Developer',
  'Freelance Maven',
  'Founder of SkillSphere',
  'Web Instructor',
  'Nature Soul'
];

// Skills orbit (same data as the original site)
export const skills = [
  { name: 'HTML5', level: 95, clr: '#E34F26', desc: 'Expert in semantic web structures and modern HTML5 standards.', icon: '/img/tech/html5-original.svg', type: 'img' },
  { name: 'CSS3', level: 93, clr: '#1572B6', desc: 'Crafting responsive designs with Tailwind and modern CSS.', icon: '/img/tech/css3-original.svg', type: 'img' },
  { name: 'JavaScript', level: 80, clr: '#F7DF1E', desc: 'Core logic, asynchronous programming, and ES6+ features.', icon: '/img/tech/javascript-original.svg', type: 'img' },
  { name: 'React', level: 68, clr: '#61DAFB', desc: 'Building dynamic SPAs with Hooks and high-performance states.', icon: '/img/tech/react-original.svg', type: 'img' },
  { name: 'Angular', level: 80, clr: '#DD0031', desc: 'Scalable enterprise solutions with modular architecture.', icon: '/img/tech/angularjs-original.svg', type: 'img' },
  { name: 'Python', level: 85, clr: '#3776AB', desc: 'Versatile programming for data science, automation, and backend logic.', icon: '/img/tech/python-original.svg', type: 'img' },
  { name: 'Laravel', level: 87, clr: '#FF2D20', desc: 'Robust backend development using PHP and MVC architecture.', icon: '/img/tech/laravel-original.svg', type: 'img' },
  { name: 'ASP.NET', level: 82, clr: '#512BD4', desc: 'Professional enterprise-grade C# engineering systems.', icon: '/img/tech/dotnetcore-original.svg', type: 'img' },
  { name: 'Database', level: 85, clr: '#4479A1', desc: 'Efficient data management with MySQL, PostgreSQL and SQL Server.', icon: 'database', type: 'icon' },
  { name: 'Design', level: 78, clr: '#FF61F6', desc: 'Visual UI/UX design using Figma and creative tools.', icon: 'pen-tool', type: 'icon' },
  { name: 'WordPress', level: 90, clr: '#21759B', desc: 'Custom CMS solutions, themes, and plugin engineering.', icon: '/img/tech/wordpress-plain.svg', type: 'img' },
  { name: 'MS Office', level: 95, clr: '#E65100', desc: 'Expertise in document automation, data analysis, and professional presentations.', icon: 'https://img.icons8.com/color/48/microsoft-office-2019.png', type: 'img' }
];

// tech logos are bundled locally in /public/img/tech (from the Devicon project)
const dv = n => `/img/tech/${n.split('/')[1]}`;
// Languages & tools marquee
export const techLogos = [
  { name: 'HTML5', src: dv('html5/html5-original.svg') },
  { name: 'CSS3', src: dv('css3/css3-original.svg') },
  { name: 'JavaScript', src: dv('javascript/javascript-original.svg') },
  { name: 'TypeScript', src: dv('typescript/typescript-original.svg') },
  { name: 'React', src: dv('react/react-original.svg') },
  { name: 'Angular', src: dv('angularjs/angularjs-original.svg') },
  { name: 'Python', src: dv('python/python-original.svg') },
  { name: 'Django', src: dv('django/django-plain.svg') },
  { name: 'Flask', src: dv('flask/flask-original.svg'), invert: true },
  { name: 'PHP', src: dv('php/php-original.svg') },
  { name: 'Laravel', src: dv('laravel/laravel-original.svg') },
  { name: 'C#', src: dv('csharp/csharp-original.svg') },
  { name: '.NET', src: dv('dotnetcore/dotnetcore-original.svg') },
  { name: 'MySQL', src: dv('mysql/mysql-original.svg') },
  { name: 'SQL Server', src: dv('microsoftsqlserver/microsoftsqlserver-plain.svg') },
  { name: 'Bootstrap', src: dv('bootstrap/bootstrap-original.svg') },
  { name: 'jQuery', src: dv('jquery/jquery-original.svg') },
  { name: 'WordPress', src: dv('wordpress/wordpress-plain.svg'), invert: true },
  { name: 'Git', src: dv('git/git-original.svg') },
  { name: 'Figma', src: dv('figma/figma-original.svg') }
];

// Experience (same as original site)
export const experience = [
  { side: 'left', tag: 'July - Present', title: 'IT Head', sub: 'ZAS College of Arts & Design' },
  { side: 'left', tag: 'Present', title: 'Web Dev Instructor', sub: 'BBSHRRDB - Python Programming' },
  { side: 'left', tag: '2022 - Present', title: 'Full Stack Developer', sub: 'Mini Solution (Remote)' },
  { side: 'right', tag: 'July - Present', title: 'Programming Instructor', sub: 'ZAS College of Arts & Design' },
  { side: 'right', tag: 'July 2025', title: 'Web Instructor', sub: 'Govt. Training Project (YEEEP)' },
  { side: 'right', tag: '2021 - 2022', title: 'Primary & Computer Teacher', sub: 'MRA Coaching Academy' }
];

// "Right now" roles
export const currentRoles = [
  {
    id: 'hr',
    kicker: 'Current Position',
    title: 'HR Manager',
    org: 'Comet Tech',
    text: 'Leading people operations at Comet Tech - hiring, onboarding and building a culture where talent can grow.',
    icon: 'users',
    live: true
  },
  {
    id: 'freelance',
    kicker: 'Open For Projects',
    title: 'Freelance Engineer',
    org: 'Client Projects',
    text: 'Designing and shipping websites, web apps and AI-powered tools for clients - from first wireframe to deployment.',
    icon: 'briefcase',
    live: true
  },
  {
    id: 'swe',
    kicker: 'Core Identity',
    title: 'Software Engineer',
    org: 'Polyglot Developer',
    text: 'Fluent across many languages and stacks - JavaScript, TypeScript, Python, PHP, C#, SQL and more.',
    icon: 'code',
    live: false
  },
  {
    id: 'skillsphere',
    kicker: 'Giving Back',
    title: 'Founder & Mentor',
    org: 'SkillSphere',
    text: 'Teaching kids coding from the very basics - completely free. Learn together, grow together.',
    icon: 'sparkles',
    live: true
  }
];

// Projects - `category` decides which tab each project appears in.
// `live` = live site / app link, `github` = repository link (use null if you don't have one yet).
// Clicking a card opens `live` (or `github` if there is no live link).
export const projectTabs = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'AI', value: 'ai' },
  { label: 'Mobile Apps', value: 'mobile' }
];

export const projects = [
  {
    title: 'SkillSprint AI',
    category: 'ai',
    tagline: 'Generative-AI onboarding platform that turns a role into a personalised learning sprint.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Groq GenAI'],
    image: null,
    cover: { accent: 'var(--p)', glyph: 'AI' },
    live: 'https://skill-sprint-omega-six.vercel.app/',
    github: 'https://github.com/mahakanwal/SkillSprint' 
  },
  {
    title: 'SkillSync',
    category: 'ai',
    // TODO: replace with the real SkillSync description and links
    tagline: 'AI-powered project - full case study coming soon.',
    tags: ['AI', 'React', 'Python'],
    image: null,
    cover: { accent: 'rgb(var(--p300))', glyph: 'SS' },
    live: null,
    github: null
  },
  {
    title: 'MoodBuddy',
    category: 'ai',
    tagline: 'AI-Powered Mood-Based Content & Product Recommender.',
    tags: ['AI', 'Recommendation', '#Feel_Your_Mood'],
    image: '/img/moodbuddy.webp',
    live: 'https://moodbuddy-cng3.onrender.com/', 
    github: 'https://github.com/mahakanwal/moodbuddy-app'
  },
  {
    title: 'Netpositive',
    category: 'frontend',
    tagline: 'Eco-Friendly Essentials & Sustainable Online Store.',
    tags: ['E-commerce', 'Responsive UI'],
    image: '/img/netpositive.webp',
    live: 'https://netpositive.com/', 
    github: null 
  },
  {
    title: 'Wellnex Systems',
    category: 'frontend',
    tagline: 'Wellness Reimagined for the Next Generation.',
    tags: ['Landing Page', 'UI Design'],
    image: '/img/wellnex.webp',
    live: null, // TODO
    github: null // TODO
  },
  {
    title: 'Mahi OS',
    category: 'frontend',
    tagline: 'The original personal portfolio - #Active_Portfolio.',
    tags: ['Portfolio', 'React JS', 'Three Js'],
    image: '/img/mahi.webp',
    live: 'https://meet-maha.vercel.app/', 
    github: 'https://github.com/mahakanwal/Maha-Kanwal-Portfolio' 
  },
  {
    title: 'Chat App',
    category: 'mobile',
    // TODO: add the app's real name if it has one
    tagline: 'WhatsApp-style real-time chatting app - one-to-one chats, instant messages and a clean mobile UI.',
    tags: ['Mobile App', 'Real-time Chat'],
    image: null,
    phone: { accent: 'var(--p)', ui: 'chat', screen: null }, // screen: '/img/your-app-screenshot.webp'
    live: null, // TODO
    github: null // TODO
  },
  {
    title: 'LaptopHarbor',
    category: 'mobile',
    tagline: 'Laptop shopping mobile app - browse, compare and order laptops from one place.',
    tags: ['Mobile App', 'Flutter', 'E-commerce'],
    image: null,
    phone: { accent: 'rgb(var(--p300))', ui: 'shop', screen: null }, // screen: '/img/your-app-screenshot.webp'
    live: null, // TODO
    github: null // TODO
  }
];

export const aboutStats = [
  { value: 5, suffix: '+', label: 'Years In Tech & Teaching' },
  { value: 12, suffix: '+', label: 'Languages & Tools' },
  { value: 6, suffix: '', label: 'Roles Held' },
  { value: 100, suffix: '%', label: 'Free Classes At SkillSphere' }
];

// ---------------------------------------------------------------
// "Off The Clock" section
// ---------------------------------------------------------------
export const creativeSides = [
  { title: 'Graphic Design', text: 'Posters, brand visuals and UI layouts - design is where my logic gets its colour.' },
  { title: 'Nature & Mountains', text: 'A mountain soul at heart. Fresh air and long views reset my creativity.' },
  { title: 'Teaching & Storytelling', text: 'Turning complex ideas into simple stories kids and students actually enjoy.' }
];

// ---------------------------------------------------------------
// Gallery - put your photos in /public/img/gallery and list them here.
// `text` is the caption shown under each photo in the 3D gallery.
// ---------------------------------------------------------------
export const galleryItems = [
  { image: '/img/gallery/office_desk_hr.jpeg', text: 'Office Mode' },
  { image: '/img/gallery/innovalte1.jpeg', text: 'Innovalte Season 2 - 1st Runner Up' },
  { image: '/img/gallery/techwiz7.jpeg', text: 'Techwiz 7' },
  { image: '/img/gallery/innovalte2.jpeg', text: 'Winning Prize' },
  { image: '/img/gallery/first_tech_exhibition.jpeg', text: 'First Software Exhibition' },
  { image: '/img/gallery/coding.jpeg', text: 'Coding Mode On' },
  { image: '/img/gallery/pc_vision.jpeg', text: 'At Vision' },
  { image: '/img/gallery/vision1.jpeg', text: 'With My SkillSync' }
];
