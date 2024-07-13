import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../common/types/slice';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    user: {},
  } as Partial<IUser>,
  reducers: {
    addChatData(state, action) {
      state.user = action.payload;
    },
  },
});

export const { addChatData } = chatSlice.actions;

export default chatSlice.reducer;
