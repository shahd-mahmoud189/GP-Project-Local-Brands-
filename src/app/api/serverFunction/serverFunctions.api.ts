import { cookies } from "next/headers";

async function refreshTokens(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!token || !refreshToken) return null;

  const res = await fetch(
    "https://brands-system-production-c110.up.railway.app/api/Auth/refresh",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Token: token, RefreshToken: refreshToken }),
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (data.isSuccess) {
    cookieStore.set("token", data.token, { maxAge: 1 * 24 * 60 * 60, httpOnly: false });
    cookieStore.set("refreshToken", data.refreshToken, { maxAge: 7 * 24 * 60 * 60, httpOnly: false });
    return data.token;
  }

  return null;
}

export async function getAllCategory() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return [];

  const fetchWithToken = async (t: string) =>
    fetch(
      "https://brands-system-production-c110.up.railway.app/api/Categories",
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