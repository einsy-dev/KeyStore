import { createSlice } from "@reduxjs/toolkit";

const defaultConfirmModal: ConfirmModalI = {
  active: false,
  message: "",
  options: []
};

export const confirmModal = createSlice({
  name: "confirmModal",
  initialState: {
    confirmModal: { active: false, text: {}, required: {} }
  },
  reducers: {
    setConfirmModal: (state, { payload }: { payload: ConfirmModalI }) => {
      state.confirmModal = { ...defaultConfirmModal, ...payload } as any;
    }
  }
});

export const { setConfirmModal } = confirmModal.actions;

export const selectConfirmModal = (state: any) => {
  return state.confirmModal.confirmModal;
};
