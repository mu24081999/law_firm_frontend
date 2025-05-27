import { createSlice } from "@reduxjs/toolkit";
export const eventSlice = createSlice({
  name: "event",
  initialState: {
    isLoading: false,
    events: [],
    event: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    eventRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserEvents: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.type = "success";
    },
    getEventDetails: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.type = "success";
    },
  },
});
export default eventSlice.reducer;
export const {
  eventRequestLoading,
  invalidRequest,
  getUserEvents,
  getEventDetails,
} = eventSlice.actions;
