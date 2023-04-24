import React from "react";
import { ThemeContext } from "@/contexts/themeContext";

function VerifyTheme() {
  const { themeType, toggleTheme } = React.useContext(ThemeContext);
  return themeType;
}

export default VerifyTheme;
