"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupForm, signupSchema } from "@/app/schema/signup.schema";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signup } from "@/app/api/auth.api";

export default function CustomerSignupForm() {
  const router = useRouter();

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function handleSignup(values: signupForm) {
    try {
      const data = await signup(values);
      toast.success(data.isSuccess && "Account is created successfully");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleSignup)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Full Name</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            className="bg-white py-5 rounded-2xl"
            {...register("fullName")}
          />
          {formState.errors.fullName && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.fullName.message}
              </p>
            </>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input
            id="form-email"
            type="email"
            placeholder="john@example.com"
            className="bg-white py-5 rounded-2xl"
            {...register("email")}
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
            {...register("password")}
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
              "Sign Up"
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
      <p className="text-[#54433d] text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="text-[#9F5538]">
          Login
        </Link>
      </p>
    </form>
  );
}
