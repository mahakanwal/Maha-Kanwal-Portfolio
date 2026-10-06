import { useRef } from 'react';

// 3D perspective tilt card with a pink spotlight that follows the pointer.
// Children can use `style={{ transform: 'translateZ(40px)' }}` to pop out in depth.
export default function TiltCard({
  children,
  className = '',
  max = 10,
  scale = 1.02,
  glow = 'rgba(255, 62, 129, 0.22)',
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const frame = useRef(0);

  const onMove = e => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale3d(${scale},${scale},${scale})`;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      el.style.setProperty('--spot', '1');
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.setProperty('--spot', '0');
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card relative ${className}`}
      style={{ '--glow': glow }}
      {...rest}
    >
      <span className="tilt-spot" aria-hidden="true" />
      {children}
    </Tag>
  );
}
