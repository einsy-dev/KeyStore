import Storage from "@/lib/storage";
import { isPlainObject } from "@/utils";
import { createSelector, createSlice } from "@reduxjs/toolkit";

const savedState: { [id: string]: GroupI } = Storage.getGroups();
const initialState: { data: { [id: string]: GroupI } } = {
  data: isPlainObject(savedState) ? savedState : {}
};

interface StateI {
  data: { [id: string]: GroupI };
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state: StateI, { payload }: { payload: { [id: string]: GroupI } }) => {
      state.data = payload;
      Storage.setIntex(payload);
    },
    createGroup: (state: StateI, { payload }: { payload: Optinal<GroupI, "id"> }) => {
      const id = Storage.createGroup(payload);
      payload.id = id;
      state.data[id] = payload as GroupI;
    },
    updateGroup: (state: StateI, { payload }: { payload: GroupI }) => {
      state.data[payload.id] = payload;
      Storage.updateGroup(payload);
    },
    deleteGroup: (state: StateI, { payload }: { payload: string }) => {
      delete state.data[payload];
      Storage.deleteGroup(payload);
    },
    // keys
    createKey: (state: StateI, { payload }: { payload: { groupId: string; key: Optinal<KeyI, "id"> } }) => {
      const id = Storage.createKey(payload.groupId, payload.key);
      payload.key.id = id;
      state.data[payload.groupId].keys[payload.key.id!] = {
        ...(payload.key as KeyI)
      };
    },
    updateKey: (state: StateI, { payload }: { payload: { groupId: string; key: KeyI } }) => {
      state.data[payload.groupId].keys[payload.key.id] = payload.key;
      Storage.updateKey(payload.key);
    },
    deleteKey: (state: StateI, { payload }: { payload: { groupId: string; keyId: string } }) => {
      delete state.data[payload.groupId].keys[payload.keyId];
      Storage.deleteKey(payload.groupId, payload.keyId);
    }
  }
});

export const { setData, createGroup, updateGroup, deleteGroup, createKey, updateKey, deleteKey } = dataSlice.actions;

export const selectData = (state: { data: StateI }): { [id: string]: GroupI } => {
  return state.data.data;
};

export const selectListData = createSelector(
  (state) => state.data.data,
  (state) => {
    return Object.keys(state).map((id) => ({ id, ...state[id] }));
  }
);

export default dataSlice.reducer;
