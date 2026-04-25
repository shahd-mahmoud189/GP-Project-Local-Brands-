import api from "@/lib/service";
import { brandRequestForm } from "../schema/brand-request.schema";

export async function requestBrand(values : FormData) {
  const {data} = await api.post('https://brands-system-production-c110.up.railway.app/api/BrandOwnerRequest/request-owner',values); 
  return data;
}