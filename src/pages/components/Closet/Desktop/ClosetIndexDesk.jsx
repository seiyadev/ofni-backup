import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Dialog,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { styled } from "@mui/material/styles";
import VerifyTheme from "../../General/verifyTheme";
import CloseIcon from "@mui/icons-material/Close";

export default function ClosetIndexDesk() {
  const router = useRouter();
  const theme = VerifyTheme();

  const Item = () => {
    return (
      <>
        <Image
          src="https://tecmonterreymx.vtexassets.com/arquivos/ids/169851/Playera-deportiva-BORREGOS-silueta-infantil-azul-2.jpg?v=637780420868400000"
          width={150}
          height={150}
          alt="prenda o atuendo"
          style={{
            border: "1px solid #E5E7EB",
          }}
          layout="responsive"
          objectFit="contain"
          className="cursor-pointer hover:brightness-90 rounded-lg"
        />
      </>
    );
  };

  return (
    <div
      className="grid grid-cols-6 gap-4 overflow-auto pr-3 pl-3"
      style={{
        maxHeight: "100vh",
        width: "100%",
      }}
    >
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}
