import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addRoleAction,
    updateRoleAction,   
    deleteRoleAction,
    getRoleBeginAction,
    getRoleSuccessAction,
    getRoleFailureAction,
    roleAction,
  } from "../actions/roleActions";

  export default function useFetchRole() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/role";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Role GET  ACTIONS
  const getRoles = () => {
    dispatch(getRoleBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getRoleSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.role) {
          const [errors] = error.response.data.role;
          errorMsg = errors;
        }
        dispatch(
          getRoleFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Role ADD  ACTIONS
  const addRole = (role) => {
    return API.post(
      hapyCarURL,
      { data: role },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addRoleAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.role) {
          const [errors] = error.response.data.role;
          errorMsg = errors;
        }
        dispatch(
          addRoleAction({
            ...role,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Role UPDATE  ACTIONS
  const updateRole = (roleId, role) => {

    return API.put(`${hapyCarURL}/${roleId}`,
      { data: role },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateRoleAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.role) {
          const [errors] = error.response.data.role;
          errorMsg = errors;
        }
        dispatch(
          updateRoleAction({
            ...role,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Role DELETE  ACTIONS
  const deleteRole = (roleId) => {
    return API.delete(`${hapyCarURL}/${roleId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteRoleAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.role) {
          const [errors] = error.response.data.role;
          errorMsg = errors;
        }
        dispatch(
          deleteRoleAction({
            ...roleId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Role BY ID ACTIONS
  const roleById = (roleId) => {
    return API.get(`${hapyCarURL}/${roleId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            roleAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.role) {
          const [errors] = error.response.data.role;
          errorMsg = errors;
        }
        dispatch(
            roleAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addRole,
    updateRole,
    deleteRole,
    getRoles,
    roleById,
  };
}
