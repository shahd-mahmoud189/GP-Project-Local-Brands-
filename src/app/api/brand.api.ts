import api from "@/lib/service";
import { BrandDetailsResponse, BrandList } from "../types/brand.type";

export async function getAllBrands() {
  const {data} = await api.get('https://brands-system-production-c110.up.railway.app/api/Brands'); 
  return data;
}

export async function getSingleBrand(id:string):Promise<BrandDetailsResponse>{
  const {data} = await api.get(`https://brands-system-production-c110.up.railway.app/api/Brands/${id}`); 
  return data;
}

export async function getMyBrands():Promise<BrandList>{
  const {data} = await api.get(`https://brands-system-production-c110.up.railway.app/api/Brands/my-brands`); 
  return data;
}

export async function updateMyBrand(
  brandId: number,
  data: { brandName: string; description: string }
) {
  const response = await api.put(
    `https://brands-system-production-c110.up.railway.app/api/Brands/${brandId}`,
    {
      brandName: data.brandName,
      description: data.description,
      logoUrl: '',
      isActive: true,
    }
  );
  return response.data;
}