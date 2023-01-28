import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addSecurityAction,
    updateSecurityAction,   
    deleteSecurityAction,
    getSecurityBeginAction,
    getSecuritySuccessAction,
    getSecurityFailureAction,
    securityAction,
  } from "../actions/securityActions";

  export default function useFetchSecuritys() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/security";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Security GET  ACTIONS
  const getSecurity = () => {
    dispatch(getSecurityBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getSecuritySuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.security) {
          const [errors] = error.response.data.security;
          errorMsg = errors;
        }
        dispatch(
          getSecurityFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Security ADD  ACTIONS
  const addSecurity = (security) => {
    return API.post(
      hapyCarURL,
      { data: security },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addSecurityAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.security) {
          const [errors] = error.response.data.security;
          errorMsg = errors;
        }
        dispatch(
          addSecurityAction({
            ...security,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Security UPDATE  ACTIONS
  const updateSecurity = (securityId, security) => {

    return API.put(`${hapyCarURL}/${securityId}`,
      { data: security },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateSecurityAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.security) {
          const [errors] = error.response.data.security;
          errorMsg = errors;
        }
        dispatch(
          updateSecurityAction({
            ...Security,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Security DELETE  ACTIONS
  const deleteSecurity = (securityId) => {
    return API.delete(`${hapyCarURL}/${securityId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteSecurityAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.Security) {
          const [errors] = error.response.data.security;
          errorMsg = errors;
        }
        dispatch(
          deleteSecurityAction({
            ...securityId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Security BY ID ACTIONS
  const securityById = (securityId) => {
    return API.get(`${hapyCarURL}/${securityId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            securityAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.security) {
          const [errors] = error.response.data.security;
          errorMsg = errors;
        }
        dispatch(
            securityAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addSecurity,
    updateSecurity,
    deleteSecurity,
    getSecurity,
    securityById,
  };
}
