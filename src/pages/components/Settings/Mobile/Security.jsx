import {
  Button,
  Divider,
  IconButton,
  Paper,
  SwipeableDrawer,
  TextField,
  Typography,
  Switch,
} from "@mui/material";
import React from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export default function Security() {
  const label = { inputProps: { "aria-label": "Size switch demo" } };

  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [openTwoFactor, setOpenTwoFactor] = React.useState(false);
  const handleDrawerChangePasswordOpen = () => setOpenChangePassword(true);
  const handleDrawerChangePasswordClose = () => setOpenChangePassword(false);
  const handleDrawerTwoFactorOpen = () => setOpenTwoFactor(true);
  const handleDrawerTwoFactorClose = () => setOpenTwoFactor(false);
  const [codeByEmailChecked, setCodeByEmailChecked] = React.useState(false);
  const [codeByPhoneChecked, setCodeByPhoneChecked] = React.useState(false);

  const handleChangeEmailCheked = (event) => {
    setCodeByEmailChecked(event.target.checked);
    console.log("Two-factor email", event.target.checked);
  };

  const handleChangeEmailChekedDiv = () => {
    setCodeByEmailChecked(!codeByEmailChecked);
    console.log("Two-factor email", !codeByEmailChecked);
  };

  const handleChangePhoneCheked = (event) => {
    setCodeByPhoneChecked(event.target.checked);
    console.log("Two-factor phone", event.target.checked);
  };

  const handleChangePhoneChekedDiv = () => {
    setCodeByPhoneChecked(!codeByPhoneChecked);
    console.log("Two-factor phone", !codeByPhoneChecked);
  };

  const handleChangePassword = () => {
    console.log("Change password");
  };

  return (
    <div className="">
      <Paper elevation={0}>
        <div className="pt-3 pl-5 pr-5">
          <Typography variant="h5">Seguridad</Typography>
        </div>
        <div className="pt-2 grid grid-cols-1 gap-2 pb-2">
          <div
            className="flex flex-row justify-between cursor-pointer w-full h-12 pl-5 pr-5 items-center"
            onClick={handleDrawerChangePasswordOpen}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LockRoundedIcon
                sx={{
                  color: "primary.main",
                }}
              />
              &nbsp;&nbsp; Cambiar contraseña
            </Typography>
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: 12,
              }}
            />
          </div>
          <div
            className="flex flex-row justify-between cursor-pointer w-full h-12 pl-5 pr-5 items-center"
            onClick={handleDrawerTwoFactorOpen}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <SecurityRoundedIcon
                sx={{
                  color: "primary.main",
                }}
              />
              &nbsp;&nbsp; Verificación en dos pasos
            </Typography>
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: 12,
              }}
            />
          </div>
        </div>
      </Paper>
      <Divider variant="middle" />
      <SwipeableDrawer
        anchor="right"
        open={openChangePassword}
        onClose={handleDrawerChangePasswordClose}
        onOpen={handleDrawerChangePasswordOpen}
        swipeAreaWidth={10}
        sx={{
          "& .MuiDrawer-paperAnchorRight": {
            width: "100%",
          },
        }}
      >
        <div
          style={{
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="mt-3 mb-1"
        >
          <IconButton
            onClick={handleDrawerChangePasswordClose}
            sx={{
              position: "absolute",
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div className="m-auto">
            <Typography variant="body1">Cambiar contraseña</Typography>
          </div>
        </div>
        <div className="p-3">
          <div>
            <TextField
              id="current-password"
              variant="outlined"
              label="Contraseña actual"
              type="password"
              fullWidth
            />
          </div>
          <div className="mt-3">
            <TextField
              id="new-password"
              variant="outlined"
              label="Nueva contraseña"
              type="password"
              fullWidth
            />
          </div>
          <div className="mt-3">
            <TextField
              id="Confirm-new-password"
              variant="outlined"
              label="Confirmar nueva contraseña"
              type="password"
              fullWidth
            />
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              onClick={handleChangePassword}
            >
              Cambiar contraseña
            </Button>
          </div>
        </div>
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor="right"
        open={openTwoFactor}
        onClose={handleDrawerTwoFactorClose}
        onOpen={handleDrawerTwoFactorOpen}
        swipeAreaWidth={10}
        sx={{
          "& .MuiDrawer-paperAnchorRight": {
            width: "100%",
          },
        }}
      >
        <div
          style={{
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="mt-3 mb-1"
        >
          <IconButton
            onClick={handleDrawerTwoFactorClose}
            sx={{
              position: "absolute",
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div className="m-auto">
            <Typography variant="body1">Verificación en dos pasos</Typography>
          </div>
        </div>
        <div className="p-3">
          <Typography variant="body2">
            La verificación en dos pasos agrega una capa adicional de seguridad
            a tu cuenta. Cuando la activas, te pediremos que ingreses un código
            de verificación cada vez que inicies sesión.
          </Typography>
          <div className="mt-5">
            <Divider variant="fullWidth" />
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={handleChangeEmailChekedDiv}
            >
              <EmailRoundedIcon
                sx={{
                  color: "primary.main",
                  fontSize: 28,
                  mr: -7,
                }}
              />
              <Typography variant="body1">
                Enviar un código por correo
              </Typography>
              <Switch
                checked={codeByEmailChecked}
                onChange={handleChangeEmailCheked}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <Divider variant="fullWidth" className="mt-5" />
            <div
              className="flex flex-row justify-between items-center cursor-pointer"
              onClick={handleChangePhoneChekedDiv}
            >
              <div className="flex flex-row items-center">
                <ChatIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 28,
                    mr: 1,
                  }}
                />
                <Typography variant="body1">Enviar un código SMS</Typography>
              </div>
              <Switch
                checked={codeByPhoneChecked}
                onChange={handleChangePhoneCheked}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
