"use client";
import { requestBrand } from "@/app/api/brand-request.api";
import {brandRequestForm,brandRequestSchema,} from "@/app/schema/brand-request.schema";
import { setBrandRequest } from "@/app/server/auth.actions";
import { setBrandRequestInfo } from "@/app/store/slices/brandRequest.slice";
import { Button } from "@/components/ui/button";
import {Field,FieldDescription, FieldGroup,FieldLabel,} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function BrandRequestForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      BusinessName : "",
      BusinessLicense : null,
      BrandName : "",
      BrandDescription: "",
      BrandLogo: "",
    },
    resolver: zodResolver(brandRequestSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });


  async function handleBrandRequest(values: brandRequestForm) {
  const formData = new FormData();

  formData.append("BrandDescription", values.BrandDescription);
  formData.append("BrandName", values.BrandName.trim());
  formData.append("BusinessName", values.BusinessName.trim());

  if (values.BrandLogo) {
    formData.append("BrandLogo", values.BrandLogo);
  }

  if (values.BusinessLicense) {
    formData.append("BusinessLicense", values.BusinessLicense);
  }

  try {
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }

    const data = await requestBrand(formData);
    
    toast.success("Request sent successfully!");
    
    setTimeout(() => {
      router.push("/customerAccount/brandRequest");
    }, 2000);

    setBrandRequest(data.requestStatusText,data.requestDate);

    dispatch(
      setBrandRequestInfo({
        requestDate: data.requestDate,
        requestStatusText: data.requestStatusText,
      }),
    );
  } catch (error: any) {
    console.error("Server Error Details:", error.response?.data);
    const errorMessage = error.response?.data?.message || "Verify your data fields or file sizes";
    toast.error(errorMessage);
  }
}
  return (
    <form
      className="w-full bg-[#FAF8F5] p-8 rounded-2xl shadow"
      onSubmit={handleSubmit(handleBrandRequest)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-brand-name">Brand Name</FieldLabel>
          <Input
            id="form-brand-name"
            type="text"
            placeholder="ex: handmade"
            className="bg-white focus:shadow-[#A2CB8B]"
            {...register("BrandName")}
          />
          {formState.errors.BrandName && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.BrandName.message}
              </p>
            </>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="form-description">
            Description for Your Brand
          </FieldLabel>
          <Textarea
            id="form-description"
            placeholder="Write a breif description for your brand"
            className="bg-white"
            {...register("BrandDescription")}
          />
          {formState.errors.BrandDescription && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.BrandDescription.message}
              </p>
            </>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="form-brand-logo">Brand Logo</FieldLabel>
          <Input
            id="form-brand-logo"
            type="file"
            className="bg-white"
            {...register("BrandLogo")}
          />
          <FieldDescription>
            Please upload a photo of your brand logo
          </FieldDescription>
          {formState.errors.BrandLogo && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.BrandLogo.message as string}
              </p>
            </>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="form-business-name">Business Name</FieldLabel>
          <Input
            id="form-business-name"
            type="text"
            placeholder="Enter your business name"
            className="bg-white"
            {...register("BusinessName")}
          />
          {formState.errors.BusinessName && (
            <>
              <p className="text-red-500 text-sm font-medium">
                {formState.errors.BusinessName.message}
              </p>
            </>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="picture">Business License</FieldLabel>
          <Input
            id="picture"
            type="file"
            className="bg-white"
            {...register("BusinessLicense")}
          />
          {formState.errors.BusinessLicense && (
            <p className="text-red-500 text-sm font-medium">
              {formState.errors.BusinessLicense.message as string}
            </p>
          )}
          <FieldDescription>
            Please upload a photo of your business license
          </FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="bg-[#0288D1] hover:bg-[#6d351f] font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-200 text-white w-full"
          >
            Request
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
