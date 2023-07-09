import { apiSlice } from "../../api/apiSlice";
import { getApartments } from "./apartmentSlice";

export const apartmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchApartments: builder.query({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({ page, limit, search });
        return `/admin/apartments/?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getApartments({
                apartments: data.apartments,
                pagination: data.pagination,
              })
            );
          }
        } catch (error) {}
      },
      providesTags: ["AllApartments"],
    }),

    fetchApartmentCharts: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/apartments/charts?${params.toString()}`;
      },
    }),
  }),
});

export const { useFetchApartmentsQuery, useFetchApartmentChartsQuery } =
  apartmentApi;
