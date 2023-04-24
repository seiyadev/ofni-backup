import { IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

function HeaderBack() {
  return (
    <div
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        onClick={() => window.history.back()}
        sx={{
          position: "absolute",
        }}
      >
        <ArrowBackIosNewRoundedIcon />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          margin: "auto",
        }}
      >
        Configuración
      </Typography>
    </div>
  );
}

export default HeaderBack;
