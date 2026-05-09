import api from "@/lib/service"; // تأكدي من المسار الصحيح لملف الأكسيوس
import {
  AddToWishlistRequest,
  AddToWishlistResponse,
  ClearWishlistResponse,
  GetWishlistResponse,
  RemoveFromWishlistResponse,
} from "../types/wishlist.type";


export async function getWishlist(): Promise<GetWishlistResponse> {
  try {
    const response = await api.get("/api/Wishlist");
    return response.data;
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);
    return []; 
  }
}


export async function addToWishlist(
  payload: AddToWishlistRequest
): Promise<AddToWishlistResponse> {
  try {
 
    const response = await api.post(`/api/Wishlist/${payload.productId}`);
    return response.data;
  } catch (error: any) {
    console.error("ADD TO WISHLIST ERROR:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to add to wishlist");
  }
}

export async function removeFromWishlist(
  payload: { productId: number }
): Promise<RemoveFromWishlistResponse> {
  try {
    const response = await api.delete(`/api/Wishlist/${payload.productId}`);
    return response.data;
  } catch (error: any) {
    console.error("REMOVE FROM WISHLIST ERROR:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to remove from wishlist");
  }
}


export async function clearWishlist(): Promise<ClearWishlistResponse> {
  try {
    const response = await api.delete("/api/Wishlist");
    return response.data;
  } catch (error: any) {
    console.error("CLEAR WISHLIST ERROR:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Failed to clear wishlist");
  }
}