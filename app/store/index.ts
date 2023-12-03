import { configureStore } from "@reduxjs/toolkit";
import swapSettingsReducer from "./slices/swapSettingsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistedSwapReducer = persistReducer(persistConfig, swapSettingsReducer);

export const store = configureStore({
  reducer: {
    swap: persistedSwapReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
