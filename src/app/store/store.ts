import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.slice";
import { AuthState } from "./slices/auth.slice";
import { brandRequestReducer, brandRequestState } from './slices/brandRequest.slice';
import { brandReducer, BrandState } from './slices/brand.slice';

export type PreloadedState = {
  auth: AuthState;
  brandRequest: brandRequestState;
  brand: BrandState;
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      brandRequest: brandRequestReducer,
      brand: brandReducer
    },
    preloadedState,
  });

  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore['dispatch']

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()