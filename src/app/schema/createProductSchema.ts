import { z } from "zod";

export const productVariantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().optional(),
  price: z.number().min(0, "Price must be ≥ 0"),
  stock: z.number().int().min(0, "Stock must be ≥ 0"),
});

export const createProductSchema = z.object({
  productName: z.string().min(3, "Product name is required").max(200),
  description: z.string().max(1000).optional(),
  imageUrls: z.string().min(1, "Product image is required"),
  categoryId: z.number().min(1, "Category is required"),
  basePrice: z.number().min(0.01, "Price must be at least 0.01 EGP").optional(),
  stockQuantity: z.number().int().min(0, "Stock is required"),
  variants: z.array(productVariantSchema),
  customization: z
    .object({
      types: z.array(z.enum(["text", "photo"])),
      areas: z.array(z.string()),
    })
    .nullable()
    .optional(),
});

export type CreateProductForm = z.infer<typeof createProductSchema>;