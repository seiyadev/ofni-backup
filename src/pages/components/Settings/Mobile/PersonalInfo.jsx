// Reemplazar el estado isEmailConfirmed por la variable isEmailVerified del usuario
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  SvgIcon,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, Fragment, useRef } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { AiOutlineUserDelete } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTheme } from "@mui/material";
import Image from "next/image";

function PersonalInfo() {
  const theme = useTheme();
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isOpenDrawerEmail, setIsOpenDrawerEmail] = useState(false);
  const [isOpenNumberPhone, setIsOpenNumberPhone] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [openSnackBarEmailChanged, setOpenSnackBarEmailChanged] =
    useState(false);
  const [openSnackBarVerifyEmail, setOpenSnackBarVerifyEmail] = useState(false);
  const [openDeletePhoneNumber, setOpenDeletePhoneNumber] = useState(false);
  const [openSnackBarPhoneNumberDeleted, setOpenSnackBarPhoneNumberDeleted] =
    useState(false);
  const [openInsertCodeAddPhoneNumber, setOpenInsertCodeAddPhoneNumber] =
    useState(false);
  const [isButtonReSendDisabled, setIsButtonReSendDisabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [openSnackBarPhoneNumberAdded, setOpenSnackBarPhoneNumberAdded] =
    useState(false);
  const [openConfirmDeleteAccount, setOpenConfirmDeleteAccount] =
    useState(false);

  const handleDrawerEmailOpen = () => setIsOpenDrawerEmail(true);
  const handleDrawerEmailClose = () => setIsOpenDrawerEmail(false);

  const handleDrawerNumberPhoneOpen = () => setIsOpenNumberPhone(true);
  const handleDrawerNumberPhoneClose = () => setIsOpenNumberPhone(false);

  const handleDrawerDeleteAccountOpen = () => setIsDeleteAccount(true);
  const handleDrawerDeleteAccountClose = () => setIsDeleteAccount(false);

  const handleCloseSnackBarEmailChanged = () =>
    setOpenSnackBarEmailChanged(false);

  const handleCloseSnackBarVerifyEmail = () =>
    setOpenSnackBarVerifyEmail(false);

  const handleCloseSnackBarPhoneNumberAdded = () =>
    setOpenSnackBarPhoneNumberAdded(false);

  const handleCloseSnackBarPhoneNumberDeleted = () => {
    setOpenSnackBarPhoneNumberDeleted(false);
  };

  const handleCloseConfirmDeleteAccount = () =>
    setOpenConfirmDeleteAccount(false);

  const handleCloseDeletePhoneNumber = () => setOpenDeletePhoneNumber(false);
  const handleDeletePhoneNumber = () => {
    console.log("deleting phone number");
    setOpenDeletePhoneNumber(false);
    setOpenSnackBarPhoneNumberDeleted(true);
  };

  const SendCodeAddPhoneNumber = () => {
    // aqui se envia el codigo de verificacion
    setOpenInsertCodeAddPhoneNumber(true);
    setIsButtonReSendDisabled(true);
    setSecondsRemaining(60);
    setTimeout(() => {
      setIsButtonReSendDisabled(false);
    }, 60000);
  };

  const handleDeleteAccount = () => {
    console.log("deleting account");
    setOpenConfirmDeleteAccount(false);
  };

  const handleOpenConfirmDeleteAccount = () =>
    setOpenConfirmDeleteAccount(true);

  const verifyCodeAddPhoneNumberAndAdd = () => {
    console.log("adding phone number", otp.join(""));
    setOpenInsertCodeAddPhoneNumber(false);
    setOpenSnackBarPhoneNumberAdded(true);
  };

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index === inputRefs.length - 1) {
        inputRefs[index].current.blur();
      } else {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  useEffect(() => {
    let intervalId;

    if (isButtonReSendDisabled && secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isButtonReSendDisabled, secondsRemaining]);

  return (
    <div className="-mt-1">
      <Paper elevation={0}>
        <div className="pt-3 pl-5 pr-5">
          <Typography variant="h5">Cuenta</Typography>
        </div>
        <div className="pt-2 grid grid-cols-1 gap-2 pb-2">
          <div
            className="flex flex-row justify-between cursor-pointer w-full h-12 pl-5 pr-5 items-center"
            onClick={handleDrawerEmailOpen}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <EmailRoundedIcon
                sx={{
                  color: "primary.main",
                }}
              />
              &nbsp;&nbsp; Correo electrónico
            </Typography>
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: 12,
              }}
            />
          </div>
          <div
            className="flex flex-row justify-between cursor-pointer w-full h-12 pl-5 pr-5 items-center"
            onClick={handleDrawerNumberPhoneOpen}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalPhoneRoundedIcon
                sx={{
                  color: "primary.main",
                }}
              />
              &nbsp;&nbsp; Número de teléfono
            </Typography>
            <ArrowForwardIosRoundedIcon
              sx={{
                fontSize: 12,
              }}
            />
          </div>
          <div
            className="flex flex-row justify-between cursor-pointer w-full h-12 pl-5 pr-5 items-center"
            onClick={handleDrawerDeleteAccountOpen}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlineUserDelete
                style={{
                  color: theme.palette.primary.main,
                  fontSize: 24,
                }}
              />
              &nbsp;&nbsp; Eliminar cuenta
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
        open={isOpenDrawerEmail}
        onClose={handleDrawerEmailClose}
        onOpen={handleDrawerEmailOpen}
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
            onClick={handleDrawerEmailClose}
            sx={{
              position: "absolute",
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div className="m-auto">
            <Typography variant="body1">Correo electrónico</Typography>
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-row items-center">
            <EmailRoundedIcon
              sx={{
                color: "primary.main",
                fontSize: 30,
                marginRight: 0.5,
              }}
            />
            <Typography variant="h6">axelherrerauwu@gmail.com</Typography>
          </div>
          <div className="mt-5">
            {isEmailConfirmed ? (
              <Typography variant="body2">
                Verificado
                <VerifiedIcon
                  color="success"
                  sx={{
                    fontSize: 14,
                    marginLeft: 0.2,
                  }}
                />
              </Typography>
            ) : (
              <Typography variant="body2">No verificado</Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                marginTop: 0.5,
              }}
              {...(isEmailConfirmed ? { disabled: true } : {})}
              onClick={() => setOpenSnackBarVerifyEmail(true)}
            >
              Verificar correo electrónico
            </Button>
            <Divider variant="fullWidth" className="mt-2" />
            <div className="mt-5">
              <Typography variant="body2">Editar correo electrónico</Typography>
            </div>
          </div>
          <div className="mt-2">
            <TextField
              id="email"
              variant="outlined"
              label="Nuevo correo electrónico"
              fullWidth
            />
          </div>
          <div className="mt-2">
            <TextField
              id="password"
              variant="outlined"
              label="Confirmar contraseña"
              type="password"
              fullWidth
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button
              sx={{
                textTransform: "none",
              }}
              variant="contained"
              color="primary"
              onClick={() => setOpenSnackBarEmailChanged(true)}
            >
              Guardar
            </Button>
          </div>
        </div>
      </SwipeableDrawer>
      <Snackbar
        open={openSnackBarVerifyEmail}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarVerifyEmail}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBarVerifyEmail}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert
          onClose={handleCloseSnackBarVerifyEmail}
          severity="info"
          sx={{ width: "100%" }}
        >
          Se ha enviado un correo de verificación, sigue las instrucciones para
          verificar tu correo electrónico.
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackBarEmailChanged}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarEmailChanged}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBarEmailChanged}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert
          onClose={handleCloseSnackBarEmailChanged}
          severity="info"
          sx={{ width: "100%" }}
        >
          ¡Listo! Enviamos un correo de confirmación a tu nueva dirección. Por
          favor, verifica y sigue las instrucciones para completar el cambio.
        </Alert>
      </Snackbar>

      <SwipeableDrawer
        anchor="right"
        open={isOpenNumberPhone}
        onClose={handleDrawerNumberPhoneClose}
        onOpen={handleDrawerNumberPhoneOpen}
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
            onClick={handleDrawerNumberPhoneClose}
            sx={{
              position: "absolute",
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div className="m-auto">
            <Typography variant="body1">Número de telefono</Typography>
          </div>
        </div>
        <div className="p-3">
          {!true ? (
            <>
              <div className="flex flex-row items-center">
                <LocalPhoneRoundedIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 30,
                    marginRight: 0.5,
                  }}
                />
                <Typography variant="h6">5546921204</Typography>
              </div>
              <div className="mt-5">
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "none",
                    marginTop: 0.5,
                  }}
                  onClick={() => setOpenDeletePhoneNumber(true)}
                >
                  Eliminar número de teléfono
                </Button>
              </div>
            </>
          ) : (
            <>
              <Typography variant="body2">
                No tienes un número de teléfono registrado, agrega uno para
                poder vender tus prendas y tener más opciones de seguridad.
              </Typography>
              <TextField
                label="Número de teléfono"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{
                        paddingRight: "14px",
                      }}
                    >
                      <Image
                        src={"/flag.svg"}
                        width={28}
                        height={28}
                        alt="Mexican Flag"
                      />
                      &nbsp;+52
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                helperText="Válido solo para México"
                fullWidth
              />
              <div className="flex justify-end mt-1">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={SendCodeAddPhoneNumber}
                >
                  Agregar
                </Button>
              </div>
            </>
          )}
        </div>
      </SwipeableDrawer>
      <Dialog open={openInsertCodeAddPhoneNumber}>
        <DialogContent id="alert-dialog-title" variant="body2">
          <Typography variant="body1">
            Ingresa el código de verificación que te enviamos a tu número de
            teléfono.
          </Typography>
          <div className="grid grid-cols-5 gap-2 -mb-5">
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={inputRefs[index]}
                inputProps={{ maxLength: 1 }}
                style={{ width: "3rem", marginRight: "0.5rem" }}
                variant="outlined"
                margin="dense"
                value={digit}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isButtonReSendDisabled}
            onClick={SendCodeAddPhoneNumber}
            sx={{ textTransform: "none" }}
          >
            {isButtonReSendDisabled
              ? `Reenviar en ${secondsRemaining}s`
              : "Reenviar"}
          </Button>
          <Button
            onClick={verifyCodeAddPhoneNumberAndAdd}
            sx={{ textTransform: "none" }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBarPhoneNumberAdded}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarPhoneNumberAdded}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBarPhoneNumberAdded}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert
          onClose={handleCloseSnackBarPhoneNumberAdded}
          severity="success"
          sx={{ width: "100%" }}
        >
          Número de teléfono agregado correctamente
        </Alert>
      </Snackbar>

      <Dialog
        open={openDeletePhoneNumber}
        onClose={handleCloseDeletePhoneNumber}
      >
        <DialogTitle id="alert-dialog-title" variant="body1">
          ¿Estás seguro de que quieres eliminar tu número de teléfono?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCloseDeletePhoneNumber}
            className="normal-case"
          >
            No, cancelar
          </Button>
          <Button
            onClick={handleDeletePhoneNumber}
            className="normal-case"
            autoFocus
          >
            Si, eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBarPhoneNumberDeleted}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarPhoneNumberDeleted}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBarPhoneNumberDeleted}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert
          onClose={handleCloseSnackBarPhoneNumberDeleted}
          severity="success"
          sx={{ width: "100%" }}
        >
          Número de teléfono eliminado correctamente
        </Alert>
      </Snackbar>

      <SwipeableDrawer
        anchor="right"
        open={isDeleteAccount}
        onClose={handleDrawerDeleteAccountClose}
        onOpen={handleDrawerDeleteAccountOpen}
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
            onClick={handleDrawerDeleteAccountClose}
            sx={{
              position: "absolute",
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div className="m-auto">
            <Typography variant="body1">Eliminar cuenta</Typography>
          </div>
        </div>
        <div className="p-3">
          <Typography variant="body2">
            Si eliminas tu cuenta, no podrás recuperar el contenido de tu
            armario o publicaciones. Si quieres volver a usar OFNI, deberás
            crear una nueva cuenta.
          </Typography>
          <div className="mt-5">
            <TextField
              id="password"
              variant="outlined"
              label="Contraseña"
              helperText="Confirma tu contraseña para eliminar tu cuenta"
              type="password"
              fullWidth
            />
            <div className="mt-2 flex justify-end">
              <Button
                variant="contained"
                color="error"
                sx={{
                  textTransform: "none",
                }}
                onClick={handleOpenConfirmDeleteAccount}
              >
                Eliminar cuenta
              </Button>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
      <Dialog
        open={openConfirmDeleteAccount}
        onClose={handleCloseConfirmDeleteAccount}
      >
        <DialogTitle id="alert-dialog-title" variant="body1">
          Confirma nuevamente que quieres eliminar tu cuenta
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmDeleteAccount}
            className="normal-case"
          >
            No, cancelar
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className="normal-case"
            autoFocus
          >
            Si, eliminar cuenta
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PersonalInfo;
