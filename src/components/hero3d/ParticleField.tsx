import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import * as THREE from 'three';

import styles from './hero3d.module.css';

export type ParticleFieldProps = {
  className?: string;
  /** Number of nodes (lower = lighter). */
  count?: number;
  /** Node colour (hex int, e.g. 0x22b8e6). */
  pointColor?: number;
  /** Link-line colour (hex int). */
  lineColor?: number;
  pointSize?: number;
  pointOpacity?: number;
  lineOpacity?: number;
};

/**
 * Interactive 3D "constellation": a field of nodes with lines between near
 * neighbours, slowly rotating with mouse parallax. Client-only (uses WebGL),
 * disposes everything on unmount, and renders a single static frame when the
 * user prefers reduced motion.
 */
export default function ParticleField({
  className,
  count = 90,
  pointColor = 0x22b8e6,
  lineColor = 0x2f7fc4,
  pointSize = 0.17,
  pointOpacity = 0.9,
  lineOpacity = 0.35,
}: ParticleFieldProps): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // --- Nodes ---
    const range = 18;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range * 0.5;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: pointColor,
      size: pointSize,
      transparent: true,
      opacity: pointOpacity,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);

    // --- Links between near neighbours (computed once) ---
    const linkPos: number[] = [];
    const maxDist = 4.3;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
          linkPos.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          );
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linkPos, 3),
    );
    const linesMat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
    });
    const lines = new THREE.LineSegments(linesGeo, linesMat);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    const render = () => renderer.render(scene, camera);

    // --- Mouse parallax (listen on window so the overlay doesn't block it) ---
    let targetX = 0;
    let targetY = 0;
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      targetX = (e.clientX - r.left) / r.width - 0.5;
      targetY = (e.clientY - r.top) / r.height - 0.5;
    };
    window.addEventListener('pointermove', onMove);

    let raf = 0;
    if (reduceMotion) {
      group.rotation.set(0.1, 0.4, 0);
      render();
    } else {
      const animate = () => {
        group.rotation.y += 0.0016;
        group.rotation.x += 0.0006;
        camera.position.x += (targetX * 3 - camera.position.x) * 0.04;
        camera.position.y += (-targetY * 2 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        render();
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }

    const onResize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [count, pointColor, lineColor, pointSize, pointOpacity, lineOpacity]);

  return <div ref={mountRef} className={clsx(styles.canvas, className)} aria-hidden />;
}
