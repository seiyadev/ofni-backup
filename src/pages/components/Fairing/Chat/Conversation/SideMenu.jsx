import DialogGeneral from "@/pages/components/General/DialogGeneral";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import CustomSnackbar from "@/pages/components/General/SnackBarApp";
function SideMenu() {
  const themeMUI = useTheme();
  const dialogRef = React.useRef(null);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState("");
  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <Paper
        square
        sx={{
          width: "30%",
          height: "calc(100vh - 116px)",
          borderRight: "1px solid " + themeMUI.palette.divider,
          borderLeft: "1px solid " + themeMUI.palette.divider,
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "auto",
        }}
      >
        <div
          className="p-2"
          style={{
            borderTop: "1px solid " + themeMUI.palette.divider,
          }}
        >
          <div id="user-info" className="m-auto flex flex-col gap-4">
            <Typography variant="body1" fontWeight={"bold"}>
              Información del vendedor
            </Typography>
            <div className="flex flex-row justify-start items-center gap-2">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2puj5ClqABGU1qIoMYNAdzSwK0QOCpfznPg&usqp=CAU"
                alt="Sabas Campuzano"
                sx={{
                  width: 64,
                  height: 64,
                }}
              />
              <div className="flex flex-col items-start">
                <Typography variant="body2" fontWeight={"bold"}>
                  Sabas Campuzano
                </Typography>
                <Typography variant="caption" color={"text.secondary"}>
                  @sabas.campuzano
                </Typography>
                <Rating name="read-only" value={4} readOnly size="medium" />
              </div>
            </div>
            <Button
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                marginTop: -1,
              }}
            >
              Ver perfil público
            </Button>
            <Divider />
          </div>

          <div id="post-info" className="m-auto flex flex-col gap-4 mt-2.5">
            <Typography variant="body1" fontWeight={"bold"}>
              Información de la publicación
            </Typography>
            <Image
              className="flex flex-row justify-center m-auto items-center gap-2"
              src="https://via.placeholder.com/400"
              alt="Sabas Campuzano"
              width={400}
              height={400}
            />
            <div className="flex flex-col items-start -mt-3">
              <Typography variant="body2" fontWeight={"bold"}>
                $ 1,000.00
              </Typography>
              <Typography variant="body2" fontWeight={"bold"}>
                Chamarra de mezclilla
              </Typography>
              <div className="h-16 overflow-y-hidden">
                <Typography
                  variant="caption"
                  color={"text.secondary"}
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    lineClamp: 3,
                    textOverflow: "ellipsis",
                  }}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Optio officiis porro nostrum fugiat ut eius labore dolorem
                  amet vero quia molestiae, eveniet placeat nihil mollitia sit
                  corporis? Quia, eaque exercitationem? Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Tempora dicta aliquam enim
                  necessitatibus facere, quaerat quasi minus sequi pariatur
                  aspernatur! Repellendus quas ipsam doloribus laborum.
                  Reiciendis labore itaque asperiores neque.
                </Typography>
              </div>
            </div>
            <Button
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                marginTop: -1,
              }}
            >
              Ver publicación completa
            </Button>
            <Divider />
            <div className="flex flex-col gap-1">
              <DialogGeneral
                ref={dialogRef}
                title="¿Seguro qué quieres marcar esta venta como finalizada?"
                description="Después de marcarla como finalizada, el otro usuario necesitará confirmar que la venta se realizó correctamente. Si no lo hace, la publicación se marcará como finalizada automáticamente y el otro usuario recibirá una penalización."
                onAccept={async () => {
                  await setSnackBarText(
                    "Hecho, espera a que el otro usuario confirme la venta."
                  );
                  await setOpenSnackBar(true);
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  color="success"
                >
                  Marcar como venta finalizada
                </Button>
              </DialogGeneral>
              <DialogGeneral
                ref={dialogRef}
                title="¿Seguro qué quieres eliminar este chat?"
                onAccept={async () => {
                  await setSnackBarText("Chat eliminado satisfactoriamente.");
                  await setOpenSnackBar(true);
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  color="error"
                >
                  Eliminar chat
                </Button>
              </DialogGeneral>
            </div>
          </div>
        </div>
      </Paper>
      <CustomSnackbar
        open={openSnackBar}
        message={snackBarText}
        severity="info"
        handleClose={handleCloseSnackbar}
        vertical="bottom"
        horizontal="left"
        width="fit-content"
        animation={true}
      />
    </>
  );
}

export default SideMenu;
