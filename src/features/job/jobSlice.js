import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobType: null,
  JobLocation: null,
  jobCategory: null,

  JobfilterParams: {
    jobType: "",
    JobLocation: "",
    workplaceType: "",
  },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobFilterParams: (state, action) => {
      const { data } = action.payload;
      state.JobfilterParams = data;
    },
    setJobType: (state, action) => {
      state.jobType = action.payload;
    },
    setJobLocation: (state, action) => {
      state.JobLocation = action.payload;
    },
    setJobCategory: (state, action) => {
      state.jobCategory = action.payload;
    },
  },
});

export const {
  setJobType,
  setJobLocation,
  setJobCategory,
  setJobFilterParams,
} = jobSlice.actions;
export default jobSlice.reducer;
