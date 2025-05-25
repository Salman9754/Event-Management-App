import React from "react";
import { useAuth } from "@/context/RouteContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, role, sessionChecked } = useAuth();

  if (!sessionChecked || (user && !role)) {
    return null;
  }

  if (user) {
    return role === "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
