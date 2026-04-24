import { Controller, Control, FieldErrors } from "react-hook-form";
import { UploadCloud, Zap, CheckCircle2, XCircle } from "lucide-react";
import { CreateProductForm } from "../../../schema/createProductSchema";
import { RefObject } from "react";

interface ImageUploadProps {
    control: Control<CreateProductForm>;
    errors: FieldErrors<CreateProductForm>;
    status: "idle" | "scanning" | "authentic" | "blocked";
    inputRef: RefObject<HTMLInputElement | null>;
    onImageUpload: (file: File) => Promise<void>;
    initialImageUrl?: string;
}

export function ImageUpload({ control, errors, status, inputRef, onImageUpload, initialImageUrl }: ImageUploadProps) {
    return (
        <div className="lg:col-span-4">
            <Controller
                control={control}
                name="imageUrls"
                render={({ field }) => (
                    <div
                        onClick={() => inputRef.current?.click()}
                        className={`h-full min-h-[220px] border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all overflow-hidden relative ${status === 'authentic' ? 'border-emerald-500 bg-emerald-50/20' :
                            status === 'blocked' ? 'border-red-500 bg-red-50/20' :
                                'border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])}
                        />

                        {(field.value || initialImageUrl) ? (
                            <img
                                src={field.value || initialImageUrl}
                                alt="Product"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                        ) : null}

                        <div className="relative z-10 flex flex-col items-center bg-white/60 p-4 rounded-xl backdrop-blur-sm shadow-sm group hover:bg-white/80 transition-all">
                            {status === "idle" && <UploadCloud className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />}
                            {status === "scanning" && <Zap className="w-8 h-8 text-amber-500 animate-pulse" />}
                            {status === "authentic" && <CheckCircle2 className="w-8 h-8 text-emerald-500" />}
                            {status === "blocked" && <XCircle className="w-8 h-8 text-red-500" />}
                            <p className="font-bold text-[11px] uppercase tracking-wide mt-2">
                                {status === "authentic" ? "Original Verified" : "Product Photo"}
                            </p>
                        </div>
                        {errors.imageUrls && <p className="text-red-500 text-[10px] mt-1 relative z-10 bg-white/80 px-2 rounded">{errors.imageUrls.message}</p>}
                    </div>
                )}
            />
        </div>
    );
}

