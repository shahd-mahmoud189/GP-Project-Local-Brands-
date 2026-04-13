import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .nonempty("*name is required")
      .min(2, "name must be at least 2 characters")
      .max(15, "name must be at most 15 characters"),
    email: z
      .string()
      .nonempty("*email is required")
      .pipe(z.email("invalid email address")),
    password: z
      .string()
      .nonempty("*password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `Password minimum length 8 characters, at least one letter, one number and one special character.`,
      )
  })

export type signupForm = z.infer<typeof signupSchema>;
