import { createSlice } from "@reduxjs/toolkit";

const defaultModal: ModalI = {
  active: false,
  component: null
};

const defaultMenu: MenuI = {
  active: false,
  menu: []
};

const defaultPopup: PopupI = {
  active: false,
  component: null,
  position: "center"
};

export const appSlice = createSlice({
  name: "modal",
  initialState: {
    modal: defaultModal,
    menu: defaultMenu,
    popup: defaultPopup
  },
  reducers: {
    setModal: (state, { payload }: { payload: ModalI }) => {
      state.modal = { ...defaultModal, ...payload } as any;
    },
    setMenu: (state, { payload }: { payload: MenuI }) => {
      state.menu = { ...defaultMenu, ...payload } as any;
    },
    setPopup: (state, { payload }: { payload: ModalI }) => {
      state.popup = { ...defaultPopup, ...payload } as any;
    }
  }
});

export const { setModal, setMenu, setPopup } = appSlice.actions;

export const selectModal = (state: { modal: { modal: ModalI } }) => {
  return state.modal.modal;
};
export const selectMenu = (state: { modal: { menu: MenuI } }) => {
  return state.modal.menu;
};
export const selectPopup = (state: { modal: { popup: PopupI } }) => {
  return state.modal.popup;
};
