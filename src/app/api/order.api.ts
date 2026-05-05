'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { CheckoutRequest } from "../types/checkout.type";
import { Order } from "../types/order.type";


export async function placeOrder(data: CheckoutRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Not authenticated");

  try {
    console.log("[API] placeOrder called with data:", JSON.stringify(data, null, 2));

    const res = await axios.post(
      "https://brands-system-production-c110.up.railway.app/api/Orders",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(" [API] Order success! Status:", res.status, "Response:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ [API] Order placement failed!");
    console.error("❌ [API] Status:", error.response?.status);
    console.error("❌ [API] Response data:", JSON.stringify(error.response?.data, null, 2));
    console.error("❌ [API] Message:", error.message);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to place order.");
  }
}


export async function getUserOrders(): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.get(
      "https://brands-system-production-c110.up.railway.app/api/Orders/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("GET ORDERS ERROR:", error.response?.data || error.message);
    throw error;
  }
}

export async function cancelOrder(orderId: number): Promise<Order> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.put(
      `https://brands-system-production-c110.up.railway.app/api/Orders/${orderId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error(
      "CANCEL ORDER ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
}
