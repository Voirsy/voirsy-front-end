/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALONS } from 'endpoints/salons';
import { Salon } from 'models/admin.model';
import { City } from 'models/city.model';
import { Category } from 'models/category.model';
import { SALON } from '../../endpoints/salon';
import { getToken } from '../../helpers/auth';

interface FetchAllSalon {
  location?: string;
  search?: string;
  sortBy?: string;
  salonType?: string[];
}

export const salonsApi = createApi({
  reducerPath: 'salonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => {
      const token = `Bearer ${getToken()}`;

      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<
      { salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type' | 'rating' | 'imageUrl'>[]; message: string },
      FetchAllSalon
    >({
      query: ({ location = '', search = '', sortBy = '', salonType = '' }) => {
        const body: FetchAllSalon = { search };
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
    fetchAllCities: builder.query<{ cities: City[]; message: string }, void>({
      query: () => `${SALONS.FETCH_CITIES}`,
    }),
    fetchAllCategories: builder.query<{ categories: Category[]; message: string }, void>({
      query: () => `${SALONS.FETCH_CATEGORIES}`,
    }),
    addToFavorites: builder.mutation<{ message: string }, { salonId: string }>({
      query: (body) => ({
        url: `${SALONS.ADD_TO_FAVORITES}`,
        method: 'POST',
        body,
      }),
    }),
    removeFromFavorites: builder.mutation<{ message: string }, { salonId: string }>({
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
