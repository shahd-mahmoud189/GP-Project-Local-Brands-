"use client";
import { createContext, ReactNode, useState } from "react";
import { getToken } from "../server/auth.actions";

export type AuthContextType = {
  token: string | null;
  refreshToken: string | null;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
};

const defaultValues: AuthContextType = {
  token: "",
  refreshToken: "",
  setToken: () => {},
  setRefreshToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValues);

export default function AuthContextProvider({
  children,
  initialToken,
  initialRefreshToken,
}: {
  children: ReactNode;
  initialToken: string | null;
  initialRefreshToken: string | null;
}) {
  const [token, setToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);

  

  return (
    <AuthContext.Provider
      value={{ token, setToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
