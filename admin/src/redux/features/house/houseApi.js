import { apiSlice } from "../../api/apiSlice";
import { getHouses } from "./houseSlice";
// import { deleteAdmin, getAdmins, updateAdmin } from "./profileSlice";

export const houseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchHouses: builder.query({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({ page, limit, search });
        return `/admin/houses/?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getHouses({
                houses: data.houses,
                pagination: data.pagination,
              })
            );
          }
        } catch (error) {}
      },
      providesTags: ["AllHouses"],
    }),

    fetchCreatedHouses: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/houses/createdAt?${params.toString()}`;
      },
    }),
    fetchRegionalHouses: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/houses/regionalHouse?${params.toString()}`;
      },
    }),
    fetchVerifiedHouseCount: builder.query({
      query: () => {
        return `/admin/houses/verifiedHouse`;
      },
    }),
  }),
});

export const {
  useFetchHousesQuery,
  useFetchCreatedHousesQuery,
  useFetchRegionalHousesQuery,
  useFetchVerifiedHouseCountQuery,
} = houseApi;
