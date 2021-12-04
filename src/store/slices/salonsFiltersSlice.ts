import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalonsFilters {
  sortBy: string;
  search: string;
  location: string;
  salonType: string[];
}

const initialState: SalonsFilters = {
  sortBy: '',
  search: '',
  location: '',
  salonType: [],
};

export const salonsFilters = createSlice({
  name: 'salonsFilters',
  initialState: initialState,
  reducers: {
    setFilters: (state, { payload }: PayloadAction<Partial<SalonsFilters>>) => {
      if (payload.search !== undefined) state.search = payload.search;
      if (payload.sortBy !== undefined) state.sortBy = payload.sortBy;
      if (payload.location !== undefined) state.location = payload.location;
      if (payload.salonType !== undefined) state.salonType = payload.salonType;
    },
  },
});

export const { setFilters } = salonsFilters.actions;

export default salonsFilters.reducer;
