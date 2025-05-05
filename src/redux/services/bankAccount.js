import axios from "axios";
import {
  invalidRequest,
  emailAccountRequestLoading,
  addAccount,
  updateAccount,
  getUserAccount,
} from "../slices/bankAccount";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addUpdateAccount = (token, formData) => async (dispatch) => {
  try {
    dispatch(emailAccountRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/bank-accounts`,
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
    dispatch(addAccount(response.data.data.bank));
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
export const getBankAccountByUserId = (token, userId) => async (dispatch) => {
  try {
    dispatch(emailAccountRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/bank-accounts/user/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addAccount(response.data.data.bank));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
