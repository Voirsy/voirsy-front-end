import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ADMIN_PANEL } from 'endpoints/adminPanel';
import { Salon } from 'types/common';

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    fetchAllSalons: builder.query<Salon[], void>({
      query: () => `${ADMIN_PANEL.SALONS}`,
    }),
  }),
});

export const { useFetchAllSalonsQuery } = adminPanelApi;
