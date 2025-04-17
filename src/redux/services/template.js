import axios from "axios";
import {
  invalidRequest,
  templateRequestLoading,
  addTemplate,
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
