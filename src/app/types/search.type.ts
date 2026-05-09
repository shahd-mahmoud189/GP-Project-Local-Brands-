import type { Product } from "./product.type";
import type { Brand } from "./brand.type";
import type { categoryType } from "./category.type";

export interface SearchResponse {
  products: Product[];
  brands: Brand[];
  categories: categoryType[];
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface MinimalBrand {
  brandId: number;
  brandName: string;
}