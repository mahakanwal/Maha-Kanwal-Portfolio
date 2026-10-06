import CircularGallery from '../components/reactbits/CircularGallery';
import LazyMount from '../components/LazyMount';
import SectionHeading from '../components/SectionHeading';
import { galleryItems } from '../data/portfolio';

// React Bits CircularGallery - drag, swipe or scroll to spin through the moments.
export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 z-10">
      <div className="px-4 sm:px-6">
        <SectionHeading title="Captured" outline="Moments">
          The fun, the proud and the slightly chaotic - a few frames from my life. Drag or swipe to spin the gallery.
        </SectionHeading>
      </div>
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2/3 bg-[radial-gradient(ellipse_at_center,rgba(255,62,129,0.18),transparent_70%)] pointer-events-none" />
        <LazyMount className="relative h-[420px] sm:h-[560px]" rootMargin="0px">
          <CircularGallery
            items={galleryItems}
            bend={2.4}
            textColor="#ffd1e3"
            borderRadius={0.06}
            font='bold 26px "Space Grotesk"'
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </LazyMount>
      </div>
    </section>
  );
}
