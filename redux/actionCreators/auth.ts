import axios from "axios";
import { ActionType } from "redux/actionTypes/index";
import { Dispatch } from "redux";
import cookie from "js-cookie";
import config from "config/config";
import { clearAllData } from "../../util/index"

export function login(params: any, setModal: any) {
  return async function (dispatch: Dispatch) {
    try {
      const data = {
        email: params.email,
        password: params.password,
      };

      await axios
        .post(`${config.defaults.api_url}/api/v3/auth/login`, data, {
          method: "POST",
        })
        .then((user) => {
          console.log(user, "USER.............................");

          if (window.location.hostname === "localhost") {
            generateAuthCoookies(user);
          } else {
            generateAuthCoookies(user, true);
          }

          dispatch({
            type: ActionType.USER_LOGIN_SUCCESS,
            payload: user.data?.data,
          });
        });
    } catch (error: any) {
      if (error.response.data.message === "Password Expired") {
        setModal(true);
      }
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload: {
          message:
            "The Email Address or Password entered is invalid. Please try again.",
        },
      });
    }
  };
}

export function requestResendPassword(params: any) {
  const data = {
    email: params.email,
    password: params.password,
  };
  return axios
    .put(`${config.defaults.api_url}/api/v3/auth/resend-password`, data, {
      method: "PUT",
    }).then((res) => res?.data)
}

export function changePassword(params: any) {
  return async function (dispatch: Dispatch) {
    try {
      if (params.old_password) {
        await axios
          .post(
            `${config.defaults.api_url}/api/v3/admin/change-password`,
            params,
            {
              method: "POST",
            }
          )
          .then((res) => {
            dispatch({
              type: ActionType.USER_CHANGE_PASSWORD_SUCCESS,
              payload: res.data?.data,
            });
          });
      } else {
        await axios
          .post(
            `${config.defaults.api_url}/api/v3/admin/change-password-force`,
            params,
            {
              //change api to new force change api
              method: "POST",
            }
          )
          .then((res) => {
            dispatch({
              type: ActionType.USER_CHANGE_PASSWORD_SUCCESS,
              payload: res.data?.data,
            });
            cookie.remove("forgot_password");
          });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ActionType.USER_CHANGE_PASSWORD_FAIL,
        payload: {
          message: "Failed to change password. Please try again.",
        },
      });
    }
  };
}

export function forgotPassword(params: any) {
  return async function (dispatch: Dispatch) {
    try {
      await axios
        .post(
          `${config.defaults.api_url}/api/v3/auth/forgot-password`,
          params,
          {
            method: "POST",
          }
        )
        .then((res) => {
          if (res.data?.data?.message === "Account not found!") {
            dispatch({
              type: ActionType.USER_FORGOT_PASSWORD_FAIL,
              payload: res.data?.data,
            });
          } else {
            dispatch({
              type: ActionType.USER_FORGOT_PASSWORD_SUCCESS,
              payload: res.data?.data,
            });
          }
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ActionType.USER_FORGOT_PASSWORD_FAIL,
        payload: {
          message: "Failed to forgot password. Please try again.",
        },
      });
    }
  };
}

export function logout() {
  return async function (dispatch: Dispatch) {
    clearAllData()
    dispatch({
      type: ActionType.RESET_REDUCER_ACTIVITY,
    });
    dispatch({
      type: ActionType.RESET_REDUCER_CLASSROOMS,
    });
    dispatch({
      type: ActionType.RESET_MANAGEMENT_REDUCER,
    });
    dispatch({
      type: ActionType.RESET_CLEVER_CSV_REDUCER,
    });
    dispatch({
      type: ActionType.RESET_DISTRICT_CSV_REDUCER,
    });
    dispatch({
      type: ActionType.RESET_CLASS_CSV_REDUCER,
    });
    dispatch({
      type: ActionType.RESET_OBJECTIVE_REDUCER,
    });
    dispatch({
      type: ActionType.USER_LOGOUT,
      payload: {},
    });
  };
}


const generateAuthCoookies = (data: any, secure: boolean = false) => {
  const expires = 3600 * 1000 * 24 * 365 * 10;
  cookie.set("email", data.data.data.email, { expires, secure });
  cookie.set("token", data.data.data.token, { expires, secure });
  cookie.set("role", data.data.data.role, { expires, secure });
  cookie.set("forgot_password", data.data.data.forgot_password, {
    expires,
    secure,
  });
  cookie.set("first_name", data.data.data.first_name, {
    expires,
    secure,
  });
  cookie.set("last_name", data.data.data.last_name, {
    expires,
    secure,
  });
  cookie.set("user", JSON.stringify(data.data?.data), { expires, secure });
  cookie.set("has_kindergarten", data.data.data.has_kindergarten, { expires, secure });
  cookie.set("has_zero_students_classrooms", data.data.data.has_zero_students_classrooms, { expires, secure });
};

export function loginWithClever(params: any) {
  return async function (dispatch: Dispatch) {
    try {
      await axios
        .post(
          `${config.defaults.api_url}/api/v3/auth/clever-login/${params.code}`,
          {
            method: "POST",
          }
        )
        .then((user) => {
          if (user) {
            console.log(user, "USER.............................");

            if (window.location.hostname === "localhost") {
              generateAuthCoookies(user);
            } else {
              generateAuthCoookies(user, true);
            }

            dispatch({
              type: ActionType.USER_LOGIN_SUCCESS,
              payload: user.data?.data,
            });
          }
        })
    } catch (error: any) {
      console.log(error, ' $$ Error ', error?.response, ' @@ response ', error?.response?.data, ' !! data');
      console.log(error.response.data.message, ' &&&&& Login Error Message');
      if (error.response.data.message === 'Redirect to student.') {
          window.location.assign('https://v3-student.aplustesting.org' + window.location.search);
      } else  {
          dispatch({
              type: ActionType.USER_LOGIN_FAIL,
              payload: {
                  message: error.response.data.message || "Failed to Login with Clever",
              },
          });
      }
    }
  };
}
