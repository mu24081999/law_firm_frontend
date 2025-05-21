import axios from "axios";
import {
  invalidRequest,
  userRequestLoading,
  createUser,
  getUserSubaccounts,
  getUsers,
  getNotifications,
} from "../slices/users";
import { toast } from "react-toastify";
import { updateMe as updateUser } from "../slices/auth";
const backendURL = import.meta.env.VITE_API_URL;

export const getUsersApi = (token) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/users`, config);
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUsers(response.data.data));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserNotifications = (token, userId) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/users/${userId}/notifications`,
      config
    );
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getNotifications(response.data.data.notifications));
  } catch (error) {
    dispatch(invalidRequest(error.message));
  }
};
export const updateNotification =
  (token, userId, id, data) => async (dispatch) => {
    try {
      dispatch(userRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.put(
        `${backendURL}/users/${userId}/notifications/${id}`,
        data,
        config
      );
      if (response.data.statusCode !== 200) {
        dispatch(invalidRequest(response.data.message));
        toast.error(response.data.message);
        return {
          success: false,
          message: response.data.message,
        };
      }
      dispatch(getNotifications(response.data.data.notifications));
      return {
        success: true,
        response: response.data.data,
      };
    } catch (error) {
      dispatch(invalidRequest(error.message));
    }
  };
export const updateSubscriptionReciept =
  (token, formData, query) => async (dispatch) => {
    try {
      dispatch(userRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.put(
        `${backendURL}/users/subscription-reciepts?${query}`,
        formData,
        config
      );
      if (response.data.statusCode !== 200) {
        dispatch(invalidRequest(response.data.message));
        return toast.error(response.data.message);
      }
      dispatch(getUsers(response.data.data));
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
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
export const updateUserApi =
  (token, formData, userId, updateMe = true) =>
  async (dispatch) => {
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
      if (updateMe) {
        dispatch(updateUser(response.data.data.userData));
        toast.success(response.data.message);
      } else {
        dispatch(getUsers(response.data.data.all));
      }
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
