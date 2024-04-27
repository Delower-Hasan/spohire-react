import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addContact: builder.mutation({
            query: (data) => ({
                url: "/api/v1/contact/sendContactMessage",
                method: "POST",
                body: data,
            }),
        }),

    }),
});

export const {
    useAddContactMutation,
} = contactApi;
