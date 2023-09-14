import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  reducers: {
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    createAccount: (state) => {
      if (
        state.firstName.length > 0 &&
        state.lastName.length > 0 &&
        state.email.length > 0 &&
        state.password.length > 0
      ) {
        try {
          const body = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
          };
          fetch("http://localhost:5001/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }).then((res) => {
            res.json().then((data) => {
              console.log(data);
            });
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("Missing some required information");
      }
    },
  },
});

export const {
  updateFirstName,
  updateLastName,
  updateEmail,
  updatePassword,
  createAccount,
} = signupSlice.actions;

export default signupSlice.reducer;
