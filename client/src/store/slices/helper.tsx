import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const helperSlice = createSlice({
  name: "helper",
  initialState: {
    jobCount: 0,
  },
  reducers: {
    updateJobCount: (state, action: PayloadAction<number>) => {
      state.jobCount = action.payload;
    },
  },
});

export const { updateJobCount } = helperSlice.actions;

export default helperSlice.reducer;
