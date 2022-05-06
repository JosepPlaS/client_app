import { createContext, useState } from "react";

const AppContext = createContext({});

export function AppContextProvider({ children, initValue }) {
  const [global, setGlobal] = useState(initValue);
  return (
    <AppContext.Provider value={{ global, setGlobal }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
