import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only mount when visible in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isVisible) return;

    // Detect low-power device
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);
    const COUNT = isMobile ? 6000 : 12000;

    // SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Major perf gain
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    // POST PROCESSING — reduced resolution
    const renderTarget = new THREE.WebGLRenderTarget(
      Math.floor(window.innerWidth * dpr * 0.75),
      Math.floor(window.innerHeight * dpr * 0.75)
    );
    const composer = new EffectComposer(renderer, renderTarget);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(renderTarget.width, renderTarget.height),
      1.4, 0.5, 0.85
    );
    bloomPass.strength = 1.4;
    bloomPass.radius = 0.4;
    bloomPass.threshold = 0.1; // Raise threshold slightly
    composer.addPass(bloomPass);

    // OBJECTS — reuse allocations
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const target = new THREE.Vector3();
    const pColor = new THREE.Color();

    const geometry = new THREE.TetrahedronGeometry(0.25);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const mesh = new THREE.InstancedMesh(geometry, material, COUNT);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ));
      mesh.setColorAt(i, color.setHex(0x00ff88));
    }

    const clock = new THREE.Clock();
    let animId = 0;
    let frameCount = 0;

    const PARAMS = { breath: 1, spread: 60, duality: 12 };
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));

    // Pre-compute partition sizes
    const nHalo = Math.floor(COUNT * 0.30);
    const nCurves = Math.floor(COUNT * 0.30);
    const nRings = Math.floor(COUNT * 0.20);
    const nCore = Math.floor(COUNT * 0.10);

    function animate() {
      animId = requestAnimationFrame(animate);
      frameCount++;

      // Throttle to ~30fps: skip every other frame
      if (frameCount % 2 !== 0) return;

      const time = clock.getElapsedTime();
      const breath = PARAMS.breath;
      const spread = PARAMS.spread;
      const duality = PARAMS.duality;

      const breathFactor = 1 + 0.08 * Math.sin(time * breath * 0.7);
      const corePulse = 1 + 0.35 * Math.sin(time * breath * 1.6);

      for (let i = 0; i < COUNT; i++) {
        let px = 0, py = 0, pz = 0;

        if (i < nHalo) {
          const k = i;
          const f = (k + 0.5) / nHalo;
          let yy = 1 - 2 * f;
          const sgn = yy >= 0 ? 1 : -1;
          yy = sgn * Math.pow(Math.abs(yy), 0.65);
          const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
          const ang = k * GOLDEN + time * 0.04;
          const r = spread * breathFactor;
          px = Math.cos(ang) * rr * r;
          py = yy * r;
          pz = Math.sin(ang) * rr * r;
        } else if (i < nHalo + nCurves) {
          const j = i - nHalo;
          const sideSign = (j & 1) === 0 ? -1 : 1;
          const localIdx = j >> 1;
          const halfCurve = nCurves >> 1;
          const ribbonCount = 5;
          const ribbon = localIdx % ribbonCount;
          const along = Math.floor(localIdx / ribbonCount);
          const alongTotal = Math.max(1, Math.floor(halfCurve / ribbonCount));
          const t = along / alongTotal;
          const yt = (t * 2 - 1) * spread * 0.95;
          const amp = Math.sin(t * Math.PI);
          const curveAmp = spread * 0.5 * breathFactor;
          const ribbonOff = (ribbon - (ribbonCount - 1) * 0.5) * 1.2;
          px = sideSign * (duality * 0.5 + amp * curveAmp + ribbonOff);
          py = yt + Math.sin(t * Math.PI * 2 + time * 0.6) * 0.8;
          pz = Math.cos(t * Math.PI * 3 + time * 0.4) * 2.5;
        } else if (i < nHalo + nCurves + nRings) {
          const j = i - nHalo - nCurves;
          const ringPart = Math.floor(nRings * 0.7);
          if (j < ringPart) {
            const numRings = 6;
            const perRing = Math.max(1, Math.floor(ringPart / numRings));
            const ringIdx = Math.floor(j / perRing) % numRings;
            const onRing = j % perRing;
            const ringR = (ringIdx + 1) / numRings * spread * 0.85;
            const angR = (onRing / perRing) * Math.PI * 2 + time * 0.02;
            px = Math.cos(angR) * ringR;
            py = Math.sin(angR) * ringR;
            pz = 0;
          } else {
            const k = j - ringPart;
            const spokeTotal = nRings - ringPart;
            const numSpokes = 4;
            const perSpoke = Math.max(1, Math.floor(spokeTotal / numSpokes));
            const spokeIdx = Math.floor(k / perSpoke) % numSpokes;
            const onSpoke = k % perSpoke;
            const spokeAng = spokeIdx * Math.PI / 4;
            const ts = (onSpoke / perSpoke) * 2 - 1;
            const dist = ts * spread * 0.9;
            px = Math.cos(spokeAng) * dist;
            py = Math.sin(spokeAng) * dist;
            pz = 0;
          }
        } else if (i < nHalo + nCurves + nRings + nCore) {
          const j = i - nHalo - nCurves - nRings;
          const f2 = (j + 0.5) / nCore;
          const yy2 = 1 - 2 * f2;
          const rr2 = Math.sqrt(Math.max(0, 1 - yy2 * yy2));
          const ang2 = j * GOLDEN + time * 0.25;
          const coreR = spread * 0.06 * corePulse;
          px = Math.cos(ang2) * rr2 * coreR;
          py = yy2 * coreR;
          pz = Math.sin(ang2) * rr2 * coreR;
        } else {
          const j = i - nHalo - nCurves - nRings - nCore;
          const jetCount = COUNT - nHalo - nCurves - nRings - nCore;
          const sideSign = (j & 1) === 0 ? -1 : 1;
          const lidx = j >> 1;
          const jetMax = Math.max(1, jetCount >> 1);
          const baseT = lidx / jetMax;
          const jetExtent = spread * 2.0;
          const speed = 0.35;
          const progress = ((baseT + time * speed) % 1 + 1) % 1;
          px = sideSign * progress * jetExtent;
          py = Math.sin(lidx * 0.37) * 0.7;
          pz = Math.cos(lidx * 0.73 + time * 0.5) * 0.5;
        }

        target.set(px, py, pz);

        const colorScale = spread * 0.6 + 0.0001;
        const xNorm = Math.max(-1, Math.min(1, px / colorScale));
        const t01 = (xNorm + 1) * 0.5;
        const hue = 0.52 + 0.20 * t01;
        const absX = Math.min(1, Math.abs(xNorm));
        const proximity = 1 - absX;
        const prox2 = proximity * proximity;
        const lightness = 0.5 + 0.45 * prox2;
        const saturation = 1 - 0.85 * prox2;
        pColor.setHSL(hue, saturation, lightness);

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, pColor);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      composer.render();
    }

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      scene.remove(mesh);
      renderer.dispose();
      renderTarget.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}
