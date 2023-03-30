import { apiSlice } from "../../api/apiSlice";

export const profileRTKquery = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInfo: builder.query({
      query: () => ({
        url: "/renter/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/renter/profile/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          console.log(JSON.stringify(data));
          if (data) {
            // update profile cache pessimistically

            dispatch(
              apiSlice.util.updateQueryData(
                "getProfileInfo",
                undefined,
                (draft) => {
                  return {
                    ...draft,
                    fullname: arg.fullname,
                    permanent_address: arg.permanent_address,
                    postcode: arg.postcode,
                    street_no: arg.street_no,
                    NID_no: arg.NID_no,
                  };
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetProfileInfoQuery, useUpdateProfileMutation } =
  profileRTKquery;
