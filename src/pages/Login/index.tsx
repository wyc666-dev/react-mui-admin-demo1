import Auth from "@/api/auth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const data = await Auth({ userName, password });
      localStorage.setItem("token", data.token);
      console.log(password);
      console.log(userName);
      navigate("/dashboard");
    } catch {
      setShowError(true);
    }
  };
  return (
    <Paper>
      <Stack>
        <Box>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button onClick={handleSubmit}>登录</Button>
        </Box>
      </Stack>
      <Snackbar open={showError} onClose={() => setShowError(false)}>
        <Alert>账号密码错误</Alert>
      </Snackbar>
    </Paper>
  );
};
export default Login;
