import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    darkModeEnabled: true,
    jobSearch: "",
  },
  reducers: {
    enable: (state) => {
      state.darkModeEnabled = true;
    },
    disable: (state) => {
      state.darkModeEnabled = false;
    },
    updateJobSearch: (state, action: PayloadAction<string>) => {
      state.jobSearch = action.payload;
    },
  },
});

export const { enable, disable, updateJobSearch } = filterSlice.actions;

export default filterSlice.reducer;
