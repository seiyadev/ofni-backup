import React, { forwardRef, useState } from "react";
import {
  SwipeableDrawer,
  IconButton,
  styled,
  useTheme,
  Typography,
  Divider,
  Box,
  Modal,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "auto",
  width: "fit-content",
};

const ModalGeneral = forwardRef(function ModalGeneral(props, ref) {
  const {
    children,
    title,
    Content,
    width,
    padding,
    height,
    onCloseModal,
    handleOpenModal,
  } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleModal = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useImperativeHandle(ref, () => ({
    handleClose: () => {
      handleClose();
    },
  }));

  return (
    <div>
      <div
        ref={ref}
        onClick={handleOpenModal ? handleOpenModal : toggleModal(true)}
      >
        {children}
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={onCloseModal ? onCloseModal : toggleModal(false)}
        sx={{
          overflow: "auto",
        }}
      >
        <Box sx={style}>
          <div className="pl-3 pr-0.5 pt-0.5 pb-0.5 flex flex-row justify-between items-center">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h6"
              fontWeight={"bold"}
            >
              {title}
            </Typography>
            <IconButton
              title="Cerrar"
              onClick={onCloseModal ? onCloseModal : toggleModal(false)}
            >
              <CloseOutlined />
            </IconButton>
          </div>
          <Divider />
          <Box
            className={padding ? padding : "p-3"}
            sx={{
              width,
              height,
            }}
          >
            <Content />
          </Box>
        </Box>
      </Modal>
    </div>
  );
});

export default ModalGeneral;
