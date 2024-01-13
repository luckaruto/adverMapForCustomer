import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import navSlice from "./navSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  nav: navSlice,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
});

// const persistor = persistStore(store)

export { store };
