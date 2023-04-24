import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    openSideMenu: false,
    ChatListFilter: "all",
  },
  reducers: {
    setOpenSideMenu: (state, action) => {
      state.openSideMenu = action.payload;
    },
    setChatListFilter: (state, action) => {
      state.ChatListFilter = action.payload;
    },
  },
});

export const { setOpenSideMenu, setChatListFilter } = chatSlice.actions;
export default chatSlice.reducer;
