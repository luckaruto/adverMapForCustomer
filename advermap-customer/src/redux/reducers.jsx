import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  geocoding: null,
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
  },
});

export const { setOrigin, setGeocoding } = navSlices.actions;

// selector
export const selectOrigin = (state) => state.nav.origin;
export const selectGeocoding = (state) => state.nav.geocoding;

export default navSlices.reducer;
