import api from "@/lib/service";

export async function getAllProducts() {
  const {data} = await api.get('https://brands-system-production-c110.up.railway.app/api/Products'); 
  return data;
}