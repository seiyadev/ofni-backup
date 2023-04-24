import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  Divider,
  Fab,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FaTshirt } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useRouter } from "next/router";
import { TbShirt } from "react-icons/tb";
import { Label, LabelOutlined, CloseOutlined } from "@mui/icons-material";
import Image from "next/image";
import Dropzone from "../../General/Dropzone";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const [modalContent, setModalContent] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
  };

  const [image, setImage] = React.useState(null);
  const SettingImage = (imageDrop) => {
    setImage(imageDrop);
  };

  const createGarment = () => {
    return (
      <>
        <div className="pl-3 pt-2 pb-0.5 flex flex-row justify-between items-center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight={"bold"}
          >
            Agregar prenda
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <CloseOutlined />
          </IconButton>
        </div>
        <Divider />
        <div className="p-3">
          <Dropzone onUpdate={SettingImage} />
        </div>
      </>
    );
  };

  const createOutfit = () => {
    return (
      <>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Crear atuendo
        </Typography>
      </>
    );
  };

  const createTag = () => {
    return (
      <>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Crear etiqueta
        </Typography>
      </>
    );
  };

  return (
    <>
      <div>
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleClick}
          className="rounded-none"
        >
          <AddIcon />
          &nbsp;Agregar
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              width: "120px",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setModalContent("garment");
              handleOpenModal();
              handleClose();
            }}
          >
            <Typography variant="body2" className="flex flex-row items-center">
              <TbShirt
                style={{
                  fontSize: "1.15rem",
                }}
              />
              &nbsp;&nbsp;Prenda
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setModalContent("outfit");
              handleOpenModal();
              handleClose();
            }}
          >
            <Typography variant="body2" className="flex flex-row items-center">
              <CheckroomIcon
                sx={{
                  fontSize: "1.15rem",
                }}
              />
              &nbsp;&nbsp;Atuendo
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setModalContent("tag");
              handleOpenModal();
              handleClose();
            }}
          >
            <Typography variant="body2" className="flex flex-row items-center">
              <LabelOutlined
                sx={{
                  fontSize: "1.15rem",
                }}
              />
              &nbsp;&nbsp;Etiqueta
            </Typography>
          </MenuItem>
        </Menu>
      </div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalContent === "garment" ? createGarment() : <></>}
          {modalContent === "outfit" ? createOutfit() : <></>}
          {modalContent === "tag" ? createTag() : <></>}
        </Box>
      </Modal>
    </>
  );
}
