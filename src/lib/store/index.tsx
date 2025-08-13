import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app";
import { dataSlice } from "./data";
import { userSlice } from "./user";

const reducer = combineSlices(dataSlice, appSlice, userSlice);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
