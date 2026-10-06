import { useEffect, useRef, useState } from 'react';

// Mounts heavy WebGL / canvas children only while they are near the viewport,
// so only one or two GPU scenes are alive at a time (smooth on laptops & phones).
export default function LazyMount({ children, className = '', rootMargin = '300px', style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? children : null}
    </div>
  );
}
