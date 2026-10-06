import Threads from '../components/reactbits/Threads';
import LazyMount from '../components/LazyMount';
import SectionHeading from '../components/SectionHeading';
import { experience } from '../data/portfolio';

const Card = ({ item, className = '' }) => (
  <div className={`bg-[#1e1e21] p-4 rounded-xl border-l-[8px] border-[#ff4d6d] z-20 shadow-2xl ${className}`}>
    <span className="card-tag">{item.tag}</span>
    <h3 className="card-title">{item.title}</h3>
    <span className="card-subtitle">{item.sub}</span>
  </div>
);

// Experience - original layout kept exactly on desktop; only a React Bits
// background was added. Small screens get a stacked version of the same cards.
export default function Experience() {
  const [l1, l2, l3, r1, r2, r3] = experience;

  return (
    <section id="exp" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* React Bits: Threads background */}
      <LazyMount className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <Threads color={[1, 0.24, 0.5]} amplitude={1.2} distance={0.2} enableMouseInteraction />
      </LazyMount>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#030303_85%)] pointer-events-none" />

      <SectionHeading title="Architecting the" outline="Legacy" className="relative z-10 !pb-0">
        A documented journey of technical leadership and full-stack execution. From mentoring elite cohorts to deploying
        high-stakes infrastructure - every milestone is a testament to engineered excellence.
      </SectionHeading>

      {/* Desktop - original layout */}
      <div className="hidden lg:flex relative w-[900px] h-[100vh] items-center justify-center z-10">
        <div className="relative">
          <div className="w-72 h-72 rounded-full border-4 border-[#ff4d6d] p-3 glow-ring bg-[#121214]">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
              <img src="/img/maha-edu.webp" alt="Maha Kanwal" className="h-[400px] w-[600px] object-cover" />
            </div>
          </div>
          <div className="dot top-[2%] left-[22%]" />
          <div className="dot top-[2%] right-[18%]" />
          <div className="dot bottom-[-4%] left-[23.5%]" />
          <div className="dot bottom-[-3%] right-[18%]" />
          <div className="dot top-1/2 left-[-15px]" />
          <div className="dot top-1/2 right-[-27px]" />
        </div>

        <Card item={l1} className="absolute top-[12%] left-0 w-64" />
        <div className="dot top-[19%] left-[275px]" />
        <div className="dashed-path border-t-2 border-r-2 rounded-tr-[20px]" style={{ top: '19%', left: 275, width: 95, height: '8%' }} />

        <Card item={l2} className="absolute top-1/2 -translate-y-1/2 left-[-50px] w-64" />
        <div className="dot top-1/2 left-[225px]" />
        <div className="dashed-path border-t-2" style={{ top: '50%', left: 225, width: 70 }} />

        <Card item={l3} className="absolute bottom-[10%] left-0 w-64" />
        <div className="dot bottom-[17.3%] left-[275px]" />
        <div className="dashed-path border-b-2 border-r-2 rounded-br-[20px]" style={{ bottom: '19%', left: 275, width: 100, height: '6%' }} />

        <Card item={r1} className="absolute top-[12%] right-0 w-64" />
        <div className="dot top-[19%] right-[265px]" />
        <div className="dashed-path border-t-2 border-l-2 rounded-tl-[20px]" style={{ top: '19%', right: 275, width: 95, height: '8%' }} />

        <Card item={r2} className="absolute top-1/2 -translate-y-1/2 right-[-50px] w-64" />
        <div className="dot top-1/2 right-[215px]" />
        <div className="dashed-path border-t-2" style={{ top: '50%', right: 225, width: 70 }} />

        <Card item={r3} className="absolute bottom-[10%] right-0 w-64" />
        <div className="dot bottom-[17.2%] right-[265px]" />
        <div className="dashed-path border-b-2 border-l-2 rounded-bl-[20px]" style={{ bottom: '19%', right: 275, width: 95, height: '8%' }} />
      </div>

      {/* Mobile / tablet - same cards, stacked */}
      <div className="lg:hidden relative z-10 w-full max-w-md mx-auto py-14">
        <div className="mx-auto mb-12 w-52 h-52 rounded-full border-4 border-[#ff4d6d] p-2.5 glow-ring bg-[#121214]">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
            <img src="/img/maha-edu.webp" alt="Maha Kanwal" className="w-full h-full object-cover object-top" />
          </div>
        </div>
        <div className="relative pl-8">
          <div className="absolute left-2.5 top-2 bottom-2 border-l-2 border-dashed border-[#ff3e81]/80" />
          {experience.map(item => (
            <div key={item.title + item.sub} className="relative mb-5">
              <div className="dot !left-[-21px] top-1/2" />
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
