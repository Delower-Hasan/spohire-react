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

      // switch (type) {
      //   case "sports":
      //     if (sports.includes(data)) {
      //       const newSports = sports.filter((i) => i !== data);
      //       state.filterParams.sports = newSports;
      //     } else {
      //       sports.push(data);
      //     }
      //     return;
      //   case "country":
      //     if (country.includes(data)) {
      //       const newCountries = country.filter((i) => i !== data);
      //       state.filterParams.country = newCountries;
      //     } else {
      //       country.push(data);
      //     }
      //     return;
      //   case "categories":
      //     if (categories.includes(data)) {
      //       const newCategories = categories.filter((i) => i !== data);
      //       state.filterParams.categories = newCategories;
      //     } else {
      //       categories.push(data);
      //     }
      //     return;

      //   default:
      //     return;
      // }
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
