import { delay } from "@/utils";
import { signIn, signInBio } from "@/widgets/sign-in";
import { useRouter } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { AppState, StatusBar } from "react-native";
import { SessionContext } from "./context";

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<SessionStateI>({
    auth: { isBioAvailable: true, status: null, isAuth: false, isCanceled: false, autoLock: true }
  });

  useEffect(() => {
    StatusBar.setHidden(true);
    const listener = AppState.addEventListener("change", (appState) => {
      if (appState === "active") StatusBar.setHidden(true);
      if (appState !== "active" || !state.auth.autoLock) return;
      _signOut();
    });
    return () => {
      if (listener) listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  async function _signInBio() {
    if (state.auth.isAuth || !state.auth.isBioAvailable) return;
    const { success, isBioAvailable, isCanceled } = await signInBio();
    if (!isBioAvailable) {
      return setAuth({ isBioAvailable });
    }
    if (isCanceled) {
      return setAuth({ isCanceled });
    }
    if (success) {
      setAuth({ status: "success", isBioAvailable, isCanceled });
      delay(() => {
        setAuth({ isAuth: true });
      }, 300);
    } else {
      setAuth({ status: null });
    }
  }

  async function _signIn(pin: string, newPin?: boolean) {
    if (state.auth.isAuth) return;
    const res = await signIn(pin, newPin);
    if (res.success) {
      setAuth({ status: "success" });
      delay(() => {
        setAuth({ isAuth: true });
      }, 300);
    } else {
      setAuth({ status: "error" });
      delay(() => {
        setAuth({ isAuth: false, status: null });
      }, 600);
    }
  }

  async function _signOut() {
    if (!state.auth.isAuth) return;
    router.dismissTo({ pathname: "/sign-in" });
    setAuth({ status: null, isAuth: false, isCanceled: false });
  }
  // possibly avoided by using background services but this works by now
  async function _call(cb: () => Promise<void>) {
    setAuth({ autoLock: false });
    await cb();
  }

  useEffect(() => {
    if (!state.auth.autoLock) delay(() => setAuth({ autoLock: true }), 5000);
  }, [state.auth.autoLock]);

  return (
    <SessionContext.Provider
      value={{
        status: state.auth.status,
        isAuth: state.auth.isAuth,
        isBioAvailable: state.auth.isBioAvailable,
        isCanceled: state.auth.isCanceled,
        signIn: _signIn,
        signInBio: _signInBio,
        signOut: _signOut,
        call: _call
      }}
    >
      {children}
    </SessionContext.Provider>
  );

  function setAuth(data: Partial<AuthI>) {
    setState((prev) => ({ ...prev, auth: { ...prev.auth, ...data } }));
  }
}
