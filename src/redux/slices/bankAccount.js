import { createSlice } from "@reduxjs/toolkit";
export const bankAccountReducer = createSlice({
  name: "bankAccount",
  initialState: {
    isLoading: false,
    accounts: [],
    account: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    emailAccountRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    addAccount: (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
      state.type = "success";
    },
    updateAccount: (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
      state.type = "success";
    },
    getUserAccount: (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
      state.type = "success";
    },
  },
});
export default bankAccountReducer.reducer;
export const {
  emailAccountRequestLoading,
  invalidRequest,
  addAccount,
  updateAccount,
  getUserAccount,
} = bankAccountReducer.actions;
