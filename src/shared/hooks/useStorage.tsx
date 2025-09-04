import * as SecureStore from "expo-secure-store";
import { useState } from "react";

export function useStorage() {
  const [state, setState] = useState(JSON.parse(SecureStore.getItem("useStorage") || "{}"));

  function saveData(data: { [key: string]: string }) {
    setState((prev: { [key: string]: string }) => {
      const state = { ...prev, data };
      SecureStore.setItem("useStorage", JSON.stringify(state));
      return state;
    });
  }

  return [state, saveData];
}
