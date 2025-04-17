import { createSlice } from "@reduxjs/toolkit";
export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isLoading: false,
    subscription: {},
    payment: {},
    paymentIntend: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    subscriptionRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    createPaymentIntend: (state, action) => {
      state.isLoading = false;
      state.paymentIntend = action.payload;
    },
    createSubscription: (state, action) => {
      state.isLoading = false;
      state.subscription = action.payload;
    },
    createPayment: (state, action) => {
      state.isLoading = false;
      state.payment = action.payload;
    },
  },
});
export default subscriptionSlice.reducer;
export const {
  subscriptionRequestLoading,
  createPaymentIntend,
  invalidRequest,
  createSubscription,
  createPayment,
} = subscriptionSlice.actions;
