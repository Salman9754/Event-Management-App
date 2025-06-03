import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "@/pages/Home";
import SignUpPage from "@/pages/SignUpPage";
import Login from "@/pages/Login";
import AdminPage from "@/pages/Dashboard/AdminPage";
import Dashboard from "@/pages/Dashboard/Dashboard";
import RoleBasedRoutes from "./RoleBaseRoutes";
import PublicRoute from "./PublicRoutes";
import CreateEvent from "@/pages/Dashboard/CreateEvent";
import MyEvents from "@/pages/Dashboard/MyEvents";
import Participents from "@/pages/Dashboard/Participents";
import DashboardLayout from "@/Layout/DashboardLayout";
import EditEvent from "@/pages/Dashboard/EditEvent";
import EventDetailPage from "@/pages/Dashboard/EventDetail";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route element={<RoleBasedRoutes requiredRole="admin" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* User Routes */}
        <Route element={<RoleBasedRoutes requiredRole="user" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create_event" element={<CreateEvent />} />
            <Route path="my-events" element={<MyEvents />} />
            <Route path="edit_event/:eventId" element={<EditEvent />} />
            <Route path="event_detail/:eventId" element={<EventDetailPage />} />
            <Route path="participents" element={<Participents />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
