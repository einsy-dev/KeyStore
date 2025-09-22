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
const defaultHeader: HeaderI = {
  active: false,
  title: "",
  onBack: undefined,
  onSubmit: undefined,
  onMenu: undefined
};

export const appSlice = createSlice({
  name: "app",
  initialState: {
    modal: defaultModal,
    menu: defaultMenu,
    popup: defaultPopup,
    header: defaultHeader
  },
  reducers: {
    setModal: (state, { payload }: { payload: ModalI }) => {
      state.modal = { ...defaultModal, ...payload };
    },
    setMenu: (state, { payload }: { payload: MenuI }) => {
      state.menu = { ...state.menu, ...payload };
    },
    setPopup: (state, { payload }: { payload: PopupI }) => {
      state.popup = { ...defaultPopup, ...payload };
    },
    setHeader: (state, { payload }: { payload: HeaderI }) => {
      state.header = { ...defaultHeader, ...payload };
    }
  }
});

export const { setModal, setMenu, setPopup, setHeader } = appSlice.actions;

export const selectModal = (state: { app: { modal: Required<ModalI> } }) => {
  return state.app.modal;
};
export const selectMenu = (state: { app: { menu: Required<MenuI> } }) => {
  return state.app.menu;
};
export const selectPopup = (state: { app: { popup: Required<PopupI> } }) => {
  return state.app.popup;
};
export const selectHeader = (state: { app: { header: Required<HeaderI> } }) => {
  return state.app.header;
};
