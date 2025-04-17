import { createSlice } from "@reduxjs/toolkit";
export const teamSlice = createSlice({
  name: "team",
  initialState: {
    isLoading: false,
    members: [],
    invitations: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    teamRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      // state.members = [];
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserMembers: (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
      state.type = "success";
    },
    getUserInvitations: (state, action) => {
      state.isLoading = false;
      state.invitations = action.payload;
      state.type = "success";
    },
    sendInvitation: (state, action) => {
      state.isLoading = false;
      state.invitations = action.payload;
      state.type = "success";
    },
  },
});
export default teamSlice.reducer;
export const {
  teamRequestLoading,
  invalidRequest,
  getUserMembers,
  sendInvitation,
  getUserInvitations,
} = teamSlice.actions;
