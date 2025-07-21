import { createSlice } from "@reduxjs/toolkit";
import storage from "../storage";

export const dataSlice = createSlice({
  name: "data",
  initialState: { data: storage.get("data") || [] },
  reducers: {
    createIntro: (
      state: { data: DataI[] },
      { payload }: { payload: DataI }
    ) => {
      console.log("create");
      state.data.push({ id: state.data.length, ...payload });
      storage.set("data", state.data);
    },
    updateIntro: (
      state: { data: DataI[] },
      { payload }: { payload: { id: number; name: string } }
    ) => {
      console.log("update");
      state.data.find((el) => el.id! === payload.id)!.name = payload.name;
      storage.set("data", state.data);
    },
    deleteIntro: (
      state: { data: DataI[] },
      { payload }: { payload: DataI }
    ) => {
      console.log("delete");
      state.data.splice(state.data.indexOf(payload), 1);
      storage.set("data", state.data);
    },

    createKey: (
      state: { data: DataI[] },
      { payload }: { payload: { data: DataI; key: KeyI } }
    ) => {},
    updateKey: (
      state: { data: DataI[] },
      { payload }: { payload: { data: DataI; key: KeyI } }
    ) => {},
    deleteKey: (
      state: { data: DataI[] },
      { payload }: { payload: { data: DataI; key: KeyI } }
    ) => {}
  }
});

export const {
  createIntro,
  updateIntro,
  deleteIntro,
  createKey,
  updateKey,
  deleteKey
} = dataSlice.actions;

export const selectData = (state: any) => {
  return state.data.data;
};

export default dataSlice.reducer;
