import { Alert, IconButton, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";

function AlertDownloadApp() {
  const theme = useTheme();
  return (
    <>
      <Alert
        color="primary"
        icon={false}
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Typography variant="body2">
          <Link
            href={"#"}
            style={{
              color: theme.palette.primary.main,
            }}
          >
            Descarga la app
          </Link>{" "}
          de OFNI para una tener mejor experiencia
        </Typography>
      </Alert>
    </>
  );
}

export default AlertDownloadApp;
