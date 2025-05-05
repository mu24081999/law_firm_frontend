import { createSlice } from "@reduxjs/toolkit";
export const emailTemplateReducer = createSlice({
  name: "emailTemplate",
  initialState: {
    isLoading: false,
    templates: [],
    template: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    emailTemplateRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    addTemplate: (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.type = "success";
    },
    getTemplate: (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.type = "success";
    },
  },
});
export default emailTemplateReducer.reducer;
export const {
  emailTemplateRequestLoading,
  invalidRequest,
  addTemplate,
  getTemplate,
} = emailTemplateReducer.actions;
