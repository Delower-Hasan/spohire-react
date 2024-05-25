import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
  playerFilterParams: {
    positions: [],
    status: [],
    location: "",
    gender: "",
    minAge: "",
    maxAge: "",
    minHeight: "",
    maxHeight: "",
    dominantHand: "",
  },
  coachFilterParams: {
    status: "",
    location: "",
    nationality: "",
    gender: "",
    minAge: "",
    maxAge: "",
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
      const { data } = action.payload;
      state.playerFilterParams = data;
    },
    setCoachFilterParams: (state, action) => {
      const { data } = action.payload;
      state.coachFilterParams = data;
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
