"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { Package, Sparkles } from "lucide-react";
import { createProductSchema, ProductFormValues, toFormData } from "@/app/schema/createProductSchema";
import { BasicInfoSection } from "./BasicInfoSection";
import { ImageUpload } from "./ImageUpload";
import { VariantsSection } from "./VariantsSection";
import { CustomizationSection } from "./CustomizationSection";
import { getMyBrands } from "@/app/api/brand.api";
import { Brand } from "@/app/types/brand.type";
import { addProduct, updateProduct } from "@/app/api/product.api";
import { predictPrice } from "@/app/api/ai.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export interface AddProductTabProps {
  initialData?: Partial<ProductFormValues>;
  productId?: number; // ← جديد
  onSuccess?: () => void;
}

export function AddProductTab({ initialData, productId, onSuccess }: AddProductTabProps) {
  const isEditMode = !!initialData;
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brandLoading, setBrandLoading] = useState(true);
  const [pricePrediction, setPricePrediction] = useState<{
    suggestedPrice: number;
    minPrice: number;
    maxPrice: number;
    reasoning: string;
  } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const priceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getMyBrands()
      .then((brands) => setBrand(brands[0] ?? null))
      .catch(() => setBrand(null))
      .finally(() => setBrandLoading(false));
  }, []);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(createProductSchema) as Resolver<ProductFormValues>,
    defaultValues: initialData || {
      ProductName: "",
      Description: "",
      Images: [],
      CategoryId: 1,
      BasePrice: 0,
      StockQuantity: 0,
      Variants: [],
      UseAiSuggestion: false,
      AiSuggestedPrice: undefined,
      Customization: undefined,
    },
  });

  const variantsEnabled = (watch("Variants")?.length ?? 0) > 0;
  const customizationValue = watch("Customization");
  const customEnabled = !!customizationValue;
  const useAiSuggestion = watch("UseAiSuggestion");
  const images = watch("Images");
  const productName = watch("ProductName");
  const description = watch("Description");
  const basePrice = watch("BasePrice");

  const { fields, append, remove } = useFieldArray({ control, name: "Variants" });

  useEffect(() => {
    if (!productName || !images?.length) return;
    if (priceTimer.current) clearTimeout(priceTimer.current);

    priceTimer.current = setTimeout(async () => {
      setIsPredicting(true);
      try {
        const result = await predictPrice({
          productName,
          description: description || "",
          category: String(watch("CategoryId")),
          basePrice: basePrice || 0,
          file: images[0],
        });
        setPricePrediction({
          suggestedPrice: result.suggestedPrice,
          minPrice: result.minPrice,
          maxPrice: result.maxPrice,
          reasoning: result.reasoning,
        });
        setValue("AiSuggestedPrice", result.suggestedPrice);
      } catch {
        setPricePrediction(null);
      } finally {
        setIsPredicting(false);
      }
    }, 800);

    return () => { if (priceTimer.current) clearTimeout(priceTimer.current); };
  }, [productName, description, images]);

  const toggleVariants = (enabled: boolean) => {
    if (!enabled) setValue("Variants", []);
    else if (fields.length === 0) append({ size: "M", color: "Black", price: 0, stockQuantity: 0 });
  };

  const onImageUpload = useCallback((files: File[]) => {
    setValue("Images", files);
  }, [setValue]);

  const toggleCustomization = (enabled: boolean) => {
    if (!enabled) setValue("Customization", null);
    else setValue("Customization", { Zones: [], AllowsPrinting: false, AllowsText: false });
  };

  const onSubmit = async (data: ProductFormValues) => {
  if (!brand) {
    toast.error("No brand found. Please create a brand first.");
    return;
  }

  // الـ Images required بس في الـ add mode
  if (!productId && (!data.Images || data.Images.length === 0)) {
    toast.error("Please upload at least one product image.");
    return;
  }

  try {
    const fd = toFormData(brand.brandId, data);

    if (productId) {
      await updateProduct(productId, fd);
    } else {
      await addProduct(brand.brandId, fd);
    }

    toast.success(productId ? "Product updated successfully!" : "Product added successfully!");
    onSuccess?.();
  } catch {
    toast.error("Something went wrong. Please try again.");
  }
};

  const totalStock = variantsEnabled
    ? fields.reduce((sum, _, idx) => sum + (watch(`Variants.${idx}.stockQuantity`) || 0), 0)
    : watch("StockQuantity") || 0;

  if (brandLoading) return (
    <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading...</div>
  );

  if (!brand) return (
    <div className="flex items-center justify-center py-20 text-red-400 text-sm">
      No brand found. Please create a brand first.
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-6 py-4 space-y-6">
      {/* Basic Info & Image */}
      <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-lg text-[#2D2D2D] flex items-center gap-2">
          {isEditMode ? "Edit Product Details" : "Basic Information"}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ImageUpload control={control} errors={errors} onImageUpload={onImageUpload} />
          <BasicInfoSection
            register={register}
            errors={errors}
            variantsEnabled={variantsEnabled}
            watch={watch}
            setValue={setValue}
          />
        </div>
      </div>

      {/* AI Price Prediction */}
      {(isPredicting || pricePrediction) && (
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            {isPredicting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            AI Price Suggestion
          </div>

          {isPredicting && (
            <p className="text-xs text-gray-400">Analyzing your product...</p>
          )}

          {pricePrediction && !isPredicting && (
            <>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Suggested</p>
                  <p className="text-2xl font-bold text-amber-700">{pricePrediction.suggestedPrice} EGP</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Range</p>
                  <p className="text-sm font-medium text-gray-600">
                    {pricePrediction.minPrice} – {pricePrediction.maxPrice} EGP
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">{pricePrediction.reasoning}</p>

              {/* Use AI Suggestion Toggle */}
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-amber-50 rounded-xl border border-amber-200">
                <input
                  type="checkbox"
                  checked={useAiSuggestion}
                  onChange={(e) => setValue("UseAiSuggestion", e.target.checked)}
                  className="w-4 h-4 accent-amber-700"
                />
                <div>
                  <p className="text-sm font-bold text-amber-800">Use AI Suggested Price</p>
                  <p className="text-xs text-amber-600">
                    {useAiSuggestion
                      ? `Will use ${pricePrediction.suggestedPrice} EGP instead of your price`
                      : "Will use your entered price"}
                  </p>
                </div>
              </label>
            </>
          )}
        </div>
      )}

      {/* Variants */}
      <VariantsSection
        register={register}
        errors={errors}
        variantsEnabled={variantsEnabled}
        fields={fields}
        append={append}
        remove={remove}
        toggleVariants={toggleVariants}
      />

      {/* Customization */}
      <CustomizationSection
        control={control}
        customEnabled={customEnabled}
        toggleCustomization={toggleCustomization}
      />

      {/* Submit */}
      <div className="flex items-center justify-between bg-[#2D2D2D] p-5 rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-amber-400" />
          <div>
            <p className="text-xs text-gray-400">Total Available Inventory</p>
            <p className="text-lg font-bold">{totalStock} Units</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-[#2D2D2D] px-10 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "Publishing..." : isEditMode ? "Save Changes" : "Publish Product"}
        </button>
      </div>
    </form>
  );
}