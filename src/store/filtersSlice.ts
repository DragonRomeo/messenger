import { createSlice } from '@reduxjs/toolkit';

interface iFilters {
  startDate: string | null;
  endDate: string | null;
  userFilterName: string | null;
}

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
