import axios from "axios";
import {
  invalidRequest,
  firmRequestLoading,
  addFIrm,
  getClients,
} from "../slices/firm";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addUpdateFirm = (token, formData) => async (dispatch) => {
  try {
    dispatch(firmRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/firm`, formData, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addFIrm(response.data.data.firm));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getFirmById = (token, id) => async (dispatch) => {
  try {
    dispatch(firmRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/firm/${id}`, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addFIrm(response.data.data.firm));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getClientsApi = (token, firmId) => async (dispatch) => {
  try {
    dispatch(firmRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/firm/clients/${firmId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getClients(response.data.data.clients));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
