import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import SnackBarApp from "./SnackBarApp";
import VerifyTheme from "./verifyTheme";

const label = { inputProps: { "aria-label": "toggle-favorite" } };

function ToggleFavorite({ animation }) {
  const theme = VerifyTheme();
  const [checked, setChecked] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Checkbox
        {...label}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite color="error" />}
        checked={checked}
        onChange={handleChange}
        sx={{
          zIndex: 1,
        }}
        title={checked ? "Eliminar de favoritos" : "Agregar a favoritos"}
        className={theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-200"}
      />
      <SnackBarApp
        open={openSnackbar}
        handleClose={handleSnackbarClose}
        severity="info"
        message={checked ? "Agregado a favoritos" : "Eliminado de favoritos"}
        vertical="bottom"
        horizontal="left"
        width="fit-content"
        animation={animation}
      />
    </>
  );
}

export default ToggleFavorite;
