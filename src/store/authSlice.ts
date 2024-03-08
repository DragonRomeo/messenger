import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authsData: [],
  },
  reducers: {
    addAuthData(state, action) {
      state = action.payload;
    },
  },
});

export const { addAuthData } = authSlice.actions;

export default authSlice.reducer;
