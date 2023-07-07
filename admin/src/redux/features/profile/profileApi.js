import { apiSlice } from "../../api/apiSlice";
import { getAdmins } from "./profileSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: ({ page = 1, limit = 10, username }) => {
        const params = new URLSearchParams({ page, limit, username });
        return `/admin/?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getAdmins({
                admins: data.admins,
                pagination: data.pagination,
              })
            );

            // dispatch(
            //   apiSlice.util.updateQueryData("getAdmins", undefined, (draft) => {
            //     return {
            //       ...draft,
            //       admins: [...draft.admins, ...data.admins],
            //       pagination: data.pagination,
            //     };
            //   })
            // );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetAdminsQuery } = profileApi;
