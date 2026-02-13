"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "We empower",
    highlight: "Businesses",
    subtitle: "with Streamlined Tech Solutions",
    description:
      "Transform your enterprise with our comprehensive technology solutions designed for modern business success.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80",
    cta: "Explore Solutions",
    ctaLink: "/services",
  },
  {
    id: 2,
    title: "Boost customer connections with",
    highlight: "Salesforce Solutions",
    subtitle: "— smart, simple, effective",
    description:
      "We transform customer engagement through intelligent Salesforce solutions that drive growth and loyalty.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
    cta: "Learn More",
    ctaLink: "/services#salesforce",
  },
  {
    id: 3,
    title: "We deliver",
    highlight: "Technology & Intellect",
    subtitle: "to help your business thrive",
    description:
      "Specializing in ERP, staffing, and enterprise solutions for Manufacturing, Retail, and Government sectors.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
    cta: "Get Started",
    ctaLink: "/contact",
  },
  {
    id: 4,
    title: "Accelerate with",
    highlight: "Cloud & AI",
    subtitle: "powered innovation",
    description:
      "Harness the power of cloud computing and artificial intelligence to transform your data into actionable insights.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    cta: "Discover AI Solutions",
    ctaLink: "/services#ai",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[400px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#1e3a8a]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-[#1e3a8a]/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center pt-[72px] lg:pt-[80px]">
            <div className="container-custom">
              <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <div
                  className={`space-y-4 sm:space-y-5 lg:space-y-6 transition-all duration-700 delay-100 ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.15]">
                    {slide.title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                      {slide.highlight}
                    </span>
                    <br />
                    <span className="text-white/90">{slide.subtitle}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-md lg:max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={slide.ctaLink}
                      className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-white/30 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-10 sm:w-12 bg-gradient-to-r from-cyan-400 to-blue-400"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-10 w-40 md:w-56 lg:w-72 h-40 md:h-56 lg:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none" />
    </section>
  );
}
