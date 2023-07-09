import { apiSlice } from "../../api/apiSlice";
import { getOwners } from "./ownerSlice";

export const ownerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOwners: builder.query({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({ page, limit, search });
        return `/admin/owners/?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getOwners({
                owners: data.owners,
                pagination: data.pagination,
              })
            );
          }
        } catch (error) {}
      },
      providesTags: ["AllOwners"],
    }),

    fetchOwnersCharts: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/owners/charts?${params.toString()}`;
      },
    }),
  }),
});

export const { useFetchOwnersQuery, useFetchOwnersChartsQuery } = ownerApi;
