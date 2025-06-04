import axios from "axios";
import {
  invalidRequest,
  taskRequestLoading,
  getUserTasks,
} from "../slices/task";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addTaskApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/tasks`, formData, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getUserTasks(response.data.data.tasks));
    toast.success(response.data.message);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteTaskApi = (token, taskId) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.delete(
      `${backendURL}/tasks/${taskId}`,
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
    dispatch(getUserTasks(response.data.data.tasks));
    toast.success(response.data.message);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateTaskApi = (token, formData, taskId) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.put(
      `${backendURL}/tasks/${taskId}`,
      formData,
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
    dispatch(getUserTasks(response.data.data.tasks));
    toast.success(response.data.message);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserTasksApi = (token, userId) => async (dispatch) => {
  try {
    dispatch(taskRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/tasks/user/${userId}`,
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
    dispatch(getUserTasks(response.data.data.tasks));
    toast.success(response.data.message);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
