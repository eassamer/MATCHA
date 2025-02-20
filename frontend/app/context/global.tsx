import { stat } from "fs";
import { createContext, ReactNode, useState } from "react";

const GlobalContext = createContext({
  state: {
    privateBackendUrl: "",
    publicBackendUrl: "",
  },
  setState: (state: any) => {},
  privateBackendUrl: "",
  publicBackendUrl: "",
});

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    privateBackendUrl: process.env.BACKEND_PRIVATE_URL,
    publicBackendUrl: process.env.BACKEND_PUBLIC_URL,
  });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
}
