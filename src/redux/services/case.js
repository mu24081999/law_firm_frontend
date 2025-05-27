import axios from "axios";
import {
  invalidRequest,
  caseRequestLoading,
  getUserCases,
  getCaseDetails,
} from "../slices/case";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addCaseApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(caseRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/cases`, formData, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        message: response.data.message,
      };
    }
    dispatch(getUserCases(response.data.data.cases));
    toast.success(response.data.message);
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserCasesApi = (token, userId) => async (dispatch) => {
  try {
    dispatch(caseRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/cases/user/${userId}`,
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
    dispatch(getUserCases(response.data.data.cases));
    return {
      success: true,
      message: response.data.message,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
