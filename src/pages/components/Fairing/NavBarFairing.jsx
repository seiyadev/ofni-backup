import { Badge, Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import VerifyTheme from "../General/verifyTheme";
import SearchBar from "../General/SearchBar";
import { AiOutlineHome } from "react-icons/ai";
import { InboxOutlined } from "@mui/icons-material";
import ChatSearchBar from "./Chat/ChatSearchBar";

export default function NavBarFairing() {
  const router = useRouter();
  const theme = VerifyTheme();
  const themeMUI = useTheme();

  const hover = (index) => {
    if (theme === "light" && router.pathname === index) {
      return "p-2 bg-gray-200 rounded-lg";
    } else if (theme === "light" && router.pathname !== index) {
      return "p-2 hover:bg-gray-200 rounded-lg";
    } else if (theme === "dark" && router.pathname === index) {
      return "p-2 bg-gray-900 rounded-lg";
    } else if (theme === "dark" && router.pathname !== index) {
      return "p-2 hover:bg-gray-900 rounded-lg";
    }
  };

  return (
    <>
      <Box
        position={"fixed"}
        width={"100%"}
        zIndex={100}
        sx={{
          height: "fit-content",
          backgroundColor: theme === "light" ? "#fff" : "#121212",
          borderBottom: "1px solid " + themeMUI.palette.divider,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <div className="pr-2 pl-2 lg:pr-6 lg:pl-6">
          <div className="flex flex-row justify-between items-center pb-2 pt-2">
            <div className="flex flex-row gap-3 items-center">
              <Typography variant="h5" fontWeight={"bold"}>
                Fairing
              </Typography>
              {router.pathname === "/fairing" || router.query.itemId ? (
                <SearchBar />
              ) : null}
              {router.pathname === "/fairing/inbox" && <ChatSearchBar />}
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div
                className={hover("/fairing")}
                style={{
                  width: "fit-content",
                }}
              >
                <Link href={"/fairing"}>
                  <Typography
                    color={router.pathname === "/fairing" ? "primary" : ""}
                    sx={{
                      cursor: "pointer",
                    }}
                    className="flex flex-row items-center align-middle"
                    variant="body2"
                  >
                    <AiOutlineHome
                      style={{
                        fontSize: "1.2rem",
                        marginRight: "0.5rem",
                        marginBottom: "0.1rem",
                      }}
                    />
                    Inicio
                  </Typography>
                </Link>
              </div>
              <div className={hover("/fairing/inbox")}>
                <Link href={"/fairing/inbox"}>
                  <Typography
                    color={
                      router.pathname === "/fairing/inbox" ? "primary" : ""
                    }
                    sx={{
                      cursor: "pointer",
                    }}
                    className="flex flex-row items-center"
                    variant="body2"
                  >
                    <Badge
                      color="error"
                      variant="dot"
                      sx={{
                        marginRight: "0.5rem",
                        "& .MuiBadge-badge": {
                          right: 4,
                          top: 3,
                        },
                      }}
                    >
                      <InboxOutlined
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      />
                    </Badge>
                    Bandeja de entrada
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
