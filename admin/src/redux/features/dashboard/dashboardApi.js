import { apiSlice } from "../../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDashboardWidgets: builder.query({
      query: () => {
        return `/admin/dashboard/widgets`;
      },
    }),
  }),
});

export const { useFetchDashboardWidgetsQuery } = dashboardApi;
