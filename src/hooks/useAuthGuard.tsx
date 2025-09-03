import store from "@/lib/store";
import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";

export function useAuthGuard() {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    const listener = AppState.addEventListener("change", (state) => {
      if (state !== "active" || path === "/Auth") return;
      const modal = store.getState().app.modal.active;
      if (!modal) {
        router.replace("/Auth");
      }
    });
    return () => {
      listener.remove();
    };
  }, [path, router]);
}
