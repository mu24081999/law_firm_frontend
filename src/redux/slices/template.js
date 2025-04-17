import { createSlice } from "@reduxjs/toolkit";
export const templateSlice = createSlice({
  name: "template",
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
    templateRequestLoading: (state) => {
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
      state.templates = action.payload;
      state.type = "success";
    },
    getTemplateById: (state, action) => {
      state.isLoading = false;
      state.template = action.payload;
      state.type = "success";
    },
    getUserTemplates: (state, action) => {
      state.isLoading = false;
      state.templates = action.payload;
      state.type = "success";
    },
    updateTemplate: (state, action) => {
      state.isLoading = false;
      state.templates = action.payload;
      state.type = "success";
    },
    deleteTemplate: (state, action) => {
      state.isLoading = false;
      state.templates = action.payload;
      state.type = "success";
    },
  },
});
export default templateSlice.reducer;
export const {
  templateRequestLoading,
  invalidRequest,
  addTemplate,
  getUserTemplates,
  getTemplateById,
} = templateSlice.actions;
