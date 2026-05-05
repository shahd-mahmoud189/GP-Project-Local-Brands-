import api from "@/lib/service";
import { Product } from "../types/product.type";
import { BrandList } from "../types/brand.type";

export async function getAllProducts() {
  const {data} = await api.get('https://brands-system-production-c110.up.railway.app/api/Products'); 
  return data;
}

export async function getSingleProduct(id:string):Promise<Product> {
  const {data} = await api.get(`https://brands-system-production-c110.up.railway.app/api/Products/${id}`); 
  return data;
}

export async function rejectProduct(requestId:number) {
  const {data} = await api.put(`https://brands-system-production-c110.up.railway.app/api/Products/${requestId}/reject`); 
  return data;
}

export async function acceptProduct(requestId:number) {
  const {data} = await api.put(`https://brands-system-production-c110.up.railway.app/api/Products/${requestId}/approve`); 
  return data;
}

export async function getMyBrands(): Promise<BrandList> {
  const { data } = await api.get(
    `https://brands-system-production-c110.up.railway.app/api/Brands/my-brands`
  );
  return data;
}

export async function addProduct(brandId: number, formData: FormData) {
  const { data } = await api.post(
    `https://brands-system-production-c110.up.railway.app/api/Products/brand/${brandId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

export async function deleteProductClient(id: number) {
  const { data } = await api.delete(`/api/Products/${id}`);
  return data;
}

export async function updateProduct(productId: number, formData: FormData) {
  const { data } = await api.put(
    `/api/Products/${productId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}