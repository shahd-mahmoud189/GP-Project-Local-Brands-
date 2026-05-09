"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    badge: "Local Brands",
    headline: "Discover Egyptian\nLocal Brands",
    subheading: "Shop unique, authentic products made by talented Egyptian artisans — delivered straight to your door.",
    primaryCta: {
      label: "Shop Now",
      href: "/products",
    },
    secondaryCta: {
      label: "Start Your Brand",
      href: "/request-brand",
    },
    accent: "#03a9f4",
  },
  {
    badge: "For Sellers",
    headline: "Start Your Own\nBrand in Minutes",
    subheading: "Join hundreds of Egyptian makers already selling on Brandy. Set up your storefront today — no experience needed.",
    primaryCta: {
      label: "start selling",
      href: "/request-brand",
    },
    secondaryCta: {
      label: "Learn More",
      href: "/learn-more",
    },
    accent: "#0ea5e9",
  },
  {
    badge: "Explore",
    headline: "Handcrafted, Beauty,\nHome & More",
    subheading: "Explore thousands of unique products across every category — from fashion and skincare to home decor and accessories.",
    primaryCta: {
      label: "Browse Products",
      href: "/products",
    },
    secondaryCta: {
      label: "View Categories",
      href: "/categories",
    },
    accent: "#35BAF6",
  },
];

// --- Background Components ---
function Bg1() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="750" fill="#075985" />
      <circle cx="950" cy="100" r="420" fill="#35BAF6" opacity="0.18" />
      <circle cx="800" cy="600" r="180" fill="#35BAF6" opacity="0.1" />
      <rect x="820" y="200" width="160" height="280" rx="80" fill="#35BAF6" opacity="0.25" />
      {[0, 1, 2, 3, 4].map(row => [0, 1, 2, 3, 4, 5].map(col => (
        <circle key={`${row}-${col}`} cx={60 + col * 40} cy={60 + row * 40} r="2" fill="#35BAF6" opacity="0.2" />
      )))}
    </svg>
  );
}

function Bg2() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="750" fill="#0c4a6e" />
      <ellipse cx="1000" cy="300" rx="380" ry="420" fill="#03a9f4" opacity="0.2" />
      <rect x="880" y="150" width="140" height="260" rx="70" fill="#03a9f4" opacity="0.3" />
      {[0, 1, 2, 3].map(row => [0, 1, 2, 3, 4].map(col => (
        <circle key={`${row}-${col}`} cx={80 + col * 45} cy={500 + row * 45} r="2.5" fill="#03a9f4" opacity="0.25" />
      )))}
    </svg>
  );
}

function Bg3() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="750" fill="#0e7490" />
      <circle cx="900" cy="375" r="500" fill="#22d3ee" opacity="0.1" />
      <rect x="700" y="100" width="120" height="220" rx="60" fill="#22d3ee" opacity="0.2" />
      <rect x="900" y="420" width="140" height="240" rx="70" fill="#22d3ee" opacity="0.18" />
    </svg>
  );
}

const bgs = [<Bg1 key="bg1" />, <Bg2 key="bg2" />, <Bg3 key="bg3" />];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, currentSlide]);

  const nextSlide = useCallback(() => goToSlide((currentSlide + 1) % heroSlides.length), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length), [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(520px, 80vh, 750px)" }}>
      {heroSlides.map((_, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {bgs[index]}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl">
            <div key={`badge-${currentSlide}`} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-5 animate-fade-in" style={{ backgroundColor: `${slide.accent}33`, border: `1px solid ${slide.accent}66` }}>
              <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
              {slide.badge}
            </div>
            <h1 key={`headline-${currentSlide}`} className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-[1.1] tracking-tight animate-slide-up" style={{ whiteSpace: "pre-line" }}>
              {slide.headline}
            </h1>
            <p key={`sub-${currentSlide}`} className="mt-5 text-md md:text-xl text-white/80 max-w-lg leading-relaxed animate-slide-up-delay">
              {slide.subheading}
            </p>
            <div key={`ctas-${currentSlide}`} className="mt-10 flex flex-wrap gap-4 animate-slide-up-delay2">
              <Link href={slide.primaryCta.href}>
                <button className="px-8 py-4 rounded-full font-bold text-base md:text-lg text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95" style={{ backgroundColor: slide.accent }}>
                  {slide.primaryCta.label}
                </button>
              </Link>
              <Link href={slide.secondaryCta.href}>
                <button className="px-8 py-4 rounded-full font-bold text-base md:text-lg text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95">
                  {slide.secondaryCta.label}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button onClick={prevSlide} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 text-white hover:bg-white hover:text-sky-900 transition-all duration-200">
        <ChevronLeft size={22} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 text-white hover:bg-white hover:text-sky-900 transition-all duration-200">
        <ChevronRight size={22} />
      </button>

      {/* Dots & Progress الحاوية السفلية */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex gap-2.5 items-center">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`rounded-full transition-all duration-400 ${index === currentSlide ? "w-10 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-30">
        <div key={`progress-${currentSlide}`} className="h-full bg-sky-400 animate-progress origin-left" style={{ animationDuration: "5.5s" }} />
      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease forwards; }
        .animate-slide-up-delay { animation: slide-up 0.6s 0.1s ease both; }
        .animate-slide-up-delay2 { animation: slide-up 0.6s 0.2s ease both; }
        .animate-progress { animation: progress linear forwards; }
      `}</style>
    </section>
  );
}