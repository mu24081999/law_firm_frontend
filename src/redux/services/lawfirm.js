import axios from "axios";
import {
  invalidRequest,
  lawFirmRequestLoading,
  addProfile,
  updateProfile,
  getLawFirm,
} from "../slices/lawfirm";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const addProfileApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(lawFirmRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/lawfirms`,
      formData,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(addProfile(response.data.data.firm));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getFirmByUserId = (token, userId) => async (dispatch) => {
  try {
    dispatch(lawFirmRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/lawfirms/${userId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getLawFirm(response.data.data.firm));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

// export const getClientsApi = (token, firmId) => async (dispatch) => {
//   try {
//     dispatch(firmRequestLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token,
//       },
//     };
//     const response = await axios.get(
//       `${backendURL}/firm/clients/${firmId}`,
//       config
//     );
//     if (!response.data.statusCode === 200) {
//       dispatch(invalidRequest(response.data.message));
//       return toast.error(response.data.message);
//     }
//     dispatch(getClients(response.data.data.clients));
//   } catch (e) {
//     dispatch(invalidRequest(e.message));
//   }
// };
