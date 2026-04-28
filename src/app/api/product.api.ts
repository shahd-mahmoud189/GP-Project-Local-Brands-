import api from "@/lib/service";
import { Product } from "../types/product.type";

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