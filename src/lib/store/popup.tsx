import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const defaultModal: PopupI = { active: false, message: "", icon: null };

export const popup = createSlice({
  name: "popup",
  initialState: {
    popup: { active: false, message: "", icon: null as ReactNode }
  },
  reducers: {
    setPopup: (state, { payload }: { payload: PopupI }) => {
      state.popup = { ...defaultModal, ...payload } as any;
    }
  }
});

export const { setPopup } = popup.actions;

export const selectPopup = (state: any) => {
  return state.popup.popup;
};
