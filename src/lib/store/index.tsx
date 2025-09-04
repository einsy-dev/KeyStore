import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app";
import { dataSlice } from "./data";

const reducer = combineSlices(dataSlice, appSlice);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
