import { useEffect } from "react";
import { AppState, AppStateEvent, AppStateStatus } from "react-native";

export function useAppStateEffect(
  callback: (state: AppStateStatus) => void,
  type: AppStateEvent = "change",
  deps: any[] = []
) {
  useEffect(() => {
    (async () => await callback(AppState.currentState))();
    const listener = AppState.addEventListener(type, (state) => {
      (async () => await callback(state))();
    });
    return () => {
      listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, type, ...deps]);
}
