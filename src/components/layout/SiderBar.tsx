import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const DRAWER_WIDTH = 220;

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/analytics", label: "Analytics", icon: <BarChartIcon /> },
  { path: "/users", label: "Users", icon: <PeopleIcon /> },
  { path: "/orders", label: "Orders", icon: <ShoppingCartIcon /> },
  { path: "/products", label: "Products", icon: <InventoryIcon /> },
  { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
];

export default function SideBar() {
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            selected={pathname.startsWith(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
