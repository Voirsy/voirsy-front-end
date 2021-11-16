import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { PROFILE } from 'endpoints/profile';
import { Salon } from 'models/admin.model';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchAllUsersFavorites: builder.query<Pick<Salon, '_id' | 'address' | 'name' | 'images'>[], void>({
      query: () => `${PROFILE.FAVORITES}`,
    }),
  }),
});

export const { useFetchAllUsersFavoritesQuery } = profileApi;
