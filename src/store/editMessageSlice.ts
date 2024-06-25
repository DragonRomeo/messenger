import { createSlice } from '@reduxjs/toolkit';
import { IEdit } from '../common/types/slice';

const editMessageSlice = createSlice({
  name: 'edit',
  initialState: {
    isEdit: false,
    editedText: {},
  } as Partial<IEdit>,
  reducers: {
    addEditClickData(state, action) {
      state.isEdit = action.payload;
    },
    changeIsEdit(state) {
      state.isEdit = !state.isEdit;
    },
    addEditedText(state, action) {
      state.editedText = action.payload;
    },
  },
});

export const { addEditClickData, changeIsEdit } = editMessageSlice.actions;
export const { addEditedText } = editMessageSlice.actions;

export default editMessageSlice.reducer;
