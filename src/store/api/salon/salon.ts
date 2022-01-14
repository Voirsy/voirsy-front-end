/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { SALON } from 'endpoints/salon';
import { setAuthHeader } from 'helpers/headers';
import { Message } from 'types/util';
import {
  AddReviewArguments,
  FetchSpecifiedSalonDataArguments,
  FetchSpecifiedSalonDataResponse,
  FetchSpecifiedSalonDataReturn,
} from './salon.types';

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
  }),
});

export const { useFetchSpecifiedSalonDataQuery, useAddReviewMutation } = salonApi;
