import axios from "axios";
import {
  invalidRequest,
  templateRequestLoading,
  addTemplate,
  getTemplateById,
  getUserTemplates,
} from "../slices/template";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addTemplateApi = (token, data) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/templates`, data, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addTemplate(response.data.data.template));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserTemplate = (token, userId) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/templates/user/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getTemplateById(response.data.data.template));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getDefaultTemplates = (token) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/templates/default`, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserTemplates(response.data.data.templates));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
