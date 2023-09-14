import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    darkModeEnabled: true,
  },
  reducers: {
    enable: (state) => {
      state.darkModeEnabled = true;
    },
    disable: (state) => {
      state.darkModeEnabled = false;
    },
  },
});

export const { enable, disable } = filterSlice.actions;

export default filterSlice.reducer;
