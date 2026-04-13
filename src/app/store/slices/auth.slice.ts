import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    email: string,
    userType: string,
}

export type AuthState = {
  isAuthinticated: boolean,
  userInfo: null | User,
}

const initialState:AuthState = {
  isAuthinticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setAuthInfo: function(state,action:PayloadAction<AuthState>){
        state.isAuthinticated = action.payload.isAuthinticated
        state.userInfo = action.payload.userInfo
    }
  }
});

export const authReducer = authSlice.reducer
export const {setAuthInfo} = authSlice.actions