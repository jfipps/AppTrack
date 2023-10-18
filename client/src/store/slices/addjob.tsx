import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const addJobSlice = createSlice({
  name: "addJob",
  initialState: {
    jobTitle: "",
    companyName: "",
    jobDesc: "",
    jobLink: "",
    jobStatus: "Applied",
  },
  reducers: {
    updateJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },
    updateJobDesc: (state, action: PayloadAction<string>) => {
      state.jobDesc = action.payload;
    },
    updateJobLink: (state, action: PayloadAction<string>) => {
      state.jobLink = action.payload;
    },
    updateJobStatus: (state, action: PayloadAction<string>) => {
      state.jobStatus = action.payload;
    },
    updateCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
  },
});

export const {
  updateJobTitle,
  updateJobDesc,
  updateJobLink,
  updateJobStatus,
  updateCompanyName,
} = addJobSlice.actions;

export default addJobSlice.reducer;
