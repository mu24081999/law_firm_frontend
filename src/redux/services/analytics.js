import axios from "axios";
import {
  invalidRequest,
  analyticsRequestLoading,
  getAnalytics,
} from "../slices/analytics";
import React from "react"; // Import React for createElement

const backendURL = import.meta.env.VITE_API_URL;
export const getAdminAnalytics = (token) => async (dispatch) => {
  try {
    dispatch(analyticsRequestLoading());

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/dashboard/admin-stats`,
      config
    );
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getAnalytics(response.data.data));
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getFirmAnalytics = (token, userId) => async (dispatch) => {
  try {
    dispatch(analyticsRequestLoading());

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/dashboard/firm-stats/${userId}`,
      config
    );
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getAnalytics(response.data.data));
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const getUserAnalytics = (token, userId) => async (dispatch) => {
  try {
    dispatch(analyticsRequestLoading());

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/dashboard/client-stats/${userId}`,
      config
    );
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getAnalytics(response.data.data));
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
