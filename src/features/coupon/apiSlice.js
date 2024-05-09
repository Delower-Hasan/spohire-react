import { apiSlice } from "../api/apiSlice";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => "/api/v1/coupons/",
      providesTags: ["Coupons"],
    }),
  }),
});

export const { useGetCouponsQuery } = jobApi;
