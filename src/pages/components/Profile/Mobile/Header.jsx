import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Paper,
  Rating,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { MdOutlineWeb } from "react-icons/md";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export default function HeaderMobile() {
  const [isYourProfile, setIsYourProfile] = React.useState(true);
  const FullNameInitials = (...words) => {
    let initials = "";
    for (const word of words) {
      initials += word.charAt(0).toUpperCase();
    }
    return initials;
  };

  const [openDrawerEditProfile, setOpenDrawerEditProfile] =
    React.useState(false);

  const handleOpenDrawerEditProfile = () => {
    setOpenDrawerEditProfile(true);
  };

  const handleCloseDrawerEditProfile = () => {
    setOpenDrawerEditProfile(false);
  };

  return (
    <>
      <div
        style={{
          height: 390,
        }}
        elevation={1}
        variant="outlined"
      >
        <Paper
          elevation={5}
          sx={{
            height: 250,
          }}
        >
          <Image
            src={"/bg.jpg"}
            alt="foto de portada de user"
            width={600}
            height={200}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Paper>
        <Divider />
        <div className="m-auto w-fit absolute top-64 right-0 left-0">
          <div className="flex items-center justify-between">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
              sx={{
                width: 150,
                height: 150,
                backgroundColor: "#2c6bed",
                border: "4px solid #fff",
                margin: "auto",
              }}
              alt="Axel Chávez"
              className="-ml-16"
            >
              <p className="text-white text-4xl">
                {FullNameInitials("Axel", "Chávez")}
              </p>
            </Avatar>
            <div className="mt-5 ml-3 text-left">
              <Typography variant="h5">Axel Chávez</Typography>
              <Typography variant="body2" className="italic -mt-1.5">
                @holayosoyaxel
              </Typography>
            </div>
          </div>
        </div>
        {isYourProfile ? (
          <div className="flex justify-end mt-24 mr-2">
            <Button
              sx={{
                textTransform: "none",
              }}
              variant="contained"
              size="small"
              color="primary"
              onClick={handleOpenDrawerEditProfile}
            >
              <EditRoundedIcon fontSize="small" />
              &nbsp;Editar perfil
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Divider />
      <SwipeableDrawer
        open={openDrawerEditProfile}
        onClose={handleCloseDrawerEditProfile}
        onOpen={handleOpenDrawerEditProfile}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
          },
        }}
      >
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="mt-3 mb-2"
        >
          <IconButton
            onClick={handleCloseDrawerEditProfile}
            sx={{
              position: "absolute",
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div className="m-auto">
            <Typography variant="body1">Editar perfil</Typography>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <div className="pl-2">
            <Typography variant="h6">Foto de perfil</Typography>
          </div>
          <div className="mt-1 m-auto">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
              sx={{
                width: 120,
                height: 120,
                margin: "auto",
              }}
              alt="Axel Chávez"
            >
              <p className="text-white text-4xl">
                {FullNameInitials("Axel", "Chávez")}
              </p>
            </Avatar>
            <Button
              className="btn-outlined"
              variant="text"
              size="small"
              sx={{
                textTransform: "none",
                width: "fit-content",
              }}
            >
              <Typography variant="caption">Cambiar foto de perfil</Typography>
            </Button>
          </div>
          <div className="pl-2">
            <Typography variant="h6">Foto de portada</Typography>
          </div>
          <div className="mt-2 flex flex-col justify-center">
            <Image
              src={"/bg.jpg"}
              alt="foto de portada de user"
              width={600}
              height={200}
              style={{
                objectFit: "cover",
                width: "90%",
                height: "90%",
                margin: "auto",
                borderRadius: 10,
              }}
            />
            <Button
              className="btn-outlined"
              variant="text"
              size="small"
              sx={{
                textTransform: "none",
                width: "fit-content",
                margin: "auto",
              }}
            >
              <Typography variant="caption">Cambiar foto de portada</Typography>
            </Button>
          </div>
          <div className="p-2 grid grid-cols-1 gap-3">
            <TextField
              id="name"
              label="Nombre"
              variant="standard"
              helperText="Máximo 20 caracteres, no se puede usar números ni caracteres especiales."
              fullWidth
            />
            <TextField
              id="username"
              label="Nombre de usuario"
              variant="standard"
              helperText="Máximo 15 caracteres, se puede usar letras, números y guiones bajos."
              fullWidth
            />
            <TextField
              id="bio"
              label="Biografía"
              variant="standard"
              helperText="Máximo 120 caracteres."
              multiline
              fullWidth
            />
          </div>
          <div className="p-2 flex justify-end">
            <Button
              className="btn-outlined"
              sx={{
                textTransform: "none",
              }}
              size="large"
              variant="text"
            >
              Guardar
            </Button>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}
