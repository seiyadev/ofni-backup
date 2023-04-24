import React from "react";
import {
  Button,
  Drawer,
  IconButton,
  SwipeableDrawer,
  Box,
  Divider,
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
  Tab,
  Tabs,
  useTheme,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import VerifyTheme from "../General/verifyTheme";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import { MdOutlineWeb } from "react-icons/md";
import Image from "next/image";
import IsWide from "../General/isWide";
import ModalGeneral from "../General/Modal";

export default function ModalFavorites() {
  const router = useRouter();
  const theme = VerifyTheme();
  const themeMUI = useTheme();
  const modalRef = React.useRef();
  const [favoriteType, setFavoriteType] = React.useState("closet");
  const iconStyle = {
    color: "white",
    fontSize: "1rem",
    pb: favoriteType === "closet" && "0.1rem",
  };
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const itemFavorite = () => {
    return (
      <div className="relative">
        <Image
          src="https://m.media-amazon.com/images/I/71rep9bKxvL._AC_SY550_.jpg"
          width={500}
          height={500}
          alt="room1"
          className="cursor-pointer hover:brightness-90"
        />
        <div
          className="p-1 absolute right-1 bottom-1 pointer-events-none"
          style={{
            background: themeMUI.palette.primary.light,
            borderRadius: "50%",
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            bgcolor: "red",
          }}
        >
          {favoriteType === "closet" && <CheckroomRoundedIcon sx={iconStyle} />}
          {favoriteType === "fairing" && (
            <LocalGroceryStoreOutlinedIcon sx={iconStyle} />
          )}
        </div>
      </div>
    );
  };

  const modalContent = () => {
    return (
      <div
        className="w-full overflow-y-auto"
        style={{
          height: "100%",
        }}
      >
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 pl-1 pr-1 pt-1">
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
            {itemFavorite()}
          </div>
        )}
      </div>
    );
  };

  return (
    <ModalGeneral
      Content={modalContent}
      title="Favoritos"
      ref={modalRef}
      height="calc(100vh - 4rem)"
      padding="p-0"
    >
      <IconButton
        title="Favoritos"
        className={theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-200"}
        color="inherit"
        sx={{
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      >
        <FavoriteBorderRoundedIcon />
      </IconButton>
    </ModalGeneral>
  );
}
