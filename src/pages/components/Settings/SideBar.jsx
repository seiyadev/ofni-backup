import { Box, Divider, Fab, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { RiTShirt2Line } from "react-icons/ri";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import VerifyTheme from "../General/verifyTheme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Label } from "@mui/icons-material";

function SideBar({ children }) {
  const router = useRouter();
  const theme = VerifyTheme();
  const themeMUI = useTheme();

  const hover = (index) => {
    if (theme === "light" && router.pathname === index) {
      return "ml-4 p-2 bg-gray-200 w-full rounded-lg";
    } else if (theme === "light" && router.pathname !== index) {
      return "ml-4 p-2 hover:bg-gray-200 w-full rounded-lg";
    } else if (theme === "dark" && router.pathname === index) {
      return "ml-4 p-2 bg-gray-900 w-full rounded-lg";
    } else if (theme === "dark" && router.pathname !== index) {
      return "ml-4 p-2 hover:bg-gray-900 w-full rounded-lg";
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row"
      style={{
        height: "calc(100vh - 60px)",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "25%",
          },
          borderRight: `1px solid ${themeMUI.palette.divider}`,
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="w-full">
            <Typography variant="h5" fontWeight={"bold"} className="mt-4 ml-6">
              Configuración
            </Typography>
            <div className="mt-3.5 flex flex-col">
              <div className="pr-9">
                <div className={hover("/settings/profile")}>
                  <Link href={"/settings/profile"}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <PersonOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Perfil público
                    </Typography>
                  </Link>
                </div>
                <div className={hover("/settings/account")}>
                  <Link href={"/settings/account"} className="w-fit">
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <ManageAccountsOutlinedIcon
                        style={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Cuenta
                    </Typography>
                  </Link>
                </div>
                <div className={hover("/settings/security")}>
                  <Link href={"/settings/security"}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <SecurityOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Seguridad
                    </Typography>
                  </Link>
                </div>
                <div className={hover("/settings/billing")}>
                  <Link href={"/settings/billing"}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <AccountBalanceWalletOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Pagos y suscripciones
                    </Typography>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <div className="flex flex-col w-full pt-4 pl-4 pr-6">{children}</div>
    </div>
  );
}

export default SideBar;
