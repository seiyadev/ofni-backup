import { forwardRef, useState } from "react";
import {
  SwipeableDrawer,
  IconButton,
  styled,
  useTheme,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  borderBottom: "1px solid " + theme.palette.divider,
}));

const Drawer = forwardRef(function Drawer(props, ref) {
  const { children } = props;
  const { Content } = props;
  const { title } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <div>
      <div ref={ref} onClick={toggleDrawer(true)}>
        {children}
      </div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            maxWidth: "450px",
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer(false)} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={"bold"}>
            {title}
          </Typography>
        </DrawerHeader>
        <Content />
      </SwipeableDrawer>
    </div>
  );
});

export default Drawer;
