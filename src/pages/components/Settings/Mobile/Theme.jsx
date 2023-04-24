import { Divider, Paper, Switch, Typography } from "@mui/material";
import React from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { ThemeContext } from "@/contexts/themeContext";
import { useEffect } from "react";
export default function Theme() {
  const { themeType, toggleTheme } = React.useContext(ThemeContext);
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    if (themeType === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [themeType]);

  const handleChangeDarkMode = (event) => {
    setDarkMode(event.target.checked);
    toggleTheme();
  };
  return (
    <div className="">
      <Paper elevation={0}>
        <div
          className="pt-3 pl-5 pr-5"
          onClick={() => {
            console.log(themeType);
          }}
        >
          <Typography variant="h5">Tema</Typography>
        </div>
        <div className="pt-2 grid grid-cols-1 gap-2 pb-2">
          <div
            className="flex flex-row justify-between cursor-pointer w-full h-12 pl-5 pr-5 items-center"
            onClick={() => {
              toggleTheme();
              setDarkMode(!darkMode);
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <DarkModeRoundedIcon
                sx={{
                  color: "primary.main",
                }}
              />
              &nbsp;&nbsp; Modo oscuro
            </Typography>
            <Switch checked={darkMode} onChange={handleChangeDarkMode} />
          </div>
        </div>
      </Paper>
    </div>
  );
}
