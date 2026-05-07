import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import routes from "./router/index";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
