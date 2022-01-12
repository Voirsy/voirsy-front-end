/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { Salon } from 'models/admin.model';
import { SALON } from 'endpoints/salon';
import { getToken } from '../../helpers/auth';

interface FetchSpecifiedSalonData {
  salonId: string;
}

interface AddReview {
  salonId: string;
  rating: number;
  opinion: string;
}

export const salonApi = createApi({
  reducerPath: 'salonApi',
  tagTypes: ['Salon'],
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => {
      const token = `Bearer ${getToken()}`;

      if (token) headers.set('Authorization', token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchSpecifiedSalonData: builder.query<Omit<Salon, 'schedule'>, FetchSpecifiedSalonData>({
      query: ({ salonId }) => ({
        url: `${SALON.FETCH_SALON_DATA(salonId)}`,
      }),
      transformResponse: (data: { salon: Omit<Salon, 'schedule'>; message: string }): Omit<Salon, 'schedule'> =>
        data.salon,
      providesTags: ['Salon'],
    }),
    addReview: builder.mutation<{ message: string }, AddReview>({
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
