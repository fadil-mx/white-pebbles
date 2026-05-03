"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Chocolate Orb 3D Scene
 *
 * Direct port of the original HTML hero — built with vanilla Three.js
 * (no @react-three/fiber so it works reliably with Next.js 15 + React 18).
 *
 * Features:
 * - Cocoa-colored Icosahedron core with gold specular highlights
 * - Two wireframe shells rotating at different speeds
 * - 800 floating particles in cream/caramel/gold tones
 * - 5 small spheres orbiting like sugar pearls
 * - Mouse parallax — scene tilts toward cursor
 * - Pulsing accent light (rose/sunset color)
 */
export default function ChocolateOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ===== SCENE SETUP =====
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0805, 1);

    // ===== MAIN CHOCOLATE ORB =====
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Inner core sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.6, 4);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x3d2817,
      specular: 0xd4a256,
      shininess: 80,
      flatShading: false,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    orbGroup.add(sphere);

    // Wireframe shell (caramel)
    const wireGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc8893d,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    orbGroup.add(wireMesh);

    // Outer wireframe shell (gold)
    const wire2Geo = new THREE.IcosahedronGeometry(2.5, 1);
    const wire2Mat = new THREE.MeshBasicMaterial({
      color: 0xd4a256,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wire2Mesh = new THREE.Mesh(wire2Geo, wire2Mat);
    orbGroup.add(wire2Mesh);

    // Position orb to right side
    orbGroup.position.x = 2.5;
    orbGroup.position.y = -0.3;

    // ===== FLOATING PARTICLES =====
    const particlesCount = 800;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorPalette = [
      new THREE.Color(0xd4a256),
      new THREE.Color(0xc8893d),
      new THREE.Color(0xf4ead5),
      new THREE.Color(0x8b5a2b),
    ];

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // ===== ORBITING SMALL SPHERES (sugar pearls) =====
    type OrbitData = {
      angle: number;
      radius: number;
      speed: number;
      yOffset: number;
      ySpeed: number;
    };
    const orbitingSpheres: Array<THREE.Mesh & { userData: OrbitData }> = [];
    for (let i = 0; i < 5; i++) {
      const size = 0.08 + Math.random() * 0.12;
      const geo = new THREE.SphereGeometry(size, 16, 16);
      const mat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xd4a256 : 0xf4ead5,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(geo, mat) as THREE.Mesh & { userData: OrbitData };
      const angle = (i / 5) * Math.PI * 2;
      const radius = 3 + Math.random() * 1.5;
      mesh.userData = {
        angle,
        radius,
        speed: 0.2 + Math.random() * 0.3,
        yOffset: (Math.random() - 0.5) * 2,
        ySpeed: 0.5 + Math.random() * 0.5,
      };
      orbGroup.add(mesh);
      orbitingSpheres.push(mesh);
    }

    // ===== LIGHTS =====
    const ambient = new THREE.AmbientLight(0x3d2817, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xd4a256, 1.5);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc8893d, 0.6);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf4ead5, 1.2, 10);
    rimLight.position.set(-2, 2, -3);
    scene.add(rimLight);

    // Pulsing accent light
    const accentLight = new THREE.PointLight(0xd97757, 1.0, 8);
    accentLight.position.set(4, 0, 2);
    scene.add(accentLight);

    // ===== MOUSE INTERACTION =====
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    document.addEventListener("mousemove", onMouseMove);

    // ===== RESIZE =====
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ===== ANIMATION LOOP =====
    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotate the orb
      orbGroup.rotation.y = elapsed * 0.15 + currentX * 0.5;
      orbGroup.rotation.x = currentY * 0.3 + Math.sin(elapsed * 0.3) * 0.05;

      // Counter-rotate inner sphere
      sphere.rotation.y = -elapsed * 0.1;

      // Wireframes rotate independently
      wireMesh.rotation.y = elapsed * 0.05;
      wireMesh.rotation.x = elapsed * 0.03;
      wire2Mesh.rotation.y = -elapsed * 0.04;
      wire2Mesh.rotation.z = elapsed * 0.02;

      // Float orb up and down
      orbGroup.position.y = -0.3 + Math.sin(elapsed * 0.6) * 0.15;

      // Animate orbiting spheres
      orbitingSpheres.forEach((s, i) => {
        const data = s.userData;
        s.position.x = Math.cos(data.angle + elapsed * data.speed) * data.radius;
        s.position.z = Math.sin(data.angle + elapsed * data.speed) * data.radius;
        s.position.y = data.yOffset + Math.sin(elapsed * data.ySpeed + i) * 0.3;
      });

      // Particles slow drift
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = currentY * 0.1;

      // Pulse accent light
      accentLight.intensity = 0.8 + Math.sin(elapsed * 1.5) * 0.4;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // ===== CLEANUP =====
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      // Dispose geometries and materials to avoid memory leaks
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      wire2Geo.dispose();
      wire2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      orbitingSpheres.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}
