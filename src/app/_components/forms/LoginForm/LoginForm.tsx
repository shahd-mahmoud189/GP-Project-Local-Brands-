import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  return (
    <form className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input id="form-email" type="email" placeholder="john@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-password">Password</FieldLabel>
          <Input id="form-password" type="password" placeholder="********" className="bg-white" />
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" className="bg-[#A2CB8B] text-white w-full hover:bg-[#84B179]">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
