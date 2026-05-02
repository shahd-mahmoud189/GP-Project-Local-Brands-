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

"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { UploadCloud, X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { ProductFormValues } from "@/app/schema/createProductSchema";
import { validateImage } from "@/app/api/ai.api";
import { useState } from "react";

interface ImageUploadProps {
  control: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  onImageUpload: (files: File[]) => void;
}

type ScanStatus = "idle" | "scanning" | "approved" | "rejected";

interface ScanResult {
  status: ScanStatus;
  message: string;
}

export function ImageUpload({ control, errors, onImageUpload }: ImageUploadProps) {
  const [scanResults, setScanResults] = useState<Record<number, ScanResult>>({});

  const scanImage = async (file: File, index: number) => {
    setScanResults((prev) => ({ ...prev, [index]: { status: "scanning", message: "" } }));
    try {
      const result = await validateImage(file);
      setScanResults((prev) => ({
        ...prev,
        [index]: {
          status: result.isValid ? "approved" : "rejected",
          message: result.message,
        },
      }));
    } catch {
      setScanResults((prev) => ({
        ...prev,
        [index]: { status: "rejected", message: "Failed to validate image" },
      }));
    }
  };

  return (
    <div className="lg:col-span-4">
      <Controller
        control={control}
        name="Images"
        render={({ field }) => {
          const files: File[] = field.value || [];
          const previews = files.map((f) => URL.createObjectURL(f));

          const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const newFiles = Array.from(e.target.files || []);
            const merged = [...files, ...newFiles];
            field.onChange(merged);
            onImageUpload(merged);
            // scan كل صورة جديدة
            for (let i = 0; i < newFiles.length; i++) {
              await scanImage(newFiles[i], files.length + i);
            }
          };

          const removeFile = (index: number) => {
            const updated = files.filter((_, i) => i !== index);
            const updatedScans = { ...scanResults };
            delete updatedScans[index];
            setScanResults(updatedScans);
            field.onChange(updated);
            onImageUpload(updated);
          };

          return (
            <div className="space-y-3">
              <label
                htmlFor="file-upload"
                className="min-h-[160px] border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all border-gray-200 hover:bg-gray-50 hover:border-amber-400"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleChange}
                />
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <p className="font-bold text-[11px] uppercase tracking-wide text-gray-500">
                  {files.length > 0 ? "Add More Images" : "Upload Product Photos"}
                </p>
              </label>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {previews.map((src, i) => {
                    const scan = scanResults[i];
                    return (
                      <div key={i} className="relative group aspect-square">
                        <img
                          src={src}
                          alt={`product-${i}`}
                          className={`w-full h-full object-cover rounded-xl border-2 ${
                            scan?.status === "approved"
                              ? "border-green-400"
                              : scan?.status === "rejected"
                              ? "border-red-400"
                              : "border-[#E8E4E0]"
                          }`}
                        />
                        {/* Scan Status Icon */}
                        <div className="absolute top-1 left-1">
                          {scan?.status === "scanning" && (
                            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                          )}
                          {scan?.status === "approved" && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                          {scan?.status === "rejected" && (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                          <X className="w-3 h-3 text-red-500" />
                        </button>
                        {/* Scan Message */}
                        {scan?.message && scan.status !== "scanning" && (
                          <div
                            className={`absolute bottom-0 left-0 right-0 text-[9px] font-medium p-1 rounded-b-xl text-center ${
                              scan.status === "approved"
                                ? "bg-green-500/80 text-white"
                                : "bg-red-500/80 text-white"
                            }`}
                          >
                            {scan.status === "approved" ? "✓ Valid" : "✗ Invalid"}
                          </div>
                        )}
                      </div>
                    );
                  })}
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