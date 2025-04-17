import { createSlice } from "@reduxjs/toolkit";
export const invitationSlice = createSlice({
  name: "invitation",
  initialState: {
    isLoading: false,
    invitation: {},
    invitations: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    invitationRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      // state.invitation = {};
      // state.invitations = [];
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    sendInvitation: (state, action) => {
      state.isLoading = false;
      state.invitation = action.payload;
      state.type = "success";
    },
  },
});
export default invitationSlice.reducer;
export const { invitationRequestLoading, invalidRequest, sendInvitation } =
  invitationSlice.actions;
