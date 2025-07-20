import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { combineReducers } from "redux";
import postReducer from "./features/slices/post";


// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: "dummy",
      onError: (err) => {
        console.error("Persist encryption error:", err);
      },
    }),
  ],
};

// Combine your reducers (even if just one)
const reducer = combineReducers({
  post: postReducer,
});

// Root reducer with optional state clearing
const rootReducer = (state, action) => {
  if (action.type === "post/clearStore") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return reducer(state, action);
};

// Apply persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  devTools:true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true, // Needed for redux-persist
    }),
});

export default store;
