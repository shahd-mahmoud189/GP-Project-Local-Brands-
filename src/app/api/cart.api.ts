'use server'
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { AddToCartRequest, CartResponse } from "../types/cart.type";

export async function addProductToCart(body: AddToCartRequest): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  const { data } = await axios.post(
    "https://brands-system-production-c110.up.railway.app/api/Cart",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

export async function getLoggedUserCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://brands-system-production-c110.up.railway.app/api/Cart",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.request(options);
    return data;
  }
  catch (error) {
    throw error;
  }
}

export async function removeProductFromCart(cartItemId: number): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.delete(
      `https://brands-system-production-c110.up.railway.app/api/Cart/${cartItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
  catch (error) {
    throw error;
  }
}

export async function clearCartApi(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    await axios.delete(
      "https://brands-system-production-c110.up.railway.app/api/Cart",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  catch (error) {
    throw error;
  }
}

export async function updateProductQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios({
      method: "PUT",
      url: `https://brands-system-production-c110.up.railway.app/api/Cart/${cartItemId}?quantity=${quantity}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    const errorData = error.response?.data || error.message;
    console.error("UPDATE CART ERROR:", errorData);
    throw new Error(errorData);
  }
}

