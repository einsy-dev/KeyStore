import { createSlice } from "@reduxjs/toolkit";

const defaultUser = {
  pin: "",
  isActive: false
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

export const selectMenu = (state: any) => {
  return state.modal.menu;
};
export const selectPopup = (state: any) => {
  return state.modal.popup;
};
