// authActions.js
import axios from "axios";
import {
  invalidRequest,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  authRequestLoading,
  verifyOtp,
  // twoFa,
  contactUs,
  // updateMe,
} from "../slices/auth";
import { toast } from "react-toastify";
const backendURL = import.meta.env.VITE_API_URL;

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/auth/register`,
      registerData,
      config
    );
    if (response?.data?.statusCode !== 200) {
      toast.error(response.data.message);
      return dispatch(invalidRequest(response.data.message));
    }
    toast.success(response.data.message);
    dispatch(register(response.data.data.userData));
    return response.data;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const registerTeamMember = (registerData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/team-member/register-member`,
      registerData,
      config
    );
    if (response?.data?.statusCode !== 200) {
      toast.error(response.data.message);
      return dispatch(invalidRequest(response.data.message));
    }
    toast.success(response.data.message);
    dispatch(register(response.data.data.userData));
    return response.data;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const addUser = (registerData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/auth/register`,
      registerData,
      config
    );
    if (response?.data?.statusCode !== 200) {
      toast.error(response.data.message);
      return dispatch(invalidRequest(response.data.message));
    }
    dispatch(forgotPassword(response.data.message));
    toast.success(response.data.message);

    return response.data;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const is_login = await axios
      .post(`${backendURL}/auth/login`, data, config)
      .then((response) => {
        console.log(response.data);
        if (response?.data?.statusCode !== 200) {
          dispatch(invalidRequest(response.data.message));
          toast.error(response.data.message);
          return {
            success: false,
            message: response.data.message,
          };
        }
        toast.success(response.data.message);
        dispatch(login(response.data.data.userData));
        return {
          success: true,
          userData: response.data.data.userData,
        };
      });
    return is_login;
  } catch (e) {
    dispatch(invalidRequest(e.message));
    toast.error(e.message);
  }
};
export const verifyOTPRec = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const response = await axios
      .post(`${backendURL}/auth/verify-otp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          dispatch(invalidRequest(response.data.message));
          toast.error(response.data.message);
          return { success: false, message: response.data.message };
        }
        dispatch(verifyOtp(response.data.message));
        dispatch(login(response.data.data.userData));
        toast.success(response.data.message);
        return {
          success: true,
          userData: response.data.data.userData,
        };
      });

    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const logoutUser = (token) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const response = await axios
      .post(
        `${backendURL}/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token, // pass the cookie from the browser
          },
        }
      )
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        dispatch(logout(response.data.message));
        toast.success(response.data.message);
        return true;
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const forgotPasswordApi = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const response = await axios.post(
      `${backendURL}/auth/forgot-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      }
    );

    if (response?.data?.statusCode !== 200) {
      toast.error(response.data.message);
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }

    dispatch(forgotPassword(response.data.message));
    toast.success(response.data.message);
    return {
      success: true,
      otp: response.data.data.is_otp_added,
      userData: response.data.data.userData,
    };
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const verifyOTPApi = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const verify_otp = await axios
      .post(`${backendURL}/auth/verify-otp`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          toast.error(response.data.message);
          return false;
        }
        dispatch(verifyOtp(response.data.message));
        toast.success(response.data.message);
        return {
          success: true,
          otp: response.data.data.otp,
          userData: response.data.data.userData,
        };
      });
    return verify_otp;
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const verifyEmail = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const verify_otp = await axios
      .post(`${backendURL}/auth/verify-email`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return false;
        }
        dispatch(verifyOtp(response.data.message));
        toast.success(response.data.message);

        return response.data.data.userData;
      });
    if (verify_otp) {
      return verify_otp;
    }
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const resetPasswordApi = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const is_reset_password = await axios
      .post(`${backendURL}/auth/reset-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        // console.log(response);
        dispatch(resetPassword(response.data.data.userData));
        toast.success(response.data.message);
        return {
          success: true,
          userData: response.data.data.userData,
        };
      });
    return is_reset_password;
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
export const resetUserPasswordApi = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const is_reset_password = await axios
      .post(`${backendURL}/auth/reset-user-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        // console.log(response);
        dispatch(resetPassword(response.data.message));
        toast.success(response.data.message);
        return {
          success: true,
          userData: response.data.data.userData,
        };
      });
    return is_reset_password;
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
export const getMe = (token) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/auth/get_me`, {}, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.data.error));
          return toast.error(response.data.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        dispatch(login(response.data));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const contactUsRec = (token, formData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/auth/contact-us`, formData, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          dispatch(invalidRequest(response.data.data.error));
          return toast.error(response.data.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        dispatch(contactUs(response.data.message));
        toast.success(response.data.message);
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
