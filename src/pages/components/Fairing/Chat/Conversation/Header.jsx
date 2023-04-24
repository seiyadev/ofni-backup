import { MoreOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import OptionsMenu from "./OptionsMenu";

function Header() {
  const themeMUI = useTheme();
  return (
    <Paper
      square
      style={{
        borderBottom: "1px solid " + themeMUI.palette.divider,
        borderRight: "1px solid " + themeMUI.palette.divider,
        borderLeft: "1px solid " + themeMUI.palette.divider,
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="flex items-center flex-row justify-between w-full pl-2 pr-2 pb-1 pt-1 h-12">
        <div className="flex items-center flex-row">
          <Avatar
            src="https://m.media-amazon.com/images/I/71rep9bKxvL._AC_SY550_.jpg"
            sx={{
              width: 32,
              height: 32,
              objectFit: "cover",
            }}
            alt="Chamarra de mezclilla"
          />
          <div className="ml-2">
            <Typography variant="body1">Chamarra de mezclilla</Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.775rem",
                mt: -0.5,
              }}
            >
              Chat con Sabas Campuzano
            </Typography>
          </div>
        </div>
        <OptionsMenu />
      </div>
    </Paper>
  );
}

export default Header;
