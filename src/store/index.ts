import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatsSlice';

export type IRootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
