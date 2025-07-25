import { createSlice } from "@reduxjs/toolkit";

const defaultModal: PopupI = { active: false, message: "" };

export const popup = createSlice({
  name: "popup",
  initialState: {
    popup: { active: false, message: "" }
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
