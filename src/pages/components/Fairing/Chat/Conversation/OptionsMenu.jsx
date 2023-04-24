import React from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSideMenu } from "@/features/fairing/chatSlice";

function OptionsMenu() {
  const dispatch = useDispatch();
  const openSideMenu = useSelector((state) => state.chat.openSideMenu);
  const handleOpenSideMenu = () => {
    dispatch(setOpenSideMenu(!openSideMenu));
  };
  return (
    <>
      <IconButton
        size="small"
        title="Opciones"
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
        onClick={handleOpenSideMenu}
      >
        <KeyboardArrowLeftOutlinedIcon
          sx={
            openSideMenu && {
              rotate: "180deg",
            }
          }
        />
      </IconButton>
    </>
  );
}

export default OptionsMenu;
