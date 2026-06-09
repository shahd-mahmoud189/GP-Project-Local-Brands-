import Link from 'next/link';

export default function NotFound(){
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center p-12 rounded-[40px] bg-[#fff]/80 backdrop-blur-md border border-[#fbd5d5] shadow-sm">
        
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <h1 className="text-[140px] font-light text-[#f3a0a0] leading-none select-none tracking-tighter">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xs font-bold text-[#9b1c1c] tracking-[0.3em] uppercase mt-6 bg-[#fff5f5] px-2">
                 Page Not Found
               </span>
            </div>
          </div>
        </div>

        <p className="text-[#a05e5e] mb-12 leading-relaxed font-light">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back to our curated stories.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center px-10 py-4 bg-[#c81e1e] text-[#fff5f5] rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#9b1c1c] hover:shadow-xl active:scale-95 group"
        >
          <svg 
            className="w-4 h-4 mr-3 transition-transform duration-300 group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Homepage
        </Link>

      </div>
    </div>
  );
};