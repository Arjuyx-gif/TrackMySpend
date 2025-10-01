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

  const login = async (email: string, password: string) => {
    // Simple client-side validation and demo account support.
    // Demo credentials: username 'demo' with password 'demo' OR 'demo@example.com' / 'demo'
    const isDemo = (email === "demo" || email === "demo@example.com") && password === "demo";
    const looksLikeEmail = /@/.test(email);
    if (!isDemo && (!looksLikeEmail || password.length < 6)) {
      // Reject invalid credentials
      throw new Error("Invalid credentials");
    }

    const u = { id: isDemo ? "demo" : Math.random().toString(36).slice(2), name: (isDemo ? "Demo User" : email.split("@")[0]), email };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!/@/.test(email) || password.length < 6) throw new Error("Invalid signup");
    const u = { id: Math.random().toString(36).slice(2), name, email };
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
