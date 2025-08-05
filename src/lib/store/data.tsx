import { isPlainObject } from "@/utils";
import { createId } from "@paralleldrive/cuid2";
import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const savedState: DataListI = JSON.parse(SecureStore.getItem("data") || "{}");
const initialState: { data: DataListI } = {
  data: (isPlainObject(savedState) && Object.keys(savedState).length
    ? savedState
    : {
        [createId()]: {
          name: "hello",
          keys: {
            [createId()]: {
              name: "key"
            }
          }
        }
      }) as DataListI
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
    setGroup: (state: { data: DataListI }, { payload }: { payload: DataI }) => {
      state.data[payload.id] = payload;
      SecureStore.setItem("data", JSON.stringify(state.data));
    },
    deleteGroup: (
      state: { data: DataListI },
      { payload }: { payload: { id: string } }
    ) => {
      delete state.data[payload.id];
      SecureStore.setItem("data", JSON.stringify(state.data));
    },
    setKey: (
      state: { data: DataListI },
      { payload }: { payload: { groupId: string; key: KeyI } }
    ) => {
      state.data[payload.groupId].keys[payload.key.id] = payload.key;
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
