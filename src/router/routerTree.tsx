import MainLayout from "@/components/layout/MainLayout";
import Analytics from "@/pages/Analytics";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Orders from "@/pages/Orders";
import Products from "@/pages/Products";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Users from "@/pages/Users";
import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestGuard from "./GuestGuard";

const routeConfig = [
  {
    path: "/login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 你的页面飞走啦!</div>,
  },
];

export const rawRoutes = createBrowserRouter(routeConfig);
