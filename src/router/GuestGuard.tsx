import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }: { children: ReactNode }) => {
  if (localStorage.getItem("token")) return <Navigate to="/dashboard" />;
  else return children;
};

export default GuestGuard;
