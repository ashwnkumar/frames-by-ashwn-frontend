import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = localStorage.getItem("adminToken");

    if (checkAdmin) setIsAdmin(true);
  }, []);

  return (
    <GlobalContext.Provider value={{ loading, setLoading, isAdmin }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
