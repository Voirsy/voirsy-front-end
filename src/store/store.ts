import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { adminPanelApi } from './api/admin';
import { profileApi } from './api/profile';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    [adminPanelApi.reducerPath]: adminPanelApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminPanelApi.middleware),
});

type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
