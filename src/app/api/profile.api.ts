import api from "@/lib/service";
import { UpdateProfileForm } from "../schema/profile.schema";

export async function getProfile(values:UpdateProfileForm){
  const {data} = await api.get(`https://brands-system-production-c110.up.railway.app/api/Profile`); 
  return data;
}

export async function updateProfile(values:UpdateProfileForm){
  const {data} = await api.put(`https://brands-system-production-c110.up.railway.app/api/Profile`,values); 
  return data;
}