import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("themeMode");
    if(storedMode){
      setMode(storedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }),
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
