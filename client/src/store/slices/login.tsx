import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    user: { firstName: "", lastName: "", email: "" },
    loggedIn: false,
  },
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setUserSession: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
      }>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { updateEmail, updatePassword, setUserLoggedIn, setUserSession } =
  loginSlice.actions;

export default loginSlice.reducer;
