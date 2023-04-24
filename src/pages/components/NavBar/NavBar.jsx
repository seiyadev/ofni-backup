import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import VerifyTheme from "../General/verifyTheme";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { ThemeContext } from "@/contexts/themeContext";
import { useRouter } from "next/router";
import Link from "next/link";
import IsWide from "../General/isWide";
import ModalFavorites from "../Favorites/ModalFavorites";
import ModalNotifications from "./ModalNotifications";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { useSelector } from "react-redux";

export default function NavBar({ children }) {
  const isWide = IsWide();
  const theme = VerifyTheme();
  const themeMUI = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { themeType, toggleTheme } = React.useContext(ThemeContext);
  const [darkMode, setDarkMode] = React.useState(false);
  const router = useRouter();
  const hover = (index) => {
    if (theme === "light" && router.pathname.includes(index)) {
      return "p-2 bg-gray-200 rounded-lg";
    } else if (theme === "light" && router.pathname.includes(index) === false) {
      return "p-2 hover:bg-gray-200 rounded-lg";
    } else if (theme === "dark" && router.pathname.includes(index)) {
      return "p-2 bg-gray-900 rounded-lg";
    } else if (theme === "dark" && router.pathname.includes(index) === false) {
      return "p-2 hover:bg-gray-900 rounded-lg";
    }
  };
  const dbUser = useSelector((state) => state.dbUser.dbUser);
  const loadingUser = useSelector((state) => state.dbUser.loadingUser);
  const photoURL = auth.currentUser?.photoURL?.toString() || "";

  React.useEffect(() => {
    if (themeType === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [themeType]);

  const handleChangeDarkMode = (event) => {
    setDarkMode(event.target.checked);
    toggleTheme();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    <>
      <Link href={"/profile/" + dbUser?.username} title="Perfil de vendedor">
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              src={photoURL}
              sx={{ width: 50, height: 50 }}
              referrerpolicy="no-referrer"
              alt={"Foto de perfil de " + dbUser?.username}
              title={"Foto de perfil de " + dbUser?.username}
            />
            <div className="flex flex-col gap-1">
              <Typography variant="body2">
                {auth.currentUser?.displayName.toString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: -0.8,
                  fontSize: 13,
                }}
              >
                @{dbUser?.username}
              </Typography>
            </div>
          </div>
          <ArrowForwardIosIcon className="text-lg" />
        </MenuItem>
      </Link>
    </>,
    <>
      <Divider
        variant="middle"
        sx={{
          my: 1,
        }}
      />
    </>,
    <>
      <Link href={"/settings"}>
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SettingsOutlinedIcon fontSize="medium" />
          <Typography variant="body1">Configuración</Typography>
        </MenuItem>
      </Link>
    </>,
    <>
      <MenuItem>
        <div
          onClick={() => {
            toggleTheme();
            setDarkMode(!darkMode);
          }}
          className="flex flex-row justify-between cursor-pointer w-full items-center"
        >
          <div className="flex flex-row items-center gap-2">
            <DarkModeOutlinedIcon fontSize="medium" />
            <Typography variant="body1">Modo oscuro</Typography>
          </div>
          <Switch
            checked={darkMode}
            onChange={handleChangeDarkMode}
            size="small"
          />
        </div>
      </MenuItem>
    </>,
    <>
      <Divider
        variant="middle"
        sx={{
          my: 1,
        }}
      />
    </>,
    <>
      <MenuItem
        onClick={async () => {
          try {
            await axios.get("/api/auth/logout");
          } catch (error) {
          } finally {
            await auth.signOut();
            router.replace("/");
            handleClose();
          }
        }}
      >
        <div className="flex flex-row gap-2 items-center">
          <LogoutOutlinedIcon fontSize="medium" color="error" />
          <Typography variant="body1">Cerrar sesión</Typography>
        </div>
      </MenuItem>
    </>,
  ];

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        variant="elevation"
        elevation={0}
        sx={{
          height: "60px",
          backgroundColor: theme === "light" ? "#fff" : "#121212",
          borderBottom: "1px solid " + themeMUI.palette.divider,
          "& .MuiToolbar-regular": {
            padding: "0",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          },
        }}
      >
        <div className="pr-2 pl-2 lg:pr-6 lg:pl-6 -mr-2">
          <Toolbar>
            <div className="-ml-2">
              {isWide ? (
                <>
                  {theme === "light" ? (
                    <Image
                      src={"/OFNI-LOGOJUNTO.svg"}
                      width="140"
                      height={"100"}
                      alt="OFNI-LOGO"
                    />
                  ) : (
                    <Image
                      src={"/OFNI-LOGOJUNTO-darktheme.svg"}
                      width="140"
                      height={"100"}
                      alt="OFNI-LOGO"
                    />
                  )}
                </>
              ) : (
                <>
                  {theme === "light" ? (
                    <Image
                      src={"/OFNI-LOGOJUNTO.svg"}
                      width="120"
                      height={"100"}
                      alt="OFNI-LOGO"
                    />
                  ) : (
                    <Image
                      src={"/OFNI-LOGOJUNTO-darktheme.svg"}
                      width="140"
                      height={"100"}
                      alt="OFNI-LOGO"
                    />
                  )}
                </>
              )}
            </div>
            <div className="ml-4 flex flex-row gap-2">
              <div className={hover("/closet")}>
                <Link href={"/closet"} title="Armario">
                  <div
                    className="flex flex-row items-center gap-1"
                    style={{
                      color: router.pathname.includes("/closet")
                        ? themeMUI.palette.primary.main
                        : "",
                    }}
                  >
                    <CheckroomRoundedIcon
                      className="cursor-pointer"
                      sx={{
                        fontSize: {
                          xs: "1.8rem",
                          sm: "1.5rem",
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      Armario
                    </Typography>
                  </div>
                </Link>
              </div>
              <div className={hover("/fairing")}>
                <Link href={"/fairing"} title="Fairing">
                  <div
                    className="flex flex-row items-center gap-1"
                    style={{
                      color: router.pathname.includes("/fairing")
                        ? themeMUI.palette.primary.main
                        : "",
                    }}
                  >
                    <LocalGroceryStoreOutlinedIcon
                      className="cursor-pointer"
                      sx={{
                        fontSize: {
                          xs: "1.8rem",
                          sm: "1.4rem",
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      Fairing
                    </Typography>
                  </div>
                </Link>
              </div>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <div className="flex flex-row gap-2 items-center">
              <ModalFavorites />
              <ModalNotifications />
              {loadingUser ? (
                <Skeleton variant="circular" sx={{ width: 36, height: 36 }} />
              ) : (
                <Avatar
                  title="Menú de usuario"
                  src={photoURL}
                  sx={{ width: 36, height: 36 }}
                  className="cursor-pointer hover:brightness-90"
                  referrerpolicy="no-referrer"
                  onClick={handleClick}
                />
              )}
            </div>
          </Toolbar>
        </div>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        disableAutoFocusItem
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: 300,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Menu>
      <div
        style={{
          marginTop: "60px",
        }}
      >
        {children}
      </div>
    </>
  );
}
