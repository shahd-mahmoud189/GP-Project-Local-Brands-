"use client";

import React from 'react';
import { Award, Heart, Truck } from 'lucide-react';

const values = [
  {
    title: "Handpicked Quality",
    description: "Every piece is selected for its unique soul and craftsmanship.",
    icon: <Award size={28} strokeWidth={1.2} />,
    position: "md:mt-20" 
  },
  {
    title: "Support Local",
    description: "Empowering Egyptian hands to reach your home.",
    icon: <Heart size={28} strokeWidth={1.2} />,
    position: "md:-mt-10" 
  },
  {
    title: "Fast Delivery",
    description: "Swift, safe, and handled with love from our store to you.",
    icon: <Truck size={28} strokeWidth={1.2} />,
    position: "md:mt-10"
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-[#fff]">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: The "Vibe" Header */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-6xl md:text-7xl  text-[#2D3A30] leading-none">
              The <br />
              <span className="italic text-[#864227] ml-8">Brandy</span> <br />
              Standard.
            </h2>
            <p className="text-[#2D3A30]/60 text-lg font-light max-w-sm">
              We don't just sell products; we curate stories told through Egyptian craftsmanship.
            </p>
          </div>

          {/* Right Side: Floating Values */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {values.map((v, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-[3rem] bg-[#FAF8F5] border border-[#F5F1EB] transition-all duration-500 hover:shadow-xl hover:shadow-[#864227]/5 ${v.position}`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#864227] mb-6 shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2D3A30] mb-3 leading-tight">{v.title}</h3>
                <p className="text-sm text-[#2D3A30]/50 leading-relaxed font-light">{v.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}