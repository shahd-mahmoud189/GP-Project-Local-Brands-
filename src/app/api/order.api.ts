// 'use server';

// import axios from "axios";
// import { cookies } from "next/headers";
// import { CheckoutRequest } from "../types/checkout.type";
// import { Order } from "../types/order.type";


// export async function placeOrder(data: CheckoutRequest) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) throw new Error("Not authenticated");

//   try {
//     console.log("[API] placeOrder called with data:", JSON.stringify(data, null, 2));

//     const res = await axios.post(
//       "https://graduationprojectclean-production.up.railway.app/api/Orders",
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log(" [API] Order success! Status:", res.status, "Response:", res.data);
//     return res.data;
//   } catch (error: any) {
//     console.error("❌ [API] Order placement failed!");
//     console.error("❌ [API] Status:", error.response?.status);
//     console.error("❌ [API] Response data:", JSON.stringify(error.response?.data, null, 2));
//     console.error("❌ [API] Message:", error.message);

//     if (error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     }
//     throw new Error("Failed to place order.");
//   }
// }


// export async function getUserOrders(): Promise<Order[]> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   try {
//     const { data } = await axios.get(
//       "https://graduationprojectclean-production.up.railway.app/api/Orders/my-orders",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return data;
//   } catch (error: any) {
//     console.error("GET ORDERS ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// }

// export async function cancelOrder(orderId: number): Promise<Order> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     throw new Error("Authentication required");
//   }

//   try {
//     const { data } = await axios.put(
//       `https://graduationprojectclean-production.up.railway.app/api/Orders/${orderId}/cancel`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return data;
//   } catch (error: any) {
//     console.error(
//       "CANCEL ORDER ERROR:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

'use server';

import { cookies } from "next/headers";
import { CheckoutRequest } from "../types/checkout.type";
import { refreshTokens } from "./serverFunction/serverFunctions.api";

const BASE = "https://graduationprojectclean-production.up.railway.app";

export async function placeOrder(data: CheckoutRequest) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return null;

  const sendRequest = (t: string) =>
    fetch(`${BASE}/api/Orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

  let response = await sendRequest(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return null;

    response = await sendRequest(newToken);
  }

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Failed to place order");
  }

  return response.json();
}

import { Order } from "../types/order.type";

export async function getUserOrders(): Promise<Order[] | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return null;

  const fetchWithToken = (t: string) =>
    fetch(`${BASE}/api/Orders/my-orders`, {
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
export async function cancelOrder(orderId: number): Promise<Order | null> {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return null;

  const sendRequest = (t: string) =>
    fetch(`${BASE}/api/Orders/${orderId}/cancel`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${t}` },
      cache: "no-store",
    });

  let response = await sendRequest(token);

  if (response.status === 401) {
    const newToken = await refreshTokens();
    if (!newToken) return null;

    response = await sendRequest(newToken);
  }

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Failed to cancel order");
  }

  return response.json();
}

export async function getAllOrders() {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) return null;

  const fetchWithToken = (t: string) =>
    fetch(`${BASE}/api/Orders`, {
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


// export async function updateOrderStatus(orderId: number, status: number) {
//   const cookieStore = await cookies();
//   let token = cookieStore.get("token")?.value;

//   if (!token) throw new Error("Not authenticated");

//   const makeRequest = (t: string) =>
//     fetch(`${BASE}/api/Orders/${orderId}/status`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${t}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//       cache: "no-store",
//     });

//   let response = await makeRequest(token);

//   if (response.status === 401) {
//     const newToken = await refreshTokens();
//     if (!newToken) throw new Error("Session expired");

//     response = await makeRequest(newToken);
//   }

//   if (!response.ok) {
//     const err = await response.json().catch(() => null);
//     throw new Error(err?.message || "Failed to update order status");
//   }

//   return response.json();
// }