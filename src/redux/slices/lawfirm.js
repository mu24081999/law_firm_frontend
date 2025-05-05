import { createSlice } from "@reduxjs/toolkit";
export const lawFirmSlice = createSlice({
  name: "lawfirm",
  initialState: {
    isLoading: false,
    lawfirm: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    lawFirmRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    addProfile: (state, action) => {
      state.isLoading = false;
      state.firm = action.payload;
      state.type = "success";
    },
    updateProfile: (state, action) => {
      state.isLoading = false;
      state.firm = action.payload;
      state.type = "success";
    },
    getLawFirm: (state, action) => {
      state.isLoading = false;
      state.lawfirm = action.payload;
      state.type = "success";
    },
  },
});
export default lawFirmSlice.reducer;
export const {
  lawFirmRequestLoading,
  invalidRequest,
  addProfile,
  updateProfile,
  getLawFirm,
} = lawFirmSlice.actions;
