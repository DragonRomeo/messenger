import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  chatId: string;
  user: { displayName?: string; photoURL?: string; uid?: string };
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: 'null',
    user: {},
  } as Partial<IUser>,
  reducers: {
    addChatData(state, action) {
      state.user = action.payload;
      state.chatId;
      /*  ! Selector's Logic
      state.auth.authData.uid > action.payload.uid
      ? state.auth.authData.uid + action.payload.uid
      : action.payload.uid + state.auth.authData).uid;
           */
    },
  },
});

export const { addChatData } = chatSlice.actions;

export default chatSlice.reducer;
