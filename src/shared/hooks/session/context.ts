import { createContext } from "react";

export const SessionContext = createContext<SessionContextI>({
  isAuth: false,
  status: null,
  isCanceled: false,
  autoLock: true,
  signIn: function (pin: string, newPin?: boolean): Promise<void> {
    throw new Error("Function not implemented.");
  },
  signInBio: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  signOut: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setAutoLock: function (autoLock: boolean): Promise<void> {
    throw new Error("Function not implemented.");
  },
  isBioAvailable: false,
  call: function (): Promise<void> {
    throw new Error("Function not implemented.");
  }
});
