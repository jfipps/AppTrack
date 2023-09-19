import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter";
import signupReducer from "./slices/signup";
import loginReducer from "./slices/login";
import loadingReducer from "./slices/loading";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    signup: signupReducer,
    login: loginReducer,
    loading: loadingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
