import { cookies } from "next/headers";

async function refreshTokens(): Promise<string | null> {
  const res = await fetch("http://localhost:3000/api/auth/refresh", {
    method: "POST",
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.success ? data.token : null;
}

// export async function getPendingRequest() {
//   const cookieStore = await cookies();
//   let token = cookieStore.get("token")?.value;

//   if (!token) return [];

//   const fetchWithToken = async (t: string) =>
//     fetch(
//       "https://brands-system-production-c110.up.railway.app/api/BrandOwnerRequest/pending",
//       {
//         headers: { Authorization: `Bearer ${t}` },
//         cache: "no-store",
//       }
//     );

//   let response = await fetchWithToken(token);

//   if (response.status === 401) {
//     const newToken = await refreshTokens();
//     if (!newToken) return [];
//     response = await fetchWithToken(newToken);
//   }

//   if (!response.ok) return [];

//   return response.json();
// }