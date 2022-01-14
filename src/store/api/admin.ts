/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { ADMIN_PANEL } from 'endpoints/adminPanel';
import { Salon } from 'models/admin.model';
import { getToken } from '../../helpers/auth';
import { Message } from '../../types/util';

interface FetchAllSalonsReturn extends Message {
  salons: Pick<Salon, '_id' | 'address' | 'name' | 'city' | 'type'>[];
}

type FetchSalonDataReturn = Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city'>;

interface FetchSalonScheduleReturn extends Message {
  schedule: string;
}

interface FetchSalonPortfolioReturn extends Message {
  portfolio: string[];
}

interface FetchSalonPortfolioResponse extends Message {
  salon: Pick<Salon, 'name' | 'address' | 'phone' | 'description' | 'services' | 'crew' | 'city'>;
}

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => {
      const token = `Bearer ${getToken()}`;

      if (token) headers.set('Authorization', token);
      return headers;
    },
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
