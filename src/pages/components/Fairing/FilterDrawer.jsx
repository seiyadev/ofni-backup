import { Button, IconButton, Typography, useTheme } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import React from "react";
import PriceFilterForm from "./PriceFilterForm";
import Link from "next/link";
import VerifyTheme from "../General/verifyTheme";
import { useRef } from "react";
import Drawer from "../General/Drawer";
import FilterListIcon from "@mui/icons-material/FilterList";
import dynamic from "next/dynamic";
import ModalUbication from "./ModalUbication";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: "none",
  padding: 0,
  margin: 0,
  height: "fit-content",
  marginBottom: theme.spacing(0),
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{
          fontSize: "0.8rem",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "auto",
  backgroundColor: theme.palette.mode === "dark" ? "#353535" : "#f5f5f5",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginRight: theme.spacing(1),
  },
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .2)"
        : "rgba(0, 0, 0, .03)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  paddingLeft: theme.spacing(2),
  backgroundColor: theme.palette.mode === "dark" ? "#353535" : "#f5f5f5",
}));

const Content = () => {
  const themeMUI = useTheme();
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const filtersLinks = [
    {
      name: "Condición de la prenda",
      panel: "panel1",
      links: [
        {
          name: "Nueva",
          href: "/fairing?condition=new",
        },
        {
          name: "Como nueva",
          href: "",
        },
        {
          name: "Usada",
          href: "",
        },
      ],
    },
    {
      name: "Categoría",
      panel: "panel2",
      links: [
        {
          name: "Prendas superiores",
          href: "/fairing?condition=new",
        },
        {
          name: "Prendas inferiores",
          href: "",
        },
        {
          name: "Calzado",
          href: "",
        },
        {
          name: "Accesorios",
          href: "",
        },
        {
          name: "Otros",
          href: "",
        },
      ],
    },
    {
      name: "Material",
      panel: "panel4",
      links: [
        {
          name: "Algodón",
          href: "/fairing?condition=new",
        },
        {
          name: "Cuero",
          href: "",
        },
        {
          name: "Encaje",
          href: "",
        },
        {
          name: "Gamuza",
          href: "",
        },
        {
          name: "Mezclilla",
          href: "",
        },
        {
          name: "Seda",
          href: "",
        },
        {
          name: "Tejido",
          href: "",
        },
        {
          name: "Terciopelo",
          href: "",
        },
      ],
    },
    {
      name: "Patrón",
      panel: "panel5",
      links: [
        {
          name: "Animal print (Estampado de animal)",
          href: "/fairing?condition=new",
        },
        {
          name: "Color sólido",
          href: "",
        },
        {
          name: "Cuadros",
          href: "",
        },
        {
          name: "Encaje",
          href: "",
        },
        {
          name: "Estampado",
          href: "",
        },
        {
          name: "Floral",
          href: "",
        },
        {
          name: "Rayas",
          href: "",
        },
        {
          name: "Rombos",
          href: "",
        },
      ],
    },
    {
      name: "Color",
      panel: "panel6",
      links: [
        {
          name: "Amarillo",
          href: "/fairing?condition=new",
        },
        {
          name: "Azul",
          href: "",
        },
        {
          name: "Beige",
          href: "",
        },
        {
          name: "Blanco",
          href: "",
        },
        {
          name: "Café",
          href: "",
        },
        {
          name: "Gris",
          href: "",
        },
        {
          name: "Morado",
          href: "",
        },
        {
          name: "Negro",
          href: "",
        },
        {
          name: "Naranja",
          href: "",
        },
        {
          name: "Rojo",
          href: "",
        },
        {
          name: "Rosa",
          href: "",
        },
        {
          name: "Verde",
          href: "",
        },
        {
          name: "Colorido",
          href: "",
        },
      ],
    },
    {
      name: "Ocasión de uso",
      panel: "panel7",
      links: [
        {
          name: "Casual",
          href: "/fairing?condition=new",
        },
        {
          name: "Deporte",
          href: "",
        },
        {
          name: "Escuela",
          href: "",
        },
        {
          name: "Familia",
          href: "",
        },
        {
          name: "Fiesta",
          href: "",
        },
        {
          name: "Formal",
          href: "",
        },
        {
          name: "Oficina",
          href: "",
        },
        {
          name: "Otro",
          href: "",
        },
      ],
    },
  ];
  return (
    <>
      <div className="overflow-auto w-fit scroll-smooth">
        <div className="ml-4 mt-3 mr-5 grid grid-cols-1 gap-0">
          <ModalUbication />
          <PriceFilterForm />
          {filtersLinks.map((filter, index) => (
            <div key={index} className="mt-2">
              <Typography variant="body2" fontWeight={"bold"}>
                {filter.name}
              </Typography>
              {filter.links.map((link, index) => (
                <div className="w-fit ml-4" key={index}>
                  <Link href={link.href}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: themeMUI.palette.text.secondary,
                        "&:hover": {
                          color: themeMUI.palette.primary.main,
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

function FilterDrawer() {
  const drawerRef = useRef();
  const themeMUI = useTheme();

  return (
    <Drawer Content={Content} ref={drawerRef} title="Filtros">
      <Typography
        variant="body2"
        color={"primary"}
        className="hover:text-blue-700 flex items-center"
        sx={{
          cursor: "pointer",
        }}
      >
        Filtrar&nbsp;
        <FilterListIcon
          sx={{
            fontSize: "1.2rem",
          }}
        />
      </Typography>
    </Drawer>
  );
}

export default FilterDrawer;
