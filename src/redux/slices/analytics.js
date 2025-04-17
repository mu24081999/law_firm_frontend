import { createSlice } from "@reduxjs/toolkit";
export const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    isLoading: false,
    analytics: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    analyticsRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getAnalytics: (state, action) => {
      state.isLoading = false;
      state.analytics = action.payload;
      state.type = "success";
    },
  },
});
export default analyticsSlice.reducer;
export const { analyticsRequestLoading, invalidRequest, getAnalytics } =
  analyticsSlice.actions;
