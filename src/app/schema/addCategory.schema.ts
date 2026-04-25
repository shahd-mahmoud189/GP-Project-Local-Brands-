import { z } from "zod";

export const addCategorySchema = z.object({
  categoryName: z
    .string()
    .nonempty("*category name is required")
    .min(2, "category name must be at least 2 characters")
    .max(50, "category name must be at most 50 characters"),
  description: z
    .string()
    .nonempty("*category description is required")
    .min(20, "category description must be at least 20 characters")
    .max(500, "category description must be at most 500 characters"),
});

export type addCategoryForm = z.infer<typeof addCategorySchema>;
