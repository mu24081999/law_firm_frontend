import { createSlice } from "@reduxjs/toolkit";
export const caseSlice = createSlice({
  name: "case",
  initialState: {
    isLoading: false,
    cases: [],
    case: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    caseRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserCases: (state, action) => {
      state.isLoading = false;
      state.cases = action.payload;
      state.type = "success";
    },
    getCaseDetails: (state, action) => {
      state.isLoading = false;
      state.case = action.payload;
      state.type = "success";
    },
  },
});
export default caseSlice.reducer;
export const {
  caseRequestLoading,
  invalidRequest,
  getUserCases,
  getCaseDetails,
} = caseSlice.actions;
