import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    geners: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.geners  = action.payload;
    },
  },
});
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice;
