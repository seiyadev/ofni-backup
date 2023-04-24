import { Box, Button, Paper, Typography } from "@mui/material";
import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
import Image from "next/image";
import React from "react";
import { TbHash, TbShirt } from "react-icons/tb";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import UpcomingOutlinedIcon from "@mui/icons-material/UpcomingOutlined";

function AboutAppComponent() {
  const items = [
    {
      icon: (
        <TbShirt
          size={100}
          style={{
            marginLeft: "-0.5rem",
          }}
        />
      ),
      title: "Armario",
      description:
        "Registra las prendas de tu armario con un click, crea tus propias ideas de atuendos y mantén un registro de tu ropa sucia.",
    },
    {
      icon: (
        <TbHash
          size={100}
          style={{
            marginLeft: "-0.5rem",
          }}
        />
      ),
      title: "Etiquetas",
      description:
        "Dale un toque personalizado a tu armario creando etiquetas para clasificar tus prendas y atuendos.",
    },
    {
      icon: (
        <LocalGroceryStoreOutlinedIcon
          sx={{
            width: "100px",
            height: "100px",
            marginLeft: "-0.4rem",
          }}
        />
      ),
      title: "Fairing",
      description:
        "Compra y vende ropa nueva o de segunda mano, obtén recomendaciones de precios y encuentra prendas que se ajusten a tu estilo.",
    },
    {
      icon: (
        <UpcomingOutlinedIcon
          sx={{
            width: "100px",
            height: "100px",
            marginLeft: "-0.4rem",
          }}
        />
      ),
      title: "Chat en tiempo real",
      description:
        "Comunicate con tus compradores o vendedores para acordar las entregas y métodos de pago.",
    },
  ];
  return (
    <div className="flex flex-col items-start justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <Typography variant="h5" fontWeight={800}>
          Conoce las principales funciones de OFNI
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4 m-auto lg:justify-between lg:m-0">
        {items.map((item, index) => (
          <Paper
            sx={{
              width: {
                xs: 300,
                lg: 290,
                xl: 320,
              },
              height: 310,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            key={index}
          >
            <div className="flex flex-col gap-1.5">
              {item.icon}
              <Typography variant="h5" fontWeight={500}>
                {item.title}
              </Typography>
            </div>
            <Typography variant="body1">{item.description}</Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default AboutAppComponent;
