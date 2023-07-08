import { apiSlice } from "../../api/apiSlice";
import { deleteAdmin, getAdmins, updateAdmin } from "./profileSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: ({ page = 1, limit = 10, username }) => {
        // const page = 1,
        //   limit = 10;
        // let username;
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
      providesTags: ["AllAdmins"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllAdmins"],
    }),
    updateAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              updateAdmin({
                admin: data,
              })
            );
          }
        } catch (error) {}
      },
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              deleteAdmin({
                _id: arg,
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
      invalidatesTags: ["AllAdmins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} = profileApi;
