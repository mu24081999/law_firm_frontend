import axios from "axios";
import {
  invalidRequest,
  boardRequestLoading,
  getBoards,
  getLeads,
} from "../slices/board";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const getUserBoardsApi = (token, query) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/boards?${query && query}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getBoards(response.data.data.boards));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserLeads = (token, query) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/leads?${query && query}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getLeads(response.data.data.leads));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addLeadApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/leads`, formData, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getLeads(response.data.data.leads));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateLead = (token, formData, id) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.put(
      `${backendURL}/leads/${id}`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getBoards(response.data.data.boards));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addBoardApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(boardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(`${backendURL}/boards`, formData, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getBoards(response.data.data.boards));
    return toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
