/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { ADMIN_PANEL } from 'endpoints/adminPanel';
import { setAuthHeader } from 'helpers/headers';
import {
  AddCrewMemberResponse,
  AddServiceArguments,
  AddServiceResponse,
  FetchAllSalonsReturn,
  FetchSalonDataReturn,
  FetchSalonPortfolioResponse,
  FetchSalonPortfolioReturn,
  FetchSalonScheduleReturn,
  UpdateSalonArguments,
} from './admin.types';

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => setAuthHeader(headers),
  }),
  tagTypes: ['SalonDetails'],
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<FetchAllSalonsReturn, void>({
      query: () => `${ADMIN_PANEL.FETCH_SALONS}`,
    }),
    fetchSalonData: builder.query<FetchSalonDataReturn, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_INFO(salonId)}`,
      transformResponse: (data: FetchSalonPortfolioResponse) => data.salon,
      providesTags: ['SalonDetails'],
    }),
    fetchSalonSchedule: builder.query<FetchSalonScheduleReturn, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_SCHEDULE(salonId)}`,
    }),
    fetchSalonPortfolio: builder.query<FetchSalonPortfolioReturn, { salonId: string }>({
      query: ({ salonId }) => `${ADMIN_PANEL.FETCH_PORTFOLIO(salonId)}`,
    }),
    addCrewMember: builder.mutation<AddCrewMemberResponse, { salonId: string; avatarUrl: string; fullname: string }>({
      query: ({ salonId, avatarUrl, fullname }) => ({
        url: `${ADMIN_PANEL.ADD_CREW_MEMBER(salonId)}`,
        method: 'post',
        body: {
          imageUrl: avatarUrl,
          name: fullname,
        },
      }),
      invalidatesTags: ['SalonDetails'],
    }),
    addService: builder.mutation<AddServiceResponse, AddServiceArguments>({
      query: ({ salonId, name, price, duration, description }) => ({
        url: `${ADMIN_PANEL.ADD_SERVICE(salonId)}`,
        method: 'post',
        body: {
          name,
          price,
          duration,
          description,
        },
      }),
      invalidatesTags: ['SalonDetails'],
    }),
    updateSalon: builder.mutation<FetchSalonDataReturn, UpdateSalonArguments>({
      query: ({ salonId, salon }) => ({
        url: `${ADMIN_PANEL.UPDATE_SALON(salonId)}`,
        method: 'PATCH',
        body: {
          name: salon.name,
          address: salon.address,
          city: salon.city,
          contact: {
            phone: salon.phone,
            email: salon.email,
          },
          description: salon.description,
        },
      }),
      invalidatesTags: ['SalonDetails'],
    }),
  }),
});

export const {
  useFetchAllSalonsQuery,
  useFetchSalonDataQuery,
  useFetchSalonPortfolioQuery,
  useFetchSalonScheduleQuery,
  useAddCrewMemberMutation,
  useAddServiceMutation,
  useUpdateSalonMutation,
} = adminPanelApi;
