import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useGoBack(callback: () => boolean | void, deps: any[] = []) {
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      // returns true to prevent go back
      return callback() || false;
    });
    return () => {
      sub.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);
}
