import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const editJobSlice = createSlice({
  name: "editJob",
  initialState: {
    jobTitle: "",
    companyName: "",
    jobDesc: "",
    jobLink: "",
    jobStatus: "",
    jobID: "",
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
    updateJobID: (state, action: PayloadAction<string>) => {
      state.jobID = action.payload;
    },
  },
});

export const {
  updateJobTitle,
  updateJobDesc,
  updateJobLink,
  updateJobStatus,
  updateCompanyName,
  updateJobID,
} = editJobSlice.actions;

export default editJobSlice.reducer;
