import axios from "axios";
import {
  invalidRequest,
  userRequestLoading,
  createUser,
  getUserSubaccounts,
} from "../slices/users";
import { toast } from "react-toastify";
import { updateMe } from "../slices/auth";
const backendURL = import.meta.env.VITE_API_URL;

export const createUserApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/users`, formData, config);
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(createUser(response.data.data.users));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateUserApi = (token, formData, userId) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.put(
      `${backendURL}/users/${userId}`,
      formData,
      config
    );
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(updateMe(response.data.data.userData));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserSubaccountsApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/users/${user_id}`, config);
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserSubaccounts(response.data.data.users));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
