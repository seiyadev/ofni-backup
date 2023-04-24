import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ChatItem, { ChatItemLoading } from "./ChatItem";

function ChatList() {
  const filter = useSelector((state) => state.chat.ChatListFilter);
  const [textFilter, setTextFilter] = React.useState("Ver todo");
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if (filter === "all") {
      setTextFilter("Ver todo");
    } else if (filter === "purchases") {
      setTextFilter("Mis compras");
    } else if (filter === "sales") {
      setTextFilter("Mis ventas");
    } else if (filter === "finished") {
      setTextFilter("Chats finalizados");
    }
  }, [filter]);

  const Chats = () => {
    if (isLoading) {
      const chatsLoading = new Array(5).fill(<ChatItemLoading />);
      return chatsLoading.map((chat, index) => <div key={index}>{chat}</div>);
    } else {
      const array = [
        {
          id: "1",
        },
        {
          id: "2",
        },
      ];

      return (
        <>
          {array.map((chat, index) => (
            <div key={index}>
              <ChatItem chatId={chat.id} />
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <Typography variant="body1" fontWeight={"bold"}>
        {textFilter}
      </Typography>
      <div
        className="flex flex-col overflow-y-scroll"
        style={{
          height: "calc(100vh - 205px)",
          width: "100%",
        }}
      >
        <Chats />
      </div>
    </div>
  );
}

export default ChatList;
