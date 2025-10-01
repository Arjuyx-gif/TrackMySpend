import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const login = async (email: string, _password: string) => {
    const u = { id: "u1", name: email.split("@")[0], email };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const signup = async (name: string, email: string, _password: string) => {
    const u = { id: "u1", name, email };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const demoLogin = () => {
    const u = { id: "demo", name: "Demo User", email: "demo@example.com" };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(() => ({ user, login, signup, demoLogin, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
