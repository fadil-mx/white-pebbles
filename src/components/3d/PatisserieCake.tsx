"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Patisserie Cake 3D Scene
 *
 * A 3-tier white celebration cake on a gold stand — the universal
 * visual language of premium patisserie. Surrounded by an orbiting
 * halo of sugar pearls and a slow drift of gold-leaf flakes.
 *
 * Composition:
 * - Two-tone gold stand: flared base + neck + plate, with edge piping
 * - Three fluted (vertically-channeled) frosted tiers
 * - Beaded gold rings (rows of tiny spheres) at every tier joint
 * - Sugar-rose garlands on every tier's top edge, alternating cream/blush
 * - Pearl-cluster topper (one center pearl + 3 satellites) on a gold base
 * - Halo of 14 sugar pearls orbiting at the base, opposite to the cake
 * - 18 gold-leaf flakes drifting around the cake (toned down so the cake reads first)
 * - 700 gold-dust particles in the room atmosphere
 *
 * Lighting: cinematic top spotlight + warm gold key + caramel fill
 * + cream rim + pulsing rose-dawn accent. Espresso fog so the scene
 * recedes into darkness like a pastry-shop display window.
 */
export default function PatisserieCake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ===== SCENE / CAMERA / RENDERER =====
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d0805, 7, 22);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.6, 6.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0805, 1);

    // ===== MATERIALS =====
    const frostingMat = new THREE.MeshPhongMaterial({
      color: 0xfaf6ef,
      specular: 0xd4a256,
      shininess: 35,
      emissive: 0xc8893d,
      emissiveIntensity: 0.04,
    });

    const goldMat = new THREE.MeshPhongMaterial({
      color: 0xd4a256,
      specular: 0xfffbe6,
      shininess: 140,
      emissive: 0xc8893d,
      emissiveIntensity: 0.32,
    });

    const goldDeepMat = new THREE.MeshPhongMaterial({
      color: 0xc8893d,
      specular: 0xfaf6ef,
      shininess: 120,
      emissive: 0x6b4423,
      emissiveIntensity: 0.22,
    });

    const goldLeafMat = new THREE.MeshPhongMaterial({
      color: 0xd4a256,
      specular: 0xfaf6ef,
      shininess: 130,
      emissive: 0xc8893d,
      emissiveIntensity: 0.45,
      side: THREE.DoubleSide,
    });

    const pearlMat = new THREE.MeshPhongMaterial({
      color: 0xfaf6ef,
      specular: 0xffffff,
      shininess: 130,
      emissive: 0xc8893d,
      emissiveIntensity: 0.07,
    });

    // Sugar-rose materials (cream + blush) — kept satin-soft (low shininess)
    // so they read as fondant petals, not glass beads
    const creamRoseMat = new THREE.MeshPhongMaterial({
      color: 0xfaf6ef,
      specular: 0xd4a256,
      shininess: 45,
      emissive: 0xc8893d,
      emissiveIntensity: 0.06,
    });
    const blushRoseMat = new THREE.MeshPhongMaterial({
      color: 0xebcfc0,
      specular: 0xd4a256,
      shininess: 45,
      emissive: 0xa86a26,
      emissiveIntensity: 0.05,
    });

    // ===== CAKE ASSEMBLY (cake + halo positioned together) =====
    const cakeAssembly = new THREE.Group();
    cakeAssembly.position.set(2.0, 0.7, 0);
    cakeAssembly.scale.setScalar(0.82);
    scene.add(cakeAssembly);

    // ===== CAKE GROUP (rotates as one — turntable) =====
    const cakeGroup = new THREE.Group();
    cakeAssembly.add(cakeGroup);

    // ----- Cake stand: flared base + neck + plate, with a deeper gold for depth -----
    const standBaseGeo = new THREE.CylinderGeometry(1.5, 1.62, 0.08, 80);
    const standBase = new THREE.Mesh(standBaseGeo, goldDeepMat);
    standBase.position.y = -1.28;
    cakeGroup.add(standBase);

    // Decorative ring around the stand base (gold piping)
    const standRingGeo = new THREE.TorusGeometry(1.55, 0.025, 14, 80);
    const standRing = new THREE.Mesh(standRingGeo, goldMat);
    standRing.rotation.x = Math.PI / 2;
    standRing.position.y = -1.24;
    cakeGroup.add(standRing);

    // Stand neck (column)
    const neckGeo = new THREE.CylinderGeometry(0.09, 0.13, 0.2, 32);
    const neck = new THREE.Mesh(neckGeo, goldDeepMat);
    neck.position.y = -1.13;
    cakeGroup.add(neck);

    // Stand plate (where cake sits) + edge piping
    const plateGeo = new THREE.CylinderGeometry(1.34, 1.34, 0.04, 80);
    const plate = new THREE.Mesh(plateGeo, goldMat);
    plate.position.y = -1.0;
    cakeGroup.add(plate);

    const plateEdgeGeo = new THREE.TorusGeometry(1.34, 0.018, 12, 80);
    const plateEdge = new THREE.Mesh(plateEdgeGeo, goldDeepMat);
    plateEdge.rotation.x = Math.PI / 2;
    plateEdge.position.y = -0.98;
    cakeGroup.add(plateEdge);

    // ----- Fluted-cylinder helper (cake tier with vertical channels) -----
    const buildFlutedTierGeo = (
      r: number,
      h: number,
      flutes: number,
      depth: number
    ) => {
      // Heavy radial segments so the flute curve reads smoothly
      const geo = new THREE.CylinderGeometry(r, r, h, flutes * 6, 1, false);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y = pos.getY(i);
        if (Math.abs(y) >= h / 2 - 0.0001) continue; // leave caps untouched
        const dist = Math.sqrt(x * x + z * z);
        if (dist < 0.001) continue;
        const angle = Math.atan2(z, x);
        // (cos+1)/2 ranges 0..1, so flutes carve INWARD (channel feel)
        const inset = ((Math.cos(angle * flutes) + 1) / 2) * depth;
        const newDist = dist - inset;
        pos.setX(i, Math.cos(angle) * newDist);
        pos.setZ(i, Math.sin(angle) * newDist);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      return geo;
    };

    // ----- Sugar-rose helper (clustered spheres, fondant petal feel) -----
    const buildRose = (size: number, mat: THREE.Material) => {
      const rose = new THREE.Group();
      // Center bud — slightly squashed
      const center = new THREE.Mesh(
        new THREE.SphereGeometry(size, 14, 14),
        mat
      );
      center.scale.set(1, 0.7, 1);
      rose.add(center);
      // 6 outer petals, ringed
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const petal = new THREE.Mesh(
          new THREE.SphereGeometry(size * 0.7, 10, 10),
          mat
        );
        petal.position.set(
          Math.cos(a) * size * 0.85,
          size * 0.05,
          Math.sin(a) * size * 0.85
        );
        petal.scale.set(1, 0.5, 1.2);
        petal.rotation.y = a;
        rose.add(petal);
      }
      // 3 inner top petals — give it a "bloom" silhouette from above
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + 0.4;
        const petal = new THREE.Mesh(
          new THREE.SphereGeometry(size * 0.5, 10, 10),
          mat
        );
        petal.position.set(
          Math.cos(a) * size * 0.35,
          size * 0.4,
          Math.sin(a) * size * 0.35
        );
        petal.scale.set(1, 0.7, 1);
        rose.add(petal);
      }
      return rose;
    };

    // ----- Beaded ring helper (replaces plain torus piping) -----
    const buildBeadedRing = (radius: number, beadSize: number, count: number) => {
      const ring = new THREE.Group();
      const beadGeo = new THREE.SphereGeometry(beadSize, 14, 14);
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const bead = new THREE.Mesh(beadGeo, goldMat);
        bead.position.x = Math.cos(a) * radius;
        bead.position.z = Math.sin(a) * radius;
        ring.add(bead);
      }
      return ring;
    };

    // ----- Tier helper -----
    type TierMeshes = { tier: THREE.Mesh; topRing: THREE.Group; botRing: THREE.Group };
    const buildTier = (
      r: number,
      h: number,
      flutes: number,
      flutDepth: number,
      beadSize: number,
      beadCount: number,
      yCenter: number
    ): { group: THREE.Group; meshes: TierMeshes } => {
      const group = new THREE.Group();
      group.position.y = yCenter;

      // Fluted body
      const tierGeo = buildFlutedTierGeo(r, h, flutes, flutDepth);
      const tier = new THREE.Mesh(tierGeo, frostingMat);
      group.add(tier);

      // Beaded rings around top and bottom edges
      const topRing = buildBeadedRing(r + 0.012, beadSize, beadCount);
      topRing.position.y = h / 2;
      group.add(topRing);

      const botRing = buildBeadedRing(r + 0.012, beadSize, beadCount);
      botRing.position.y = -h / 2;
      group.add(botRing);

      cakeGroup.add(group);
      return { group, meshes: { tier, topRing, botRing } };
    };

    // Three tiers — fluted, beaded, decreasing radius and height
    const tier1 = buildTier(1.2, 0.72, 24, 0.025, 0.032, 36, -0.62);
    const tier2 = buildTier(0.9, 0.56, 20, 0.022, 0.028, 30, 0.0);
    const tier3 = buildTier(0.6, 0.44, 16, 0.018, 0.024, 22, 0.48);

    // ----- Sugar roses on tier top edges -----
    // Roses live INSIDE each tier's group so they orbit with the tier rotation
    const addRosesToTier = (
      tier: { group: THREE.Group },
      tierR: number,
      tierH: number,
      count: number,
      roseSize: number,
      alternateBlush: boolean
    ) => {
      const yTop = tierH / 2 + roseSize * 0.55;
      const radius = tierR + roseSize * 0.25;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const mat =
          alternateBlush && i % 2 === 0 ? blushRoseMat : creamRoseMat;
        const rose = buildRose(roseSize, mat);
        rose.position.set(
          Math.cos(angle) * radius,
          yTop,
          Math.sin(angle) * radius
        );
        // Tilt outward + small random tilt for organic feel
        rose.rotation.y = -angle + Math.PI / 2;
        rose.rotation.x = (Math.random() - 0.5) * 0.25;
        rose.rotation.z = (Math.random() - 0.5) * 0.25;
        tier.group.add(rose);
      }
    };

    // Bottom: lush garland of 9 roses, alternating cream/blush
    addRosesToTier(tier1, 1.2, 0.72, 9, 0.085, true);
    // Middle: 7 cream roses (uniform — keeps the focal asymmetry on bottom)
    addRosesToTier(tier2, 0.9, 0.56, 7, 0.07, false);
    // Top: 5 small alternating roses crowning the tier just below the topper
    addRosesToTier(tier3, 0.6, 0.44, 5, 0.055, true);

    // ----- Brand band: a gold fondant ribbon wrapping the bottom tier -----
    // Rendered as a 4096×256 canvas with the brand repeated 4 times around the
    // circumference (every 90°), separated by decorative bullseye ornaments.
    // Applied to a full-circle cylinder strip so it reads as an integrated
    // cake decoration — and the brand is always visible from any rotation angle.
    const bandCanvas = document.createElement("canvas");
    bandCanvas.width = 4096;
    bandCanvas.height = 256;
    const bctx = bandCanvas.getContext("2d");
    if (bctx) {
      // Continuous gold gradient (top → middle → bottom)
      const grad = bctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, "#f5d990");
      grad.addColorStop(0.5, "#d4a256");
      grad.addColorStop(1, "#9a5e1f");
      bctx.fillStyle = grad;
      bctx.fillRect(0, 0, 4096, 256);

      // Top + bottom cocoa border lines (continuous around the band)
      bctx.strokeStyle = "#3d2817";
      bctx.lineWidth = 5;
      bctx.beginPath();
      bctx.moveTo(0, 6);
      bctx.lineTo(4096, 6);
      bctx.stroke();
      bctx.beginPath();
      bctx.moveTo(0, 250);
      bctx.lineTo(4096, 250);
      bctx.stroke();

      // Subtle cream highlight lines just inside the cocoa borders
      bctx.strokeStyle = "#fff5d6";
      bctx.lineWidth = 1.5;
      bctx.beginPath();
      bctx.moveTo(0, 16);
      bctx.lineTo(4096, 16);
      bctx.stroke();
      bctx.beginPath();
      bctx.moveTo(0, 240);
      bctx.lineTo(4096, 240);
      bctx.stroke();

      // 4 brand instances every 90° → centered at u = 0.125, 0.375, 0.625, 0.875
      const brandCenters = [512, 1536, 2560, 3584];
      brandCenters.forEach((cx) => {
        bctx.fillStyle = "#1f1408";
        bctx.textAlign = "center";
        bctx.textBaseline = "middle";
        bctx.font =
          'bold 80px Inter, system-ui, -apple-system, "Helvetica Neue", sans-serif';
        bctx.fillText("white pebbles", cx, 108);

        // Divider line
        bctx.strokeStyle = "#3d2817";
        bctx.lineWidth = 2;
        bctx.beginPath();
        bctx.moveTo(cx - 110, 152);
        bctx.lineTo(cx + 110, 152);
        bctx.stroke();

        // UAE subtitle
        bctx.fillStyle = "#3d2817";
        bctx.font =
          '600 32px Inter, system-ui, -apple-system, "Helvetica Neue", sans-serif';
        bctx.fillText("·  U  A  E  ·", cx, 188);
      });

      // Bullseye ornaments BETWEEN brand instances → at u = 0, 0.25, 0.5, 0.75
      // u=0 is the seam, so we draw it at both x=0 and x=4096 to wrap cleanly
      const ornament = (cx: number) => {
        bctx.fillStyle = "#3d2817";
        bctx.beginPath();
        bctx.arc(cx, 128, 14, 0, Math.PI * 2);
        bctx.fill();
        bctx.fillStyle = "#fff5d6";
        bctx.beginPath();
        bctx.arc(cx, 128, 7, 0, Math.PI * 2);
        bctx.fill();
        bctx.fillStyle = "#3d2817";
        bctx.beginPath();
        bctx.arc(cx, 128, 3, 0, Math.PI * 2);
        bctx.fill();
      };
      ornament(0);
      ornament(1024);
      ornament(2048);
      ornament(3072);
      ornament(4096); // seam wrap-around copy

      // Small flanking dots beside each ornament
      const flankingDots = [0, 1024, 2048, 3072, 4096];
      flankingDots.forEach((cx) => {
        bctx.fillStyle = "#3d2817";
        [-50, 50].forEach((dx) => {
          bctx.beginPath();
          bctx.arc(cx + dx, 128, 4, 0, Math.PI * 2);
          bctx.fill();
        });
      });
    }

    const bandTexture = new THREE.CanvasTexture(bandCanvas);
    bandTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    bandTexture.colorSpace = THREE.SRGBColorSpace;

    const bandMat = new THREE.MeshPhongMaterial({
      map: bandTexture,
      shininess: 80,
      emissive: 0xc8893d,
      emissiveIntensity: 0.22,
      side: THREE.DoubleSide,
    });

    // Full 360° cylindrical strip wrapping bottom tier (just outside its surface)
    const bandGeo = new THREE.CylinderGeometry(
      1.218, // tier1 radius is 1.2; sit slightly proud so we never z-fight the flutes
      1.218,
      0.5,
      96, // smooth circumference
      1,
      true // open-ended (only the curved strip)
    );
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = 0; // vertical center of tier1
    tier1.group.add(band);

    // ----- Topper: pearl cluster on a small gold base -----
    const topperBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.14, 0.05, 24),
      goldMat
    );
    topperBase.position.y = 0.715;
    cakeGroup.add(topperBase);

    const topperRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.012, 10, 40),
      goldDeepMat
    );
    topperRing.rotation.x = Math.PI / 2;
    topperRing.position.y = 0.74;
    cakeGroup.add(topperRing);

    // Cluster: one center pearl + 3 satellite pearls
    const topperCluster = new THREE.Group();
    topperCluster.position.y = 0.84;
    cakeGroup.add(topperCluster);

    const topperPearl = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 32, 32),
      pearlMat
    );
    topperCluster.add(topperPearl);

    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 24, 24),
        pearlMat
      );
      sat.position.set(Math.cos(a) * 0.13, -0.04, Math.sin(a) * 0.13);
      topperCluster.add(sat);
      satellites.push(sat);
    }

    // ===== HALO: sugar pearls orbiting at the base (own rotation) =====
    const haloGroup = new THREE.Group();
    haloGroup.position.y = -0.95;
    cakeAssembly.add(haloGroup);

    type HaloPearl = THREE.Mesh & {
      userData: { angle: number; radius: number; ySpeed: number };
    };
    const haloPearls: HaloPearl[] = [];
    const haloCount = 14;
    for (let i = 0; i < haloCount; i++) {
      const size = 0.05 + Math.random() * 0.04;
      const geo = new THREE.SphereGeometry(size, 18, 18);
      const mesh = new THREE.Mesh(geo, pearlMat) as unknown as HaloPearl;
      const angle = (i / haloCount) * Math.PI * 2;
      const radius = 1.65 + Math.random() * 0.35;
      mesh.userData = {
        angle,
        radius,
        ySpeed: 0.4 + Math.random() * 0.5,
      };
      mesh.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      haloGroup.add(mesh);
      haloPearls.push(mesh);
    }

    // ===== GOLD-LEAF FLAKES (in scene root, drift around cake) =====
    type Leaf = THREE.Mesh & {
      userData: {
        rx: number;
        ry: number;
        rz: number;
        bx: number;
        by: number;
        bz: number;
        bobAmp: number;
        bobPhase: number;
      };
    };
    const leaves: Leaf[] = [];
    const leafCount = 10;
    for (let i = 0; i < leafCount; i++) {
      const w = 0.06 + Math.random() * 0.09;
      const h = 0.04 + Math.random() * 0.07;
      const geo = new THREE.PlaneGeometry(w, h);
      const mesh = new THREE.Mesh(geo, goldLeafMat) as unknown as Leaf;
      const px = 2.0 + (Math.random() - 0.5) * 4.5;
      const py = (Math.random() - 0.5) * 4 + 0.2;
      const pz = (Math.random() - 0.5) * 4 - 0.5;
      mesh.position.set(px, py, pz);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.6,
        ry: (Math.random() - 0.5) * 0.6,
        rz: (Math.random() - 0.5) * 0.6,
        bx: px,
        by: py,
        bz: pz,
        bobAmp: 0.12 + Math.random() * 0.18,
        bobPhase: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      leaves.push(mesh);
    }

    // ===== GOLD-DUST PARTICLES =====
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0xd4a256),
      new THREE.Color(0xc8893d),
      new THREE.Color(0xf4ead5),
      new THREE.Color(0xfaf6ef),
    ];
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 12 - 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ===== LIGHTS =====
    scene.add(new THREE.AmbientLight(0xffe4b5, 0.45));

    // Cinematic top spotlight aimed at the cake
    const topSpot = new THREE.SpotLight(
      0xfaf6ef,
      2.0,
      14,
      Math.PI / 5,
      0.35,
      1.2
    );
    topSpot.position.set(2.0, 6, 3);
    topSpot.target.position.set(2.0, 0.5, 0);
    scene.add(topSpot);
    scene.add(topSpot.target);

    // Warm gold key
    const keyLight = new THREE.DirectionalLight(0xd4a256, 1.3);
    keyLight.position.set(4, 4, 5);
    scene.add(keyLight);

    // Caramel fill from below
    const fillLight = new THREE.DirectionalLight(0xc8893d, 0.45);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    // Cream rim light from behind for edge definition
    const rimLight = new THREE.PointLight(0xfaf6ef, 1.1, 14);
    rimLight.position.set(-2, 3, -3);
    scene.add(rimLight);

    // Pulsing rose-dawn accent
    const accentLight = new THREE.PointLight(0xd97757, 0.85, 9);
    accentLight.position.set(4.5, 0, 2);
    scene.add(accentLight);

    // ===== MOUSE PARALLAX =====
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.3;
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
      const t = clock.getElapsedTime();

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Whole assembly: gentle parallax
      cakeAssembly.rotation.y = currentX * 0.5;
      cakeAssembly.rotation.x = currentY * 0.2;
      cakeAssembly.position.y = 0.7 + Math.sin(t * 0.5) * 0.08;

      // Cake itself: slow turntable spin
      cakeGroup.rotation.y = t * 0.12;

      // Tiers counter-rotate at slightly different rates for visual depth
      tier1.group.rotation.y = -t * 0.04;
      tier2.group.rotation.y = t * 0.06;
      tier3.group.rotation.y = -t * 0.08;

      // Topper cluster: bob + slow spin; satellites bob individually
      topperCluster.position.y = 0.84 + Math.sin(t * 1.2) * 0.025;
      topperCluster.rotation.y = t * 0.5;
      satellites.forEach((s, i) => {
        s.position.y = -0.04 + Math.sin(t * 1.5 + i * 2) * 0.015;
      });
      topperRing.rotation.z = t * 0.3;

      // Halo: pearls orbit (opposite to cake spin) + gentle vertical drift
      haloPearls.forEach((p) => {
        const d = p.userData;
        const ang = d.angle - t * 0.18;
        p.position.x = Math.cos(ang) * d.radius;
        p.position.z = Math.sin(ang) * d.radius;
        p.position.y = Math.sin(t * d.ySpeed + d.angle) * 0.06;
      });

      // Gold leaves: slow tumble + bob in place
      leaves.forEach((leaf) => {
        const d = leaf.userData;
        leaf.rotation.x += d.rx * 0.004;
        leaf.rotation.y += d.ry * 0.004;
        leaf.rotation.z += d.rz * 0.004;
        leaf.position.y = d.by + Math.sin(t * 0.4 + d.bobPhase) * d.bobAmp;
        leaf.position.x = d.bx + Math.sin(t * 0.25 + d.bobPhase) * 0.08;
      });

      // Particles: slow orbital drift
      particles.rotation.y = t * 0.015;
      particles.rotation.x = currentY * 0.06;

      // Pulse accent light
      accentLight.intensity = 0.65 + Math.sin(t * 1.4) * 0.3;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // ===== CLEANUP =====
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      // Dispose geometries via traversal
      const disposeMesh = (obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).isMesh) {
          (obj as THREE.Mesh).geometry.dispose();
        }
      };
      cakeAssembly.traverse(disposeMesh);
      leaves.forEach((l) => l.geometry.dispose());

      frostingMat.dispose();
      goldMat.dispose();
      goldLeafMat.dispose();
      pearlMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

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
