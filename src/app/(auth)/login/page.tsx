import LoginForm from "@/app/_components/forms/LoginForm/LoginForm";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Side: Branding */}
          <div className="lg:col-span-3 flex flex-col space-y-10 items-center lg:items-start text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-5xl font-bold text-[#864227] leading-[1.1] tracking-tight">
              Empowering Egyptian <br className="hidden md:block" /> 
              <span className="text-[#BC5439]">brands</span> to reach <br className="hidden md:block" /> every home
            </h2>
            <div className="relative w-full max-w-[400px] md:max-w-[550px] aspect-square">
              <Image
                src="/logo.jpeg"
                alt="logo"
                fill
                priority
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="lg:col-span-2 w-full flex justify-center lg:justify-end">
            <div className="w-full bg-[#FCF9F4] rounded-[2rem] p-8 md:p-12 border border-[#bfbfbf] shadow-xl">
              <div className="mb-8">
                <h4 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome Back
                </h4>         
                <p className="text-xs md:text-sm text-[#BC5439] font-medium opacity-70">
                  Please enter your details to explore our brands.
                </p>
              </div>
              <div className="w-full">
                <LoginForm />
              </div>            
              <p className="mt-10 text-center text-[10px] text-slate-400 uppercase tracking-widest font-light">
                © {new Date().getFullYear()} Brandy. All rights reserved.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}