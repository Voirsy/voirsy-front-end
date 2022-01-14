/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALONS } from 'endpoints/salons';
import { setAuthHeader } from 'helpers/headers';
import { Message } from 'types/util';
import {
  FavoritesArguments,
  FetchAllCategoriesReturn,
  FetchAllCitiesReturn,
  FetchAllSalonArguments,
  FetchAllSalonsReturn,
} from './home.types';

export const salonsApi = createApi({
  reducerPath: 'salonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => setAuthHeader(headers),
  }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<FetchAllSalonsReturn, FetchAllSalonArguments>({
      query: ({ location = '', search = '', sortBy = '', salonType = '' }) => {
        const body: FetchAllSalonArguments = { search };
        if (location) body.location = location;
        if (sortBy) body.sortBy = sortBy;
        if (salonType.length > 0) body.salonType = salonType as string[];

        return {
          url: `${SALONS.FETCH_SALONS}`,
          method: 'post',
          body,
        };
      },
    }),
    fetchAllCities: builder.query<FetchAllCitiesReturn, void>({
      query: () => `${SALONS.FETCH_CITIES}`,
    }),
    fetchAllCategories: builder.query<FetchAllCategoriesReturn, void>({
      query: () => `${SALONS.FETCH_CATEGORIES}`,
    }),
    addToFavorites: builder.mutation<Message, FavoritesArguments>({
      query: (body) => ({
        url: `${SALONS.ADD_TO_FAVORITES}`,
        method: 'POST',
        body,
      }),
    }),
    removeFromFavorites: builder.mutation<Message, FavoritesArguments>({
      query: (body) => ({
        url: `${SALONS.REMOVE_FROM_FAVORITES}`,
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  useLazyFetchAllSalonsQuery,
  useFetchAllCategoriesQuery,
  useFetchAllCitiesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = salonsApi;
