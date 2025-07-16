import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const defaultModal = { active: false, type: "Intro", data: null };

export const counterSlice = createSlice({
  name: "app",
  initialState: {
    data: JSON.parse(SecureStore.getItem("data") || "[]"),
    modal: defaultModal
  },
  reducers: {
    newIntro: (state, { payload }: { payload: DataI }) => {
      state.data.push({ id: state.data.length, ...payload });
    },
    editIntro: (state, { payload }: { payload: DataI }) => {
      const el = (state.data as DataI[]).find((el) => el.id === payload.id);
      state.data[state.data.indexOf(el)] = payload;
    },

    newIntroItem: (
      state,
      { payload }: { payload: { id: number; key: KeyI } }
    ) => {
      state.data[payload.id].keys.push({
        id: state.data[payload.id].keys.length,
        name: payload.key.name,
        value: payload.key.value
      });
      console.log(JSON.stringify(state.data));
    },
    setModal: (state, { payload }: { payload: ModalI }) => {
      state.modal = { ...defaultModal, ...payload } as any;
    }
  }
});

export const { newIntro, editIntro, newIntroItem, setModal } =
  counterSlice.actions;

export const selectData = (state: { app: { data: DataI[] } }) => {
  return state.app.data;
};
export const selectModal = (state: { app: { modal: ModalI } }) => {
  return state.app.modal;
};

export default counterSlice.reducer;
