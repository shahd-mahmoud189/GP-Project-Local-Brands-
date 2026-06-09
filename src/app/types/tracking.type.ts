export type ActionType =
  | "ViewProduct"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "RemoveFromWishlist"
  | "Purchase";

export type TrackInteractionRequest = {
  sessionId: string;
  actionType: string;
  productId?: number;
  categoryId?: number;
  brandId?: number;
  searchQuery?: string;
  sourcePage?: string;
};