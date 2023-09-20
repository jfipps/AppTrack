import { createSlice } from "@reduxjs/toolkit";

const togglesSlice = createSlice({
  name: "toggles",
  initialState: {
    isLoading: true,
    userDropdownOpen: false,
    darkModeEnabled: true,
  },
  reducers: {
    enableLoading: (state) => {
      state.isLoading = true;
    },
    disableLoading: (state) => {
      state.isLoading = false;
    },
    enableDarkMode: (state) => {
      state.darkModeEnabled = true;
    },
    disableDarkMode: (state) => {
      state.darkModeEnabled = false;
    },
    openDropdown: (state) => {
      state.userDropdownOpen = true;
    },
    closeDropdown: (state) => {
      state.userDropdownOpen = false;
    },
  },
});

export const {
  enableLoading,
  disableLoading,
  openDropdown,
  closeDropdown,
  disableDarkMode,
  enableDarkMode,
} = togglesSlice.actions;

export default togglesSlice.reducer;
