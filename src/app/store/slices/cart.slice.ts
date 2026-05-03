
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartResponse } from "../../types/cart.type";
export type { CartState, CartResponse };

export const initialState: CartState = {
  items: [],
  totalItems: 0,
  subTotal: 0,
  customizationTotal: 0,
  total: 0,

  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },


    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError(state) {
      state.error = null;
    },


    setCart(state, action: PayloadAction<CartResponse>) {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.subTotal = action.payload.subTotal;
      state.customizationTotal = action.payload.customizationTotal;
      state.total = action.payload.total;

      state.isLoading = false;
      state.error = null;
    },


    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.subTotal = 0;
      state.customizationTotal = 0;
      state.total = 0;

      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setCart,
  clearCart,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;