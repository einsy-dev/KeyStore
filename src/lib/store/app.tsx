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

interface ConfigI {
  theme: "light" | "dark";
}

const defaultConfig: ConfigI = {
  theme: "light"
};

export const appSlice = createSlice({
  name: "app",
  initialState: {
    modal: defaultModal,
    menu: defaultMenu,
    popup: defaultPopup,
    config: defaultConfig
  },
  reducers: {
    setModal: (state, { payload }: { payload: ModalI }) => {
      state.modal = { ...defaultModal, ...payload };
    },
    setMenu: (state, { payload }: { payload: MenuI }) => {
      state.menu = { ...defaultMenu, ...payload };
    },
    setPopup: (state, { payload }: { payload: PopupI }) => {
      state.popup = { ...defaultPopup, ...payload };
    },
    setConfig: (state, { payload }: { payload: ConfigI }) => {
      state.config = { ...defaultConfig, ...payload };
    }
  }
});

export const { setModal, setMenu, setPopup, setConfig } = appSlice.actions;

export const selectModal = (state: { app: { modal: ModalI } }) => {
  return state.app.modal;
};
export const selectMenu = (state: { app: { menu: MenuI } }) => {
  return state.app.menu;
};
export const selectPopup = (state: { app: { popup: PopupI } }) => {
  return state.app.popup;
};

export const selectConfig = (state: { app: { config: ConfigI } }) => {
  return state.app.config;
};
