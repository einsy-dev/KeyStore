import { useEffect } from "react";
import { AppState, AppStateEvent, AppStateStatus } from "react-native";

export function useAppStatus(
  callback: (state: AppStateStatus) => void,
  type: AppStateEvent = "change"
) {
  useEffect(() => {
    const listener = AppState.addEventListener(type, (state) => {
      (async () => await callback(state))();
    });
    return () => {
      listener.remove();
    };
  }, [callback, type]);
}
