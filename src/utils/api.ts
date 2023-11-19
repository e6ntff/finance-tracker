import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://open.er-api.com/' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => 'v6/latest/USD',
      transformResponse: (response: any) => ({
        EUR: response.rates.EUR,
        RUB: response.rates.RUB,
      }),
    }),
  }),
});

export const { useGetDataQuery } = api;
export default api;
