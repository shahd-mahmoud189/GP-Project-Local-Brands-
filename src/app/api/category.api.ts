import api from "@/lib/service";
import { addCategoryForm } from "../schema/addCategory.schema";
import { SingleCategoryResponse } from "../types/category.type";

export async function getAllCategory() {
  const {data} = await api.get('https://brands-system-production-c110.up.railway.app/api/Categories'); 
  return data;
}

export async function getSingleCategory(id:string):Promise<SingleCategoryResponse>{
  const {data} = await api.get(`https://brands-system-production-c110.up.railway.app/api/Categories/${id}`); 
  return data;
}

export async function addCategory(values:addCategoryForm) {
  const {data} = await api.post('https://brands-system-production-c110.up.railway.app/api/Categories',values); 
  return data;
}