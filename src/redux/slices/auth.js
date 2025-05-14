// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: {},
    subscription: {},
    userId: "",
    message: "",
    error: "",
    token: "",
    type: "",
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    authRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "";
      state.isLoading = false;
      state.type = "InvalidRequest";
      state.user = {};
      state.user_id = "";
      state.token = "";
      state.isAuthenticated = false;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.userID = action.payload.id;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
    twoFA: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.userId = action.payload.id;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
    updateMe: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    contactUs: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    logout: (state, action) => {
      state.user = {};
      state.userId = "";
      state.token = "";
      state.isLoading = false;
      state.error = "";
      state.message = action.payload;
      state.isAuthenticated = false;
      state.type = "Success";
    },
    register: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.userId = action.payload.id;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.message = "Registered Successfully.";
      state.type = "Success";
    },
    forgotPassword: (state, action) => {
      // state.user = "";
      // state.token = "";
      // state.user_id = "";
      // state.isAuthenticated = false;
      state.isLoading = false;
      // state.error = "";
      state.message = action.payload;
      state.type = "Success";
    },
    verifyOtp: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.type = "Success";
    },
    resetPassword: (state, action) => {
      // state.user = action.payload;
      // state.token = action.payload.token;
      // state.user_id = action.payload.id;
      // state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Reset Success";
      state.type = "Success";
    },
    reloadPage: (state, action) => {
      state.message = "";
      state.error = "";
      state.isLoading = false;
    },
    setAccount: (state, action) => {
      state.user = action.payload;
    },
    addSubscription: (state, action) => {
      state.isLoading = false;
      state.subscription = action.payload;
      state.message = "";
    },
  },
});

export default authSlice.reducer;
export const {
  authRequestLoading,
  invalidRequest,
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  reloadPage,
  updateMe,
  verifyOtp,
  setAccount,
  twoFa,
  contactUs,
  addSubscription,
} = authSlice.actions;
