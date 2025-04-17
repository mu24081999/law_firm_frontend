import axios from "axios";
import {
  invalidRequest,
  teamRequestLoading,
  getUserMembers,
  sendInvitation,
  getUserInvitations,
} from "../slices/team";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;
export const sendInvitationApi = (token, data) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/team/invite-member`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(sendInvitation(response.data.data));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserMembersApi = (token, ownerId) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/team/members/${ownerId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserMembers(response.data.data));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserInvitationsApi = (token, ownerId) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/team/invitations/${ownerId}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserInvitations(response.data.data));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateTeamMemberApi =
  (token, memberId, ownerId, data) => async (dispatch) => {
    try {
      dispatch(teamRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.put(
        `${backendURL}/team-member/${memberId}/${ownerId}`,
        data,
        config
      );
      if (!response.data.statusCode === 200) {
        dispatch(invalidRequest(response.data.message));
        return toast.error(response.data.message);
      }
      dispatch(getUserMembers(response.data.data.members));
      toast.success(response.data.message);
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const deleteMemberApi =
  (token, memberId, ownerId) => async (dispatch) => {
    try {
      dispatch(teamRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.delete(
        `${backendURL}/team-member/${memberId}/${ownerId}`,
        config
      );
      if (!response.data.statusCode === 200) {
        dispatch(invalidRequest(response.data.message));
        return toast.error(response.data.message);
      }
      dispatch(getUserMembers(response.data.data.members));
      toast.success(response.data.message);
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
