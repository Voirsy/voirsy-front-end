/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALONS } from 'endpoints/salons';
import { Salon } from 'models/admin.model';

interface FetchAllSalon {
  location?: string;
  search?: string;
  sortBy?: string;
}

export const salonsApi = createApi({
  reducerPath: 'salonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<
      Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type' | 'rating' | 'imageUrl'>[],
      FetchAllSalon
    >({
      query: ({ location = '', search = '', sortBy = '' }) => ({
        // we will need to add POST method and body with passed arguments
        url: `${SALONS.FETCH_SALONS}`,
      }),
    }),
  }),
});

export const { useLazyFetchAllSalonsQuery } = salonsApi;
