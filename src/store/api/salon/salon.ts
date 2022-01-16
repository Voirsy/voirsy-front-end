/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALON } from 'endpoints/salon';
import { setAuthHeader } from 'helpers/headers';
import { Message } from 'types/util';
import {
  AddReviewArguments,
  FetchServiceArguments,
  FetchServiceReturn,
  FetchSpecifiedSalonDataArguments,
  FetchSpecifiedSalonDataResponse,
  FetchSpecifiedSalonDataReturn,
  GetFreeHoursArguments,
  GetFreeHoursReturn,
} from './salon.types';
import { Salon, Service } from '../../../models/admin.model';

export const salonApi = createApi({
  reducerPath: 'salonApi',
  tagTypes: ['Salon'],
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
    }),
  }),
});

export const { useFetchSpecifiedSalonDataQuery, useAddReviewMutation, useFetchServiceQuery, useLazyGetFreeHoursQuery } =
  salonApi;
