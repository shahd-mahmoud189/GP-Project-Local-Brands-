
export interface WishlistItem {
  wishlistItemId: number;
  productId: number;
  productName: string;
  productImage: string;
  brandName: string;
  price: number;
  isAvailable: boolean;
  addedAt: string;
}


export type GetWishlistResponse = WishlistItem[];


export interface AddToWishlistRequest {
  productId: number;
}
export type AddToWishlistResponse = WishlistItem;


export interface RemoveFromWishlistRequest {
  wishlistItemId: number;
}
export interface RemoveFromWishlistResponse {
  wishlistItemId: number;
  message: string;
}


export interface ClearWishlistResponse {
  message: string;
}

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}