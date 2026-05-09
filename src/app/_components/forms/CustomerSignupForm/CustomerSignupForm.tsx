"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupForm, signupSchema } from "@/app/schema/signup.schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signup } from "@/app/api/auth.api";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function CustomerSignupForm() {
  const router = useRouter();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { email: "", fullName: "", password: "" },
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });

  async function handleSignup(values: signupForm) {
    try {
      const data = await signup(values);
      toast.success(data.isSuccess && "Success!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error");
    }
  }

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(handleSignup)}>
      <div className="space-y-3">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="fullName">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#03a9f4]">
              <User size={16} />
            </div>
            <input
              id="fullName"
              type="text"
              placeholder="Ahmed Ali"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs focus:bg-white focus:border-[#03a9f4] outline-none transition-all"
              {...register("fullName")}
            />
          </div>
          {formState.errors.fullName && <p className="text-red-500 text-[10px] mt-0.5 ml-1">{formState.errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="email">
            Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#03a9f4]">
              <Mail size={16} />
            </div>
            <input
              id="email"
              type="email"
              placeholder="ahmed@example.com"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs focus:bg-white focus:border-[#03a9f4] outline-none transition-all"
              {...register("email")}
            />
          </div>
          {formState.errors.email && <p className="text-red-500 text-[10px] mt-0.5 ml-1">{formState.errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="password">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#03a9f4]">
              <Lock size={16} />
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs focus:bg-white focus:border-[#03a9f4] outline-none transition-all"
              {...register("password")}
            />
          </div>
          {formState.errors.password && <p className="text-red-500 text-[10px] mt-0.5 ml-1">{formState.errors.password.message}</p>}
        </div>
      </div>

      <button
        disabled={formState.isSubmitting}
        className="w-full bg-[#03a9f4] hover:bg-[#0288d1] text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md shadow-[#03a9f4]/10 active:scale-[0.98] disabled:opacity-70 group"
      >
        {formState.isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (
          <>
            <span>Create Account</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="pt-2 flex items-center justify-center gap-1.5 text-xs">
        <span className="text-gray-400">Member?</span>
        <Link href="/login" className="text-[#03a9f4] font-bold hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}