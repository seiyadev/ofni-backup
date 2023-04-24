import { Typography } from "@mui/material";
import React, { useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      text: "Hola",
      senderId: "user1",
      timestamp: new Date().getTime(),
    };
    setMessages([...messages, newMessage]);
  };

  const noMessages = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="body2" color="textSecondary">
          Aún no hay mensajes, ¿por qué no empiezas tú?
        </Typography>
      </div>
    );
  };

  const message = (msg) => {
    const isMe = msg.senderId === "user1";

    return (
      <div
        key={msg.id}
        className={`${
          isMe ? "text-end" : "text-start"
        } mb-4 flex flex-col items-${isMe ? "end" : "start"}`}
      >
        <div
          className={`rounded-lg px-4 py-2 max-w-full break-all ${
            isMe ? "bg-gray-300" : "bg-blue-600 text-white"
          }`}
        >
          <Typography variant="body2">{msg.text}</Typography>
        </div>
        <div
          className={`text-xs ${
            isMe ? "text-end" : "text-start"
          } text-gray-400`}
        >
          {new Date(msg.timestamp).toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div
      className="pl-6 pr-6 overflow-y-auto overscroll-y-contain"
      style={{
        height: "calc(100vh - 165px)",
      }}
    >
      {messages.length > 0 ? messages.map((msg) => message(msg)) : noMessages()}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
