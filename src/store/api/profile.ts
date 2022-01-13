import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { PROFILE } from 'endpoints/profile';
import { Salon } from 'models/admin.model';
import { getToken } from '../../helpers/auth';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => {
      const token = `Bearer ${getToken()}`;

      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllUsersFavorites: builder.query<
      Pick<Salon, '_id' | 'address' | 'name' | 'imageUrl' | 'city' | 'rating' | 'type'>[],
      void
    >({
      query: () => `${PROFILE.FAVORITES}`,
    }),
    changePassword: builder.mutation<{ message: string }, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: `${PROFILE.CHANGE_PASSWORD}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useFetchAllUsersFavoritesQuery, useChangePasswordMutation } = profileApi;
