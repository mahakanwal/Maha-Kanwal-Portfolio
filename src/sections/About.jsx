import Galaxy from '../components/reactbits/Galaxy';
import LazyMount from '../components/LazyMount';

// About - restored to the original design, with the React Bits Galaxy background behind it.
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <LazyMount className="absolute inset-0 z-0" rootMargin="100px">
        <Galaxy
          hueShift={330}
          saturation={0.75}
          density={1.1}
          glowIntensity={0.35}
          twinkleIntensity={0.4}
          rotationSpeed={0.04}
          starSpeed={0.4}
          speed={0.8}
          repulsionStrength={1.6}
          mouseRepulsion
          transparent
        />
      </LazyMount>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030303] to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030303] to-transparent z-[1] pointer-events-none" />

      <div className="py-20 px-6 max-w-6xl 2xl:max-w-7xl mx-auto relative z-10">
        <div className="space-y-6 pb-10 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-5xl font-black capitalize text-white">
            The Creative
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #ff3e81' }}>
              {' '}
              Engine
            </span>
          </h2>
          <p className="text-[10px] md:text-xs">Part engineer, part designer. I build systems that perform as good as they look.</p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-[1px] w-12 bg-pink-600/30" />
            <div className="w-2 h-2 rounded-full bg-pink-600 shadow-[0_0_10px_#ff3e81]" />
            <div className="h-[1px] w-12 bg-pink-600/30" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative about-img-reveal flex flex-col items-center">
            <div className="blob-wrapper relative">
              <div className="splatter-blob">
                <img src="/img/maha.webp" alt="Mahi" className="blob-img" />
              </div>
              <div className="absolute top-[300px] glass p-5 rounded-lg max-w-[250px] border-pink-500 shadow-[0_10px_30px_rgba(255,45,117,0.3)] z-20 text-center">
                <p className="text-[12px] italic font-bold leading-tight text-white" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
                  She Codes. She Conquers. She's Conquering - And She Glows.
                </p>
              </div>
            </div>
          </div>
          <div className="about-text-reveal">
            <h3 className="text-mahiPink font-semibold tracking-widest mb-4 text-xs capitalize">// Digital Identity</h3>
            <h2 className="text-5xl font-bold mb-6 leading-tight text-white">
              A Soul Fueled By <br />
              <span className="text-mahiPink">Nature & Logic.</span>
            </h2>
            <p className="text-white text-sm leading-relaxed mb-8">
              I am a <b>Full Stack Developer</b> who bridges the gap between complex engineering and organic design. I build{' '}
              <b>Scalable Digital Ecosystems</b> by merging technical precision with the intuitive balance of nature. Whether
              architecting backends or crafting interfaces, my goal is to deploy clean, intentional logic that evolves as
              seamlessly as the world around us.
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              {['Full Stack Architecture', 'Organic Logic Design', 'Clean Code Deployment', 'Continuous Innovation'].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-mahiPink font-bold">#</span>
                  <span className="capitalize text-white">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
