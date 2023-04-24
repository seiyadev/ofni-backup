import { Box, Button, Typography } from "@mui/material";
import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
import Image from "next/image";
import React from "react";

function HomeComponent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 h-full">
      <Box
        className="my-auto flex flex-col gap-4"
        sx={{
          width: {
            xs: "100%",
            lg: "40%",
          },
        }}
      >
        <Typography
          variant="h4"
          className="animated-text-gradient"
          sx={{
            fontSize: "2.6rem",
          }}
          fontWeight={800}
        >
          Organiza tu armario
          <br /> y vende la ropa
          <br />
          que ya no uses
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.1rem",
          }}
        >
          OFNI es la solución para organizar tu armario, comprar y vender ropa
          de segunda mano de una forma sencilla.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<AndroidOutlinedIcon />}
            sx={{
              textTransform: "none",
              color: "primary.main",
            }}
          >
            Descarga la app
          </Button>
        </div>
      </Box>
      <div
        className="lg:flex flex-row items-center hidden"
        style={{
          width: "60%",
        }}
      >
        <Box>
          <Image
            src={"/landing/Monitor.png"}
            width={1400}
            height={500}
            alt="ofni-desktop-screenshot"
          />
        </Box>
      </div>
    </div>
  );
}

export default HomeComponent;
