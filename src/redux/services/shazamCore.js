import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '721621ae4fmshf1c35f32b90e3a9p14cb4ajsn6ea9cf84441b'
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/v2/get-details?id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: ({ id }) => `/artists/get-details?id=${id}`,
    }),
  }),
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
} = shazamCoreApi
