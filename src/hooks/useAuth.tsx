import store from "@/lib/store";
import { usePathname, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { AppState } from "react-native";

export function useAuth() {
  const router = useRouter();
  const path = usePathname();
  useLayoutEffect(() => {
    const listener = AppState.addEventListener("change", (state) => {
      const modal = store.getState().app.modal.active;
      if (state !== "active" && !modal) {
        if (path !== "/Auth") router.replace("/Auth");
      }
    });
    return () => {
      listener.remove();
    };
  }, [path, router]);
}
