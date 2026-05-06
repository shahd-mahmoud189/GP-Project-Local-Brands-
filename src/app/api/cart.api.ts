// 'use server'
// import axios, { AxiosRequestConfig } from "axios";
// import { cookies } from "next/headers";
// import { AddToCartRequest, CartResponse } from "../types/cart.type";

// export async function addProductToCart(body: AddToCartRequest): Promise<CartResponse> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value || null;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   const { data } = await axios.post(
//     "https://brands-system-production-c110.up.railway.app/api/Cart",
//     body,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return data;
// }

// export async function getLoggedUserCart(): Promise<CartResponse> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value || null;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   try {
//     const options: AxiosRequestConfig = {
//       url: "https://brands-system-production-c110.up.railway.app/api/Cart",
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await axios.request(options);
//     return data;
//   }
//   catch (error) {
//     throw error;
//   }
// }

// export async function removeProductFromCart(cartItemId: number): Promise<CartResponse> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value || null;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   try {
//     const { data } = await axios.delete(
//       `https://brands-system-production-c110.up.railway.app/api/Cart/${cartItemId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return data;
//   }
//   catch (error) {
//     throw error;
//   }
// }

// export async function clearCartApi(): Promise<void> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value || null;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   try {
//     await axios.delete(
//       "https://brands-system-production-c110.up.railway.app/api/Cart",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }
//   catch (error) {
//     throw error;
//   }
// }

// export async function updateProductQuantity({
//   cartItemId,
//   quantity,
// }: {
//   cartItemId: number;
//   quantity: number;
// }): Promise<any> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   try {
//     const { data } = await axios({
//       method: "PUT",
//       url: `https://brands-system-production-c110.up.railway.app/api/Cart/${cartItemId}?quantity=${quantity}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return data;
//   } catch (error: any) {
//     const errorData = error.response?.data || error.message;
//     console.error("UPDATE CART ERROR:", errorData);
//     throw new Error(errorData);
//   }
// }


'use server'
import { cookies } from "next/headers";
import { AddToCartRequest, CartResponse } from "../types/cart.type";
import { refreshTokens } from "./serverFunction/serverFunctions.api";

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Authentication required");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 401) {
  const newToken = await refreshTokens();

  if (!newToken) {
    // ❗ هنا اعملي logout بدل ما ترمي error
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");

    return new Response(null, { status: 401 });
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${newToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

  return response;
}

const BASE = "https://brands-system-production-c110.up.railway.app";

export async function getLoggedUserCart(): Promise<CartResponse | null> {
  const response = await fetchWithAuth(`${BASE}/api/Cart`);

  if (response.status === 401) {
    return null; // user مش logged in
  }

  if (!response.ok) throw new Error("Failed to get cart");

  return response.json();
}

export async function addProductToCart(body: AddToCartRequest): Promise<CartResponse> {
  const response = await fetchWithAuth(`${BASE}/api/Cart`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Failed to add to cart");
  return response.json();
}

export async function removeProductFromCart(cartItemId: number): Promise<CartResponse> {
  const response = await fetchWithAuth(`${BASE}/api/Cart/${cartItemId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove from cart");
  return response.json();
}

export async function clearCartApi(): Promise<void> {
  const response = await fetchWithAuth(`${BASE}/api/Cart`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to clear cart");
}

export async function updateProductQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}): Promise<any> {
  const response = await fetchWithAuth(
    `${BASE}/api/Cart/${cartItemId}?quantity=${quantity}`,
    { method: "PUT" }
  );
  if (!response.ok) throw new Error("Failed to update quantity");
  return response.json();
}