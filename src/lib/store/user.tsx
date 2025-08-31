import { createSlice } from "@reduxjs/toolkit";

const defaultUser = {
  auth: null
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: defaultUser
  },
  reducers: {
    setUser: (state, { payload }: { payload: { auth: null | string } }) => {
      state.user = { ...defaultUser, ...payload } as any;
    }
  }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: any) => {
  return state.user.user;
};
