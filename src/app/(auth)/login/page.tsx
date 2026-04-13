import CustomerSignupForm from "@/app/_components/forms/CustomerSignupForm/CustomerSignupForm";
import LoginForm from "@/app/_components/forms/LoginForm/LoginForm";
import OwnerSignupForm from "@/app/_components/forms/OwnerSignupForm/OwnerSignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function page() {
  return (
    <>
      <div className="grid lg:grid-cols-3 my-5">
        <div className="lg:col-span-2 mt-10">
         <div className="flex justify-center items-center flex-col">
           <h2 className="text-4xl font-bold text-[#864227]">
            Empowering Egyptian <br /> brands to reach every home
          </h2>
          <Image
            src={"/logo.jpeg"}
            alt="logo"
            className=""
            width={500}
            height={500}
          ></Image>
         </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-xl shadow-xl p-10 my-12 mx-12 bg-[#FCF9F4]">
            <h4 className="text-3xl font-semibold text-slate-700 mb-1">
              Welcome Back
            </h4>
            <p className="text-xs text-[#BC5439] mb-8">
              Please enter your details to explore our brands.
            </p>
            <LoginForm/>
          </div>
        </div>
      </div>
    </>
  );
}
