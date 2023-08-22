import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addApproveAction,
    updateApproveAction,   
    deleteApproveAction,
    getApproveBeginAction,
    getApproveSuccessAction,
    getApproveFailureAction,
    approveAction,
  } from "../actions/approveActions";

  export default function useFetchApproves() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/approve";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Approve GET  ACTIONS
  const getApproves = () => {
    dispatch(getApproveBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getApproveSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approve) {
          const [errors] = error.response.data.approve;
          errorMsg = errors;
        }
        dispatch(
            getApproveFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Approve ADD  ACTIONS
  const addApprove = (approve) => {
    return API.post(
      hapyCarURL,
      { data: approve },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addApproveAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approve) {
          const [errors] = error.response.data.approve;
          errorMsg = errors;
        }
        dispatch(
          addApproveAction({
            ...approve,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Approve UPDATE  ACTIONS
  const updateApprove = (approveId, approve) => {

    return API.put(`${hapyCarURL}/${approveId}`,
      { data: approve},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateApproveAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approve) {
          const [errors] = error.response.data.approve;
          errorMsg = errors;
        }
        dispatch(
          updateApproveAction({
            ...approve,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Approve DELETE  ACTIONS
  const deleteApprove = (approveId) => {
    return API.delete(`${hapyCarURL}/${approveId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteApproveAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approve) {
          const [errors] = error.response.data.approve;
          errorMsg = errors;
        }
        dispatch(
          deleteApproveAction({
            ...approveId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Approve BY ID ACTIONS
  const approveById = (approveId) => {
    return API.get(`${hapyCarURL}/${approveId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
           approveAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approve) {
          const [errors] = error.response.data.approve;
          errorMsg = errors;
        }
        dispatch(
            approveAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addApprove,
    updateApprove,
    deleteApprove,
    getApproves,
    approveById,
  };
}
