'use server'

import { cookies } from "next/headers";
import { AddToCartRequest, CartResponse } from "../types/cart.type";
import { refreshTokens } from "./serverFunction/serverFunctions.api";

const BASE = "https://graduationprojectclean-production.up.railway.app";

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value || null;

  if (!token) throw new Error("Authentication required");

  const headers = {
    ...options.headers,
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, { 
    ...options, 
    headers,
    cache: "no-store" 
  });

  if (response.status === 401) {
    const newToken = await refreshTokens();

    if (!newToken) {
      const cookieStore = await cookies();
      cookieStore.delete("token");
      cookieStore.delete("refreshToken");
      return new Response(null, { status: 401 });
    }

    const retryHeaders = {
      ...options.headers,
      "Authorization": `Bearer ${newToken}`,
      "Content-Type": "application/json",
    };
    response = await fetch(url, { ...options, headers: retryHeaders, cache: "no-store" });
  }

  return response;
}


export async function getLoggedUserCart(): Promise<CartResponse | null> {
  try {
    const response = await fetchWithAuth(`${BASE}/api/Cart`);

    if (response.status === 401) return null;

    if (!response.ok) {
 
      if (response.status === 400 || response.status === 404) {
        return { items: [], totalItems: 0, subTotal: 0, customizationTotal: 0, total: 0 };
      }
      throw new Error("Failed to get cart");
    }

    return await response.json();
  } catch (error) {
    console.error("GET CART ERROR:", error);
    return { items: [], totalItems: 0, subTotal: 0, customizationTotal: 0, total: 0 };
  }
}

export async function addProductToCart(body: AddToCartRequest): Promise<CartResponse> {
  const response = await fetchWithAuth(`${BASE}/api/Cart`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Failed to add to cart");
  }

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

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Failed to update quantity");
  }

  return response.json();
}