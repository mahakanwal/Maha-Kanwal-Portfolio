import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import FloatingGlyphs from './components/FloatingGlyphs';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import NowSection from './sections/NowSection';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import TechMarquee from './sections/TechMarquee';
import Projects from './sections/Projects';
import OffTheClock from './sections/OffTheClock';
import Gallery from './sections/Gallery';
import SkillSphere from './sections/SkillSphere';
import Game from './sections/Game';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  // recalc scroll-trigger positions once images/fonts have loaded
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 1500);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <FloatingGlyphs />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <NowSection />
        <Education />
        <Experience />
        <Skills />
        <TechMarquee />
        <Projects />
        <OffTheClock />
        <Gallery />
        <SkillSphere />
        <Game />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
