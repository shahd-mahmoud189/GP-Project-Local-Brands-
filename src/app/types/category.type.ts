import { Product } from "./product.type";

export type categoryType = {
  categoryId: number;
  categoryName: string;
  description: string;
  productCount: number;
};

export type SingleCategoryResponse = {
  categoryId: number;
  categoryName: string;
  description: string;
  productCount: number;
  products: Product[];
}