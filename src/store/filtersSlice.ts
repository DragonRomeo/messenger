import { createSlice } from '@reduxjs/toolkit';
import { iFilters } from '../common/types/slice';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filtersData: {} as iFilters,
  },
  reducers: {
    addFiltersData(state, action) {
      state.filtersData = action.payload;
    },
  },
});

export const { addFiltersData } = filtersSlice.actions;

export default filtersSlice.reducer;
