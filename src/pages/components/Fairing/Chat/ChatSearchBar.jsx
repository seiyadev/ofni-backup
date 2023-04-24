import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

function ChatSearchBar() {
  const router = useRouter();
  return (
    <>
      <TextField
        title="Buscar chats por fecha, nombre o artículo de publicación"
        placeholder="Buscar chats"
        variant="outlined"
        onChange={(event) => {
          if (event.target.value.length > 0) {
            const newQuery = Object.assign({}, router.query);
            newQuery.search = event.target.value;
            router.replace({
              pathname: router.pathname,
              query: newQuery,
            });
          } else {
            const newQuery = Object.assign({}, router.query);
            delete newQuery.search;
            router.replace({
              pathname: router.pathname,
              query: newQuery,
            });
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.6rem",
          }
        }}
        size="small"
        fullWidth
      />
    </>
  );
}

export default ChatSearchBar;
