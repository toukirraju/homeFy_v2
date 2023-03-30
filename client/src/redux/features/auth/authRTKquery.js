import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authRTKquery = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.token,
              user: data?.user,
            })
          );

          dispatch(
            userLoggedIn({
              token: data?.token,
              user: data?.user,
            })
          );
        } catch (error) {}
      },
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.token,
              user: data?.user,
            })
          );

          dispatch(
            userLoggedIn({
              token: data?.token,
              user: data?.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authRTKquery;
