import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatsSlice';
import editReducer from './editMessageSlice';
import filterReducer from './filtersSlice';

export type IRootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    edit: editReducer,
    filters: filterReducer,
  },
});
