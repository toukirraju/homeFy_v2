import { decryptData } from "../../../utility/encryptionDecryption";
import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          //decrypt response data
          const decryptedData = decryptData(
            data,
            process.env.REACT_APP_ED_SECRET
          );
          // response store in local storege
          localStorage.setItem("homifyAdmin", JSON.stringify(data));
          // decrypted data save in redux store
          dispatch(
            userLoggedIn({
              token: decryptedData?.token,
              user: decryptedData?.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
