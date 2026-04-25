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

export type BrandList = Brand[];