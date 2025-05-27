import { createSlice } from "@reduxjs/toolkit";
export const boardSlice = createSlice({
  name: "board",
  initialState: {
    isLoading: false,
    boards: [],
    leads: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    boardRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getBoards: (state, action) => {
      state.isLoading = false;
      state.boards = action.payload;
      state.type = "success";
    },
    getLeads: (state, action) => {
      state.isLoading = false;
      state.leads = action.payload;
      state.type = "success";
    },
  },
});
export default boardSlice.reducer;
export const { boardRequestLoading, invalidRequest, getBoards, getLeads } =
  boardSlice.actions;
