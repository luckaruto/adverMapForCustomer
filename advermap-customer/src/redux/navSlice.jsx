import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  geocoding: null,
  AdverValue: true,
  ReportValue: true,
};

export const navSlices = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },

    setGeocoding: (state, action) => {
      state.geocoding = action.payload;
    },
    setReportValue: (state, action) => {
      state.ReportValue = action.payload;
    },
    setAdverValue: (state, action) => {
      state.AdverValue = action.payload;
    },
  },
});

export const { setOrigin, setGeocoding, setReportValue, setAdverValue } =
  navSlices.actions;

// selector
export const selectOrigin = (state) => state.nav.origin;
export const selectGeocoding = (state) => state.nav.geocoding;
export const selectAdverValue = (state) => state.nav.AdverValue;
export const selectReportValue = (state) => state.nav.ReportValue;

export default navSlices.reducer;
