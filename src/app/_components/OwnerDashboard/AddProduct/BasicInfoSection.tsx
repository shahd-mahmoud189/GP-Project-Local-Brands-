import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateProductForm } from "../../../schema/createProductSchema";

interface BasicInfoSectionProps {
    register: UseFormRegister<CreateProductForm>;
    errors: FieldErrors<CreateProductForm>;
    variantsEnabled: boolean;
}

export function BasicInfoSection({ register, errors, variantsEnabled }: BasicInfoSectionProps) {
    return (
        <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3 space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Product Name</label>
                    <input
                        {...register("productName")}
                        className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl outline-none"
                        placeholder="e.g. Handmade Silk Scarf"
                    />
                    {errors.productName && <p className="text-red-500 text-xs">{errors.productName.message}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Price (EGP)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("basePrice", { valueAsNumber: true })}
                        className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl outline-none"
                    />
                    {errors.basePrice && <p className="text-red-500 text-xs">{errors.basePrice.message}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Inventory (Stock)</label>
                    <input
                        type="number"
                        disabled={variantsEnabled}
                        {...register("stockQuantity", { valueAsNumber: true })}
                        className={`w-full p-3 border rounded-xl outline-none transition-colors ${variantsEnabled ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-[#FAF8F6] border-[#E8E4E0]'
                            }`}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                    <select {...register("categoryId", { valueAsNumber: true })} className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl">
                        <option value={1}>Clothing</option>
                        <option value={2}>Accessories</option>
                        <option value={3}>Home Decor</option>
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId.message}</p>}
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-gray-500">Description</label>
                <textarea
                    rows={3}
                    {...register("description")}
                    className="w-full p-3 bg-[#FAF8F6] border border-[#E8E4E0] rounded-xl outline-none resize-none"
                />
            </div>
        </div>
    );
}
