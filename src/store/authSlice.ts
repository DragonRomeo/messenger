import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: [],
  },
  reducers: {
    addAuthData(state, action) {
      state.authData = action.payload;
      console.log(state.authData);
    },
  },
});

export const { addAuthData } = authSlice.actions;

export default authSlice.reducer;
