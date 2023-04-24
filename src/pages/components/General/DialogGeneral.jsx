import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DialogGeneral = React.forwardRef(function DialogGeneral(props, ref) {
  const [open, setOpen] = React.useState(false);
  const { children, title, description, onAccept } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div ref={ref} onClick={handleClickOpen}>
        {children}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          borderRadius: 2,
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {description ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
        ) : (
          <></>
        )}
        <DialogActions>
          <Button
            onClick={handleClose}
            size="small"
            sx={{
              textTransform: "none",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onAccept();
            }}
            size="small"
            sx={{
              textTransform: "none",
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default DialogGeneral;
