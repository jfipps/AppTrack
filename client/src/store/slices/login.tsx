import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    user: false,
  },
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserSession: (state, action: PayloadAction<boolean>) => {
      state.user = action.payload;
    },
  },
});

export const { updateEmail, updatePassword, setUserSession } =
  loginSlice.actions;

export default loginSlice.reducer;
