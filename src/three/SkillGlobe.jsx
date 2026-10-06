import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Interactive three.js "sphere of skills" - glowing point globe, wire shell,
// orbit rings and satellites. Follows the pointer and keeps spinning.
export default function SkillGlobe({ color = '#ff3e81', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const group = new THREE.Group();
    scene.add(group);
    const base = new THREE.Color(color);

    // soft round sprite for points
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext('2d');
    const grd = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.35, 'rgba(255,255,255,0.65)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    sctx.fillStyle = grd;
    sctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    // fibonacci sphere points
    const N = 1600;
    const R = 1.9;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const white = new THREE.Color('#ffd6e6');
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      pos[i * 3] = Math.cos(th) * r * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(th) * r * R;
      const c = base.clone().lerp(white, Math.random() * 0.55);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.075,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // wire shell
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R * 1.02, 2)),
      new THREE.LineBasicMaterial({ color: base, transparent: true, opacity: 0.12 })
    );
    group.add(wire);

    // inner glow core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.55, 32, 32),
      new THREE.MeshBasicMaterial({ color: base, transparent: true, opacity: 0.08 })
    );
    group.add(core);

    // orbit rings with satellites
    const rings = [];
    const ringDefs = [
      { r: 2.55, tilt: [1.2, 0.2, 0], speed: 0.6 },
      { r: 2.9, tilt: [-0.9, 0.5, 0.3], speed: -0.4 },
      { r: 2.3, tilt: [0.3, -1.1, 0.5], speed: 0.8 }
    ];
    ringDefs.forEach(def => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.set(...def.tilt);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(def.r, 0.006, 8, 160),
        new THREE.MeshBasicMaterial({ color: base, transparent: true, opacity: 0.45 })
      );
      ringGroup.add(ring);
      const sat = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: sprite, color: base, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
      );
      halo.scale.setScalar(0.6);
      sat.add(halo);
      ringGroup.add(sat);
      group.add(ringGroup);
      rings.push({ sat, def, angle: Math.random() * Math.PI * 2 });
    });

    // background dust
    const dustN = 300;
    const dPos = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 14;
      dPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    const dust = new THREE.Points(
      dGeo,
      new THREE.PointsMaterial({ size: 0.04, map: sprite, color: base, transparent: true, opacity: 0.6, depthWrite: false })
    );
    scene.add(dust);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const target = { x: 0, y: 0 };
    const onMove = e => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      points.rotation.y += dt * 0.18;
      wire.rotation.y -= dt * 0.06;
      group.rotation.x += (target.y * 0.35 - group.rotation.x) * 0.04;
      group.rotation.y += (target.x * 0.5 - group.rotation.y) * 0.04;
      core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.05);
      rings.forEach(o => {
        o.angle += dt * o.def.speed;
        o.sat.position.set(Math.cos(o.angle) * o.def.r, Math.sin(o.angle) * o.def.r, 0);
      });
      dust.rotation.y = t * 0.02;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      scene.traverse(obj => {
        obj.geometry?.dispose?.();
        if (obj.material) [].concat(obj.material).forEach(m => m.dispose());
      });
      sprite.dispose();
      renderer.dispose();
      renderer.forceContextLoss?.();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [color]);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}
