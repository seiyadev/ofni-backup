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
import MenuAdd from "./Desktop/MenuAdd";
import { TbShirt, TbShirtOff } from "react-icons/tb";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
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
            <div className="mt-4 ml-6">
              <Typography variant="h5" fontWeight={"bold"}>
                Armario
              </Typography>
            </div>
            <div className="mt-3.5 flex flex-col">
              <div className="pr-9">
                <div className={hover("/closet/g")}>
                  <Link href={"/closet/g"} className="w-fit">
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <TbShirt
                        style={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Prendas
                    </Typography>
                  </Link>
                </div>
                <div className={hover("/closet/o")}>
                  <Link href={"/closet/o"}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <CheckroomIcon
                        sx={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Atuendos
                    </Typography>
                  </Link>
                </div>
                <div className={hover("/closet/l")}>
                  <Link href={"/closet/l"}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      className="flex flex-row items-center min-h-full"
                      variant="body1"
                    >
                      <LocalLaundryServiceOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                        }}
                      />
                      &nbsp;Ropa sucia
                    </Typography>
                  </Link>
                </div>
              </div>
              <Divider className="mt-2 ml-6 mr-6" />
              <div
                className="ml-6 mr-6 pt-2 overflow-y-auto 2xl:h-full"
                style={{
                  height: "calc(100vh - 251px)",
                  scrollbarWidth: "thin",
                }}
              >
                <ul>
                  <li>
                    <div>
                      <Link
                        href={"/closet/t/12"}
                        className="flex flex-row items-center min-h-full w-fit"
                      >
                        <Typography
                          variant="body2"
                          color={
                            router.query.tagId === "12"
                              ? "primary"
                              : "text.primary"
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                              color: "text.secondary",
                            },
                          }}
                        >
                          Etiqueta 1
                        </Typography>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <div className="flex flex-col w-full pt-4 pl-4 pr-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default SideBar;
