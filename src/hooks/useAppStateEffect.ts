import { usePathname } from "expo-router";
import { useEffect } from "react";
import { AppState, AppStateEvent, AppStateStatus } from "react-native";

export function useAppStateEffect(
  callback: (state: AppStateStatus) => void,
  type: AppStateEvent = "change"
) {
  const path = usePathname();
  useEffect(() => {
    if (path === "/Auth" && AppState.currentState === "active")
      (async () => await callback("active"))();
    const listener = AppState.addEventListener(type, (state) => {
      (async () => await callback(state))();
    });
    return () => {
      listener.remove();
    };
  }, [callback, path, type]);
}
