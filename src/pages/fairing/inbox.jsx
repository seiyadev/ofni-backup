import {
  Box,
  CircularProgress,
  Collapse,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import UpcomingOutlinedIcon from "@mui/icons-material/UpcomingOutlined";
import { Router, useRouter } from "next/router";
import React from "react";
import ChatList from "../components/Fairing/Chat/ChatList";
import NavBarFairing from "../components/Fairing/NavBarFairing";
import IsWide from "../components/General/isWide";
import NavBar from "../components/NavBar/NavBar";
import Messages from "../components/Fairing/Chat/Conversation/Messages";
import BottomBar from "../components/Fairing/Chat/Conversation/BottomBar";
import Header from "../components/Fairing/Chat/Conversation/Header";
import FilterMenu from "../components/Fairing/Chat/ChatList/FilterMenu";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../components/Fairing/Chat/Conversation/SideMenu";
import { setOpenSideMenu } from "@/features/fairing/chatSlice";
import axios from "axios";

function Inbox({ user }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const themeMUI = useTheme();
  const [selectedChat, setSelectedChat] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isChatLoading, setIsChatLoading] = React.useState(true);
  const openSideMenu = useSelector((state) => state.chat.openSideMenu);
  const [userFetched, setUserFetched] = React.useState({});

  React.useEffect(() => {
    setUserFetched(user);
  }, [user]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (openSideMenu === true) {
          dispatch(setOpenSideMenu(false));
          return;
        }
        if (router.query.chatId !== undefined && openSideMenu === false) {
          const newQuery = Object.assign({}, router.query);
          delete newQuery.chatId;
          router.replace({
            pathname: router.pathname,
            query: newQuery,
          });
        }
      }
    };
    if (typeof window !== "undefined") {
      if (router.asPath === router.pathname) {
        dispatch(setOpenSideMenu(false));
      }
      const hasChatId = !!router.query.chatId;
      setSelectedChat(hasChatId);
      if (hasChatId) {
        setTimeout(() => {
          setIsChatLoading(false);
        }, 2000);
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [router, dispatch, openSideMenu]);

  const selectedChatConversation = () => {
    if (selectedChat) {
      if (isChatLoading) {
        return (
          <div className="flex flex-col justify-center items-center text-center m-auto h-full">
            <CircularProgress />
          </div>
        );
      } else {
        return (
          <>
            <Header />
            <Paper
              square
              sx={{
                height: "calc(100vh - 165px)",
                borderRight: "1px solid " + themeMUI.palette.divider,
                borderLeft: "1px solid " + themeMUI.palette.divider,
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Messages />
              <div
                className="p-2"
                style={{
                  borderTop: "1px solid " + themeMUI.palette.divider,
                }}
              >
                <BottomBar />
              </div>
            </Paper>
          </>
        );
      }
    } else {
      return (
        <div className="flex flex-col justify-center items-center text-center m-auto h-full">
          <UpcomingOutlinedIcon
            sx={{
              fontSize: 100,
              marginTop: -8,
            }}
          />
          <Typography variant="h6" fontWeight={"bold"}>
            No hay conversaciones activas
          </Typography>
          <Typography variant="caption" color={"text.secondary"} width="55%">
            Utiliza el chat de OFNI Fairing para comunicarte con los usuarios de
            la plataforma y acordar las condiciones de compra y venta de
            prendas.
          </Typography>
        </div>
      );
    }
  };

  return (
    <>
      <NavBar user={userFetched} />
      <div className="flex flex-col">
        <Box
          sx={{
            marginBottom: {
              xs: "92px",
              sm: "56px",
            },
          }}
        >
          <NavBarFairing />
        </Box>
        <div className="flex flex-row items-center ml-4 mr-4 ">
          <div className="flex flex-row w-full">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: {
                  xs: "100%",
                  sm: "30%",
                },
              }}
            >
              <Paper
                square
                style={{
                  borderBottom: "1px solid " + themeMUI.palette.divider,
                  borderRight: "1px solid " + themeMUI.palette.divider,
                  borderLeft: "1px solid " + themeMUI.palette.divider,
                  boxShadow: "none",
                }}
              >
                <div className="flex flex-row justify-between items-center pl-2 pr-2 pb-1 pt-1 h-12">
                  <Typography variant="h6" fontWeight={"bold"}>
                    Bandeja de entrada
                  </Typography>
                  <FilterMenu />
                </div>
              </Paper>
              <Paper
                square
                sx={{
                  pt: 1,
                  pl: 1,
                  pr: 1,
                  borderRight: "1px solid " + themeMUI.palette.divider,
                  borderLeft: "1px solid " + themeMUI.palette.divider,
                  boxShadow: "none",
                  width: "100%",
                }}
              >
                <ChatList />
              </Paper>
            </Box>
            <div
              className="hidden sm:flex flex-row"
              style={{
                width: "70%",
              }}
            >
              <div
                className="flex flex-col"
                style={{
                  width: openSideMenu ? "70%" : "100%",
                }}
              >
                {selectedChatConversation()}
              </div>
              {openSideMenu && <SideMenu />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inbox;

export async function getServerSideProps(context) {
  let user = null;
  try {
    const token = context.req.cookies[process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const req = await axios.get("http://localhost:4000/closet", config);
    user = req.data;
    return {
      props: {
        user,
        priceRange: 2,
      },
    };
  } catch (error) {
/*     return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }; */
  }
}

