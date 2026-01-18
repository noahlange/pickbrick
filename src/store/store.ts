import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import brickReducer from "./brickSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({ bricks: brickReducer });

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    rootReducer,
  ) as unknown as typeof rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "FLUSH",
          "REHYDRATE",
          "PAUSE",
          "persist/PERSIST",
          "PURGE",
          "REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
