import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

interface ConfigI {
  isAuth: boolean;
  theme: "light" | "dark";
}

const defaultConfig = {
  isAuth: false,
  theme: "dark"
};

const savedState: ConfigI = JSON.parse(SecureStore.getItem("config") || "{}");
const initialState: { config: ConfigI } = {
  config: { ...defaultConfig, ...savedState }
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, { payload }: { payload: Partial<ConfigI> }) => {
      state.config = { ...defaultConfig, ...payload } as ConfigI;
      SecureStore.setItem("config", JSON.stringify(state.config));
    }
  }
});

export const { setConfig } = configSlice.actions;

export const selectConfig = (state: { config: { config: ConfigI } }) => {
  return state.config.config;
};
