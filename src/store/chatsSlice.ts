import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  user: { displayName?: string; photoURL?: string; uid?: string };
}

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
