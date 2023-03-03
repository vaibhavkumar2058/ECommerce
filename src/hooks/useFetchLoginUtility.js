import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";
import {
  addLoginAction, getLoginBeginAction,
  getLogineSuccessAction,
  getLoginFailureAction,
  updateLoginAction
} from "../actions/loginUtilityAction";

export default function useFetchLogins() {
  const dispatch = useDispatch();
  const changePasswordURL = "https://localhost:7062/changepassword";
  const forgotPasswordURL = "https://localhost:7062/forgotPassword?emails=";
  const loginURL = "https://localhost:7062/login";
  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Login GET  ACTIONS
  const forgotPassword = (email) => {
    dispatch(getLoginBeginAction());
    return API.get(`${forgotPasswordURL}${email}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getLogineSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.login) {
          const [errors] = error.response.data.login;
          errorMsg = errors;
        }
        dispatch(
          getLoginFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };
  const login = (login) => {
    return API.post(
      loginURL,
      { data: login },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addLoginAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gender) {
          const [errors] = error.response.data.gender;
          errorMsg = errors;
        }
        dispatch(
          addLoginAction({
            ...login,
            title: ERROR,
            errorMsg,
          })
        );
      });
  };
  const changepassword = (login) => {

    return API.put(`${changePasswordURL}`,
      { data: login },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>
        dispatch(
          updateLoginAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.login) {
          const [errors] = error.response.data.login;
          errorMsg = errors;
        }
        dispatch(
          updateLoginAction({
            ...login,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };



  return {
    forgotPassword,
    login,
    changepassword,
  };

}