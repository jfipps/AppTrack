import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter";
import signupReducer from "./slices/signup";
import loginReducer from "./slices/login";
import togglesReducer from "./slices/toggles";
import addjobReducer from "./slices/addjob";
import addjob from "./slices/addjob";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    signup: signupReducer,
    login: loginReducer,
    toggles: togglesReducer,
    addJob: addjobReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
