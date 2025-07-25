import { createSlice } from "@reduxjs/toolkit";

const defaultConfirmModal: ConfirmModalI = {
  active: false,
  message: "",
  options: []
};

export const confirmModal = createSlice({
  name: "confirmModal",
  initialState: {
    confirmModal: { active: false, data: {}, required: {} }
  },
  reducers: {
    setConfirmModal: (state, { payload }: { payload: ContextMenuI }) => {
      state.confirmModal = { ...defaultConfirmModal, ...payload } as any;
    }
  }
});

export const { setConfirmModal } = confirmModal.actions;

export const selectConfirmModal = (state: any) => {
  return state.confirmModal.confirmModal;
};
