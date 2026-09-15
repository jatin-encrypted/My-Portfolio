"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;
    let destroyed = false;

    // Dynamically load three to keep bundle clean
    import("three").then((THREE) => {
      if (destroyed || !container) return;

      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 5.5;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Core Geometric System: Nested Icosahedron Lattice (Web3 / Security / Systems)
      const group = new THREE.Group();
      scene.add(group);

      // Outer Wireframe Lattice
      const outerGeo = new THREE.IcosahedronGeometry(1.9, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      // Inner Core Polyhedron
      const innerGeo = new THREE.IcosahedronGeometry(1.1, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      // Point Nodes on Vertices (AI Constellation)
      const pointsGeo = new THREE.IcosahedronGeometry(1.9, 1);
      const pointsMat = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.05,
        transparent: true,
        opacity: 0.9,
      });
      const points = new THREE.Points(pointsGeo, pointsMat);
      group.add(points);

      // Subtle Ambient Background Particles
      const particleCount = 45;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 6;
        posArray[i + 1] = (Math.random() - 0.5) * 6;
        posArray[i + 2] = (Math.random() - 0.5) * 4;
      }
      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      const particleMat = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.035,
        transparent: true,
        opacity: 0.4,
      });
      const ambientParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(ambientParticles);

      // Pointer tracking with smooth damping
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 0.8;
        targetY = y * 0.8;
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      // Resize Handler
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      // Render loop
      let lastTime = 0;
      const animate = (time: number) => {
        if (destroyed) return;

        // Cap at 60fps
        const delta = time - lastTime;
        if (delta > 15) {
          lastTime = time;

          if (!prefersReducedMotion) {
            // Smooth mouse follow
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;

            group.rotation.x += 0.003 + currentY * 0.02;
            group.rotation.y += 0.004 + currentX * 0.02;

            ambientParticles.rotation.y -= 0.001;
          }

          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        }

        if (!prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      // Initial render
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        if (outerGeo) outerGeo.dispose();
        if (innerGeo) innerGeo.dispose();
        if (pointsGeo) pointsGeo.dispose();
        if (particleGeo) particleGeo.dispose();
        if (outerMat) outerMat.dispose();
        if (innerMat) innerMat.dispose();
        if (pointsMat) pointsMat.dispose();
        if (particleMat) particleMat.dispose();
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
      };
    });

    return () => {
      destroyed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
}
