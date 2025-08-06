import { createSlice } from "@reduxjs/toolkit";
const defaultMenu = {
  active: false,
  menu: []
};
const defaultModal: ModalI = {
  active: false,
  component: null,
  position: "center"
};

export const appSlice = createSlice({
  name: "modal",
  initialState: {
    menu: { active: false, menu: [] },
    popup: { active: false, component: null }
  },
  reducers: {
    setMenu: (state, { payload }: { payload: MenuI }) => {
      state.menu = { ...defaultMenu, ...payload } as any;
    },
    setPopup: (state, { payload }: { payload: ModalI }) => {
      state.popup = { ...defaultModal, ...payload } as any;
    }
  }
});

export const { setMenu, setPopup } = appSlice.actions;

export const selectMenu = (state: any) => {
  return state.modal.menu;
};
export const selectPopup = (state: any) => {
  return state.modal.popup;
};
