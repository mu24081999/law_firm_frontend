// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: {},
    users: [],
    permissions: {},
    notifications: [],
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    userRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "";
      state.isLoading = false;
      state.type = "InvalidRequest";
    },
    createUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
      state.message = "User created successfully";
      state.type = "CreateUser";
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
      state.message = "User updated successfully";
      state.type = "UpdateUser";
    },
    deleteUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
      state.message = "User deleted successfully";
      state.type = "DeleteUser";
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = "";
      state.message = "User fetched successfully";
      state.type = "GetUser";
    },
    getUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = "";
      state.message = "Users fetched successfully";
      state.type = "GetUsers";
    },
    getUserSubaccounts: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = "";
      state.message = "User subaccounts fetched successfully";
      state.type = "GetUserSubaccounts";
    },
    getNotifications: (state, action) => {
      state.notifications = action.payload;
      state.isLoading = false;
    },
    getPermissions: (state, action) => {
      state.permissions = action.payload;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const {
  userRequestLoading,
  invalidRequest,
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getUserSubaccounts,
  getUsers,
  getNotifications,
  getPermissions,
} = authSlice.actions;
