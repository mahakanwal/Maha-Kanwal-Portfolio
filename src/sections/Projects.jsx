import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import GooeyNav from '../components/reactbits/GooeyNav';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import { projects, projectTabs } from '../data/portfolio';

const Cover = ({ project }) => (
  <div className="ai-cover" style={{ '--accent': project.cover.accent }}>
    <div className="ai-cover-grid" />
    <div className="ai-cover-orb" />
    <div className="ai-cover-ring" />
    <span className="ai-cover-glyph">{project.cover.glyph}</span>
    <span className="ai-cover-label">// {project.title}</span>
  </div>
);

const CATEGORY_LABEL = { ai: 'AI Project', frontend: 'Frontend', mobile: 'Mobile App' };

const Phone = ({ project }) => (
  <div className="phone-cover" style={{ '--accent': project.phone.accent }}>
    <div className="phone-glow" />
    <div className="phone-device">
      <span className="phone-notch" />
      {project.phone.screen ? (
        <img src={project.phone.screen} alt={`${project.title} screen`} className="w-full h-full object-cover" />
      ) : (
        project.phone.ui === 'chat' ? (
          <div className="phone-ui phone-chat">
            <span className="chat-top">
              <span className="chat-avatar" />
              <span className="chat-name" />
            </span>
            <span className="chat-bubble in w-[70%]" />
            <span className="chat-bubble out w-[55%]" />
            <span className="chat-bubble in w-[45%]" />
            <span className="chat-bubble out w-[65%]" />
            <span className="chat-typing">
              <i />
              <i />
              <i />
            </span>
            <span className="chat-input" />
          </div>
        ) : (
          <div className="phone-ui">
            <span className="phone-ui-head" />
            <span className="phone-ui-card shop-hero">
              <span className="shop-laptop" />
            </span>
            <span className="phone-ui-row" />
            <span className="phone-ui-row short" />
            <span className="phone-ui-grid">
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>
        )
      )}
    </div>
  </div>
);

// Buttons are always shown; until a link is added in data/portfolio.js they stay inactive.
const ProjectLink = ({ href, className, icon, label }) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <Icon name={icon} size={14} /> {label}
    </a>
  ) : (
    <span className={`${className} is-empty`} title="Link coming soon" aria-disabled="true">
      <Icon name={icon} size={14} /> {label}
    </span>
  );

function ProjectCard({ project }) {
  const primary = project.live || project.github;
  return (
    <TiltCard max={10} className="project-card glass p-2 rounded-xl h-full [transform-style:preserve-3d] group">
      {/* whole card opens the live link (or GitHub) */}
      {primary && (
        <a
          href={primary}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link rounded-xl"
          aria-label={`Open ${project.title}`}
        />
      )}
      <div className="card-content flex flex-col h-full">
        <div className="relative h-52 overflow-hidden rounded-lg [transform:translateZ(30px)]">
          {project.image ? (
            <img src={project.image} alt={project.title} className="p-img w-full h-full object-cover object-top grayscale transition-all duration-700" />
          ) : project.phone ? (
            <Phone project={project} />
          ) : (
            <Cover project={project} />
          )}
          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/80">
            {CATEGORY_LABEL[project.category]}
          </span>
          {primary && (
            <span className="project-hover-cta" aria-hidden="true">
              <Icon name={project.live ? 'arrow-up-right' : 'github'} size={16} />
              {project.live ? 'View Live' : 'View Code'}
            </span>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1 [transform:translateZ(45px)]">
          <h3 className="font-bold text-xl text-white">{project.title}</h3>
          <p className="text-white/80 text-xs mt-2 leading-relaxed">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] text-mahiPink border border-pink-500/30 bg-pink-500/5 rounded-md px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-6 flex flex-wrap items-center gap-2 pointer-events-auto">
            <ProjectLink href={project.live} className="proj-btn proj-btn-live" icon="arrow-up-right" label="View Live" />
            <ProjectLink href={project.github} className="proj-btn proj-btn-code" icon="github" label="View On GitHub" />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const [tab, setTab] = useState('all');
  const gridRef = useRef(null);

  const list = useMemo(() => (tab === 'all' ? projects : projects.filter(p => p.category === tab)), [tab]);
  const navItems = useMemo(() => projectTabs.map(t => ({ label: t.label, href: '#projects' })), []);

  // 3D flip-in whenever the tab changes
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el.children,
      { opacity: 0, rotateY: -60, z: -200, y: 40 },
      { opacity: 1, rotateY: 0, z: 0, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', transformPerspective: 1200, clearProps: 'transform' }
    );
    return () => tween.kill();
  }, [tab]);

  return (
    <section id="projects" className="pt-10 pb-10 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      <SectionHeading title="Proven" outline="Deployment">
        Turning abstract concepts into scalable architecture. Each project is a deep dive into performance, aesthetics, and
        pure functional magic.
      </SectionHeading>

      {/* React Bits: GooeyNav used as project tabs */}
      <div className="flex justify-center mb-12 text-[11px] sm:text-xs uppercase tracking-[0.15em] font-bold gooey-tabs">
        <GooeyNav
          items={navItems}
          particleCount={12}
          particleDistances={[70, 8]}
          particleR={90}
          animationTime={550}
          timeVariance={250}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          initialActiveIndex={0}
          onChange={i => setTab(projectTabs[i].value)}
        />
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1400px]">
        {list.map(p => (
          <div key={p.title}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
