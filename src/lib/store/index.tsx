import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./data";
import { contextMenuSlice } from "./modal";

const reducer = combineSlices(dataSlice, contextMenuSlice);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
