import { isPlainObject } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const savedState: DataListI = JSON.parse(SecureStore.getItem("data") || "{}");
const initialState: { data: DataListI } = {
  data: (isPlainObject(savedState) ? savedState : {}) as DataListI
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (
      state: { data: DataListI },
      { payload }: { payload: DataListI }
    ) => {
      state.data = payload;
      SecureStore.setItem("data", JSON.stringify(state.data));
    },
    setGroup: (
      state: { data: DataListI },
      { payload }: { payload: { id: string; data: DataI } }
    ) => {
      state.data[payload.id] = payload.data;
      SecureStore.setItem("data", JSON.stringify(state.data));
    },
    deleteGroup: (
      state: { data: DataListI },
      { payload }: { payload: { groupId: string } }
    ) => {
      delete state.data[payload.groupId];
      SecureStore.setItem("data", JSON.stringify(state.data));
    },
    setKey: (
      state: { data: DataListI },
      { payload }: { payload: { groupId: string; keyId: string; key: KeyI } }
    ) => {
      state.data[payload.groupId].keys[payload.keyId] = payload.key;
      SecureStore.setItem("data", JSON.stringify(state.data));
    },
    deleteKey: (
      state: { data: DataListI },
      { payload }: { payload: { groupId: string; keyId: string } }
    ) => {
      delete state.data[payload.groupId].keys[payload.keyId];
      SecureStore.setItem("data", JSON.stringify(state.data));
    }
  }
});

export const { setData, setGroup, deleteGroup, setKey, deleteKey } =
  dataSlice.actions;

export const selectData = (state: { data: { data: DataListI } }): DataListI => {
  return state.data.data;
};

export default dataSlice.reducer;
