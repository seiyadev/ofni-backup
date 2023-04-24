import { Box, Button, Paper, Typography, Container } from "@mui/material";
import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
import Image from "next/image";
import React from "react";

function AboutUsComponent() {
  const items = [
    {
      imageSrc: "/landing/Enrique.jpeg",
      name: "Enrique Armendáriz",
      role: "Documentador",
    },
    {
      imageSrc: "/landing/Danae.jpg",
      name: "Danae Alvarez",
      role: "Diseñadora y Documentadora",
    },
    {
      imageSrc: "/landing/Diego.jpg",
      name: "Diego García",
      role: "Desarrollador y Documentador",
    },
    {
      imageSrc: "",
      name: "Axel Chávez",
      role: "Líder de proyecto y Desarrollador",
    },
    {
      imageSrc: "/landing/Sabas.jpeg",
      name: "Sabas Campuzano",
      role: "Documentador y Tester",
    },
    {
      imageSrc: "/landing/Melina.jpg",
      name: "Melina Sojo",
      role: "Documentadora",
    },
  ];
  return (
    <div className="flex flex-col items-start justify-center gap-8 h-full">
      <div className="flex flex-col gap-4">
        <Typography variant="h5" fontWeight={800}>
          Nosotros
        </Typography>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 m-auto gap-5">
        {items.map((item, index) => (
          <Paper
            sx={{
              width: {
                xs: 300,
                lg: 320,
                xl: 350,
              },
              height: {
                xs: 320,
                xl: 340,
              },
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            key={index}
          >
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={250}
                height={250}
              />
            </Container>
            <div className="flex flex-col gap-1 text-center">
              <Typography variant="body1" fontWeight={500}>
                {item.name}
              </Typography>
              <Typography variant="body2" fontWeight={400}>
                {item.role}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default AboutUsComponent;
