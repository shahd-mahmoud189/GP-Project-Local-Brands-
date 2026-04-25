import api from "@/lib/service";

export async function getAllBrands() {
  const {data} = await api.get('https://brands-system-production-c110.up.railway.app/api/Brands'); 
  return data;
}