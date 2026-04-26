import { Product } from "./product.type";

export type Brand = {
  brandId: number;
  userId: number;
  ownerName: string;
  brandName: string;
  description: string;
  logoUrl: string;
  createdAt: string;
  isActive: boolean;
  productCount: number;
}

export type BrandDetailsResponse = {
  brandId: number;
  userId: number;
  ownerName: string;
  brandName: string;
  description: string;
  logoUrl: string | null;
  createdAt: string;
  isActive: boolean;
  productCount: number;
  products: Product[];
}

export type BrandList = Brand[];