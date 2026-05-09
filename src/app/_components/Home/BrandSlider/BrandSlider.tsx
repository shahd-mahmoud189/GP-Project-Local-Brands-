"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, UserPlus, ImagePlus, BarChart3, TrendingUp } from "lucide-react";

const steps = [
    {
        step: 1,
        title: "Create Account",
        description: "Start your Brand journey. Set up your brand profile and connect with a community that values craft.",
        icon: <UserPlus className="text-[#864227]" size={28} />,
        visual: (
            <div className="w-full h-full bg-white flex flex-col p-8 items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#FDFBF7] border-2 border-[#864227]/20 flex items-center justify-center mb-6 shadow-sm">
                    <UserPlus size={32} className="text-[#864227]" />
                </div>
                <div className="w-full space-y-3">
                    <div className="h-10 w-full bg-[#FAF8F5] rounded-xl border border-[#F5F1EB]" />
                    <div className="h-10 w-full bg-[#FAF8F5] rounded-xl border border-[#F5F1EB]" />
                    <div className="h-12 w-full bg-[#864227] rounded-xl shadow-md flex items-center justify-center text-white font-bold text-sm">Join Brandy</div>
                </div>
            </div>
        )
    },
    {
        step: 2,
        title: "Upload Photos",
        description: "Add clear, high-quality images of your products to showcase them in the best way and attract more customers.",
        icon: <ImagePlus className="text-[#864227]" size={28} />,
        visual: (
            <div className="w-full h-full bg-white p-8 flex flex-col justify-center">
                <div className="w-full aspect-4/3 rounded-2xl border-2 border-dashed border-[#864227]/20 bg-[#FAF8F5] flex flex-col items-center justify-center gap-3 mb-4">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                        <ImagePlus size={28} className="text-[#864227]" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">Add Product Gallery</span>
                </div>
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-lg bg-[#F5F1EB]" />)}
                </div>
            </div>
        )
    },
    {
        step: 3,
        title: "Manage Sales",
        description: "Watch your brand grow. Track your success with an elegant dashboard designed for makers.",
        icon: <BarChart3 className="text-[#864227]" size={28} />,
      
        visual: (
            <div className="w-full h-full bg-white p-10 flex flex-col justify-between">
                <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Earnings</span>
                    <div className="flex items-baseline gap-2">

                        <span className="text-xs font-bold text-green-600 flex items-center gap-0.5"><TrendingUp size={12} /> +12%</span>
                    </div>
                </div>

                {/* Abstract Growth Chart */}
                <div className="flex items-end gap-3 h-32 w-full">
                    <div className="flex-1 bg-[#F5F1EB] rounded-t-xl" style={{ height: '40%' }} />
                    <div className="flex-1 bg-[#F5F1EB] rounded-t-xl" style={{ height: '60%' }} />
                    <div className="flex-1 bg-[#864227]/20 rounded-t-xl" style={{ height: '50%' }} />
                    <div className="flex-1 bg-[#864227] rounded-t-xl animate-grow shadow-lg" style={{ height: '90%' }} />
                    <div className="flex-1 bg-[#F5F1EB] rounded-t-xl" style={{ height: '70%' }} />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#F5F1EB]">
                    <div className="w-24 h-2 bg-[#F5F1EB] rounded-full" />
                    <div className="w-12 h-6 bg-[#BC5439]/10 rounded-full" />
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
        <section className="py-24 bg-[#ffffff] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Visual Container - Light & Soft */}
                    <div className="relative flex justify-center order-2 lg:order-1">
                        
                        <div className="relative w-full max-w-100 aspect-square bg-[#FAF8F5] rounded-[60px] p-8 shadow-[0_40px_100px_-20px_rgba(188,84,57,0.05)] border border-[#F5F1EB]">
                            <div className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl bg-white border border-[#F5F1EB]">
                                {steps[current].visual}
                            </div>

                        
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-[#F5F1EB] rotate-6">
                                <span className="text-2xl font-sans font-bold text-[#864227]">0{steps[current].step}</span>
                            </div>
                        </div>
                    </div>

                
                    <div className="flex flex-col space-y-10 order-1 lg:order-2">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl  font-bold text-[#2D3A30] leading-none">
                                Your brand, <br />
                                <span className="text-[#864227] italic font-light">simplified.</span>
                            </h2>
                        </div>

                        <div className="space-y-4 min-h-35">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#BC5439]/5 rounded-2xl">
                                    {steps[current].icon}
                                </div>
                                <h3 className="text-3xl font-bold text-[#2D3A30]">
                                    {steps[current].title}
                                </h3>
                            </div>
                            <p className="text-xl text-[#2D3A30]/60 leading-relaxed ">
                                {steps[current].description}
                            </p>
                        </div>

                     
                        <div className="flex items-center gap-8">
                            <div className="flex p-1.5 bg-[#FAF8F5] rounded-full border border-[#F5F1EB] shadow-sm">
                                <button onClick={prev} className="p-4 rounded-full hover:bg-white text-[#2D3A30] transition-all active:scale-95">
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="w-px h-8 bg-[#F5F1EB] self-center mx-1" />
                                <button
                                    onClick={next}
                                    className="px-8 py-4 rounded-full bg-white text-[#864227] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2 group"
                                >
                                    Next Step <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}