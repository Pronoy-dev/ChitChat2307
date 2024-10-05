import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../AllSlice/slice.js";

export const store = configureStore({
  reducer: {
    counterReducer: counterReducer,
  },
});
