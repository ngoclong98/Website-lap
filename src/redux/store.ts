import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import DashboardSlice from "./DashboardSlice";
import HomeSlice from "./HomeSlice";
const store = configureStore({
  reducer: {
    dashboard: DashboardSlice,
    home: HomeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
