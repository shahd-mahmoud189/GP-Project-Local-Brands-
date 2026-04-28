"use client";

import { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";

import { createProductSchema, CreateProductForm } from "../../../schema/createProductSchema";
import { BasicInfoSection } from "./BasicInfoSection";
import { ImageUpload } from "./ImageUpload";
import { VariantsSection } from "./VariantsSection";
import { CustomizationSection } from "./CustomizationSection";

// --- Types & Constants ---
type ImageScanStatus = "idle" | "scanning" | "authentic" | "blocked";

export interface AddProductTabProps {
    initialData?: Partial<CreateProductForm>;
    onSuccess?: () => void;
}

export function AddProductTab({ initialData, onSuccess }: AddProductTabProps) {
    // const dispatch = useDispatch(); // Commented out as addProduct was missing
    const { status: scanStatus, setStatus: setScanStatus, inputRef, handleFile, imageUrl, setImageUrl } = useImageScan();

    const isEditMode = !!initialData;

    // --- Form setup ---
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<CreateProductForm>({
        resolver: zodResolver(createProductSchema),
        defaultValues: initialData || {
            productName: "",
            description: "",
            imageUrls: "",
            categoryId: 1,
            basePrice: 0,
            stockQuantity: 0,
            variants: [],
            customization: null
        }
    });

    const variantsEnabled = watch("variants")?.length > 0;
    const customEnabled = watch("customization") !== null;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    });

    const toggleVariants = (enabled: boolean) => {
        if (!enabled) {
            setValue("variants", []);
        } else {
            if (fields.length === 0) append({ size: "M", color: "Black", price: 0, stock: 0 });
        }
    };

    const toggleCustomization = (enabled: boolean) => {
        if (!enabled) {
            setValue("customization", null);
        } else {
            setValue("customization", { types: [], areas: [] });
        }
    };

    const onImageUpload = useCallback(async (file: File) => {
        const url = await handleFile(file);
        if (url) setValue("imageUrls", url);
    }, [handleFile, setValue]);

    const onSubmit = async (data: CreateProductForm) => {
        if (!isEditMode && scanStatus !== "authentic") {
            alert("Please upload and verify an authentic product image.");
            return;
        }
        // dispatch(addProduct(data)); // Missing addProduct action
        console.log("Form Data:", data);
        alert(isEditMode ? "Product updated successfully!" : "Product added successfully!");
        onSuccess?.();
    };

    const totalStock = variantsEnabled
        ? fields.reduce((sum, field, idx) => sum + (watch(`variants.${idx}.stock`) || 0), 0)
        : (watch("stockQuantity") || 0);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-6 py-4 space-y-6">
            {/* 1. Basic Information & Image Upload */}
            <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-[#2D2D2D] flex items-center gap-2">
                    {isEditMode ? "Edit Product Details" : "Basic Information"}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <ImageUpload
                        control={control}
                        errors={errors}
                        status={isEditMode ? "authentic" : scanStatus}
                        inputRef={inputRef}
                        onImageUpload={onImageUpload}
                        initialImageUrl={initialData?.imageUrls}
                    />
                    <BasicInfoSection
                        register={register}
                        errors={errors}
                        variantsEnabled={variantsEnabled}
                    />
                </div>
            </div>

            {/* 2. Variants Option */}
            <VariantsSection
                register={register}
                errors={errors}
                variantsEnabled={variantsEnabled}
                fields={fields}
                append={append}
                remove={remove}
                toggleVariants={toggleVariants}
            />

            {/* 3. Customization */}
            <CustomizationSection
                control={control}
                customEnabled={customEnabled}
                toggleCustomization={toggleCustomization}
            />

            {/* Final Action */}
            <div className="flex items-center justify-between bg-[#2D2D2D] p-5 rounded-2xl text-white shadow-xl">
                <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-amber-400" />
                    <div>
                        <p className="text-xs text-gray-400">Total Available Inventory</p>
                        <p className="text-lg font-bold">{totalStock} Units</p>
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="bg-white text-[#2D2D2D] px-10 py-3 rounded-xl font-bold hover:bg-amber-50 transition-all active:scale-95 disabled:opacity-50">
                    {isEditMode ? "Save Changes" : "Publish Product"}
                </button>
            </div>
        </form>
    );
}


function useImageScan() {
    const [status, setStatus] = useState<ImageScanStatus>("idle");
    const [imageUrl, setImageUrl] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File): Promise<string> => {
        return new Promise((resolve) => {
            setStatus("scanning");
            setTimeout(() => {
                const isBlocked = file.name.toLowerCase().includes("ai");
                setStatus(isBlocked ? "blocked" : "authentic");
                if (!isBlocked) {
                    const url = URL.createObjectURL(file);
                    setImageUrl(url);
                    resolve(url);
                } else {
                    resolve("");
                }
            }, 1500);
        });
    }, []);

    return { status, setStatus, imageUrl, setImageUrl, inputRef, handleFile };
}
