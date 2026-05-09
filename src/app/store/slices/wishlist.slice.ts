import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistItem } from "@/app/types/wishlist.type";

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      state.items.push(action.payload);
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.wishlistItemId !== action.payload
      );
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;