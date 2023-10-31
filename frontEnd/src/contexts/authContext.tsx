import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { iAddress } from "../pages/Register";

export interface iUser {
  id: string;
  name: string;
  email: string;
  color: string;
  accountType: string;
  cellphone: string;
  cpf: string;
  dateBirth: string;
  description: string;
  address: iAddress
}

interface iAuthContext {
  token: string;
  logOut: () => void;
  getUserProfile: (token: string) => Promise<void>;
  user: iUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<iUser | undefined>>;
};

const AuthContext = createContext({} as iAuthContext);

interface iAuthProviderProps {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: iAuthProviderProps) => {
  const [token, setTokenState] = useState("");
  const [user, setUser] = useState<iUser | undefined>();

  const getUserProfile = async (token: string) => {
    const headers = { Authorization: `Bearer ${token}` };

    await api.get("/profile", { headers })
      .then((res) => {
        localStorage.setItem("@motor_shop:token", token);
        setTokenState(token);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    const localStorageToken = localStorage.getItem("@motor_shop:token");

    if (localStorageToken) {
      await getUserProfile(localStorageToken);
    }
  };

  const logOut = () => {
    localStorage.removeItem("@motor_shop:token");
    setTokenState("");
    setUser(undefined);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ token, logOut, getUserProfile, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
