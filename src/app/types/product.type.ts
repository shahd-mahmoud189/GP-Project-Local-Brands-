export type CustomizationOptions = {
  allowsPrinting: boolean;
  allowsText: boolean;
  availableZones: string[];
}

export type ProductVariant = {
  variantId: number;
  size: string;
  color: string;
  price: number;
  stockQuantity: number;
  sku: string;
}

export type Product = {
  productId: number;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  productName: string;
  description: string;
  imageUrls: string;
  allowsCustomization: boolean;
  customizationOptions: CustomizationOptions | null; 
  approvalStatus: number;
  approvalStatusText: string;
  rejectionReason: string;
  createdAt: string; 
  isActive: boolean;
  averageRating: number;
  reviewCount: number;
  basePrice: number;
  variants: ProductVariant[]; 
}

export type ProductList = Product[];