import { configureStore } from "@reduxjs/toolkit";
import reducers from "./redux/reducers";

export const store = configureStore({
  reducer: {
    nav: reducers,
  },
});
