import { createSlice } from "@reduxjs/toolkit";
export const websiteSlice = createSlice({
  name: "website",
  initialState: {
    isLoading: false,
    websites: [],
    website: {},
    posts: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    websiteRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      // state.websites = [];
      // state.website = {};
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserWebsites: (state, action) => {
      state.isLoading = false;
      state.websites = action.payload;
      state.type = "success";
    },
    addWebsite: (state, action) => {
      state.isLoading = false;
      state.websites = action.payload;
      state.type = "success";
    },
    updateWebsite: (state, action) => {
      state.isLoading = false;
      state.websites = action.payload;
      state.type = "success";
    },
    getWebsiteById: (state, action) => {
      state.isLoading = false;
      state.website = action.payload;
      state.type = "success";
    },
    deleteWebsiteById: (state, action) => {
      state.isLoading = false;
      state.websites = action.payload;
      state.type = "success";
    },
    getUserPosts: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.type = "success";
    },
  },
});
export default websiteSlice.reducer;
export const {
  websiteRequestLoading,
  invalidRequest,
  getUserWebsites,
  addWebsite,
  updateWebsite,
  getWebsiteById,
  deleteWebsiteById,
  getUserPosts,
} = websiteSlice.actions;
