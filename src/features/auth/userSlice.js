import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "dbUser",
  initialState: {
    dbUser: null,
    loadingUser: true,
  },
  reducers: {
    setDbUser: (state, action) => {
      state.dbUser = action.payload;
    },
    setLoadingUser: (state, action) => {
      state.loadingUser = action.payload;
    },
  },
});

export const { setDbUser, setLoadingUser } = userSlice.actions;
export default userSlice.reducer;
