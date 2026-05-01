// import { Controller, Control, FieldErrors } from "react-hook-form";
// import { UploadCloud, Zap, CheckCircle2, XCircle } from "lucide-react";
// import { CreateProductForm } from "../../../schema/createProductSchema";
// import { RefObject } from "react";

// interface ImageUploadProps {
//     control: Control<CreateProductForm>;
//     errors: FieldErrors<CreateProductForm>;
//     status: "idle" | "scanning" | "authentic" | "blocked";
//     inputRef: RefObject<HTMLInputElement | null>;
//     onImageUpload: (file: File) => Promise<void>;
//     initialImageUrl?: string;
// }

// export function ImageUpload({ control, errors, status, inputRef, onImageUpload, initialImageUrl }: ImageUploadProps) {
//     return (
//         <div className="lg:col-span-4">
//             <Controller
//                 control={control}
//                 name="imageUrls"
//                 render={({ field }) => (
//                     <div
//                         onClick={() => inputRef.current?.click()}
//                         className={`h-full min-h-[220px] border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all overflow-hidden relative ${status === 'authentic' ? 'border-emerald-500 bg-emerald-50/20' :
//                             status === 'blocked' ? 'border-red-500 bg-red-50/20' :
//                                 'border-gray-200 hover:bg-gray-50'
//                             }`}
//                     >
//                         <input
//                             ref={inputRef}
//                             type="file"
//                             accept="image/*"
//                             className="hidden"
//                             onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])}
//                         />

//                         {(field.value || initialImageUrl) ? (
//                             <img
//                                 src={field.value || initialImageUrl}
//                                 alt="Product"
//                                 className="absolute inset-0 w-full h-full object-cover opacity-80"
//                             />
//                         ) : null}

//                         <div className="relative z-10 flex flex-col items-center bg-white/60 p-4 rounded-xl backdrop-blur-sm shadow-sm group hover:bg-white/80 transition-all">
//                             {status === "idle" && <UploadCloud className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />}
//                             {status === "scanning" && <Zap className="w-8 h-8 text-amber-500 animate-pulse" />}
//                             {status === "authentic" && <CheckCircle2 className="w-8 h-8 text-emerald-500" />}
//                             {status === "blocked" && <XCircle className="w-8 h-8 text-red-500" />}
//                             <p className="font-bold text-[11px] uppercase tracking-wide mt-2">
//                                 {status === "authentic" ? "Original Verified" : "Product Photo"}
//                             </p>
//                         </div>
//                         {errors.imageUrls && <p className="text-red-500 text-[10px] mt-1 relative z-10 bg-white/80 px-2 rounded">{errors.imageUrls.message}</p>}
//                     </div>
//                 )}
//             />
//         </div>
//     );
// }

import { Controller, Control, FieldErrors } from "react-hook-form";
import { UploadCloud, Zap, CheckCircle2, XCircle, X } from "lucide-react";
import { RefObject } from "react";
import { ProductFormValues } from "@/app/schema/createProductSchema";

interface ImageUploadProps {
  control: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  onImageUpload: (files: File[]) => void;
  initialImageUrl?: string;
}

export function ImageUpload({
  control,
  errors,
  onImageUpload,
  initialImageUrl,
}: ImageUploadProps) {
  return (
    <div className="lg:col-span-4">
      <Controller
        control={control}
        name="Images"
        render={({ field }) => {
          const files: File[] = field.value || [];
          const previews = files.map((f) => URL.createObjectURL(f));

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newFiles = Array.from(e.target.files || []);
            const merged = [...files, ...newFiles];
            field.onChange(merged);
            onImageUpload(merged);
          };

          const removeFile = (index: number) => {
            const updated = files.filter((_, i) => i !== index);
            field.onChange(updated);
            onImageUpload(updated);
          };

          return (
            <div className="space-y-3">
              {/* ✅ حولنا الـ div لـ label وضفنا htmlFor */}
              <label
                htmlFor="file-upload"
                className="min-h-[160px] border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all border-gray-200 hover:bg-gray-50 hover:border-amber-400"
              >
                <input
                  id="file-upload" // ✅ لازم الـ id يطابق الـ htmlFor
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleChange}
                />
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className="w-8 h-8 text-gray-400" />
                  <p className="font-bold text-[11px] uppercase tracking-wide text-gray-500">
                    {files.length > 0 ? "Add More Images" : "Upload Product Photos"}
                  </p>
                </div>
              </label>

              {/* Previews grid */}
              {(previews.length > 0 || initialImageUrl) && (
                <div className="grid grid-cols-3 gap-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img
                        src={src}
                        alt={`product-${i}`}
                        className="w-full h-full object-cover rounded-xl border border-[#E8E4E0]"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.Images && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.Images.message as string}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}