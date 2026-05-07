import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7A533C",
      contrastText: "#bcb7cd",
    },
    secondary: {
      main: "#87A86E",
      contrastText: "#3B2416",
    },
    background: {
      default: "#F7EFE5",
      paper: "#FFF9F1",
    },
    text: {
      primary: "#3A2618",
      secondary: "#7A5C48",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
