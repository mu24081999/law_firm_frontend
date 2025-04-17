import { createSlice } from "@reduxjs/toolkit";
export const domainSlice = createSlice({
  name: "domain",
  initialState: {
    isLoading: false,
    domains: [],
    domain: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    domainRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserDomain: (state, action) => {
      state.isLoading = false;
      state.domain = action.payload;
      state.type = "success";
    },
    addDomain: (state, action) => {
      state.isLoading = false;
      state.domains = [...state.domains, action.payload];
      state.type = "success";
    },
    getAllDomains: (state, action) => {
      state.isLoading = false;
      state.domains = action.payload;
      state.type = "success";
    },
    deleteDomain: (state, action) => {
      state.isLoading = false;
      state.domains = state.domains.filter(
        (domain) => domain.id !== action.payload
      );
      state.type = "success";
    },
    updateDomain: (state, action) => {
      state.isLoading = false;
      state.domains = state.domains.map((domain) =>
        domain.id === action.payload.id ? action.payload : domain
      );
      state.type = "success";
    },
  },
});
export default domainSlice.reducer;
export const {
  domainRequestLoading,
  invalidRequest,
  getUserDomain,
  addDomain,
  getAllDomains,
  deleteDomain,
  updateDomain,
} = domainSlice.actions;
