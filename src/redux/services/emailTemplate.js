import axios from "axios";
import {
  invalidRequest,
  emailTemplateRequestLoading,
  addTemplate,
} from "../slices/emailTemplate";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addUpdateTemplate = (token, formData) => async (dispatch) => {
  try {
    dispatch(emailTemplateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/email-templates`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
      };
    }
    dispatch(addTemplate(response.data.data.template));
    toast.success(response.data.message);
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return {
      success: false,
    };
  }
};
export const getEmailTemplateByUserId = (token, userId) => async (dispatch) => {
  try {
    dispatch(emailTemplateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/email-templates/user/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addTemplate(response.data.data.template));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
