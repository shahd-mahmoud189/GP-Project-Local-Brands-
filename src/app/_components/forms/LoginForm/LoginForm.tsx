"use client";
import { signin } from "@/app/api/auth.api";
import { AuthContext } from "@/app/context/AuthContext";
import { loginForm, loginSchema } from "@/app/schema/login.schema";
import { setRefreshTokenInCookies, setTokenInCookies } from "@/app/server/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginForm() {
  const {setToken, setRefreshToken} = useContext(AuthContext)
  const router = useRouter();

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
      setToken(data.token);
      setRefreshToken(data.refreshToken)
      setTokenInCookies(data.token)
      setRefreshTokenInCookies(data.refreshToken)
      toast.success(data.isSuccess && "Logged in successfully");
      setTimeout(() => {
        router.push("/");
      }, 2000);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <form className="w-full" onSubmit={handleSubmit(handleSignin)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input
            id="form-email"
            type="email"
            placeholder="john@example.com"
            className="py-5 rounded-2xl bg-white"
            {...register('email')}
          />
          {formState.errors.email && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.email.message}
              </p>
            </>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="form-password">Password</FieldLabel>
          <Input
            id="form-password"
            type="password"
            placeholder="********"
            className="bg-white py-5 rounded-2xl"
            {...register('password')}
          />
          {formState.errors.password && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.password.message}
              </p>
            </>
          )}
        </Field>
        <Field orientation="horizontal">
          <Button className="w-full bg-[#864227] hover:bg-[#9F5538] font-bold text-white py-5 rounded-3xl transition-all duration-200 flex items-center justify-center gap-2">
            {formState.isSubmitting ? (
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
            ) : (
              "Sign In"
            )}{" "}
          </Button>{" "}
        </Field>
      </FieldGroup>
      <div className="w-full h-[1] bg-[#9F5538] relative my-10">
        <span className="absolute top-0 left-1/2 -translate-1/2 p-3 bg-[#FCF9F4] text-sm">
          OR
        </span>
      </div>
      <Button className="w-full mb-8 bg-[#FCF9F4] p-4 rounded-lg border-[#9F5538] text-[#864227] hover:bg-[#F6F3EE] transition-all duration-200">
        <i className="fa-brands fa-google "></i>
        <span>Continue with Google</span>
      </Button>
      <p className="text-[#54433d] text-center text-sm">New Here? <Link href={'/register'} className="text-[#9F5538]">Join Brandy</Link></p>
    </form>
  );
}
