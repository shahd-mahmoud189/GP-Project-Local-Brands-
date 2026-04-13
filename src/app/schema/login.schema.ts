import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("*email is required")
    .pipe(z.email("invalid email address")),
  password: z.string().nonempty("*password is required"),
});

export type loginForm = z.infer<typeof loginSchema>;
