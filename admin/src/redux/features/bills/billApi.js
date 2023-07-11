import { apiSlice } from "../../api/apiSlice";
import { getBills, getTemporaryBills } from "./billSlice";

export const billApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBills: builder.query({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({ page, limit, search });
        return `/admin/bills/?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getBills({
                bills: data.bills,
                pagination: data.pagination,
              })
            );
          }
        } catch (error) {}
      },
      providesTags: ["AllBills"],
    }),

    fetchTemporaryBills: builder.query({
      query: ({ page = 1, limit = 10, search }) => {
        const params = new URLSearchParams({ page, limit, search });
        return `/admin/bills/temp?${params.toString()}`;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically
            dispatch(
              getTemporaryBills({
                temporaryBills: data.tempBills,
                pagination: data.pagination,
              })
            );
          }
        } catch (error) {}
      },
      providesTags: ["AllTempBills"],
    }),

    fetchYearlyBillCount: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/bills/count?${params.toString()}`;
      },
    }),
    fetchYearlyBillPaid: builder.query({
      query: ({ year }) => {
        const params = new URLSearchParams({ year });
        return `/admin/bills/yearly-paid?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useFetchBillsQuery,
  useFetchTemporaryBillsQuery,
  useFetchYearlyBillCountQuery,
  useFetchYearlyBillPaidQuery,
} = billApi;
