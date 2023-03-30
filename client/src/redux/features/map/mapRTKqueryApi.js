import { apiSlice } from "../../api/apiSlice";

export const mapRTKqueryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMapAddress: builder.query({
      query: () => `/map/address`,
    }),
  }),
});

export const { useFetchMapAddressQuery } = mapRTKqueryApi;
