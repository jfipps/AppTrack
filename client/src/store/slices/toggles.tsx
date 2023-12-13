import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const togglesSlice = createSlice({
  name: "toggles",
  initialState: {
    isLoading: true,
    userDropdownOpen: false,
    darkModeEnabled: true,
    jobDropdownIndex: -1,
    addJobOpen: false,
    editJobOpen: false,
    jobAddedFlag: false,
    jobEditedFlag: false,
    jobDeletedFlag: false,
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
    setJobIndex: (state, action: PayloadAction<number>) => {
      state.jobDropdownIndex = action.payload;
    },
    openAddJob: (state) => {
      state.addJobOpen = true;
    },
    closeAddJob: (state) => {
      state.addJobOpen = false;
    },
    openEditJob: (state) => {
      state.editJobOpen = true;
    },
    closeEditJob: (state) => {
      state.editJobOpen = false;
    },
    updateEditJobFlag: (state, action: PayloadAction<boolean>) => {
      state.jobEditedFlag = action.payload;
    },
    updateAddedJobFlag: (state, action: PayloadAction<boolean>) => {
      state.jobAddedFlag = action.payload;
    },
    updateDeletedJobFlag: (state, action: PayloadAction<boolean>) => {
      state.jobDeletedFlag = action.payload;
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
  setJobIndex,
  openAddJob,
  closeAddJob,
  openEditJob,
  closeEditJob,
  updateEditJobFlag,
  updateAddedJobFlag,
  updateDeletedJobFlag,
} = togglesSlice.actions;

export default togglesSlice.reducer;
