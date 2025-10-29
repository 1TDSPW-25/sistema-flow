import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UsuarioType } from "../types/usuario";

type UserContextType = {
  users: Array<UsuarioType>;
  currentUser?: UsuarioType;
  setCurrentUser: (user: UsuarioType) => void;
};

const INITIAL_VALUE = {
  users: [],
  setCurrentUser: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType>(INITIAL_VALUE);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState<UsuarioType>(() => {
    const loggedUser = localStorage.getItem("userLogado");
    if (loggedUser) {
      return JSON.parse(localStorage.getItem("userLogado") || "");
    }

    
    return null;
  });


  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL_BASE}/usuarios`;

    const req = async () => {
      try {
        const getUsers = await fetch(url);
        const userResponse = await getUsers.json();

        setUsers(userResponse);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    req();
  }, []);

  const contextResponse = {
    users,
    currentUser,
    setCurrentUser,
  };

  return (
    <UserContext.Provider value={contextResponse}>
      {children}
    </UserContext.Provider>
  );
};
