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
      { payload }: { payload: { id: number } }
    ) => {
      console.log("delete");
      state.data.splice(
        state.data.indexOf(state.data.find((el) => el.id! === payload.id)!),
        1
      );
      storage.set("data", state.data);
    },

    createKey: (
      state: { data: DataI[] },
      { payload }: { payload: { introId: number; key: KeyI } }
    ) => {
      console.log("createKey");
      const intro = state.data.find((el) => el.id! === payload.introId);
      if (!intro) return;
      if (!Array.isArray(intro.keys)) intro.keys = [];
      intro.keys.push({ id: intro.keys.length, ...payload.key });
      storage.set("data", state.data);
    },
    updateKey: (
      state: { data: DataI[] },
      {
        payload
      }: { payload: { introId: number; keyId: number; keyData: KeyI } }
    ) => {
      const intro = state.data.find((el) => el.id! === payload.introId);
      if (!intro) return;
      const key = intro.keys.find((key) => key.id === payload.keyId);
      if (!key) return;
      key.name = payload.keyData.name;
      key.value = payload.keyData.value;
      storage.set("data", state.data);
    },
    deleteKey: (
      state: { data: DataI[] },
      { payload }: { payload: { introId: number; keyId: number } }
    ) => {
      const intro = state.data.find((el) => el.id! === payload.introId);
      if (!intro) return;
      intro.keys.splice(
        intro.keys.indexOf(intro.keys.find((key) => key.id === payload.keyId)!),
        1
      );
      storage.set("data", state.data);
    }
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
