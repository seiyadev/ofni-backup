import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import VerifyTheme from "../General/verifyTheme";
import { RiNotificationLine } from "react-icons/ri";
import ModalGeneral from "../General/Modal";
import CustomSnackbar from "../General/SnackBarApp";

export default function ModalNotifications() {
  const theme = VerifyTheme();
  const themeMUI = useTheme();
  const modalRef = React.useRef();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState(
    "Todas las notificaciones han sido marcadas como leídas"
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const NotificationNotRead = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: "0.5rem",
          padding: "0.75rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: themeMUI.palette.action.hover,
          },
        }}
      >
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
          alt="Sabas Campuzano"
          sx={{
            width: 64,
            height: 64,
          }}
        />
        <div>
          <Typography variant="body2">
            Sabas Campuzano marcó Chamarra de mezclilla como venta finalizada,
            por favor confirma la venta y califica al comprador.
          </Typography>
          <div className="flex flex-row justify-between items-center mt-1">
            <Typography variant="caption" color={"text.secondary"}>
              Hace 2 horas
            </Typography>
            <Chip
              label={<Typography variant="caption">No leído</Typography>}
              color="primary"
              size="small"
            />
          </div>
        </div>
      </Box>
    );
  };

  const NotificationRead = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          gap: "0.5rem",
          padding: "0.75rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: themeMUI.palette.action.hover,
          },
        }}
      >
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
          alt="Sabas Campuzano"
          sx={{
            width: 64,
            height: 64,
          }}
        />
        <div>
          <Typography variant="body2">
            Sabas Campuzano te ha enviado un mensaje, revisa tu bandeja de
            entrada.
          </Typography>
          <Typography variant="caption" color={"text.secondary"}>
            Hace 2 horas
          </Typography>
        </div>
      </Box>
    );
  };

  const NotificacionContainer = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div
          className="flex flex-col w-fit overflow-y-scroll"
          style={{
            height: "100%",
          }}
        >
          <div className="flex justify-end items-center cursor-pointer -mb-1.5">
            <Typography
              variant="body2"
              color={"primary"}
              sx={{
                paddingTop: "0.25rem",
                paddingRight: "0.75rem",
                "&:hover": {
                  color: "rgb(29 78 216 / 1)",
                },
              }}
              onClick={() => {
                setOpenSnackBar(true);
              }}
            >
              Marcar todo como leído
            </Typography>
          </div>
          <Typography
            variant="body2"
            color={"text.secondary"}
            sx={{
              paddingLeft: "0.75rem",
              paddingBottom: "0.15rem",
            }}
          >
            Notificaciones recientes
          </Typography>
          <NotificationNotRead />
          <Divider />
          <Typography
            variant="body2"
            color={"text.secondary"}
            sx={{
              paddingTop: "0.15rem",
              paddingLeft: "0.75rem",
              paddingBottom: "0.15rem",
            }}
          >
            Notificaciones antiguas
          </Typography>
          <NotificationRead />
          <CustomSnackbar
            open={openSnackBar}
            message={snackBarText}
            severity="info"
            handleClose={handleCloseSnackbar}
            vertical="bottom"
            horizontal="center"
            width="90%"
            animation={false}
          />
        </div>
      );
    }
  };

  return (
    <>
      <ModalGeneral
        title="Notificaciones"
        Content={NotificacionContainer}
        ref={modalRef}
        height="calc(100vh - 4rem)"
        padding="p-0"
      >
        <IconButton
          title="Notificaciones"
          className={
            theme === "dark"
              ? "hover:bg-gray-900 mr-1"
              : "hover:bg-gray-200 mr-1"
          }
          color="inherit"
          sx={{
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          <RiNotificationLine />
        </IconButton>
      </ModalGeneral>
    </>
  );
}
