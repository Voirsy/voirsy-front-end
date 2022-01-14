/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { ADMIN_PANEL } from 'endpoints/adminPanel';
import { setAuthHeader } from 'helpers/headers';
import {
  FetchAllSalonsReturn,
  FetchSalonDataReturn,
  FetchSalonPortfolioResponse,
  FetchSalonPortfolioReturn,
  FetchSalonScheduleReturn,
} from './admin.types';

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => setAuthHeader(headers),
  }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<FetchAllSalonsReturn, void>({
      query: () => `${ADMIN_PANEL.FETCH_SALONS}`,
    }),
    fetchSalonData: builder.query<FetchSalonDataReturn, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_INFO(salonId)}`,
      transformResponse: (data: FetchSalonPortfolioResponse) => data.salon,
    }),
    fetchSalonSchedule: builder.query<FetchSalonScheduleReturn, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_SCHEDULE(salonId)}`,
    }),
    fetchSalonPortfolio: builder.query<FetchSalonPortfolioReturn, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_PORTFOLIO(salonId)}`,
    }),
  }),
});

export const {
  useFetchAllSalonsQuery,
  useFetchSalonDataQuery,
  useFetchSalonPortfolioQuery,
  useFetchSalonScheduleQuery,
} = adminPanelApi;
