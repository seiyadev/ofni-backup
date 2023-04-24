import React from "react";
import {
  Button,
  IconButton,
  SwipeableDrawer,
  Typography,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogContent,
  Snackbar,
  TextField,
  Alert,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { CirclePicker, GithubPicker } from "react-color";
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import IsWide from "../General/isWide";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

function FilterDrawer() {
  const router = useRouter();
  const isWide = IsWide();
  const [open, setOpen] = React.useState(false);
  const [openDeleteTag, setOpenDeleteTag] = React.useState(false);
  const [openSnackBarTagDeleted, setOpenSnackBarTagDeleted] =
    React.useState(false);
  const [openCreateTag, setOpenCreateTag] = React.useState(false);
  const [tagColor, setTagColor] = React.useState("#607d8b");
  const [openSnackBarTagCreated, setOpenSnackBarTagCreated] =
    React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(!open);

  const handleOpenDeleteTag = () => {
    setOpenDeleteTag(true);
  };

  const handleCancelDeleteTag = () => {
    setOpenDeleteTag(false);
  };

  const handleDeleteTag = () => {
    console.log("deleting tag");
    setOpenSnackBarTagDeleted(true);
    setOpenDeleteTag(false);
  };

  const handleCloseSnackBarTagDeleted = () => {
    setOpenSnackBarTagDeleted(false);
  };

  const handleCloseCreateTag = () => {
    setOpenCreateTag(false);
  };

  const handleOpenCreateTag = () => {
    setOpenCreateTag(true);
  };

  const handleCreateTag = () => {
    setOpenCreateTag(false);
    setOpenSnackBarTagCreated(true);
  };

  const handleCloseSnackBarTagCreated = () => {
    setOpenSnackBarTagCreated(false);
  };

  return (
    <div className="">
      <div
        className="flex items-center hover:text-blue-800 cursor-pointer mr-5"
        color="primary"
        onClick={handleDrawerToggle}
      >
        <FilterAltOutlinedIcon className="text-md" />
      </div>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        swipeAreaWidth={10}
        sx={
          isWide
            ? {
                "& .MuiDrawer-paperAnchorRight": {
                  width: "30%",
                },
              }
            : {
                "& .MuiDrawer-paperAnchorRight": {
                  width: "80%",
                },
              }
        }
      >
        <div className="flex flex-row mt-2 mb-2 justify-center items-center">
          <IconButton
            sx={{
              position: "absolute",
              left: "0",
            }}
            onClick={handleDrawerClose}
          >
            <CloseIcon />
          </IconButton>
          <p className="text-center m-auto text-lg">Filtrar</p>
        </div>
        <div className="flex flex-row min-w-full items-center pr-3 pl-3 pb-3">
          <div
            className="w-full rounded-sm"
            style={{
              backgroundColor: "#E5E5E5",
            }}
          >
            <div>
              <Typography
                variant="body2"
                className="items-center ml-3 py-3 text-black"
              >
                Etiqueta 1
              </Typography>
            </div>
          </div>
          <IconButton className="-mr-2" onClick={handleOpenDeleteTag}>
            <DeleteIcon className="text-xl cursor-pointer" />
          </IconButton>
        </div>
        <div className="pr-3 pl-3">
          <Button
            className="btn-outlined"
            sx={{
              textTransform: "none",
            }}
            variant="outlined"
            size="large"
            onClick={handleOpenCreateTag}
            fullWidth
          >
            <AddRoundedIcon /> Crear etiqueta nueva
          </Button>
        </div>
      </SwipeableDrawer>

      {/** Dialog to confirm delete tag */}
      <Dialog
        open={openDeleteTag}
        onClose={handleCancelDeleteTag}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="body1">
          ¿Estás seguro de que quieres eliminar esta etiqueta?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDeleteTag} className="normal-case">
            No, cancelar
          </Button>
          <Button onClick={handleDeleteTag} className="normal-case" autoFocus>
            Si, eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBarTagDeleted}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarTagDeleted}
      >
        <Alert
          onClose={handleCloseSnackBarTagDeleted}
          severity="info"
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackBarTagDeleted}
                className="normal-case"
              >
                Deshacer
              </Button>
            </React.Fragment>
          }
          sx={{ width: "100%" }}
        >
          Etiqueta eliminada
        </Alert>
      </Snackbar>

      {/** Dialog to create new tag */}
      <Dialog open={openCreateTag} onClose={handleCloseCreateTag}>
        <DialogTitle id="alert-dialog-title" variant="h6">
          Crear etiqueta
        </DialogTitle>
        <DialogContent className="-mt-5">
          <TextField
            autoFocus
            margin="dense"
            id="tag_name"
            label="Nombre de la etiqueta"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText className="mt-2">Color</DialogContentText>
          <div className="mt-1 -mb-4">
            <CirclePicker
              circleSpacing={5}
              circleSize={32}
              width={260}
              onChangeComplete={(color, e) => {
                setTagColor(color.hex);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateTag} className="normal-case">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackBarTagCreated}
        autoHideDuration={3000}
        onClose={handleCloseSnackBarTagCreated}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBarTagCreated}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert
          onClose={handleCloseSnackBarTagCreated}
          severity="success"
          sx={{ width: "100%" }}
        >
          Etiqueta creada satisfactoriamente
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FilterDrawer;
