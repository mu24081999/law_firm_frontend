import axios from "axios";
import {
  invalidRequest,
  eventRequestLoading,
  getUserEvents,
} from "../slices/event";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const createEventApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(eventRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/events`, formData, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getUserEvents(response.data.data.events));
    toast.success(response.data.message);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserEventsApi = (token, userId) => async (dispatch) => {
  try {
    dispatch(eventRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/events/user/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getUserEvents(response.data.data.events));
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
