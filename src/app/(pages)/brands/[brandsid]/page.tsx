import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";
import Link from "next/link"; 

export default async function BrandsDetails({ params }: { params: { brandsid: string } }) {
    const { brandsid } = await params;
    const brandName = "Terra & Co"; 

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="container mx-auto px-4 py-8"> 
                
           
                <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-gray-400 mb-10">
                    <Link href="/" className="hover:text-[#864227] transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link href="/brands" className="hover:text-[#864227] transition-colors">Brands</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-[#864227] font-bold">{brandName}</span>
                </nav>
                {/* --------------------------- */}

                {/* Brand Header Section */}
                <div className="relative mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[2px] w-12 bg-[#864227]"></span>
                            <span className="text-sm font-bold tracking-[3px] text-[#864227] uppercase">Official Brand</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
                            {brandName}
                        </h1>

                        <p className="mt-6 text-lg text-gray-500 font-light leading-relaxed">
                            Discover the art of minimalist design with {brandName}. Supporting local makers and creators. 
                            Every piece is crafted with passion to bring elegance to your home.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-10 mt-8">
                            <div>
                                <p className="text-2xl font-bold text-slate-800">120+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Products</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">4.9</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Rating</p>
                            </div>
                        </div>
                    </div>

                   
                    <div className="hidden md:block opacity-5 select-none pointer-events-none translate-y-4">
                         <h2 className="text-[140px] font-bold text-[#864227] leading-none">TERRA</h2>
                    </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-medium text-slate-800 underline underline-offset-[12px] decoration-[#864227]/20">
                        Collection
                    </h2>
                    <span className="text-sm text-gray-400 font-light">
                        Showing <span className="text-slate-800 font-medium">24</span> items
                    </span>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <ProductCard saved={false} />
                    <ProductCard saved={true} />
                    <ProductCard saved={false} />
                    <ProductCard saved={false} />
                    <ProductCard saved={false} />
                    <ProductCard saved={false} />
                </div>
            </div>
        </div>
    );
}