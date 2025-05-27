import axios from "axios";
import {
  invalidRequest,
  billingInvoicesRequestLoading,
  getUserCards,
  getUserInvoices,
} from "../slices/billingInvoice";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const createInvoice = (token, data) => async (dispatch) => {
  try {
    dispatch(billingInvoicesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/invoices`, data, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        error: response.data.message,
      };
    }
    dispatch(getUserInvoices(response.data.data.invoices));
    toast.success("Invoice Created!");
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const sendInvoiceEmail = (token, data) => async (dispatch) => {
  try {
    dispatch(billingInvoicesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/invoices/send-invoice-email`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        error: response.data.message,
      };
    }
    toast.success(response.data.message);
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserInvoicesApi = (token, query) => async (dispatch) => {
  try {
    dispatch(billingInvoicesRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/invoices?${query && query}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return {
        success: false,
        error: response.data.message,
      };
    }
    dispatch(getUserInvoices(response.data.data.invoices));
    return {
      success: true,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
