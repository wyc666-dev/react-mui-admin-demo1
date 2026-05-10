import { Box, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

const Settings = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const [systemInfo, setSystemInfo] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <Box>
      <FormControlLabel
        label="邮件通知"
        control={
          <Switch
            checked={emailOpen}
            onChange={(_, checked) => setEmailOpen(checked)}
          />
        }
      />

      <FormControlLabel
        label="系统通知"
        control={
          <Switch
            checked={systemInfo}
            onChange={(_, checked) => setSystemInfo(checked)}
          />
        }
      />

      <FormControlLabel
        label="浅色模式"
        control={
          <Switch
            checked={theme === "light"}
            onChange={(_, checked) => setTheme(checked ? "light" : "dark")}
          />
        }
      />
    </Box>
  );
};

export default Settings;
