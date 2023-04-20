import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addApproveStatusAction,
    updateApproveStatusAction,   
    deleteApproveStatusAction,
    getApproveStatusBeginAction,
    getApproveStatusSuccessAction,
    getApproveStatusFailureAction,
    approveStatusAction,
  } from "../actions/approveStatusActions";

  export default function useFetchApproveStatuss() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/approveStatus";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ApproveStatus GET  ACTIONS
  const getApproveStatuss = () => {
    dispatch(getApproveStatusBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getApproveStatusSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approveStatus) {
          const [errors] = error.response.data.approveStatus;
          errorMsg = errors;
        }
        dispatch(
          getApproveStatusFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ApproveStatus ADD  ACTIONS
  const addApproveStatus = (approveStatus) => {
    debugger
    return API.post(
      hapyCarURL,
      { data: approveStatus },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addApproveStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approveStatus) {
          const [errors] = error.response.data.approveStatus;
          errorMsg = errors;
        }
        dispatch(
          addApproveStatusAction({
            ...approveStatus,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // ApproveStatus UPDATE  ACTIONS
  const updateApproveStatus = (approveStatusId, approveStatus) => {

    return API.put(`${hapyCarURL}/${approveStatusId}`,
      { data: approveStatus },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateApproveStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approveStatus) {
          const [errors] = error.response.data.approveStatus;
          errorMsg = errors;
        }
        dispatch(
          updateApproveStatusAction({
            ...approveStatus,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ApproveStatus DELETE  ACTIONS
  const deleteApproveStatus = (approveStatusId) => {
    return API.delete(`${hapyCarURL}/${approveStatusId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteApproveStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approveStatus) {
          const [errors] = error.response.data.approveStatus;
          errorMsg = errors;
        }
        dispatch(
          deleteApproveStatusAction({
            ...approveStatusId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ApproveStatus BY ID ACTIONS
  const approveStatusById = (approveStatusId) => {
    return API.get(`${hapyCarURL}/${approveStatusId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            approveStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.approveStatus) {
          const [errors] = error.response.data.approveStatus;
          errorMsg = errors;
        }
        dispatch(
            approveStatusAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addApproveStatus,
    updateApproveStatus,
    deleteApproveStatus,
    getApproveStatuss,
    approveStatusById,
  };
}
