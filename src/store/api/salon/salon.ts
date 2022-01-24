/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALON } from 'endpoints/salon';
import { setAuthHeader } from 'helpers/headers';
import { Message } from 'types/util';
import {
  AddReviewArguments,
  ConfirmReservationArguments,
  FetchServiceArguments,
  FetchServiceReturn,
  FetchSpecifiedSalonDataArguments,
  FetchSpecifiedSalonDataResponse,
  FetchSpecifiedSalonDataReturn,
  GetFreeHoursArguments,
  GetFreeHoursReturn,
} from './salon.types';

export const salonApi = createApi({
  reducerPath: 'salonApi',
  tagTypes: ['Salon', 'Reservation'],
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => setAuthHeader(headers),
  }),
  endpoints: (builder) => ({
    fetchSpecifiedSalonData: builder.query<FetchSpecifiedSalonDataReturn, FetchSpecifiedSalonDataArguments>({
      query: ({ salonId }) => ({
        url: `${SALON.FETCH_SALON_DATA(salonId)}`,
      }),
      transformResponse: (response: FetchSpecifiedSalonDataResponse) => response.salon,
      providesTags: ['Salon'],
    }),
    addReview: builder.mutation<Message, AddReviewArguments>({
      query: (body) => ({
        url: `${SALON.ADD_REVIEW}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Salon'],
    }),
    fetchService: builder.query<FetchServiceReturn, FetchServiceArguments>({
      query: (body) => ({
        url: SALON.FETCH_SERVICE,
        method: 'POST',
        body,
      }),
    }),
    getFreeHours: builder.query<GetFreeHoursReturn, GetFreeHoursArguments>({
      query: (body) => ({
        url: `${SALON.GET_FREE_HOURS}`,
        method: 'POST',
        body,
      }),
      providesTags: ['Reservation'],
    }),
    confirmReservation: builder.mutation<Message, ConfirmReservationArguments>({
      query: (body) => ({
        url: `${SALON.CONFIRM_RESERVATION}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reservation'],
    }),
  }),
});

export const {
  useFetchSpecifiedSalonDataQuery,
  useAddReviewMutation,
  useFetchServiceQuery,
  useLazyGetFreeHoursQuery,
  useConfirmReservationMutation,
} = salonApi;
