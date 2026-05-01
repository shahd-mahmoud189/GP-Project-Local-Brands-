import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().nonempty("*name is required").min(1, "Full name is required"),
  address: z.string().nonempty("*name is required").min(1, "Address is required"),
  bio: z.string().nonempty("*name is required").max(500, "Bio must be 500 characters or less"),
});

export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
