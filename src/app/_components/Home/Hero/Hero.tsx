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
    accent: "#864227",
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
    accent: "#4A7C59",
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
    accent: "#864227",
  },
];

// --- Background Components ---
function Bg1() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="750" fill="#3D1E10" />
      <circle cx="950" cy="100" r="420" fill="#BC5439" opacity="0.18" />
      <circle cx="950" cy="100" r="260" fill="#BC5439" opacity="0.15" />
      <circle cx="800" cy="600" r="180" fill="#BC5439" opacity="0.1" />
      <circle cx="100" cy="680" r="120" fill="#BC5439" opacity="0.08" />
      <rect x="820" y="200" width="160" height="280" rx="80" fill="#BC5439" opacity="0.25" />
      <rect x="1000" y="280" width="120" height="220" rx="60" fill="#BC5439" opacity="0.15" />
      <rect x="680" y="320" width="100" height="180" rx="50" fill="#BC5439" opacity="0.12" />
      {[0, 1, 2, 3, 4].map(row => [0, 1, 2, 3, 4, 5].map(col => (
        <circle key={`${row}-${col}`} cx={60 + col * 40} cy={60 + row * 40} r="2" fill="#BC5439" opacity="0.2" />
      )))}
    </svg>
  );
}

function Bg2() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="750" fill="#1a3325" />
      <ellipse cx="1000" cy="300" rx="380" ry="420" fill="#4A7C59" opacity="0.2" />
      <ellipse cx="900" cy="500" rx="250" ry="200" fill="#4A7C59" opacity="0.12" />
      <rect x="880" y="150" width="140" height="260" rx="70" fill="#4A7C59" opacity="0.3" />
      <rect x="1040" y="220" width="100" height="200" rx="50" fill="#4A7C59" opacity="0.18" />
      <rect x="740" y="280" width="110" height="200" rx="55" fill="#4A7C59" opacity="0.15" />
      <circle cx="150" cy="150" r="80" fill="#4A7C59" opacity="0.1" />
      <circle cx="200" cy="600" r="140" fill="#4A7C59" opacity="0.08" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1={600 + i * 60} y1="0" x2={300 + i * 60} y2="750" stroke="#4A7C59" strokeWidth="1" opacity="0.08" />
      ))}
      {[0, 1, 2, 3].map(row => [0, 1, 2, 3, 4].map(col => (
        <circle key={`${row}-${col}`} cx={80 + col * 45} cy={500 + row * 45} r="2.5" fill="#4A7C59" opacity="0.25" />
      )))}
    </svg>
  );
}

function Bg3() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="750" fill="#3D1E10" />
      <circle cx="900" cy="375" r="500" fill="#BC5439" opacity="0.1" />
      <rect x="700" y="100" width="120" height="220" rx="60" fill="#BC5439" opacity="0.2" />
      <rect x="840" y="180" width="120" height="220" rx="60" fill="#BC5439" opacity="0.15" />
      <rect x="980" y="120" width="120" height="220" rx="60" fill="#BC5439" opacity="0.22" />
      <rect x="760" y="380" width="100" height="180" rx="50" fill="#BC5439" opacity="0.12" />
      <rect x="900" y="420" width="140" height="240" rx="70" fill="#BC5439" opacity="0.18" />
      <rect x="1060" y="360" width="100" height="180" rx="50" fill="#BC5439" opacity="0.1" />
      <circle cx="650" cy="200" r="40" fill="none" stroke="#BC5439" strokeWidth="2" opacity="0.2" />
      <circle cx="1150" cy="600" r="80" fill="none" stroke="#BC5439" strokeWidth="2" opacity="0.15" />
      {[0, 1, 2, 3, 4, 5].map(row => [0, 1, 2, 3].map(col => (
        <circle key={`${row}-${col}`} cx={50 + col * 35} cy={80 + row * 35} r="2" fill="#BC5439" opacity="0.2" />
      )))}
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl">
            <div key={`badge-${currentSlide}`} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-5 animate-fade-in" style={{ backgroundColor: `${slide.accent}cc`, border: `1px solid ${slide.accent}` }}>
              <span className="w-2 h-2 rounded-full animate-pulse bg-white" />
              {slide.badge}
            </div>
            <h1 key={`headline-${currentSlide}`} className="text-5xl md:text-6xl lg:text-5xl font-sans font-bold text-white leading-[1.1] tracking-tight animate-slide-up" style={{ whiteSpace: "pre-line" }}>
              {slide.headline}
            </h1>
            <p key={`sub-${currentSlide}`} className="mt-5 text-md md:text-xl text-white/75 max-w-lg leading-relaxed animate-slide-up-delay">
              {slide.subheading}
            </p>
            <div key={`ctas-${currentSlide}`} className="mt-10 flex flex-wrap gap-4 animate-slide-up-delay2">
        <Link href={slide.primaryCta.href}>
  <button className="px-8 py-4 rounded-full font-bold text-base md:text-lg text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
    style={{ backgroundColor: slide.accent }}>
    {slide.primaryCta.label}
  </button>
</Link>
              <Link href={slide.secondaryCta.href}>
                <button className="px-8 py-4 rounded-full font-bold text-base md:text-lg text-white bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-all duration-200 hover:scale-105 active:scale-95">
                  {slide.secondaryCta.label}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button onClick={prevSlide} className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#2D3A30] transition-all duration-200">
        <ChevronLeft size={22} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#2D3A30] transition-all duration-200">
        <ChevronRight size={22} />
      </button>

      {/* Dots & Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex gap-2.5 items-center">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={`rounded-full transition-all duration-400 ${index === currentSlide ? "w-10 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
        <span className="text-white/50 text-xs font-mono tracking-widest">
          {String(currentSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
        <div key={`progress-${currentSlide}`} className="h-full bg-white/60 animate-progress" style={{ animationDuration: "5.5s" }} />
      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
        .animate-slide-up { animation: slide-up 0.6s ease forwards; }
        .animate-slide-up-delay { animation: slide-up 0.6s 0.1s ease both; }
        .animate-slide-up-delay2 { animation: slide-up 0.6s 0.2s ease both; }
        .animate-progress { animation: progress linear forwards; }
      `}</style>
    </section>
  );
}