import { Divider, Paper, Switch, Typography } from "@mui/material";
import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function LogOut() {
  return (
    <div className="mt-1">
      <div className="grid grid-cols-1 pb-2 gap-2">
        <div
          className="flex flex-row justify-between cursor-pointer w-fit h-12 ml-5 items-center"
          onClick={() => {
            console.log("LogOut");
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            color="error"
          >
            <LogoutOutlinedIcon />
            &nbsp;&nbsp; Cerrar sesión
          </Typography>
        </div>
      </div>
    </div>
  );
}
