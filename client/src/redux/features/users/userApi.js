import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => `/messenger/users?username=${username}`,
    }),
    forgetPassword: builder.mutation({
      query: (username) => ({
        url: `/renter/forgot-password`,
        method: "POST",
        body: username,
      }),
    }),
  }),
});

export const { useGetUserQuery, useForgetPasswordMutation } = userApi;
