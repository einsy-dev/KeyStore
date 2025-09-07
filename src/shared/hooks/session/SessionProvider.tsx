import { delay } from "@/utils";
import { signIn, signInBio } from "@/widgets/sign-in";
import { ReactNode, useState } from "react";
import { useAppState } from "../useAppState";
import { SessionContext } from "./context";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionStateI>({
    auth: { isBioAvailable: true, status: null, isAuth: false, isCanceled: false }
  });

  useAppState((state) => {
    if (state !== "active") {
      setAuth({ status: null, isAuth: false, isCanceled: false });
    }
  });

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
      delay(() => {
        setAuth({ isAuth: true });
      }, 300);
      return setAuth({ status: "success", isBioAvailable, isCanceled });
    }
    setAuth({ status: null });
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
      }, 300);
    }
  }

  async function _signOut() {
    if (!state.auth.isAuth) return;
    setAuth({ status: null, isAuth: false });
  }

  return (
    <SessionContext
      value={{
        status: state.auth.status,
        isAuth: state.auth.isAuth,
        isCanceled: state.auth.isCanceled,
        signIn: _signIn,
        signInBio: _signInBio,
        signOut: _signOut
      }}
    >
      {children}
    </SessionContext>
  );

  function setAuth(data: Partial<AuthI>) {
    setState((prev) => ({ ...prev, auth: { ...prev.auth, ...data } }));
  }
}
