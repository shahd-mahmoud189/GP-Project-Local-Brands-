import CustomerSignupForm from "@/app/_components/forms/CustomerSignupForm/CustomerSignupForm";
import OwnerSignupForm from "@/app/_components/forms/OwnerSignupForm/OwnerSignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="rounded-xl shadow-xl p-10 my-12 mx-12 w-100">
          <h4 className="text-center text-xl font-semibold text-slate-700 mb-4">
              <i className="fa-solid fa-user-plus text-[#A2CB8B] mr-2"></i>
            Create a new account
          </h4>
          <Tabs defaultValue="customer" className="">
            <TabsList className="mx-auto w-50">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              <CustomerSignupForm />
            </TabsContent>
            <TabsContent value="owner">
              <OwnerSignupForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
