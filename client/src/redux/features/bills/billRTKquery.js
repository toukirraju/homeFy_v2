import { apiSlice } from "../../api/apiSlice";

export const billRTKquery = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTemporaryBill: builder.query({
      query: () => ({
        url: "/renter/temp-bill",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTemporaryBillQuery } = billRTKquery;
