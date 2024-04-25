import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "spohireAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing, handle from ui
        }
      },
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "spohireAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing, handle from ui
        }
      },
    }),
    getAllUsers: builder.query({
      query: () => "/api/v1/users",
    }),
    getUserById: builder.query({
      query: (id) => `/api/v1/users/${id}`,
    }),
    getPlayerById: builder.query({
      query: (id) => `/api/v1/players/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/api/v1/users/${userId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updatePlayerDetails: builder.mutation({
      query: ({ playerId, data }) => ({
        url: `/api/v1/players/${playerId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ReferralUsers"],
    }),
    updateProfileCreationStatus: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/users/updateAddProfile/${userId}`,
        method: "PATCH",
      }),
    }),
    getFilteredUsers: builder.query({
      query: (queryString) => `/api/v1/users/filteredUsers?${queryString}`,
    }),
    cancleSubscription: builder.mutation({
      query: () => ({
        url: "/api/v1/users/cancleSubscription",
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          const previousUserInfo = JSON.parse(
            localStorage.getItem("spohireAuth")
          );

          const newUserInfo = {
            accessToken: previousUserInfo?.accessToken,
            user: result.data.data,
          };

          dispatch(userLoggedIn(newUserInfo));

          localStorage.setItem("spohireAuth", JSON.stringify(newUserInfo));
        } catch (err) {
          // do nothing, handle from ui
        }
      },
    }),
    //player
    addPlayer: builder.mutation({
      query: (data) => ({
        url: "/api/v1/players/create",
        method: "POST",
        body: data,
      }),
    }),
    buySubscriptionForPlayer: builder.mutation({
      query: (data) => ({
        url: "/api/v1/players/buySubscriptionForPlayer",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ReferralUsers"],
    }),
    getUserReferalls: builder.query({
      query: () => "/api/v1/users/userReferrals",
      providesTags: ["ReferralUsers"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReferralUsers"],
    }),
    deletePlayer: builder.mutation({
      query: (id) => ({
        url: `/api/v1/players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReferralUsers"],
    }),
    getPlayerDetails: builder.query({
      query: (id) => `/api/v1/players/${id}`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetFilteredUsersQuery,
  useUpdateProfileCreationStatusMutation,
  useCancleSubscriptionMutation,
  useAddPlayerMutation,
  useBuySubscriptionForPlayerMutation,
  useGetUserReferallsQuery,
  useDeleteUserMutation,
  useGetPlayerByIdQuery,
  useDeletePlayerMutation,
  useGetPlayerDetailsQuery,
  useUpdatePlayerDetailsMutation,
} = authApi;
