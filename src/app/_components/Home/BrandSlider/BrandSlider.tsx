"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, UserPlus, ImagePlus, BarChart3, TrendingUp } from "lucide-react";

const steps = [
    {
        step: 1,
        title: "Create Account",
        description: "Start your Brand journey. Set up your brand profile and connect with a community that values craft.",
        icon: <UserPlus className="text-[#03a9f4]" size={28} />,
        visual: (
            <div className="w-full h-full bg-white flex flex-col p-8 items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#f0f9ff] border-2 border-[#03a9f4]/20 flex items-center justify-center mb-6 shadow-sm">
                    <UserPlus size={32} className="text-[#03a9f4]" />
                </div>
                <div className="w-full space-y-3">
                    <div className="h-10 w-full bg-[#f8fafc] rounded-xl border border-gray-100" />
                    <div className="h-10 w-full bg-[#f8fafc] rounded-xl border border-gray-100" />
                    <div className="h-12 w-full bg-[#03a9f4] rounded-xl shadow-lg shadow-[#03a9f4]/20 flex items-center justify-center text-white font-bold text-sm">Join Brandy</div>
                </div>
            </div>
        )
    },
    {
        step: 2,
        title: "Upload Photos",
        description: "Add clear, high-quality images of your products to showcase them in the best way and attract more customers.",
        icon: <ImagePlus className="text-[#03a9f4]" size={28} />,
        visual: (
            <div className="w-full h-full bg-white p-8 flex flex-col justify-center">
                <div className="w-full aspect-4/3 rounded-2xl border-2 border-dashed border-[#03a9f4]/20 bg-[#f0f9ff]/50 flex flex-col items-center justify-center gap-3 mb-4">
                    <div className="p-4 bg-white rounded-full shadow-sm border border-gray-50">
                        <ImagePlus size={28} className="text-[#03a9f4]" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">Add Product Gallery</span>
                </div>
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100" />)}
                </div>
            </div>
        )
    },
    {
        step: 3,
        title: "Manage Sales",
        description: "Watch your brand grow. Track your success with an elegant dashboard designed for makers.",
        icon: <BarChart3 className="text-[#03a9f4]" size={28} />,
      
        visual: (
            <div className="w-full h-full bg-white p-10 flex flex-col justify-between">
                <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Earnings</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12} /> +12%</span>
                    </div>
                </div>

                {/* Abstract Growth Chart */}
                <div className="flex items-end gap-3 h-32 w-full">
                    <div className="flex-1 bg-gray-50 rounded-t-xl" style={{ height: '40%' }} />
                    <div className="flex-1 bg-gray-50 rounded-t-xl" style={{ height: '60%' }} />
                    <div className="flex-1 bg-[#03a9f4]/10 rounded-t-xl" style={{ height: '50%' }} />
                    <div className="flex-1 bg-[#03a9f4] rounded-t-xl animate-pulse shadow-lg shadow-[#03a9f4]/20" style={{ height: '90%' }} />
                    <div className="flex-1 bg-gray-50 rounded-t-xl" style={{ height: '70%' }} />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <div className="w-24 h-2 bg-gray-100 rounded-full" />
                    <div className="w-12 h-6 bg-[#03a9f4]/10 rounded-full" />
                </div>
            </div>
        )
    },
];

export default function BrandSlider() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % steps.length);
    const prev = () => setCurrent((prev) => (prev - 1 + steps.length) % steps.length);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Container */}
                    <div className="relative flex justify-center order-2 lg:order-1">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-[#03a9f4]/5 blur-[100px] rounded-full transform -translate-y-10" />
                        
                        <div className="relative w-full max-w-[420px] aspect-square bg-[#f8fafc] rounded-[48px] p-6 shadow-2xl shadow-blue-500/5 border border-gray-100">
                            <div className="w-full h-full rounded-[32px] overflow-hidden shadow-sm bg-white border border-gray-100">
                                {steps[current].visual}
                            </div>

                            {/* Step Indicator Badge */}
                            <div className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50 rotate-6 transform transition-transform group-hover:rotate-0">
                                <span className="text-xl font-bold text-[#03a9f4]">0{steps[current].step}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col space-y-8 order-1 lg:order-2">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-serif text-[#1A1C1E] leading-tight">
                                Your brand, <br />
                                <span className="text-[#03a9f4] italic font-light">simplified.</span>
                            </h2>
                        </div>

                        <div className="space-y-4 min-h-[160px] transition-all duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#03a9f4]/10 rounded-2xl">
                                    {steps[current].icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {steps[current].title}
                                </h3>
                            </div>
                            <p className="text-lg text-gray-500 leading-relaxed max-w-md font-light">
                                {steps[current].description}
                            </p>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex p-1.5 bg-gray-50 rounded-full border border-gray-100 shadow-inner">
                                <button 
                                    onClick={prev} 
                                    className="p-3.5 rounded-full hover:bg-white text-gray-400 hover:text-[#03a9f4] transition-all active:scale-90 shadow-none hover:shadow-sm"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <div className="w-px h-6 bg-gray-200 self-center mx-1" />
                                <button
                                    onClick={next}
                                    className="pl-6 pr-5 py-3.5 rounded-full bg-white text-[#03a9f4] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 group border border-gray-50"
                                >
                                    <span className="text-sm">Next Step</span> 
                                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                            
                            {/* Dots Indicator */}
                            <div className="flex gap-2">
                                {steps.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#03a9f4]' : 'w-1.5 bg-gray-200'}`} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}