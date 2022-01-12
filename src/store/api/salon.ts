/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { Salon } from 'models/admin.model';
import { SALON } from 'endpoints/salon';

interface FetchSpecifiedSalonData {
  salonId: string;
}

export const salonApi = createApi({
  reducerPath: 'salonApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchSpecifiedSalonData: builder.query<Omit<Salon, 'schedule'>, FetchSpecifiedSalonData>({
      query: ({ salonId }) => ({
        url: `${SALON.FETCH_SALON_DATA(salonId)}`,
      }),
      transformResponse: (data: { salon: Omit<Salon, 'schedule'>; message: string }): Omit<Salon, 'schedule'> =>
        data.salon,
    }),
  }),
});

export const { useFetchSpecifiedSalonDataQuery } = salonApi;
