import RouteGuard from "@/router/RouteGuard";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./HeaderBar";
import SideBar from "./SiderBar";

export default function MainLayout() {
  return (
    <RouteGuard>
      <Box sx={{ display: "flex" }}>
        <Header />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </RouteGuard>
  );
}
