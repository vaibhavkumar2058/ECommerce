import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addLoginAction,
    updateLoginAction,   
    deleteLoginAction,
    getLoginBeginAction,
    getLoginSuccessAction,
    getLoginFailureAction,
    LoginAction,
  } from "../actions/loginActions";

  export default function useFetchLogins() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/login";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Login GET  ACTIONS
  const getLogin = () => {
    dispatch(getLoginBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getLoginSuccessAction({
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

  // Login ADD  ACTIONS
  const addLogin = (login) => {
    return API.post(
      hapyCarURL,
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
        if (error.response.datalogin) {
          const [errors] = error.response.data.login;
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


login

  };

  // Login UPDATE  ACTIONS
  const updateLogin = (loginId, login) => {

    return API.put(`${hapyCarURL}/${loginId}`,
      { data: login},
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

  // Login DELETE  ACTIONS
  const deleteLogin= (loginId) => {
    return API.delete(`${hapyCarURL}/${loginId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteLoginAction({
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
          deleteLoginAction({
            ...loginId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  //Login BY ID ACTIONS
  const loginById = (loginId) => {
    return API.get(`${hapyCarURL}/${loginId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            loginAction({
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
            loginAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addLogin,
    updateLogin,
    deleteLogin,
    getLogin,
    loginById,
  };
}
