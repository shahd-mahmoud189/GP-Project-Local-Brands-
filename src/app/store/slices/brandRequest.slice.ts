import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BrandRequest = {
    requestId: number;
    userId: number;
    userName: string;
    userEmail: string;
    businessName: string;
    businessLicense: string;
    taxId: string | null;
    brandName: string;
    brandDescription: string;
    brandLogoUrl: string;
    createdBrandId: number | null;
    requestStatus: number;
    requestStatusText: "Pending" | "Approved" | "Rejected" | string;
    requestDate: string;
    reviewedBy: number | string | null;
    reviewerName: string | null;
    reviewDate: string | null;
}

export type brandRequestState = {
    
    requestStatusText: "Pending" | "Approved" | "Rejected" | string;
    requestDate: string;
   
}

const initialState:brandRequestState = {
  
  requestStatusText: "",
  requestDate: new Date().toISOString(),
 
};

const brandRequestSlice = createSlice({
  name: 'brandRequest',
  initialState,
  reducers:{
    setBrandRequestInfo: function(state,action:PayloadAction<brandRequestState>){
        state.requestDate = action.payload.requestDate
        state.requestStatusText = action.payload.requestStatusText
    }
  }
});

export const brandRequestReducer = brandRequestSlice.reducer
export const {setBrandRequestInfo} = brandRequestSlice.actions