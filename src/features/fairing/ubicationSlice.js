import { createSlice } from "@reduxjs/toolkit";

const ubicationSlice = createSlice({
  name: "ubication",
  initialState: {
    city: "",
    center: [0, 0],
    showMap: false,
  },
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setShowMap: (state, action) => {
      state.showMap = action.payload;
    },
  },
});

export const { setCenter, setCity, setShowMap } = ubicationSlice.actions;
export default ubicationSlice.reducer;
