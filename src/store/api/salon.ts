/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from 'config/enviroments';
import { Salon, Service } from 'models/admin.model';
import { SALON } from 'endpoints/salon';

interface FetchSpecifiedSalonData {
  salonId: string;
}

interface FetchService extends FetchSpecifiedSalonData {
  serviceId: string;
}

export const salonApi = createApi({
  reducerPath: 'salonApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.apiUrl }),
  endpoints: (builder) => ({
    fetchSpecifiedSalonData: builder.query<Omit<Salon, 'schedule'>, FetchSpecifiedSalonData>({
      query: ({ salonId }) => ({
        url: `${SALON.FETCH_SALON_DATA(salonId)}`,
      }),
      transformResponse: (salon: Salon[]): Salon => salon[0],
    }),
    fetchService: builder.query<Service, FetchService>({
      query: ({ salonId, serviceId }) => ({
        url: `${SALON.FETCH_SERVICE(salonId, serviceId)}`,
      }),
      transformResponse: (salon: Salon[], meta) => {
        if (meta?.response) {
          const serviceId = meta.response.url.split('/').reverse()[0];
          return salon[0].services.find((el) => el._id === serviceId) || salon[0].services[0];
        }
        return salon[0].services[0];
      },
    }),
  }),
});

export const { useFetchSpecifiedSalonDataQuery, useFetchServiceQuery } = salonApi;
