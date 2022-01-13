import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { PROFILE } from 'endpoints/profile';
import { Salon } from 'models/admin.model';
import { getToken } from '../../helpers/auth';
import { User } from '../../models/user.model';

type ReturnedSalon = Pick<Salon, '_id' | 'address' | 'name' | 'imageUrl' | 'city' | 'rating' | 'type'>[];

export interface ChangeUserData {
  email?: string;
  fullname?: string;
  birthdata?: string;
  phone?: string;
  avatarUrl?: string;
}

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
    fetchAllUsersFavorites: builder.query<ReturnedSalon, void>({
      query: () => `${PROFILE.FAVORITES}`,
      transformResponse: (data: { message: string; favorites: ReturnedSalon }) => data.favorites,
    }),
    changePassword: builder.mutation<{ message: string }, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: `${PROFILE.CHANGE_PASSWORD}`,
        method: 'POST',
        body,
      }),
    }),
    deleteAccount: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `${PROFILE.DELETE_ACCOUNT}`,
        method: 'DELETE',
      }),
    }),
    changeUserData: builder.mutation<User, ChangeUserData>({
      query: (body) => ({
        url: `${PROFILE.CHANGE_DATA}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { message: string; user: User }) => response.user,
    }),
  }),
});

export const {
  useFetchAllUsersFavoritesQuery,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useChangeUserDataMutation,
} = profileApi;
