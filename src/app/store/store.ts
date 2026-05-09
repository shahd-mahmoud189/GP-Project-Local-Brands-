import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer, AuthState } from "./slices/auth.slice";
import { brandRequestReducer, brandRequestState } from "./slices/brandRequest.slice";
import { brandReducer, BrandState } from "./slices/brand.slice";
import { cartReducer, CartState } from "./slices/cart.slice";
import { compareReducer, CompareState } from "./slices/compare.slice";
import { wishlistReducer, WishlistState } from "./slices/wishlist.slice";


export type PreloadedState = {
  auth: AuthState;
  brandRequest: brandRequestState;
  brand: BrandState;
  cart: CartState;
  wishlist: WishlistState;
    compare: CompareState;

};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      brandRequest: brandRequestReducer,
      brand: brandReducer,
      cart: cartReducer,
      compare: compareReducer,
      wishlist: wishlistReducer,
    },
    preloadedState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();