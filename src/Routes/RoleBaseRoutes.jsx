// src/routes/RoleBasedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/RouteContext";
import { Skeleton } from "@/components/ui/skeleton";

const RoleBasedRoutes = ({ requiredRole }) => {
  const { user, role, loading, sessionChecked } = useAuth();

  // Show loading skeleton while checking auth/role
  if (!sessionChecked || loading)
    return (
      <>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </>
    );
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin routes: allow only if role is "admin"
  if (requiredRole === "admin") {
    return role === "admin" ? <Outlet /> : <Navigate to="/dashboard" />;
  }

  // User routes: allow only if role is not "admin" (assuming non-admins are regular users)
  if (requiredRole === "user") {
    return role !== "admin" ? <Outlet /> : <Navigate to="/admin" />;
  }

  // Default case (shouldn’t happen with proper usage)
  return <Navigate to="/" />;
};

export default RoleBasedRoutes;
