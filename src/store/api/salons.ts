/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALONS } from 'endpoints/salons';
import { Salon } from 'models/admin.model';
import { City } from 'models/city.model';
import { Category } from 'models/category.model';

interface FetchAllSalon {
  location?: string;
  search?: string;
  sortBy?: string;
  salonType?: string;
}

export const salonsApi = createApi({
  reducerPath: 'salonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<
      { salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type' | 'rating' | 'imageUrl'>[]; message: string },
      FetchAllSalon
    >({
      query: ({ location = '', search = '', sortBy = '', salonType = '' }) => ({
        url: `${SALONS.FETCH_SALONS}`,
        method: 'post',
        body: {
          location,
          search,
          sortBy,
          salonType,
        },
      }),
    }),
    fetchAllCities: builder.query<{ cities: City[]; message: string }, void>({
      query: () => `${SALONS.FETCH_CITIES}`,
    }),
    fetchAllCategories: builder.query<{ categories: Category[]; message: string }, void>({
      query: () => `${SALONS.FETCH_CATEGORIES}`,
    }),
  }),
});

export const { useLazyFetchAllSalonsQuery, useFetchAllCategoriesQuery, useFetchAllCitiesQuery } = salonsApi;
