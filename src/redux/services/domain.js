import axios from "axios";
import { invalidRequest, addDomain, getUserDomain } from "../slices/domain";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;
export const addDomainApi = (token, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/domains`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addDomain(response.data.data.domain));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserDomainApi = (token, userId) => (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    axios
      .get(`${backendURL}/domains/${userId}`, config)
      .then((response) => {
        if (!response.data.statusCode === 200) {
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        dispatch(getUserDomain(response.data.data.domain));
      })
      .catch((error) => {
        dispatch(invalidRequest(error.message));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
