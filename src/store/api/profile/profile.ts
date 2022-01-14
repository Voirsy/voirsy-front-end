import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { PROFILE } from 'endpoints/profile';
import { User } from 'models/user.model';
import { Message } from 'types/util';
import { setAuthHeader } from 'helpers/headers';
import {
  ChangePasswordArguments,
  ChangeUserDataArguments,
  ChangeUserDataResponse,
  FetchAllUsersFavoritesResponse,
  FetchAllUsersFavoritesReturn,
} from './profile.types';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => setAuthHeader(headers),
  }),
  endpoints: (builder) => ({
    fetchAllUsersFavorites: builder.query<FetchAllUsersFavoritesReturn, void>({
      query: () => `${PROFILE.FAVORITES}`,
      transformResponse: (response: FetchAllUsersFavoritesResponse) => response.favorites,
    }),
    changePassword: builder.mutation<Message, ChangePasswordArguments>({
      query: (body) => ({
        url: `${PROFILE.CHANGE_PASSWORD}`,
        method: 'POST',
        body,
      }),
    }),
    deleteAccount: builder.mutation<Message, void>({
      query: () => ({
        url: `${PROFILE.DELETE_ACCOUNT}`,
        method: 'DELETE',
      }),
    }),
    changeUserData: builder.mutation<User, ChangeUserDataArguments>({
      query: (body) => ({
        url: `${PROFILE.CHANGE_DATA}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: ChangeUserDataResponse) => response.user,
    }),
  }),
});

export const {
  useFetchAllUsersFavoritesQuery,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useChangeUserDataMutation,
} = profileApi;
