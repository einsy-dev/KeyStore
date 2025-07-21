import { createSlice } from "@reduxjs/toolkit";

const defaulContextMenu: ContextMenuI = { active: false, menu: [] };
const defaultModal: ModalI = { active: false, data: {} };

export const contextMenuSlice = createSlice({
  name: "modal",
  initialState: {
    contextMenu: { active: false, menu: null },
    modal: { active: false, data: {} }
  },
  reducers: {
    setContextMenu: (state, { payload }: { payload: ContextMenuI }) => {
      state.contextMenu = { ...defaulContextMenu, ...payload } as any;
    },
    setModal: (state, { payload }: { payload: ModalI }) => {
      state.modal = { ...defaultModal, ...payload } as any;
    }
  }
});

export const { setContextMenu, setModal } = contextMenuSlice.actions;

export const selectContextMenu = (state: any) => {
  return state.modal.contextMenu;
};
export const selectModal = (state: any) => {
  return state.modal.modal;
};
