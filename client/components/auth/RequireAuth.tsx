import React from "react";
import { useAuth } from "@/providers/Auth";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login/signup, preserve attempted location
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
