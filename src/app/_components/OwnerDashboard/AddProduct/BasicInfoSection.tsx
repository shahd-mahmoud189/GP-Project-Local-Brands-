"use client";

import { ProductFormValues } from "@/app/schema/createProductSchema";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { categoryType } from "@/app/types/category.type";
import { useEffect, useState, useRef } from "react";
import { getAllCategory } from "@/app/api/category.api";
import { moderateText, generateDescription } from "@/app/api/ai.api";
import { Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";

interface BasicInfoSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  variantsEnabled: boolean;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}

type ModerationStatus = "idle" | "checking" | "approved" | "rejected";

export function BasicInfoSection({
  register,
  errors,
  variantsEnabled,
  watch,
  setValue,
}: BasicInfoSectionProps) {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [moderation, setModeration] = useState<{ status: ModerationStatus; message: string }>({
    status: "idle",
    message: "",
  });
  const [suggestion, setSuggestion] = useState<string>("");
  const [isSuggesting, setIsSuggesting] = useState(false);

  const moderationTimer = useRef<NodeJS.Timeout | null>(null);
  const suggestionTimer = useRef<NodeJS.Timeout | null>(null);

  const productName = watch("ProductName");
  const description = watch("Description");
  const categoryId = watch("CategoryId");

  // جيب الكاتيجوريز
  useEffect(() => {
    getAllCategory().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Moderate Text — debounce 800ms
  useEffect(() => {
    if (!productName || !description || !categoryId) return;
    if (moderationTimer.current) clearTimeout(moderationTimer.current);

    moderationTimer.current = setTimeout(async () => {
      const selectedCategory = categories.find((c) => c.categoryId === Number(categoryId));
      if (!selectedCategory) return;

      setModeration({ status: "checking", message: "" });
      try {
        const result = await moderateText({
          productName,
          description: description || "",
          category: selectedCategory.categoryName,
          price: watch("BasePrice") || 0,
        });
        setModeration({
          status: result.isApproved ? "approved" : "rejected",
          message: result.message || result.reason || "",
        });
      } catch {
        setModeration({ status: "idle", message: "" });
      }
    }, 800);

    return () => { if (moderationTimer.current) clearTimeout(moderationTimer.current); };
  }, [productName, description, categoryId]);

  // Generate Description — debounce 600ms
  useEffect(() => {
    if (!productName || !categoryId) return;
    if (suggestionTimer.current) clearTimeout(suggestionTimer.current);

    suggestionTimer.current = setTimeout(async () => {
      const selectedCategory = categories.find((c) => c.categoryId === Number(categoryId));
      if (!selectedCategory) return;

      setIsSuggesting(true);
      try {
        const result = await generateDescription({
          productName,
          categoryName: selectedCategory.categoryName,
          partialText: description || "",
        });
        setSuggestion(result.description || result.suggestion || "");
      } catch {
        setSuggestion("");
      } finally {
        setIsSuggesting(false);
      }
    }, 600);

    return () => { if (suggestionTimer.current) clearTimeout(suggestionTimer.current); };
  }, [productName, description, categoryId]);

  const applySuggestion = () => {
    if (suggestion) {
      setValue("Description", suggestion);
      setSuggestion("");
    }
  };

  return (
    <div className="lg:col-span-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product Name */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-bold uppercase text-gray-500">Product Name</label>
          <input
            {...register("ProductName")}
            className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl outline-none"
            placeholder="e.g. Handmade Silk Scarf"
          />
          {errors.ProductName && (
            <p className="text-red-500 text-xs">{errors.ProductName.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-gray-500">Price (EGP)</label>
          <input
            type="number"
            step="0.01"
            {...register("BasePrice", { valueAsNumber: true })}
            className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl outline-none"
          />
          {errors.BasePrice && (
            <p className="text-red-500 text-xs">{errors.BasePrice.message}</p>
          )}
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-gray-500">Inventory (Stock)</label>
          <input
            type="number"
            disabled={variantsEnabled}
            {...register("StockQuantity", { valueAsNumber: true })}
            className={`w-full p-3 border rounded-xl outline-none transition-colors ${
              variantsEnabled
                ? "bg-gray-100 text-gray-400 border-gray-200"
                : "bg-[#FAF8F6] border-[#E8E4E0]"
            }`}
          />
          {errors.StockQuantity && (
            <p className="text-red-500 text-xs">{errors.StockQuantity.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-gray-500">Category</label>
          <select
            {...register("CategoryId", { valueAsNumber: true })}
            className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl"
          >
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          {errors.CategoryId && (
            <p className="text-red-500 text-xs">{errors.CategoryId.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-gray-500">Description</label>
        <div className="relative">
          <textarea
            rows={3}
            {...register("Description")}
            onKeyDown={(e) => {
              if (e.key === "Tab" && suggestion) {
                e.preventDefault();
                applySuggestion();
              }
            }}
            className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl outline-none resize-none"
          />
          {/* AI Suggestion */}
          {(suggestion || isSuggesting) && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isSuggesting ? (
                    <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <p className="text-xs text-amber-700 font-medium">
                    {isSuggesting ? "Generating suggestion..." : "AI Suggestion — Press Tab to apply"}
                  </p>
                </div>
                {suggestion && !isSuggesting && (
                  <button
                    type="button"
                    onClick={applySuggestion}
                    className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full hover:bg-amber-200 transition"
                  >
                    Apply
                  </button>
                )}
              </div>
              {suggestion && !isSuggesting && (
                <p className="text-xs text-amber-600 mt-1 line-clamp-2">{suggestion}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Moderation Status */}
      {moderation.status !== "idle" && (
        <div
          className={`flex items-start gap-2 p-3 rounded-xl text-sm ${
            moderation.status === "checking"
              ? "bg-gray-50 text-gray-500"
              : moderation.status === "approved"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {moderation.status === "checking" && <Loader2 className="w-4 h-4 animate-spin shrink-0 mt-0.5" />}
          {moderation.status === "approved" && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
          {moderation.status === "rejected" && <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
          <span className="text-xs font-medium">{moderation.message || (moderation.status === "checking" ? "Checking content..." : moderation.status === "approved" ? "Content approved" : "Content rejected")}</span>
        </div>
      )}
    </div>
  );
}