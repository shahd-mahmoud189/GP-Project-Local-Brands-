import { z } from "zod";

export const brandRequestSchema = z.object({
  BusinessName: z
    .string()
    .nonempty("*business name is required")
    .min(3, "business name must be at least 3 characters")
    .max(50, "business name must be at most 50 characters"),
  BusinessLicense : z
    .any()
    .refine((files) => files?.length === 1, "File is required")
    .transform((files) => files[0]),
  BrandName : z
    .string()
    .nonempty("*brand name is required")
    .min(2, "brand name must be at least 2 characters")
    .max(50, "brand name must be at most 50 characters"),
  BrandDescription: z
    .string()
    .nonempty("*brand description is required")
    .min(20, "brand description must be at least 20 characters")
    .max(500, "brand description must be at most 500 characters"),
  BrandLogo: z
    .any()
    .refine((files) => files?.length === 1, "File is required")
    .transform((files) => files[0]),
});

export type brandRequestForm = z.infer<typeof brandRequestSchema>;
