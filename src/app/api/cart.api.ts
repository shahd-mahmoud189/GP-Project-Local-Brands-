'use server'
import { cookies } from "next/headers";
import { AddToCartRequest, CartResponse } from "../types/cart.type";
import { refreshTokens } from "./serverFunction/serverFunctions.api";

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (newToken) {
      const retryHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "application/json",
      };
      response = await fetch(url, { ...options, headers: retryHeaders });
    }
  }

  return response;
}

export async function addProductToCart(body: AddToCartRequest): Promise<CartResponse> {
  const response = await fetchWithAuth(
    "https://brands-system-production-c110.up.railway.app/api/Cart",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Failed to add product to cart");
  }

  return response.json();
}

export async function getLoggedUserCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return { items: [], totalItems: 0, subTotal: 0, customizationTotal: 0, total: 0 };
  }

  try {
    const response = await fetchWithAuth("https://brands-system-production-c110.up.railway.app/api/Cart", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CART API ERROR [${response.status}]:`, errorText);

      // Handle 400/404 gracefully
      if (response.status === 400 || response.status === 404) {
        return { items: [], totalItems: 0, subTotal: 0, customizationTotal: 0, total: 0 };
      }
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("GET LOGGED USER CART EXCEPTION:", error.message);
    return { items: [], totalItems: 0, subTotal: 0, customizationTotal: 0, total: 0 };
  }
}

export async function removeProductFromCart(cartItemId: number): Promise<CartResponse> {
  const response = await fetchWithAuth(
    `https://brands-system-production-c110.up.railway.app/api/Cart/${cartItemId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Failed to remove product from cart");
  }

  return response.json();
}

export async function clearCartApi(): Promise<void> {
  const response = await fetchWithAuth(
    "https://brands-system-production-c110.up.railway.app/api/Cart",
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Failed to clear cart");
  }
}

export async function updateProductQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}): Promise<any> {
  try {
    const response = await fetchWithAuth(
      `https://brands-system-production-c110.up.railway.app/api/Cart/${cartItemId}?quantity=${quantity}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("UPDATE CART ERROR:", errorData);
      throw new Error(errorData || "Failed to update quantity");
    }

    return response.json();
  } catch (error: any) {
    console.error("UPDATE CART EXCEPTION:", error.message);
    throw error;
  }
}
