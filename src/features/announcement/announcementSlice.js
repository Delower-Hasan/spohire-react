import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "date",
  announcementLocation: null,
  filterParams: {
    location: "",
    category: "",
  },
  dashboardFilterParams: {
    sports: null,
    country: null,
    categories: null,
  },
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setannouncementLocation: (state, action) => {
      state.announcementLocation = action.payload;
    },
    setFilterParams: (state, action) => {
      const { data } = action.payload;
      state.filterParams = data;
    },
    setDashboardFilterParams: (state, action) => {
      const { type, data } = action.payload;

      switch (type) {
        case "sports":
          state.dashboardFilterParams.sports = data;
          return;
        case "country":
          state.dashboardFilterParams.country = data;
          return;
        case "categories":
          state.dashboardFilterParams.categories = data;
          return;

        default:
          return;
      }
    },
  },
});

export const {
  setFilter,
  setannouncementLocation,
  setFilterParams,
  setDashboardFilterParams,
} = announcementSlice.actions;
export default announcementSlice.reducer;
