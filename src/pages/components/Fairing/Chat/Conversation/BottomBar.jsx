import React from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendIcon from "@mui/icons-material/Send";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import MenuGeneral from "@/pages/components/General/MenuGeneral";
import CustomSnackbar from "@/pages/components/General/SnackBarApp";

function BottomBar() {
  const menuRef = React.useRef(null);
  const [messageValue, setMessageValue] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState("");
  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };
  const handleKeyDownTextField = (event) => {
    if (event.key === "Enter") {
      SendMessage();
      event.preventDefault();
    }
    if (event.key === "Enter" && event.shiftKey) {
      setMessageValue(messageValue + "\n");
      event.preventDefault();
    }
  };
  const SendMessage = () => {
    console.log("Sending");
    setMessageValue("");
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
    if (selectedFile && selectedFile.size <= 80 * 1024 * 1024) {
      // El archivo es válido
      setFile(selectedFile);
    } else {
      setSnackBarText("El archivo es inválido, debe ser menor a 80MB");
      setOpenSnackBar(true);
    }
    menuRef.current.handleClose();
  };
  const handleFileChangeImage = (event) => {
    const selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
    if (
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "video/mkv" ||
      selectedFile.type === "video/mp4" ||
      selectedFile.type === "video/avi"
    ) {
      if (selectedFile && selectedFile.size <= 80 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        setSnackBarText("El archivo es inválido, debe ser menor a 80MB");
        setOpenSnackBar(true);
      }
    } else {
      setSnackBarText("Este archivo no es una imagen o video");
      setOpenSnackBar(true);
    }
    menuRef.current.handleClose();
  };

  const menuItems = () => {
    return (
      <>
        <MenuItem
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          component="label"
        >
          <ListItemIcon>
            <FilePresentOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Documento o archivo</ListItemText>
          <input hidden type="file" onChange={handleFileChange} />
        </MenuItem>
        <MenuItem
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          component="label"
        >
          <ListItemIcon>
            <InsertPhotoOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Foto o vídeo</ListItemText>
          <input
            hidden
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/gif, video/mp4, video/mkv, video/avi"
            onChange={handleFileChangeImage}
          />
        </MenuItem>
      </>
    );
  };
  return (
    <>
      <div className="flex justify-between items-center gap-1">
        <MenuGeneral
          menuId="menu-add-file"
          menuItems={menuItems()}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          ref={menuRef}
        >
          <IconButton
            title="Adjuntar"
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <AttachFileOutlinedIcon />
          </IconButton>
        </MenuGeneral>
        <TextField
          value={messageValue}
          onChange={(e) => {
            setMessageValue(e.target.value);
          }}
          onKeyDown={handleKeyDownTextField}
          placeholder="Escribe un mensaje"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.6rem",
            },
          }}
          maxRows={6}
          multiline
          fullWidth
        />
        <IconButton
          title="Enviar mensaje"
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
          tabIndex="0"
          onClick={SendMessage}
          disabled={!messageValue.length > 0}
        >
          <SendIcon />
        </IconButton>
      </div>
      <CustomSnackbar
        open={openSnackBar}
        message={snackBarText}
        severity="error"
        handleClose={handleCloseSnackbar}
        vertical="bottom"
        horizontal="left"
        width="fit-content"
        animation={true}
      />
    </>
  );
}

export default BottomBar;
