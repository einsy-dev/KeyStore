import { createSlice } from "@reduxjs/toolkit";

const defaultUser = {
  pin: "",
  auth: false
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: defaultUser
  },
  reducers: {
    setUser: (state, { payload }: any) => {
      state.user = { ...defaultUser, ...payload } as any;
    }
  }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: any) => {
  return state.user.user;
};
