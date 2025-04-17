import axios from "axios";
import {
  invalidRequest,
  invitationRequestLoading,
  sendInvitation,
} from "../slices/invitation";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const sendInvitationApi = (token, data) => async (dispatch) => {
  try {
    dispatch(invitationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/invitation/invite-member`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(sendInvitation(response.data.data.invitation));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
