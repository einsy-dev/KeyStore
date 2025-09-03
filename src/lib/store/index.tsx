import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app";
import { authSlice } from "./auth";
import { configSlice } from "./config";
import { dataSlice } from "./data";

const reducer = combineSlices(dataSlice, appSlice, configSlice, authSlice);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
