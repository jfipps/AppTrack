import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter";
import signupReducer from "./slices/signup";

export const store = configureStore({
  reducer: { filter: filterReducer, signup: signupReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
