import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user.model';

export const user = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<User | null>) => (state = payload),
  },
});

export const { setUserData } = user.actions;

export default user.reducer;
