import api from "@/lib/service";

export async function requestBrand(values : FormData) {
  const {data} = await api.post('https://graduationprojectclean-production.up.railway.app/api/BrandOwnerRequest/request-owner',values); 
  return data;
}

export async function rejectBrand(requestId:number) {
  const {data} = await api.put(`https://graduationprojectclean-production.up.railway.app/api/BrandOwnerRequest/${requestId}/reject`); 
  return data;
}

export async function acceptBrand(requestId:number) {
  const {data} = await api.put(`https://graduationprojectclean-production.up.railway.app/api/BrandOwnerRequest/${requestId}/approve`); 
  return data;
}

export async function getPendingRequest() {
  const { data } = await api.get("https://graduationprojectclean-production.up.railway.app/api/BrandOwnerRequest/pending");
  return data;
}