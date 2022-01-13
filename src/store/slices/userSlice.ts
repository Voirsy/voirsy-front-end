import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user.model';

export const user = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<User | null>) => (state = payload),
    removeFromFav: (state, { payload }: PayloadAction<string>) => {
      if (state?.favorites) state.favorites = state.favorites.filter((el) => el !== payload);
    },
    addToFav: (state, { payload }: PayloadAction<string>) => {
      if (state?.favorites) state.favorites = [...state.favorites, payload];
    },
  },
});

export const { setUserData, removeFromFav, addToFav } = user.actions;

export default user.reducer;
