import React, { createContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Cookies from "universal-cookie";

export const ThemeContext = createContext({});
const cookies = new Cookies();

export const ThemeProviderWrapper = ({ children }) => {
  const [themeType, setThemeType] = useState("light");

  const toggleTheme = () => {
    setThemeType(themeType === "light" ? "dark" : "light");
    cookies.set("themeType", themeType === "light" ? "dark" : "light");
  };

  React.useEffect(() => {
    const storedPaletteType = cookies.get("themeType");
    if (storedPaletteType) {
      setThemeType(storedPaletteType);
    }
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    palette: {
      mode: themeType,
      primary: {
        main: "#2c6bed",
      },
      secondary: {
        main: "#FFC0CB",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ themeType, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};
