/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { ADMIN_PANEL } from 'endpoints/adminPanel';
import { isFilledArray } from 'helpers/util';
import { Salon } from 'models/admin.model';

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<Pick<Salon, '_id' | 'address' | 'name'>[], void>({
      query: () => `${ADMIN_PANEL.FETCH_SALONS}`,
    }),
    fetchSalonData: builder.query<
      Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'services' | 'crew'>,
      { salonId: string }
    >({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_INFO(salonId)}`,
      transformResponse: (salonData: Salon[]): any =>
        isFilledArray(salonData)
          ? {
              name: salonData[0].name,
              address: salonData[0].address,
              phone: salonData[0].phone,
              description: salonData[0].description,
              services: salonData[0].services,
              crew: salonData[0].crew,
            }
          : {},
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
