import axios from "axios";
import {
  invalidRequest,
  chatRequestLoading,
  getUserChat,
} from "../slices/chat";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const getUserChatApi = (token, userId) => async (dispatch) => {
  try {
    dispatch(chatRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/chat/${userId}`, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserChat(response.data.data.messages));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
