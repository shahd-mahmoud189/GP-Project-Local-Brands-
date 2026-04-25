import api from "@/lib/service";
import { addCategoryForm } from "../schema/addCategory.schema";

export async function getAllCategory() {
  const {data} = await api.get('https://brands-system-production-c110.up.railway.app/api/Categories'); 
  return data;
}

export async function addCategory(values:addCategoryForm) {
  const {data} = await api.post('https://brands-system-production-c110.up.railway.app/api/Categories',values); 
  return data;
}