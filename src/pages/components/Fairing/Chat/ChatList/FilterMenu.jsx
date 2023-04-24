import {
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import React from "react";
import MenuGeneral from "@/pages/components/General/MenuGeneral";
import { useDispatch, useSelector } from "react-redux";
import { setChatListFilter } from "@/features/fairing/chatSlice";

function FilterMenu() {
  const dispatch = useDispatch();
  const ChatListFilter = useSelector((state) => state.chat.ChatListFilter);
  const filters = (
    <div key={1}>
      <Typography
        variant="subtitle2"
        sx={{ px: 2, pt: 0.5, pb: 0.5 }}
        color="text.secondary"
      >
        Filtrar chats por:
      </Typography>
      <MenuItem
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => {
          dispatch(setChatListFilter("all"));
        }}
      >
        <ListItemIcon
          sx={{
            color: ChatListFilter === "all" && "primary.main",
          }}
        >
          <BorderAllOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Ver todo</ListItemText>
      </MenuItem>
      <MenuItem
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => {
          dispatch(setChatListFilter("purchases"));
        }}
      >
        <ListItemIcon
          sx={{
            color: ChatListFilter === "purchases" && "primary.main",
          }}
        >
          <ShoppingCartOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mis compras</ListItemText>
      </MenuItem>
      <MenuItem
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => {
          dispatch(setChatListFilter("sales"));
        }}
      >
        <ListItemIcon
          sx={{
            color: ChatListFilter === "sales" && "primary.main",
          }}
        >
          <ReceiptOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mis ventas</ListItemText>
      </MenuItem>
      <MenuItem
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onClick={() => {
          dispatch(setChatListFilter("finished"));
        }}
      >
        <ListItemIcon
          sx={{
            color: ChatListFilter === "finished" && "primary.main",
          }}
        >
          <DoneOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Chats finalizados</ListItemText>
      </MenuItem>
    </div>
  );

  return (
    <>
      <MenuGeneral
        menuId="filter-menu-chat"
        menuItems={filters}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <IconButton
          size="small"
          title="Ordernar por"
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <FilterListOutlinedIcon />
        </IconButton>
      </MenuGeneral>
    </>
  );
}

export default FilterMenu;
