import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
  displayName?: string;
  photoURL?: string;
  uid?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: {
      displayName: '',
      photoURL: '',
      uid: '',
      // lastMessage: '',
    } as IAuth,
  },
  reducers: {
    addAuthData(state, action) {
      state.authData.displayName = action.payload.displayName;
      state.authData.photoURL = action.payload.photoURL;
      state.authData.uid = action.payload.uid;
      // state.authData.lastMessage = action.payload.lastMessage;
    },
  },
});

export const { addAuthData } = authSlice.actions;

export default authSlice.reducer;
