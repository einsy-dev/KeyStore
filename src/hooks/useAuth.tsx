import { usePathname, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { AppState } from "react-native";

export function useAuth() {
  const router = useRouter();
  const path = usePathname();
  useLayoutEffect(() => {
    const listener = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        if (path !== "/Auth") router.replace("/Auth");
      }
    });
    return () => {
      listener.remove();
    };
  }, [path, router]);
}
