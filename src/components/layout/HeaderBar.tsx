import cat from "@/images/cat.jpg";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 220;
export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6">wyc666中后台管理系统</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Avatar
          src={cat}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ cursor: "pointer" }}
        />
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => navigate("/profile")}>个人中心</MenuItem>
        <MenuItem>注销</MenuItem>
      </Menu>
    </AppBar>
  );
}
