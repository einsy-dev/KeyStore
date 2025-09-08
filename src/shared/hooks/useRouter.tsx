import { createContext, ReactNode, use, useState } from "react";

const RouterContext = createContext<any>({
  params: {},
  setParams: (prev: { [key: string]: string }) => prev as any
});

export function useRouter() {
  const context = use(RouterContext);
  if (!context) throw new Error("useSession must be used within RouterContext");

  return context;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, _setState] = useState({});

  function navigate() {}
  function replace() {}
  function back() {}

  return <RouterContext.Provider value={{ params: state, navigate, replace, back }}>{children}</RouterContext.Provider>;
}
