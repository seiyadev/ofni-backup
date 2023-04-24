import chatReducer from "@/features/fairing/chatSlice";
import userReducer from "@/features/auth/userSlice";
import ubicationReducer from "@/features/fairing/ubicationSlice";
import scrollStateReducer from "@/features/fairing/scrollSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    ubication: ubicationReducer,
    chat: chatReducer,
    scrollState: scrollStateReducer,
    dbUser: userReducer,
  },
});
