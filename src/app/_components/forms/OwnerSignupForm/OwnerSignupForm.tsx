import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function OwnerSignupForm() {
  return (
    <form className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Full Name</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            required
            className="bg-white focus:shadow-[#A2CB8B]"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input id="form-email" type="email" placeholder="john@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-password">Password</FieldLabel>
          <Input id="form-password" type="password" placeholder="********" className="bg-white" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-brand-name">Brand Name</FieldLabel>
          <Input
            id="form-brand-name"
            type="text"
            placeholder="ex: handmade"
            required
            className="bg-white"
          />
        </Field>
        <Field>
            <FieldLabel htmlFor="picture">Picture</FieldLabel>
            <Input id="picture" type="file" />
            <FieldDescription>Please upload a photo of your ID card</FieldDescription>
          </Field>
        <Field>
          <FieldLabel htmlFor="form-description">
            Description for Your Brand
          </FieldLabel>
          <Textarea
            id="form-description"
            placeholder="Write a breif description for your brand"
            className="bg-white"
          />
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" className="bg-[#A2CB8B] text-white w-full hover:bg-[#84B179]">
            Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
