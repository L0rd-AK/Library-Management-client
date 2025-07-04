import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { booksApi } from "./featurs/api/booksApi";
import { borrowApi } from "./featurs/api/borrowApi";
import bookReducer from "./featurs/book/bookSlice";
import borrowReducer from "./featurs/borrow/borrowSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   // Only persist the reducers we want to keep in localStorage
//   whitelist: ['book', 'borrow'],
// };

const rootReducer = {
  [booksApi.reducerPath]: booksApi.reducer,
  [borrowApi.reducerPath]: borrowApi.reducer,
  book: bookReducer,
  borrow: borrowReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      booksApi.middleware,
      borrowApi.middleware
    ),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
