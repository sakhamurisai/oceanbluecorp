"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Enterprise tech",
    highlight: "without the headache",
    description:
      "ERP, cloud, and AI that actually makes sense. We make complex technology feel simple.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80",
    cta: "Start a conversation",
    ctaLink: "/contact",
  },
  {
    id: 2,
    title: "Salesforce",
    highlight: "your team will love",
    description:
      "CRM that doesn't feel like CRM. Simple, intuitive, and actually useful from day one.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
    cta: "Explore Salesforce",
    ctaLink: "/services#salesforce",
  },
  {
    id: 3,
    title: "AI & analytics",
    highlight: "that make sense",
    description:
      "From complex data to clear decisions. No black boxes, just practical insights you can use.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    cta: "See how it works",
    ctaLink: "/services#ai",
  },
  {
    id: 4,
    title: "Tech talent",
    highlight: "that speaks human",
    description:
      "We find people who are great at code AND conversation. Staffing that actually fits your team.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
    cta: "Find talent",
    ctaLink: "/services#staffing",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 200, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6, ease: "easeOut" as const },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 200, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] min-h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ filter: "saturate(0.85)" }}
            />
            {/* 90% White gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.92] via-white/[0.85] to-white/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/30" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-cyan-50/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
                {/* Title with Space Grotesk */}
                <motion.h1
                  custom={0.1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="heading-hero text-gray-900 mb-4 sm:mb-5 md:mb-6"
                >
                  {slides[currentSlide].title}
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 bg-clip-text text-transparent font-medium">
                    {slides[currentSlide].highlight}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  custom={0.25}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-lg font-normal"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  custom={0.4}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={slides[currentSlide].ctaLink}
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm sm:text-base rounded-full hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl group"
                  >
                    <span className="font-medium tracking-wide">{slides[currentSlide].cta}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Bottom with proper mobile spacing */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-0 right-0 z-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Progress dots - Thin lines */}
            <div className="flex items-center gap-2 sm:gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group py-3 px-1"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="relative h-0.5 sm:h-[3px] w-8 sm:w-10 md:w-12 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: index === currentSlide ? 1 : 0,
                        opacity: index === currentSlide ? 1 : 0
                      }}
                      transition={{
                        duration: index === currentSlide ? 6 : 0.3,
                        ease: "linear"
                      }}
                      style={{ transformOrigin: "left" }}
                    />
                    <div
                      className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                        index < currentSlide ? "bg-gray-400" : ""
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white hover:border-gray-300 hover:text-gray-900 transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
                disabled={isAnimating}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white hover:border-gray-300 hover:text-gray-900 transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
                disabled={isAnimating}
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-20 hidden lg:flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900 font-[family-name:var(--font-space-grotesk)]">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="text-sm text-gray-400">/</span>
        <span className="text-sm text-gray-400">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
