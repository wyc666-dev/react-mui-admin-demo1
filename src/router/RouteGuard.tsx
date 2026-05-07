import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  else return children;
};

export default RouteGuard;
