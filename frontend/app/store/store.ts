// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  REHYDRATE,
  PURGE,
  PERSIST,
  REGISTER,
} from 'redux-persist/es/constants';

import userReducer from './slice/userSlice';
import api from './api';

// Persist configuration for the user slice
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'isEmailVerified', 'isLoggedIn'],
};

// Wrap user reducer with persistence
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Create the Redux store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, REHYDRATE, PURGE, PERSIST, REGISTER],
      },
    }).concat(api.middleware),
});

// Enable automatic refetching in RTK Query
setupListeners(store.dispatch);

// Create the persistor for redux-persist
export const persistor = persistStore(store);

// Types for use with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
