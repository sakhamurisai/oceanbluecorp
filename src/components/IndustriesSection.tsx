"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
  { name: "Manufacturing", logo: "/industry-alt.svg", gradient: "from-blue-600 to-indigo-600" },
  { name: "Retail", logo: "/icon-retail-commerce.svg", gradient: "from-cyan-500 to-blue-500" },
  { name: "Government", logo: "/icon-public-sector.svg", gradient: "from-indigo-500 to-purple-500" },
  { name: "Healthcare", logo: "/icon-healthcare.svg", gradient: "from-teal-500 to-cyan-500" },
  { name: "Financial", logo: "/icon-banking.svg", gradient: "from-amber-500 to-orange-500" },
  { name: "Technology", logo: "/chip-brain.svg", gradient: "from-violet-500 to-purple-500" },
];

// Animated 3D Background
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Floating shapes
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      rotation: number;
      rotationSpeed: number;
      type: "circle" | "hex" | "triangle";
      color: string;
    }> = [];

    const colors = [
      "rgba(59, 130, 246, 0.1)",
      "rgba(6, 182, 212, 0.08)",
      "rgba(99, 102, 241, 0.06)",
      "rgba(139, 92, 246, 0.05)",
    ];

    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 30 + Math.random() * 60,
        speed: 0.1 + Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: ["circle", "hex", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "hex" | "triangle",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawTriangle = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Draw shapes
      shapes.forEach((shape) => {
        const x = (shape.x / 100) * width + Math.sin(time * shape.speed) * 20;
        const y = (shape.y / 100) * height + Math.cos(time * shape.speed * 0.7) * 15;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(shape.rotation + time * shape.rotationSpeed);
        ctx.fillStyle = shape.color;

        if (shape.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape.type === "hex") {
          drawHex(0, 0, shape.size);
          ctx.fill();
        } else {
          drawTriangle(0, 0, shape.size);
          ctx.fill();
        }

        ctx.restore();
      });

      // Draw connecting gradient lines
      ctx.strokeStyle = "rgba(99, 102, 241, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length - 1; i += 2) {
        const s1 = shapes[i];
        const s2 = shapes[i + 1];
        const x1 = (s1.x / 100) * width;
        const y1 = (s1.y / 100) * height;
        const x2 = (s2.x / 100) * width;
        const y2 = (s2.y / 100) * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default function IndustriesSection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-cyan-50/30">
      {/* Animated 3D Background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-2 block"
          >
            Industries we serve
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-light text-gray-900 font-[family-name:var(--font-space-grotesk)]"
          >
            Deep expertise across{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-medium">
              key sectors
            </span>
          </motion.h2>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 max-w-5xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 h-full">
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10 blur-sm`} />
                <div className="absolute inset-[1px] bg-white rounded-2xl" />

                {/* Icon container */}
                <div className="relative">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Image
                      src={industry.logo}
                      alt={industry.name}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain brightness-0 invert"
                    />
                  </div>

                  <h3 className="relative font-semibold text-gray-900 text-sm group-hover:text-gray-800 transition-colors">{industry.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
