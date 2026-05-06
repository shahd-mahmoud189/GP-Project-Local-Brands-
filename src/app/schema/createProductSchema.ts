import { z } from "zod";

export const productVariantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().optional(),
  price: z.number().min(0, "Price must be ≥ 0"),
  stockQuantity: z.number().int().min(0, "Stock must be ≥ 0"),
  sku: z.string().optional(),
});

export const createProductSchema = z.object({
  ProductName: z.string().min(1, "Product name is required"),
  Description: z.string().optional(),
  Images: z.array(z.instanceof(File)).optional().default([]),
  CategoryId: z.coerce.number().int().positive("Category is required"),
  Variants: z.array(productVariantSchema).optional(),
  BasePrice: z.coerce.number().min(0),
  StockQuantity: z.coerce.number().int().min(0),
  UseAiSuggestion: z.boolean().default(false),
  AiSuggestedPrice: z.number().optional(),
  Customization: z
    .object({
      Zones: z.array(
        z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
      ),
      AllowsPrinting: z.boolean().default(false),
      AllowsText: z.boolean().default(false),
    })
    .nullable()
    .optional(),
});

export type ProductFormValues = z.infer<typeof createProductSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;

export function toFormData(
  brandId: number,
  data: ProductFormValues,
  productId?: number
): FormData {
  const fd = new FormData();

  fd.append("ProductName", data.ProductName);

  if (data.Description) {
    fd.append("Description", data.Description);
  }

  if (data.Images && data.Images.length > 0) {
    data.Images.forEach((file) => fd.append("Images", file));
  }

  fd.append("CategoryId", String(data.CategoryId));
  fd.append("BasePrice", String(data.BasePrice));
  fd.append("UseAiSuggestion", String(data.UseAiSuggestion ?? false));

  if (data.UseAiSuggestion && data.AiSuggestedPrice) {
    fd.append("AiSuggestedPrice", String(data.AiSuggestedPrice));
  }

  const hasVariants = data.Variants && data.Variants.length > 0;

  if (hasVariants) {
    fd.append("VariantsJson", JSON.stringify(data.Variants));
  } else {
    fd.append("StockQuantity", String(data.StockQuantity));
  }

  if (data.Customization) {
    fd.append("AllowsCustomization", "true");
    data.Customization.Zones.forEach((zone) =>
      fd.append("Customization.Zones", String(zone))
    );
    fd.append(
      "Customization.AllowsPrinting",
      String(data.Customization.AllowsPrinting)
    );
    fd.append(
      "Customization.AllowsText",
      String(data.Customization.AllowsText)
    );
  } else {
    fd.append("AllowsCustomization", "false");
  }

  fd.append("IsActive", "true");

  return fd;
}