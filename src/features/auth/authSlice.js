import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
  playerFilterParams: {
    position: null,
    country: null,
    categories: null,
  },
  coachFilterParams: {
    age: null,
    country: null,
    categories: null,
  },
  addPlayerInfo: undefined,
  subscriptions: {
    subscriptionName: "Bronze",
    price: 10,
  },
  subscriptionTimeline: "MONTHLY",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
    setPlayerFilterParams: (state, action) => {
      const { type, data } = action.payload;

      switch (type) {
        case "position":
          state.playerFilterParams.position = data;
          return;
        case "country":
          state.playerFilterParams.country = data;
          return;
        case "categories":
          state.playerFilterParams.categories = data;
          return;

        default:
          return;
      }
    },
    setCoachFilterParams: (state, action) => {
      const { type, data } = action.payload;

      switch (type) {
        case "age":
          state.coachFilterParams.age = data;
          return;
        case "country":
          state.coachFilterParams.country = data;
          return;
        case "categories":
          state.coachFilterParams.categories = data;
          return;

        default:
          return;
      }
    },
    setAddPlayerProfileInfo: (state, action) => {
      state.addPlayerInfo = action.payload;
    },
    setSubscription: (state, action) => {
      const subscription = [
        {
          subscriptionName: "Bronze",
          price: 10,
        },
        {
          subscriptionName: "Silver",
          price: 20,
        },
        {
          subscriptionName: "Gold",
          price: 30,
        },
      ];
      state.subscriptions = subscription[action.payload];
    },
    setSubscriptionTimeline: (state, action) => {
      state.subscriptionTimeline = action.payload;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setPlayerFilterParams,
  setCoachFilterParams,
  setAddPlayerProfileInfo,
  setSubscription,
  setSubscriptionTimeline,
} = authSlice.actions;
export default authSlice.reducer;
