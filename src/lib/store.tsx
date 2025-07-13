import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext } from "react";

const MyContext = createContext<{ data: DataI }>({ data: {} });

interface useMyContextI {
  context: { data: DataI };
  setIntro: (name: string) => void;
  setIntroItem: (intro: string, name: string, value: string) => void;
  delIntro: (name: string) => void;
  delIntroItem: (intro: string, name: string) => void;
}

const defaultContext = {
  data: JSON.parse(SecureStore.getItem("secret") || "{}")
};

function MyContextProvider({ children }: { children: ReactNode }) {
  return (
    <MyContext.Provider value={defaultContext}>{children}</MyContext.Provider>
  );
}

function useMyContext(): useMyContextI {
  const context = useContext<{ data: DataI }>(MyContext);

  function setIntro(intro: string) {
    context.data[intro] = {};
    saveStore(context);
  }

  function setIntroItem(intro: string, introItem: string, value: string) {
    context.data[intro] = Object.assign(context.data[intro], {
      [introItem]: value
    });
    saveStore(context);
  }

  function delIntro(name: string) {
    delete context.data[name];
    saveStore(context);
  }
  function delIntroItem(intro: string, introItem: string) {
    delete context.data[intro][introItem];
    saveStore(context);
  }

  return { context, setIntro, setIntroItem, delIntro, delIntroItem };
}

export { MyContextProvider, useMyContext };

function saveStore(context: { data: DataI }) {
  SecureStore.setItem("secret", JSON.stringify(context));
}
