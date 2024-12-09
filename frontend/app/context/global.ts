import { createContext, useState } from 'react';


const GlobalContext = createContext({privateBackendUrl: '', publicBackendUrl: ''});

export function GlobalProvider({ children }) {
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