import { createSlice } from "@reduxjs/toolkit";

const defaultModal: ModalI = {
  active: false,
  component: null,
  position: "center"
};

export const appSlice = createSlice({
  name: "modal",
  initialState: {
    modal: { active: false, component: null },
    popup: { active: false, component: null }
  },
  reducers: {
    setModal: (state, { payload }: { payload: ModalI }) => {
      state.modal = { ...defaultModal, ...payload } as any;
    },
    setPopup: (state, { payload }: { payload: ModalI }) => {
      state.popup = { ...defaultModal, ...payload } as any;
    }
  }
});

export const { setModal, setPopup } = appSlice.actions;

export const selectModal = (state: any) => {
  return state.modal.modal;
};
export const selectPopup = (state: any) => {
  return state.modal.popup;
};
