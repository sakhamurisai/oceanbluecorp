"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building2, Briefcase, TrendingUp, Users } from "lucide-react";

const stats = [
  { value: 10, suffix: "+", label: "Years of Industry", icon: Building2, color: "from-blue-500 to-cyan-500" },
  { value: 8, suffix: "+", label: "Software & ERP Solutions", icon: Briefcase, color: "from-cyan-500 to-teal-500" },
  { value: 10, suffix: "+", label: "Data Warehousing", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
  { value: 5, suffix: "+", label: "Enterprise Clients", icon: Users, color: "from-violet-500 to-purple-500" },
];

function useCounter(end: number, duration: number = 2000, startCounting: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

function StatCard({ stat, index, isInView }: { stat: typeof stats[0], index: number, isInView: boolean }) {
  const count = useCounter(stat.value, 2000, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1 }}
      className="text-center"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-light text-white mb-1 font-[family-name:var(--font-space-grotesk)]">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-gray-400">{stat.label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-2 block">By the numbers</span>
          <h2 className="text-2xl md:text-3xl font-light text-white font-[family-name:var(--font-space-grotesk)]">
            Track record of <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium">excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
