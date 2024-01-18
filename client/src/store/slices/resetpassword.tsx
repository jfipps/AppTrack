import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailPassword: "",
  },
  reducers: {
    updateOldPassword: (state, action: PayloadAction<string>) => {
      state.oldPassword = action.payload;
    },
    updateNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    updateConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    updateEmailPassword: (state, action: PayloadAction<string>) => {
      state.emailPassword = action.payload;
    },
  },
});

export const {
  updateOldPassword,
  updateNewPassword,
  updateConfirmPassword,
  updateEmailPassword,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
