import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addRecordStatusAction,
    updateRecordStatusAction,   
    deleteRecordStatusAction,
    getRecordStatusBeginAction,
    getRecordStatusSuccessAction,
    getRecordStatusFailureAction,
    recordStatusAction,
  } from "../actions/recordStatusActions";

  export default function useFetchRecordStatuss() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/recordStatus";


  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  //RecordStatus GET  ACTIONS
  const getRecordStatuss = () => {
    dispatch(getRecordStatusBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getRecordStatusSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.recordStatus) {
          const [errors] = error.response.data.recordStatus;
          errorMsg = errors;
        }
        dispatch(
            getRecordStatusFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // RecordStatus ADD  ACTIONS
  const addRecordStatus = (recordStatus) => {
    return API.post(
      hapyCarURL,
      { data: recordStatus},
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addRecordStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.recordStatus) {
          const [errors] = error.response.data.recordStatus;
          errorMsg = errors;
        }
        dispatch(
          addRecordStatusAction({
            ...recordStatus,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // RecordStatus UPDATE  ACTIONS
  const updateRecordStatus = (recordStatusId, recordStatus) => {

    return API.put(`${hapyCarURL}/${recordStatusId}`,
      { data: recordStatus },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateRecordStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.recordStatus) {
          const [errors] = error.response.data.recordStatus;
          errorMsg = errors;
        }
        dispatch(
          updateRecordStatusAction({
            ...recordStatus,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // RecordStatus DELETE  ACTIONS
  const deleteRecordStatus = (recordStatusId) => {
    return API.delete(`${hapyCarURL}/${recordStatusId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteRecordStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.recordStatus) {
          const [errors] = error.response.data.recordStatus;
          errorMsg = errors;
        }
        dispatch(
          deleteRecordStatusAction({
            ...recordStatusId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // RecordStatus BY ID ACTIONS
  const recordStatusById = (recordStatusId) => {
    return API.get(`${hapyCarURL}/${recordStatusId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            recordStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.recordStatus) {
          const [errors] = error.response.data.recordStatus;
          errorMsg = errors;
        }
        dispatch(
            recordStatusAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addRecordStatus,
    updateRecordStatus,
    deleteRecordStatus,
    getRecordStatuss,
    recordStatusById,
  };
}
