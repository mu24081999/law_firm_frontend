import { createSlice } from "@reduxjs/toolkit";
export const billingSlice = createSlice({
  name: "billing",
  initialState: {
    isLoading: false,
    invoices: [],
    cards: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    billingInvoicesRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserInvoices: (state, action) => {
      state.isLoading = false;
      state.invoices = action.payload;
      state.type = "success";
    },
    getUserCards: (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
      state.type = "success";
    },
  },
});
export default billingSlice.reducer;
export const {
  billingInvoicesRequestLoading,
  invalidRequest,
  getUserCards,
  getUserInvoices,
} = billingSlice.actions;
