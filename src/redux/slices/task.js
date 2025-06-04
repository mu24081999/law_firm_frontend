import { createSlice } from "@reduxjs/toolkit";
export const taskSlice = createSlice({
  name: "task",
  initialState: {
    isLoading: false,
    tasks: [],
    task: {},
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    taskRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserTasks: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.type = "success";
    },
    getCaseDetails: (state, action) => {
      state.isLoading = false;
      state.task = action.payload;
      state.type = "success";
    },
  },
});
export default taskSlice.reducer;
export const {
  taskRequestLoading,
  invalidRequest,
  getUserTasks,
  getCaseDetails,
} = taskSlice.actions;
