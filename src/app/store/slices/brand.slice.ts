import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BrandState = {
  brandId: number | null;
}

const initialState:BrandState = {
  brandId: null
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers:{
    setBrandInfo: function(state,action:PayloadAction<BrandState>){
        state.brandId = action.payload.brandId
    }
  }
});

export const brandReducer = brandSlice.reducer
export const {setBrandInfo} = brandSlice.actions