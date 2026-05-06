import {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { Layers, Trash2, Plus } from "lucide-react";
import { ProductFormValues } from "@/app/schema/createProductSchema";

const AVAILABLE_COLORS = ["Black", "White", "Red", "Blue", "Beige", "Green"];
const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "Free Size"];

interface VariantsSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  variantsEnabled: boolean;
  fields: any[];
  append: UseFieldArrayAppend<ProductFormValues, "Variants">;
  remove: UseFieldArrayRemove;
  toggleVariants: (enabled: boolean) => void;
}

export function VariantsSection({
  register,
  errors,
  variantsEnabled,
  fields,
  append,
  remove,
  toggleVariants,
}: VariantsSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              variantsEnabled ? "bg-[#864227] text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#2D2D2D]">Product Variants</h3>
            <p className="text-xs text-gray-400">
              Add multiple sizes, colors, or prices.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleVariants(!variantsEnabled)}
          className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
            variantsEnabled ? "bg-[#864227]" : "bg-gray-200"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform ${
              variantsEnabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {variantsEnabled && (
        <div className="pt-4 border-t border-gray-50 overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-[10px] uppercase text-gray-400 font-bold">
                <th className="pb-2">Size</th>
                <th className="pb-2">Color</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Stock</th>
                <th className="pb-2">SKU</th>
                <th className="pb-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="py-2 pr-2">
                    <select
                      {...register(`Variants.${index}.size`)}
                      className="w-full p-2 bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-sm"
                    >
                      {AVAILABLE_SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-2">
                    <select
                      {...register(`Variants.${index}.color`)}
                      className="w-full p-2 bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-sm"
                    >
                      {AVAILABLE_COLORS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`Variants.${index}.price`, { valueAsNumber: true })}
                      className="w-full p-2 bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-sm"
                      placeholder="EGP"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      {...register(`Variants.${index}.stockQuantity`, { valueAsNumber: true })}
                      className="w-full p-2 bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-sm"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      {...register(`Variants.${index}.sku`)}
                      className="w-full p-2 bg-[#FAF8F6] border border-[#E8E4E0] rounded-lg text-sm"
                      placeholder="Optional"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-300 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={() =>
              append({ size: "M", color: "Black", price: 0, stockQuantity: 0 })
            }
            className="mt-4 px-4 py-2 border border-dashed border-[#864227] rounded-xl text-[11px] font-bold text-[#864227] flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Option
          </button>
          {errors.Variants && (
            <p className="text-red-500 text-xs mt-2">{errors.Variants.message}</p>
          )}
        </div>
      )}
    </div>
  );
}