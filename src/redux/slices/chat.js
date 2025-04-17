import { createSlice } from "@reduxjs/toolkit";
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    chat: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    chatRequestLoading: (state) => {
      state.isLoading = true;
    },
    invalidRequest: (state) => {
      state.isLoading = false;
      state.chat = [];
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    getUserChat: (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.type = "success";
    },
  },
});
export default chatSlice.reducer;
export const { chatRequestLoading, invalidRequest, getUserChat } =
  chatSlice.actions;
