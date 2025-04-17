import { createSlice } from "@reduxjs/toolkit";
export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    profile: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    profileRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      // state.profile = {};
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getProfile: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.type = "success";
    },
    updateProfile: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.message = "success";
    },
  },
});
export default profileSlice.reducer;
export const {
  profileRequestLoading,
  invalidRequest,
  getProfile,
  updateProfile,
} = profileSlice.actions;
