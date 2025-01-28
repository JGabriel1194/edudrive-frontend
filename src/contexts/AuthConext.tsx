// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import  decodeToken  from "../utils/decodeToken";
import { getUserById } from "../services/userService";
import { MappedUser, mapUserResponse } from "../interfaces/UserInterface";

interface AuthContextType {
  user: MappedUser | null;
  loading: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MappedUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (token: string) => {
    try {
      localStorage.setItem("token", token);
      const decoded = decodeToken(token);
      const queryParams = 'populate[role][fields][0]=name&populate[profileimage][fields]=formats';
      const userData = await  getUserById(decoded.id, queryParams);
      const mappedUser = mapUserResponse(userData);
      setUser(mappedUser);
    } catch (error) {
      console.error("Invalid token:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      login(token);
    } else {
      setLoading(false);
    }
  },[]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
