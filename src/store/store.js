import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./slice/hompage";

export const store = configureStore({
  reducer: {
    home:homeSlice.reducer
  },
});
