// authActions.js
import axios from "axios";
import {
  invalidRequest,
  profileRequestLoading,
  getProfile,
  updateProfile,
} from "../slices/profile";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const getUserProfile = (token, userId) => async (dispatch) => {
  try {
    dispatch(profileRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/profile/${userId}`, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getProfile(response.data.data.profile));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateUserProfile =
  (token, userId, formData) => async (dispatch) => {
    try {
      dispatch(profileRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.put(
        `${backendURL}/profile/${userId}`,
        formData,
        config
      );
      if (!response.data.statusCode === 200) {
        dispatch(invalidRequest(response.data.message));
        return toast.error(response.data.message);
      }
      dispatch(updateProfile(response.data.data.profile));
      toast.success(response.data.message);
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
