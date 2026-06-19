"use client";
import { signin } from "@/app/api/auth.api";
import { loginForm, loginSchema } from "@/app/schema/login.schema";
import { setTokens, setUserInfo } from "@/app/server/auth.actions";
import { setAuthInfo } from "@/app/store/slices/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function handleSignin(values: loginForm) {
    try {
      const data = await signin(values);
      setTokens(data.token, data.refreshToken);
      setUserInfo(data.email, data.userType);
      dispatch(
        setAuthInfo({
          isAuthinticated: true,
          userInfo: { email: data.email, userType: data.userType },
        })
      );
      
      toast.success("Welcome back!");
      
      setTimeout(() => {
        if (data.userType === "BrandOwner") {
          router.push("/ownerAccount");
        }
        else if (data.userType === "Admin") {
          router.push("/adminAccount");
        }
         else {
          router.push("/");
        }
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(handleSignin)}>
      <div className="space-y-3">
        
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#03a9f4] transition-colors">
              <Mail size={16} />
            </div>
            <input
              id="form-email"
              type="email"
              placeholder="john@example.com"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs focus:bg-white focus:border-[#03a9f4] outline-none transition-all placeholder:text-gray-400"
              {...register("email")}
            />
          </div>
          {formState.errors.email && (
            <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">
              {formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            {/* <Link href="#" className="text-[10px] text-[#03a9f4] hover:underline">
              Forgot?
            </Link> */}
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#03a9f4] transition-colors">
              <Lock size={16} />
            </div>
            <input
              id="form-password"
              type="password"
              placeholder="********"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs focus:bg-white focus:border-[#03a9f4] outline-none transition-all placeholder:text-gray-400"
              {...register("password")}
            />
          </div>
          {formState.errors.password && (
            <p className="text-red-500 text-[10px] mt-1 ml-1 font-medium">
              {formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        disabled={formState.isSubmitting}
        className="w-full bg-[#03a9f4] hover:bg-[#0288d1] text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md shadow-[#03a9f4]/10 active:scale-[0.98] disabled:opacity-70 group mt-2"
      >
        {formState.isSubmitting ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="pt-2 flex items-center justify-center gap-1.5 text-xs">
        <span className="text-gray-400">New Here?</span>
        <Link 
          href="/register" 
          className="text-[#03a9f4] font-bold hover:underline underline-offset-2 transition-all"
        >
          Join Brandy
        </Link>
      </div>
    </form>
  );
}