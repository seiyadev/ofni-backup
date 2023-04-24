import {
  Avatar,
  Badge,
  Box,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import queryString from "query-string";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function ChatItem({ chatId }) {
  const theme = useTheme();
  const router = useRouter();
  const selectedChat =
    router.query.chatId === chatId
      ? theme.palette.action.selected
      : "transparent";
  const selectedChatHover =
    router.query.chatId === chatId
      ? theme.palette.action.selected
      : theme.palette.action.hover;
  const [route, setRoute] = React.useState(router.pathname);

  React.useEffect(() => {
    const s = router.query;
    const queries = [];
    let routing = "/fairing/inbox?";

    // Remove existing "chatId" and "search" keys from queries
    for (const key in s) {
      if (
        Object.hasOwnProperty.call(s, key) &&
        key !== "chatId" &&
        key !== "search"
      ) {
        queries.push(key + ":" + s[key]);
      }
    }

    if (queries.length > 0) {
      queries.forEach((query) => {
        const q = query.split(":");
        routing += `${q[0]}=${q[1]}&`;
      });
    }

    // Add new "chatId" key to queries
    const newQuery = { ...router.query, chatId };
    const queryStr = queryString.stringify(newQuery);

    routing += queryStr;
    setRoute(routing);
  }, [router.query, chatId]);

  return (
    <Link href={route} className="h-fit">
      <Box
        className="flex flex-row items-start gap-2 p-1.5 w-full rounded-md"
        sx={{
          cursor: "pointer",
          background: selectedChat,
          "&:hover": {
            background: selectedChatHover,
          },
        }}
      >
        <Avatar
          src="https://m.media-amazon.com/images/I/71rep9bKxvL._AC_SY550_.jpg"
          sx={{
            width: {
              xs: 60,
              sm: 60,
              md: 60,
              lg: 60,
              xl: 80,
            },
            height: {
              xs: 60,
              sm: 60,
              md: 60,
              lg: 60,
              xl: 80,
            },
            objectFit: "cover",
          }}
          alt="Chamarra de mezclilla"
        />
        <div className="flex justify-between items-start align-middle w-full overflow-hidden">
          <div
            className="flex flex-col"
            style={{
              width: "80%",
            }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              Chamarra de mezclilla
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.775rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "95%",
                mt: -0.5,
              }}
            >
              Chat con Sabas Campuzano
            </Typography>
            <Typography
              variant="caption"
              color={"text.secondary"}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "95%",
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
              quo neque, ex accusantium exercitationem sapiente beatae deleniti
              voluptates obcaecati quam cum blanditiis adipisci inventore nisi
              perspiciatis! Nihil repudiandae tempora accusantium!
            </Typography>
          </div>
          <div className="flex flex-col items-center align-top gap-4">
            <Typography variant="caption" color={"text.secondary"}>
              12:00
            </Typography>
            <Badge badgeContent={1} color="primary" />
          </div>
        </div>
      </Box>
    </Link>
  );
}

function ChatItemLoading() {
  return (
    <Box className="flex flex-row items-start gap-2 p-1.5 w-full rounded-md">
      <Skeleton variant="circular">
        <Avatar
          sx={{
            width: {
              xs: 60,
              sm: 60,
              md: 60,
              lg: 60,
              xl: 80,
            },
            height: {
              xs: 60,
              sm: 60,
              md: 60,
              lg: 60,
              xl: 80,
            },
          }}
        />
      </Skeleton>
      <div className="flex justify-between items-start align-middle w-full overflow-hidden">
        <div
          className="flex flex-col"
          style={{
            width: "80%",
          }}
        >
          <Skeleton
            variant="text"
            width={"100%"}
            sx={{
              fontSize: "1rem",
            }}
          />
          <Skeleton
            variant="text"
            width={"80%"}
            sx={{
              fontSize: "0.775rem",
              mt: -0.5,
            }}
          />
          <Skeleton
            variant="text"
            width={"75%"}
            sx={{
              fontSize: "0.8rem",
            }}
          />
        </div>
      </div>
    </Box>
  );
}

export { ChatItemLoading };
