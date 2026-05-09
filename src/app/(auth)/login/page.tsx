import LoginForm from "@/app/_components/forms/LoginForm/LoginForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] flex items-center justify-center py-6 px-4 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#35BAF6]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[20%] h-[20%] bg-gray-100 rounded-full blur-3xl" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 flex flex-col space-y-4 text-center lg:text-left items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm transition-transform hover:scale-105 cursor-default">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35BAF6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#35BAF6]"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Welcome Back</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1C1E] leading-[1.1] tracking-tight">
              Empowering <br /> 
              <span className="text-[#35BAF6] italic font-light">Egyptian</span> <br /> 
              brands.
            </h2>
            
            <p className="text-gray-400 text-sm md:text-base max-w-sm font-light leading-relaxed">
              The premier destination to discover and support local excellence. 
              Crafted in Egypt, delivered to your home.
            </p>
          </div>

          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-105 group">
              <div className="absolute -inset-1 bg-linear-to-r from-[#35BAF6] to-[#03a9f4] rounded-[2rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
              
              <div className="relative bg-white rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                    Sign In
                  </h4>
                  <p className="text-gray-400 text-[13px]">
                    Enter your details to access your account.
                  </p>
                </div>

                <div className="w-full">
                  <LoginForm />
                </div>

                <p className="mt-6 text-center text-[9px] text-gray-300 uppercase tracking-[0.2em] font-medium border-t border-gray-50 pt-4">
                  © {new Date().getFullYear()} Brandy. All rights reserved.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}