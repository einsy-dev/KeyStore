import { createContext, ReactNode, use, useState } from "react";
import { useAppState } from "./useAppState";

const SessionContext = createContext<{
  isAuth: boolean;
  signIn: () => void;
  signOut: () => void;
}>({
  isAuth: false,
  signIn: () => null,
  signOut: () => null
});

export function useSession() {
  const context = use(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");

  return context;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  useAppState((state) => {
    if (state !== "active") {
      setIsAuth(false);
    }
  });

  return (
    <SessionContext
      value={{
        isAuth,
        signIn: () => setIsAuth(true),
        signOut: () => setIsAuth(false)
      }}
    >
      {children}
    </SessionContext>
  );
}
