import { Box, Divider, IconButton, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import IsWide from "../General/isWide";
import ModalGeneral from "../General/Modal";
import { useRef } from "react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../General/MapView"), { ssr: false });

function ModalUbication() {
  const isWide = IsWide();
  const modalRef = useRef();
  const city = useSelector((state) => state.ubication.city);

  return (
    <>
      <Typography variant="body2" fontWeight={"bold"}>
        Ubicación
      </Typography>

      <ModalGeneral Content={MapView} title="Ubicación" ref={modalRef}>
        <div className="flex items-center justify-start cursor-pointer  w-fit my-auto h-fit">
          <Typography
            color="primary"
            variant="caption"
            className="hover:text-blue-700"
          >
            {city === ""
              ? "Sin ubicación seleccionada"
              : city + " | " + "Radio de 10 kilómetros"}
          </Typography>
        </div>
      </ModalGeneral>
    </>
  );
}

export default ModalUbication;
