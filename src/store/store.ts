import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customer/customerSlice";
export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
