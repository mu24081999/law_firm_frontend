import axios from "axios";
import {
  invalidRequest,
  subscriptionRequestLoading,
  createPayment,
  createPaymentIntend,
  createSubscription,
} from "../slices/subscription";
import { toast } from "react-toastify";
import { setAccount } from "../slices/auth";
const backendURL = import.meta.env.VITE_API_URL;

export const createPaymentIntendApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/subscriptions/payment-intend`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(createPaymentIntend(response.data.data.paymentData));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const createSubscriptionApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/subscriptions/create-subscription`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(createSubscription(response.data.data.subscription));
    dispatch(setAccount(response.data.data.user));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const createPaymentApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/subscriptions/create-payment`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(createPayment(response.data.data.payment));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
