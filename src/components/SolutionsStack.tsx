"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Cloud,
  Brain,
  Users,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import CardSwap, { Card } from "./CardSwap";

const solutions = [
  {
    title: "Enterprise Transformation",
    description:
      "Modernize legacy systems with SAP, Oracle, and cloud-native platforms built for scalability.",
    icon: Zap,
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Secure, scalable infrastructure across AWS, Azure, and Google Cloud.",
    icon: Cloud,
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    bgGradient: "from-cyan-50 to-blue-50",
  },
  {
    title: "AI & Data Analytics",
    description:
      "Transform data into intelligence using machine learning and AI automation.",
    icon: Brain,
    gradient: "from-violet-500 via-purple-500 to-pink-500",
    bgGradient: "from-violet-50 to-purple-50",
  },
  {
    title: "IT Talent Solutions",
    description:
      "Scale your engineering team instantly with elite pre-vetted specialists.",
    icon: Users,
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
    bgGradient: "from-teal-50 to-cyan-50",
  },
  {
    title: "Managed Services",
    description:
      "24/7 monitoring, maintenance, and performance optimization.",
    icon: Shield,
    gradient: "from-rose-500 via-pink-500 to-orange-500",
    bgGradient: "from-rose-50 to-pink-50",
  },
  {
    title: "Growth Enablement",
    description:
      "Strategic consulting that accelerates digital transformation.",
    icon: TrendingUp,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgGradient: "from-amber-50 to-orange-50",
  },
];

export default function SolutionsStack() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#FAFAF8] via-white to-[#FAFAF8] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[5%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-gradient-to-r from-blue-100/40 via-indigo-100/40 to-purple-100/40 rounded-full blur-[140px] animate-float" />
        <div className="absolute bottom-[-120px] right-[5%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-gradient-to-r from-amber-100/40 via-orange-100/40 to-rose-100/40 rounded-full blur-[140px] animate-float animation-delay-2000" />
      </div>

      <div className="container mx-auto px-5 md:px-8 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur text-blue-600 text-xs md:text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Comprehensive Solutions
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.1] mb-6 font-[family-name:var(--font-space-grotesk)]">
              Beautiful
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-medium">
                technology solutions
              </span>
            </h2>

            <p className="max-w-lg text-gray-500 text-base md:text-lg leading-relaxed mb-10">
              End-to-end digital solutions designed to transform operations
              and accelerate innovation across every touchpoint.
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gray-900 text-white font-medium overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <span className="relative z-10">Discover all services</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />

                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT CARD STACK */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full"
          >

            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-rose-400/20 rounded-full blur-2xl" />

            <div className="h-[220px] md:h-[320px] lg:h-[420px]">

              <CardSwap
                cardDistance={30}
                verticalDistance={40}
                delay={3800}
                pauseOnHover={true}
              >
                {solutions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Card key={item.title}>

                      <div className="relative h-full rounded-2xl overflow-hidden bg-white backdrop-blur transition-all duration-700 group">

                        {/* background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-60`} />

                        <div className="relative h-full flex flex-col p-7 md:p-10">

                          {/* icon */}
                          <div className="relative mb-8">

                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-30`} />

                            <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.gradient} text-white shadow-lg transform group-hover:scale-110 transition-all duration-500`}>
                              <Icon size={28} />
                            </div>

                          </div>

                          <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-3 font-[family-name:var(--font-space-grotesk)]">
                            {item.title}
                          </h3>

                          <p className="text-gray-500 text-sm md:text-base leading-relaxed flex-1">
                            {item.description}
                          </p>

                          <Link
                            href="/services"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            Learn more
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                        </div>

                      </div>

                    </Card>
                  );
                })}
              </CardSwap>

            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,100% { transform: translateY(0px) }
          50% { transform: translateY(-20px) }
        }

        .animate-float{
          animation: float 8s ease-in-out infinite;
        }

        .animation-delay-2000{
          animation-delay:2s;
        }
      `}</style>
    </section>
  );
}