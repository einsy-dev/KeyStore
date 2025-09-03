import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const defaultAuth: AuthStatusI = {
  success: false,
  isBioAvailbale: true,
  error: ""
};

const savedState: AuthStatusI = JSON.parse(SecureStore.getItem("auth") || "{}");

const initialState: { auth: AuthStatusI } = {
  auth: { ...defaultAuth, ...savedState }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }: { payload: AuthStatusI }) => {
      state.auth = { ...state.auth, ...payload };
      SecureStore.setItem("auth", JSON.stringify(state.auth));
    }
  }
});

export const { setAuth } = authSlice.actions;

export const selectAuth = (state: { auth: { auth: AuthStatusI } }) => {
  return state.auth.auth;
};
