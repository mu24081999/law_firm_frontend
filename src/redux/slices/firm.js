import { createSlice } from "@reduxjs/toolkit";
export const frimSlice = createSlice({
  name: "firm",
  initialState: {
    isLoading: false,
    firm: {},
    clients: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    firmRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    addFIrm: (state, action) => {
      state.isLoading = false;
      state.firm = action.payload;
      state.type = "success";
    },
    getClients: (state, action) => {
      state.isLoading = false;
      state.clients = action.payload;
      state.type = "success";
    },
  },
});
export default frimSlice.reducer;
export const { firmRequestLoading, invalidRequest, addFIrm, getClients } =
  frimSlice.actions;
