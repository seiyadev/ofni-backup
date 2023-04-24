import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import CustomSnackbar from "./SnackBarApp";

function Dropzone({ onUpdate }) {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: async (acceptedFiles) => {
      try {
        const fileReader = new FileReader();
        await setLoading(true);
        if (
          acceptedFiles[0].type === "image/jpeg" ||
          acceptedFiles[0].type === "image/jpg" ||
          acceptedFiles[0].type === "image/png"
        ) {
          await fileReader.readAsDataURL(acceptedFiles[0]);
          fileReader.onload = async () => {
            await onUpdate(fileReader.result);
          };
        } else {
          throw new Error("No es una imagen");
        }
      } catch (error) {
        await new Promise((r) => setTimeout(r, 500));
        await setOpenSnackBar(true);
      } finally {
        await setLoading(false);
      }
    },
    noClick: true,
    noKeyboard: true,
  });
  const style = useMemo(
    () => ({
      ...{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: theme.palette.divider,
        borderStyle: "dashed",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        outline: "none",
        transition: "border .24s ease-in-out",
        width: "500px",
        height: "350px",
      },
      ...(isFocused
        ? {
            borderColor: theme.palette.primary.main,
          }
        : {}),
      ...(isDragAccept
        ? {
            borderColor: theme.palette.primary.main,
          }
        : {}),
      ...(isDragReject
        ? {
            borderColor: theme.palette.error.main,
          }
        : {}),
    }),
    [isDragAccept, isDragReject, isFocused, theme]
  );

  return (
    <>
      <div className="relative">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Typography
            variant="body1"
            component="p"
            color="textSecondary"
            className="text-center"
          >
            Arrastra y suelta una imagen aquí
            <Button
              sx={{
                textTransform: "none",
                color: theme.palette.primary.main,
              }}
              size="small"
              variant="text"
              onClick={open}
            >
              O selecciona una imagen de tu computadora
            </Button>
          </Typography>
        </div>
        {loading && (
          <div className="absolute top-0 right-0 bottom-0 left-0 z-50">
            <Backdrop open={true}>
              <CircularProgress color="primary" />
            </Backdrop>
          </div>
        )}
      </div>
      <CustomSnackbar
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        message="Solo se permiten imagenes en formato JPG, JPEG o PNG"
        severity="error"
        vertical="bottom"
        horizontal="center"
        animation={false}
        width="100%"
      />
    </>
  );
}

export default Dropzone;
