import { ProductList } from "@/app/types/product.type";
import { cookies } from "next/headers";

async function refreshTokens(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }), 
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.success ? data.token : null;
}

export async function getAllCategory() {
  const res = await fetch(
    "https://brands-system-production-c110.up.railway.app/api/Categories",
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export async function getContract() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return [];

  const fetchWithToken = async (t: string) =>
    fetch(
      "https://brands-system-production-c110.up.railway.app/api/Contract",
      {
        headers: { Authorization: `Bearer ${t}` },
        cache: "no-store",
      }
    );

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return [];
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return [];

  return response.json();
}

export async function getContractStatus() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return [];

  const fetchWithToken = async (t: string) =>
    fetch(
      "https://brands-system-production-c110.up.railway.app/api/Contract/status",
      {
        headers: { Authorization: `Bearer ${t}` },
        cache: "no-store",
      }
    );

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return [];
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return [];

  return response.json();
}

export async function getProductById(id: string) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  const fetchWithToken = async (t: string) =>
    fetch(
      `https://brands-system-production-c110.up.railway.app/api/Products/${id}`,
      { headers: { Authorization: `Bearer ${t}` }, cache: "no-store" }
    );

  let response = token ? await fetchWithToken(token) : null;

  if (!response || response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return null;
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return null;
  return response.json();
}

export async function getPendingProduct() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return [];

  const fetchWithToken = async (t: string) =>
    fetch(
      "https://brands-system-production-c110.up.railway.app/api/Products/pending",
      {
        headers: { Authorization: `Bearer ${t}` },
        cache: "no-store",
      }
    );

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return [];
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return [];

  return response.json();
}

export async function getProfile() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  if (!token) return null;

  const fetchWithToken = (t: string) =>
    fetch("https://brands-system-production-c110.up.railway.app/api/Profile", {
      headers: { Authorization: `Bearer ${t}` },
      cache: "no-store",
    });

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return null;
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return null;  
  return response.json();
}

// export async function updateProfile(values:UpdateProfileForm) {
//   const cookieStore = await cookies();
//   let token = cookieStore.get("token")?.value;
//   if (!token) return null;

//   const fetchWithToken = (t: string) =>
//     fetch("https://brands-system-production-c110.up.railway.app/api/Profile", {
//       headers: { Authorization: `Bearer ${t}` },
//       cache: "no-store",
//       method:'PUT',
//       body:JSON.stringify(values),
//     });

//   let response = await fetchWithToken(token);

//   if (response.status === 401) {
//     const newToken = await refreshTokens();
//     if (!newToken) return null;
//     response = await fetchWithToken(newToken);
//   }

//   if (!response.ok) return null;  
//   return response.json();
// }

export async function getMyBrands() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  if (!token) return null;

  const fetchWithToken = (t: string) =>
    fetch("https://brands-system-production-c110.up.railway.app/api/Brands/my-brands", {
      headers: { Authorization: `Bearer ${t}` },
      cache: "no-store",
    });

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return null;
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return null;  
  return response.json();
}

export async function getMyProducts(brandId:number):Promise<ProductList> {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  if (!token) return [];

  const fetchWithToken = (t: string) =>
    fetch(`https://brands-system-production-c110.up.railway.app/api/Products/brand/${brandId}`, {
      headers: { Authorization: `Bearer ${t}` },
      cache: "no-store",
    });

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return [];
    response = await fetchWithToken(newToken);
  }

  if (!response.ok) return [];  
  return response.json();
}
