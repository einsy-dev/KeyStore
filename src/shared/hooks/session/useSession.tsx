import { use } from "react";
import { SessionContext } from "./context";

export function useSession() {
  const context = use(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");

  return context;
}
