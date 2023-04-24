import { Box, Button, Typography } from "@mui/material";
import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
import Image from "next/image";
import React from "react";

function FootprintComponent() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 h-full">
      <Box
        className="flex flex-col gap-4"
        sx={{
          width: {
            xs: "100%",
            lg: "40%",
          },
        }}
      >
        <Typography variant="h5" fontWeight={800}>
          Reduce tu huella de carbono y ten una mejor noción de lo que tienes en
          tu armario
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.1rem",
          }}
        >
          Con OFNI, podrás tener una mejor noción de lo que tienes en tu armario
          y reducir tu huella de carbono al comprar y vender prendas de segunda
          mano. Nuestro innovador sistema de organización te permitirá
          seleccionar fácilmente las prendas que deseas usar y vender las que ya
          no necesitas. ¡Únete ahora a la comunidad OFNI y descubre cómo
          contribuir a un mundo más consciente!
        </Typography>
      </Box>
      <div
        className="hidden lg:flex flex-row items-center relative"
        style={{
          width: "60%",
        }}
      >
        <Box>
          <Image
            src={"/landing/carbon_footprint.png"}
            width={1800}
            height={500}
            alt="ofni-footprint"
          />
        </Box>
      </div>
    </div>
  );
}

export default FootprintComponent;
