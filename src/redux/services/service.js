// authActions.js
import axios from "axios";
import {
  invalidRequest,
  serviceRequestLoading,
  getServices,
  addServiceRequest,
  getServiceRequests,
} from "../slices/service";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;
export const addBankRecieptApi = (token, data) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/service-requests/add-payment-reciept`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return false;
    }
    toast.success(response.data.message);
    return true;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addServiceRequestApi = (token, data) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/service-requests`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return false;
    }
    dispatch(addServiceRequest(response.data.data.request));
    toast.success(response.data.message);
    return true;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateServiceRequestApi = (token, data) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/service-requests`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      toast.error(response.data.message);
      return false;
    }
    dispatch(addServiceRequest(response.data.data.request));
    toast.success(response.data.message);
    return true;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addServiceFieldsApi = (token, data) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/services`, data, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getServices(response.data.data.services));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateServicePermissionApi =
  (token, data, per_id) => async (dispatch) => {
    try {
      dispatch(serviceRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.put(
        `${backendURL}/services/service-permissions/${per_id}`,
        data,
        config
      );
      if (!response.data.statusCode === 200) {
        dispatch(invalidRequest(response.data.message));
        return toast.error(response.data.message);
      }
      dispatch(getServices(response.data.data.services));
      toast.success(response.data.message);
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const updateMultiServiceFields = (token, data) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.put(
      `${backendURL}/fields/services/multi-update`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getServices(response.data.data.services));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAllServiceRequests = (token, query) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/service-requests?${query && query}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getServiceRequests(response.data.data.requests));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAllServiceFieldsApi = (token) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/services`, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getServices(response.data.data.services));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteServiceApi = (token, serviceId) => async (dispatch) => {
  try {
    dispatch(serviceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.delete(
      `${backendURL}/services/${serviceId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    toast.success(response.data.message);
    dispatch(getServices(response.data.data.services));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
