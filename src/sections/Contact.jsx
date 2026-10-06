import { useRef, useState } from 'react';
import Particles from '../components/reactbits/Particles';
import Orb from '../components/reactbits/Orb';
import LazyMount from '../components/LazyMount';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import SocialLinks from '../components/SocialLinks';
import ContactNudge from '../components/ContactNudge';
import Icon from '../components/Icon';
import useReveal from '../components/useReveal';
import { profile } from '../data/portfolio';
import { useTheme } from '../theme/ThemeContext';

const topics = ['Freelance Project', 'Job Opportunity', 'SkillSphere Enrollment', 'Collaboration', 'Just Saying Hi'];
const MAX = 600;

export default function Contact() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const interactedRef = useRef(false);
  useReveal(ref);

  const [topic, setTopic] = useState(topics[0]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'mail' | 'whatsapp'
  const [copied, setCopied] = useState(false);

  const onChange = e => {
    interactedRef.current = true;
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'message' ? value.slice(0, MAX) : value }));
  };

  const compose = () => `[${topic}]\n\n${form.message}\n\n- ${form.name}${form.email ? ` (${form.email})` : ''}`;

  const sendMail = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`${topic} - from ${form.name || 'portfolio visitor'}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(compose())}`;
    setStatus('mail');
  };

  const waHref = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(compose())}`;
  const sendWhatsApp = e => {
    if (!form.name || !form.message) {
      e.preventDefault();
      setStatus('missing');
      return;
    }
    setStatus('whatsapp');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="pt-20 pb-10 px-4 sm:px-6 bg-[#050505] relative overflow-hidden">
      <ContactNudge interactedRef={interactedRef} />

      {/* React Bits: Particles background */}
      <LazyMount className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <Particles
          key={theme.id}
          particleCount={180}
          particleSpread={10}
          speed={0.08}
          particleColors={[theme.p, theme.s, '#ffffff']}
          alphaParticles
          particleBaseSize={90}
          sizeRandomness={1}
          cameraDistance={20}
        />
      </LazyMount>

      <div className="relative z-10">
        <SectionHeading title="Initiating The" outline="Collaboration">
          Available for strategic partnerships, technical inquiries, freelance projects or full-stack opportunities. Whether
          you have a groundbreaking idea or a complex infrastructure challenge - let's connect and transform vision into
          digital reality.
        </SectionHeading>

        <div className="reveal-3d max-w-6xl mx-auto [perspective:1600px]">
          <TiltCard max={3} scale={1} className="contact-shell overflow-hidden rounded-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* left - React Bits Orb panel */}
              <div className="lg:w-5/12 relative flex flex-col bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="flex items-center gap-2 self-start m-6 sm:m-8 mb-0 sm:mb-0 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-[10px] uppercase tracking-[0.2em] text-white relative z-10">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to new projects
                </div>

                <div className="relative w-full max-w-[420px] aspect-square mx-auto -my-4">
                  <LazyMount className="absolute inset-0" rootMargin="100px">
                    <Orb colors={[theme.p, theme.s, theme.deep]} hue={0} hoverIntensity={0.35} rotateOnHover backgroundColor="#0a0a0a" />
                  </LazyMount>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <p className="text-[12px] uppercase tracking-[0.35em] text-mahiPink">Hey There!</p>
                    <h3 className="text-4xl sm:text-5xl font-black text-white leading-[0.95] mt-2">
                      Let's <br />
                      <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #fff' }}>Connect</span>
                    </h3>
                  </div>
                </div>

                <div className="relative z-10 px-6 pb-8 sm:px-10 sm:pb-10 mt-auto space-y-2">
                  <div className="contact-line">
                    <Icon name="mail" size={16} className="text-mahiPink shrink-0" />
                    <span className="truncate select-all">{profile.email}</span>
                    <button type="button" onClick={copyEmail} className="ml-auto text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-mahiPink transition">
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="contact-line">
                    <Icon name="map-pin" size={16} className="text-mahiPink shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                  <SocialLinks className="pt-3" size={16} />
                </div>
              </div>

              {/* right - form */}
              <div className="lg:w-7/12 p-6 sm:p-12 md:p-16 flex flex-col justify-center bg-[#0d0d0d]">
                <form onSubmit={sendMail} className="space-y-10">
                  <fieldset>
                    <legend className="text-[12px] text-white block mb-4">Reason For Contact</legend>
                    <div className="flex flex-wrap gap-2">
                      {topics.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            interactedRef.current = true;
                            setTopic(t);
                          }}
                          className={`topic-chip ${topic === t ? 'topic-chip-on' : ''}`}
                          aria-pressed={topic === t}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="float-field">
                      <input id="form-name" name="name" type="text" required value={form.name} onChange={onChange} placeholder=" " className="glass-input w-full pb-3 pt-1 text-sm text-white outline-none" />
                      <label htmlFor="form-name">Identification</label>
                    </div>
                    <div className="float-field">
                      <input id="form-email" name="email" type="email" required value={form.email} onChange={onChange} placeholder=" " className="glass-input w-full pb-3 pt-1 text-sm text-white outline-none" />
                      <label htmlFor="form-email">Digital Address</label>
                    </div>
                  </div>

                  <div className="float-field">
                    <textarea id="form-msg" name="message" rows="4" required value={form.message} onChange={onChange} placeholder=" " className="glass-input w-full pb-3 pt-1 text-sm text-white outline-none resize-none" />
                    <label htmlFor="form-msg">Message Packet</label>
                    <span className="absolute right-0 -bottom-6 text-[10px] font-mono text-white/35">
                      {form.message.length}/{MAX}
                    </span>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="group relative overflow-hidden w-full sm:w-auto rounded-lg px-10 py-5 bg-white text-black font-black text-[10px] tracking-[0.5em] uppercase transition-all duration-500"
                    >
                      <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-3">
                        <Icon name="mail" size={14} /> Dispatch Signal
                      </span>
                      <div className="absolute inset-0 bg-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                    <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={sendWhatsApp} className="wa-btn justify-center !py-5 !tracking-[0.3em] !text-[10px]">
                      <Icon name="whatsapp" size={16} /> Send On WhatsApp
                    </a>
                  </div>

                  <p className="text-[11px] tracking-wide min-h-[1rem] text-white/60" aria-live="polite">
                    {status === 'mail' && 'Your email app should open with the message ready - just press send.'}
                    {status === 'whatsapp' && 'WhatsApp opened in a new tab with your message ready.'}
                    {status === 'missing' && 'Please add your name and a message first.'}
                    {!status && 'Pick a reason, write your message, then send it by email or WhatsApp.'}
                  </p>
                </form>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
