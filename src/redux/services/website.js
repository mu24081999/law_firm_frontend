import axios from "axios";
import {
  invalidRequest,
  websiteRequestLoading,
  getUserWebsites,
  addWebsite,
  updateWebsite,
  getWebsiteById,
  deleteWebsiteById,
  getUserPosts,
} from "../slices/website";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const getUserWebsitesApi = (token, userId) => async (dispatch) => {
  try {
    dispatch(websiteRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(`${backendURL}/website/${userId}`, config);
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserWebsites(response.data.data.websites));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getWebsiteByIdApi = (token, webId) => async (dispatch) => {
  try {
    dispatch(websiteRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/website/single/${webId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserWebsites(response.data.data.websites));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addWebsiteApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(websiteRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/website`,
      formData,
      config
    );
    if (response.data.statusCode !== 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    toast.success(response.data.message);
    dispatch(addWebsite(response.data.data.websites));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteWebsiteApi = (token, webId, userId) => async (dispatch) => {
  try {
    dispatch(websiteRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.delete(
      `${backendURL}/website/${webId}/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(deleteWebsiteById(response.data.data.websites));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addPostToWeb = (token, formData) => async (dispatch) => {
  try {
    dispatch(websiteRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/website/post`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserPostsApi = (token, userId) => async (dispatch) => {
  try {
    dispatch(websiteRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/website/posts/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserPosts(response.data.data.posts));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
