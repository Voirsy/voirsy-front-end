/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { ADMIN_PANEL } from 'endpoints/adminPanel';
import { isFilledArray } from 'helpers/util';
import { Salon } from 'models/admin.model';

interface FETCH_ALL_USER_SALON {
  userId: string;
}

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<
      { salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type'>[]; message: string },
      FETCH_ALL_USER_SALON
    >({
      query: ({ userId }) => ({
        url: `${ADMIN_PANEL.FETCH_SALONS}`,
        method: 'post',
        body: {
          userId,
        },
      }),
    }),
    fetchSalonData: builder.query<
      Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city'>,
      { salonId: string }
    >({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_INFO(salonId)}`,
      transformResponse: (salonData: Salon[]): any => {
        const [data] = salonData;
        return data ? data : {};
      },
    }),
    fetchSalonSchedule: builder.query<{ schedule: string }, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_SCHEDULE(salonId)}`,
      transformResponse: (salonData: Salon[]) =>
        isFilledArray(salonData) ? { schedule: salonData[0].schedule } : { schedule: '' },
    }),
    fetchSalonPortfolio: builder.query<{ portfolio: string[] }, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_PORTFOLIO(salonId)}`,
      transformResponse: (salonData: Salon[]) =>
        isFilledArray(salonData) ? { portfolio: salonData[0].portfolio } : { portfolio: [] },
    }),
  }),
});

export const {
  useFetchAllSalonsQuery,
  useFetchSalonDataQuery,
  useFetchSalonPortfolioQuery,
  useFetchSalonScheduleQuery,
} = adminPanelApi;