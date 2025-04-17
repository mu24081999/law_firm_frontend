// features/auth/serviceField.js
import { createSlice } from "@reduxjs/toolkit";

export const service = createSlice({
  name: "service",
  initialState: {
    isLoading: false,
    services: [],
    service: {},
    serviceRequests: [],
    serviceRequest: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    serviceRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getServices: (state, action) => {
      state.isLoading = false;
      state.services = action.payload;
      state.type = "success";
    },
    getService: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    updateService: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    addService: (state, action) => {
      state.isLoading = false;
      state.serviceField = action.payload;
    },
    deleteService: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    addServiceRequest: (state, action) => {
      state.isLoading = false;
      state.serviceRequest = action.payload;
    },
    getServiceRequests: (state, action) => {
      state.isLoading = false;
      state.serviceRequests = action.payload;
    },
  },
});

export default service.reducer;
export const {
  serviceRequestLoading,
  invalidRequest,
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
  addServiceRequest,
  getServiceRequests,
} = service.actions;
