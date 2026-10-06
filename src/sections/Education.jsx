import { useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import Icon from '../components/Icon';
import useReveal from '../components/useReveal';

// "Cultivating Technical Trajectory" - same content, now as 3D tilt bento cards.
export default function Education() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="roadmap" ref={ref} className="relative py-10 px-4 sm:px-6 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="Cultivating Technical" outline="Trajectory">
          A strategic alignment of academic excellence and industry-standard certifications. From mastering software
          engineering logic to specialized design and programming credentials - every achievement serves as a foundation
          for professional mastery.
        </SectionHeading>

        <div className="max-w-6xl mx-auto p-0 sm:p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 [perspective:1600px]">
            <div className="reveal-3d md:col-span-8">
              <TiltCard max={8} className="edu-card h-full p-8 rounded-xl group">
                <div className="flex flex-col h-full justify-between [transform-style:preserve-3d]">
                  <div className="[transform:translateZ(40px)]">
                    <span className="text-mahiPink text-[10px] font-semibold tracking-widest mb-4 block uppercase">Primary Specialization</span>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-2">Software Engineering</h3>
                    <p className="text-white text-sm">Aptech - ACCP Prime 2.0</p>
                  </div>
                  <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 [transform:translateZ(25px)]">
                    <p className="text-white/85 text-sm max-w-sm leading-relaxed">
                      Advanced Diploma Focusing On Full-stack Logic, Database Management, And Enterprise Software Solutions.
                    </p>
                    <div className="sm:text-right">
                      <span className="block text-[10px] opacity-60">Status</span>
                      <span className="text-sm font-light flex items-center gap-2 sm:justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-mahiPink animate-pulse" /> In Progress
                      </span>
                    </div>
                  </div>
                </div>
                <div className="edu-progress"><span /></div>
              </TiltCard>
            </div>

            <div className="reveal-3d md:col-span-4">
              <TiltCard max={10} glow="rgba(255,255,255,0.18)" className="h-full bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-8 text-white flex flex-col justify-between border border-pink-400/30 shadow-[0_20px_50px_-24px_rgb(var(--p-rgb)/0.35)]">
                <div className="[transform:translateZ(45px)]">
                  <span className="text-white text-[10px] font-semibold tracking-widest mb-6 block opacity-80 uppercase">Top Certifications</span>
                  <div className="space-y-6 pb-6">
                    <div>
                      <h3 className="text-2xl font-semibold">Advanced Python</h3>
                      <p className="text-sm">Bano Qabil (Al-Khidmat)</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">Web Designing</h3>
                      <p className="text-sm">Bano Qabil 2.0</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/20 text-[10px] tracking-widest uppercase flex items-center gap-2 [transform:translateZ(20px)]">
                  <Icon name="check" size={14} /> Verified Credentials
                </div>
              </TiltCard>
            </div>

            <div className="reveal-3d md:col-span-5">
              <TiltCard max={10} className="edu-card h-full p-8 rounded-xl">
                <div className="[transform:translateZ(35px)]">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-mahiPink">Education History</span>
                    <span className="text-[10px] font-semibold uppercase">HSC Board</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Pre-Engineering</h3>
                  <p className="text-white/85 text-sm">Government College Shahrah-e-Liaquat, Karachi</p>
                </div>
              </TiltCard>
            </div>

            <div className="reveal-3d md:col-span-7">
              <TiltCard max={8} className="edu-card h-full p-8 rounded-xl group">
                <div className="flex items-center gap-6 mb-8 [transform:translateZ(40px)]">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 border border-white/20 bg-pink-500/10 text-mahiPink">
                    <Icon name="pen-tool" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Graphic Designing</h3>
                    <p className="text-white/85 text-sm">Global Institute Of Technology</p>
                  </div>
                </div>
                <div className="mt-auto [transform:translateZ(20px)]">
                  <div className="flex justify-between text-sm mb-2 capitalize tracking-tighter">
                    <span>Design & Visual Communication</span>
                    <span className="text-mahiPink">Completed</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-pink-600 to-pink-300" />
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
