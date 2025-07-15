import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const counterSlice = createSlice({
  name: "app",
  initialState: {
    data: JSON.parse(SecureStore.getItem("data") || "{}"),
    modal: { active: false, type: null, dataKey: null }
  },
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setModal: (state, { payload }) => {
      state.modal = payload;
    }
  }
});

export const { setData, setModal } = counterSlice.actions;

export const selectData = (state: { app: { data: DataI } }) => {
  return state.app.data;
};
export const selectModal = (state: { app: { modal: ModalI } }) => {
  return state.app.modal;
};

export default counterSlice.reducer;
