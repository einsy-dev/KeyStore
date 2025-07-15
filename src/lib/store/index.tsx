import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./app";

const store = configureStore({
  reducer: {
    app: counterReducer
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
