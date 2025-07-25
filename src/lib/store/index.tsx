import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { confirmModal } from "./confirmModal";
import { dataSlice } from "./data";
import { contextMenuSlice } from "./modal";
import { popup } from "./popup";

const reducer = combineSlices(dataSlice, contextMenuSlice, popup, confirmModal);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
