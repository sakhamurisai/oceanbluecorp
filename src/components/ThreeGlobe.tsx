"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobeProps {
  className?: string;
}

export default function ThreeGlobe({ className = "" }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe group
    const globeGroup = new THREE.Group();
    globeRef.current = globeGroup;
    scene.add(globeGroup);

    // Create sphere geometry for the globe
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);

    // Main globe material with gradient
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;

          // Base color gradient
          vec3 baseColor = mix(
            vec3(0.05, 0.1, 0.2),
            vec3(0.1, 0.15, 0.25),
            vPosition.y * 0.5 + 0.5
          );

          gl_FragColor = vec4(baseColor + atmosphere * 0.5, 0.95);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });

    const globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    globeGroup.add(globe);

    // Outer glow
    const glowGeometry = new THREE.SphereGeometry(1.6, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          vec3 glowColor = vec3(0.2, 0.5, 1.0);
          gl_FragColor = vec4(glowColor, intensity * 0.4);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    globeGroup.add(glow);

    // Grid lines (latitude and longitude)
    const createGridLines = () => {
      const gridGroup = new THREE.Group();
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.15,
      });

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const radius = Math.cos(latRad) * 1.502;
        const y = Math.sin(latRad) * 1.502;

        const points: THREE.Vector3[] = [];
        for (let lng = 0; lng <= 360; lng += 5) {
          const lngRad = (lng * Math.PI) / 180;
          points.push(new THREE.Vector3(
            Math.cos(lngRad) * radius,
            y,
            Math.sin(lngRad) * radius
          ));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        gridGroup.add(line);
      }

      // Longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        const lngRad = (lng * Math.PI) / 180;
        const points: THREE.Vector3[] = [];

        for (let lat = -90; lat <= 90; lat += 5) {
          const latRad = (lat * Math.PI) / 180;
          const radius = Math.cos(latRad) * 1.502;
          const y = Math.sin(latRad) * 1.502;
          points.push(new THREE.Vector3(
            Math.cos(lngRad) * radius,
            y,
            Math.sin(lngRad) * radius
          ));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        gridGroup.add(line);
      }

      return gridGroup;
    };

    globeGroup.add(createGridLines());

    // Data points (cities/locations)
    const createDataPoints = () => {
      const pointsGroup = new THREE.Group();

      const locations = [
        { lat: 40.7128, lng: -74.006, name: "New York" },
        { lat: 51.5074, lng: -0.1278, name: "London" },
        { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
        { lat: 22.3193, lng: 114.1694, name: "Hong Kong" },
        { lat: 1.3521, lng: 103.8198, name: "Singapore" },
        { lat: -33.8688, lng: 151.2093, name: "Sydney" },
        { lat: 48.8566, lng: 2.3522, name: "Paris" },
        { lat: 55.7558, lng: 37.6173, name: "Moscow" },
        { lat: 19.4326, lng: -99.1332, name: "Mexico City" },
        { lat: -23.5505, lng: -46.6333, name: "Sao Paulo" },
        { lat: 25.2048, lng: 55.2708, name: "Dubai" },
        { lat: 28.6139, lng: 77.209, name: "Delhi" },
      ];

      const pointGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const pulseGeometry = new THREE.SphereGeometry(0.04, 16, 16);

      locations.forEach((loc, index) => {
        const latRad = (loc.lat * Math.PI) / 180;
        const lngRad = ((loc.lng - 90) * Math.PI) / 180;

        const x = 1.51 * Math.cos(latRad) * Math.cos(lngRad);
        const y = 1.51 * Math.sin(latRad);
        const z = 1.51 * Math.cos(latRad) * Math.sin(lngRad);

        // Point
        const pointMaterial = new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.9,
        });
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        pointsGroup.add(point);

        // Pulse ring
        const pulseMaterial = new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.3,
        });
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.position.set(x, y, z);
        pulse.userData = { baseScale: 1, phase: index * 0.5 };
        pointsGroup.add(pulse);
      });

      return pointsGroup;
    };

    const dataPoints = createDataPoints();
    globeGroup.add(dataPoints);

    // Connection arcs
    const createConnectionArcs = () => {
      const arcsGroup = new THREE.Group();

      const connections = [
        { from: { lat: 40.7128, lng: -74.006 }, to: { lat: 51.5074, lng: -0.1278 } },
        { from: { lat: 35.6762, lng: 139.6503 }, to: { lat: 22.3193, lng: 114.1694 } },
        { from: { lat: 1.3521, lng: 103.8198 }, to: { lat: -33.8688, lng: 151.2093 } },
        { from: { lat: 40.7128, lng: -74.006 }, to: { lat: 19.4326, lng: -99.1332 } },
        { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 25.2048, lng: 55.2708 } },
      ];

      const latLngToVector = (lat: number, lng: number, height: number = 1.51) => {
        const latRad = (lat * Math.PI) / 180;
        const lngRad = ((lng - 90) * Math.PI) / 180;
        return new THREE.Vector3(
          height * Math.cos(latRad) * Math.cos(lngRad),
          height * Math.sin(latRad),
          height * Math.cos(latRad) * Math.sin(lngRad)
        );
      };

      connections.forEach((conn, index) => {
        const start = latLngToVector(conn.from.lat, conn.from.lng);
        const end = latLngToVector(conn.to.lat, conn.to.lng);

        // Create curved arc
        const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);
        midPoint.normalize().multiplyScalar(1.51 + distance * 0.3);

        const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
        const points = curve.getPoints(50);

        const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const arcMaterial = new THREE.LineBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.5,
        });

        const arc = new THREE.Line(arcGeometry, arcMaterial);
        arc.userData = { phase: index * 0.8, curve, points };
        arcsGroup.add(arc);
      });

      return arcsGroup;
    };

    const connectionArcs = createConnectionArcs();
    globeGroup.add(connectionArcs);

    // Traveling points on arcs
    const travelingPoints: THREE.Mesh[] = [];
    connectionArcs.children.forEach((arc) => {
      const travelGeometry = new THREE.SphereGeometry(0.025, 8, 8);
      const travelMaterial = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.9,
      });
      const travelPoint = new THREE.Mesh(travelGeometry, travelMaterial);
      travelPoint.userData = { arc, progress: Math.random() };
      globeGroup.add(travelPoint);
      travelingPoints.push(travelPoint);
    });

    // Particle field
    const createParticleField = () => {
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.8 + Math.random() * 0.8;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.015,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
      });

      return new THREE.Points(geometry, material);
    };

    const particles = createParticleField();
    scene.add(particles);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / width - 0.5) * 0.5;
      mouseRef.current.targetY = ((e.clientY - rect.top) / height - 0.5) * 0.3;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate globe
      if (globeRef.current) {
        globeRef.current.rotation.y = time * 0.15 + mouseRef.current.x * 2;
        globeRef.current.rotation.x = mouseRef.current.y;
      }

      // Rotate particles
      particles.rotation.y = time * 0.02;
      particles.rotation.x = Math.sin(time * 0.1) * 0.1;

      // Update shader uniforms
      (globe.material as THREE.ShaderMaterial).uniforms.time.value = time;
      (glow.material as THREE.ShaderMaterial).uniforms.time.value = time;

      // Animate pulse rings
      dataPoints.children.forEach((child) => {
        if (child.userData && child.userData.phase !== undefined) {
          const scale = 1 + Math.sin(time * 2 + child.userData.phase) * 0.3;
          child.scale.setScalar(scale);
          (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            transparent: true,
            opacity: 0.3 * (1 - Math.abs(Math.sin(time * 2 + child.userData.phase))),
          });
        }
      });

      // Animate traveling points
      travelingPoints.forEach((point) => {
        const arc = point.userData.arc;
        if (arc && arc.userData.curve) {
          point.userData.progress = (point.userData.progress + 0.005) % 1;
          const pos = arc.userData.curve.getPoint(point.userData.progress);
          point.position.copy(pos);
        }
      });

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Start animation
    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);

      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        minHeight: "400px",
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    />
  );
}
