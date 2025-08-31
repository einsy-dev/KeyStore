import { createSlice } from "@reduxjs/toolkit";

const defaultConfig = {
  isAuth: false,
  theme: "dark"
};

export const configSlice = createSlice({
  name: "config",
  initialState: {
    config: defaultConfig
  },
  reducers: {
    setConfig: (state, { payload }) => {
      state.config = { ...defaultConfig, ...payload } as any;
    }
  }
});

export const { setConfig } = configSlice.actions;

export const selectConfig = (state: any) => {
  return state.config.user;
};
