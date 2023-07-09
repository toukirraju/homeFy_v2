import { apiSlice } from "../../api/apiSlice";
import { getRenters } from "./renterSlice";

export const renterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRenters: builder.query({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({ page, limit, search });
        return `/admin/renters/?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getRenters({
                renters: data.renters,
                pagination: data.pagination,
              })
            );
          }
        } catch (error) {}
      },
      providesTags: ["AllRenters"],
    }),

    fetchRenterCharts: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/renters/charts?${params.toString()}`;
      },
    }),
  }),
});

export const { useFetchRentersQuery, useFetchRenterChartsQuery } = renterApi;
