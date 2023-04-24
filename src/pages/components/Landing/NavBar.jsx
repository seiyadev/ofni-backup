import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const drawerWidth = 240;
const navItems = [
  {
    name: "Inicio",
    href: "",
  },
  {
    name: "Sobre OFNI",
    href: "#about-ofni",
  },
  {
    name: "Nosotros",
    href: "#about-us",
  },
  {
    name: "Iniciar sesión",
    href: "/auth/login",
  },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const themeMUI = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={Link}
        href={"/"}
      >
        <Image
          src={"/OFNI-LOGOJUNTO.svg"}
          width="150"
          height={"100"}
          alt="OFNI-LOGO"
        />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                href={item.href}
                sx={{
                  textTransform: "none",
                  color: "text.primary",
                }}
              >
                <Typography variant="body2">{item.name}</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid " + themeMUI.palette.divider,
          height: "64px",
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex flex-row items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              size="large"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, mt: 1, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component={Link}
              sx={{
                display: { xs: "none", sm: "block" },
              }}
              href={"/"}
            >
              <Image
                src={"/OFNI-LOGOJUNTO.svg"}
                width="160"
                height={"100"}
                alt="OFNI-LOGO"
              />
            </Box>
          </div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: "none",
                    color: "text.primary",
                    "&:hover": {
                      color: themeMUI.palette.primary.main,
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          pr: 3,
          pl: 3,
          marginTop: "64px",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
