import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./combineReducers";
import createExpirationTransaform from "./expirationTransform";
import { thunk } from "redux-thunk";
const expireTime = 24 * 60 * 60 * 1000 * 30;
const persistConfig = {
  key: "store",
  storage,
  transforms: [createExpirationTransaform(expireTime)],
  blacklist: [],
  whitelist: ["auth", "social"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export const persistor = persistStore(store);
