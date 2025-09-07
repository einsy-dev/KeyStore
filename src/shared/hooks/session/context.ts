import { createContext } from "react";

export const SessionContext = createContext<SessionContextI>({
  status: null,
  isAuth: false,
  isCanceled: false,
  signIn: function (pin: string, newPin?: boolean): Promise<void> {
    throw new Error("Function not implemented.");
  },
  signInBio: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  signOut: function (): Promise<void> {
    throw new Error("Function not implemented.");
  }
});
