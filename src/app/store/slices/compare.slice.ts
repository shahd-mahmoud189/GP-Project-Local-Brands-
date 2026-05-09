import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/types/product.type";

export interface CompareState {
    items: Product[];
    isOpen: boolean;
}

export const compareInitialState: CompareState = {
    items: [],
    isOpen: false,
};

const compareSlice = createSlice({
    name: "compare",
    initialState: compareInitialState,
    reducers: {
        addToCompare: (state, action: PayloadAction<Product>) => {
            const exists = state.items.find((item) => item.productId === action.payload.productId);
            if (!exists && state.items.length < 4) {
                state.items.push(action.payload);
                state.isOpen = true;
            }
        },
        removeFromCompare: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);
        },
        clearCompare: (state) => {
            state.items = [];
            state.isOpen = false;
        },
        toggleDrawer: (state, action: PayloadAction<boolean | undefined>) => {
            state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
        },
    },
});

export const { addToCompare, removeFromCompare, clearCompare, toggleDrawer } = compareSlice.actions;
export const compareReducer = compareSlice.reducer;
