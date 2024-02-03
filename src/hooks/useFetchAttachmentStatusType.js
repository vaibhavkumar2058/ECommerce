import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addAttachmentStatusTypeAction,
    updateAttachmentStatusTypeAction,   
    deleteAttachmentStatusTypeAction,
    getAttachmentStatusTypeBeginAction,
    getAttachmentStatusTypeSuccessAction,
    getAttachmentStatusTypeFailureAction,
    attachmentStatusTypeAction,
  } from "../actions/attachmentStatusTypeActions";

  export default function useFetchAttachmentStatusTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:44320/attachmentStatusType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // AttachmentStatusType GET  ACTIONS
  const getAttachmentStatusTypes = () => {
    dispatch(getAttachmentStatusTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getAttachmentStatusTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.attachmentStatusType) {
          const [errors] = error.response.data.attachmentStatusType;
          errorMsg = errors;
        }
        dispatch(
          getAttachmentStatusTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // AttachmentStatusType ADD  ACTIONS
  const addAttachmentStatusType = (attachmentStatusType) => {
    return API.post(
      hapyCarURL,
      { data: attachmentStatusType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addAttachmentStatusTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.attachmentStatusType) {
          const [errors] = error.response.data.attachmentStatusType;
          errorMsg = errors;
        }
        dispatch(
          addAttachmentStatusTypeAction({
            ...attachmentStatusType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // AttachmentStatusType UPDATE  ACTIONS
  const updateAttachmentStatusType = (attachmentStatusTypeId, attachmentStatusType) => {

    return API.put(`${hapyCarURL}/${attachmentStatusTypeId}`,
      { data: attachmentStatusType},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateAttachmentStatusTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.attachmentStatusType) {
          const [errors] = error.response.data.attachmentStatusType;
          errorMsg = errors;
        }
        dispatch(
          updateAttachmentStatusTypeAction({
            ...attachmentStatusType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // AttachmentStatusType DELETE  ACTIONS
  const deleteAttachmentStatusType = (attachmentStatusTypeId) => {
    return API.delete(`${hapyCarURL}/${attachmentStatusTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteAttachmentStatusTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.attachmentStatusType) {
          const [errors] = error.response.data.attachmentStatusType;
          errorMsg = errors;
        }
        dispatch(
          deleteAttachmentStatusTypeAction({
            ...attachmentStatusTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // AttachmentStatusType BY ID ACTIONS
  const attachmentStatusTypeById = (attachmentStatusTypeId) => {
    return API.get(`${hapyCarURL}/${attachmentStatusTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            attachmentStatusTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.attachmentStatusType) {
          const [errors] = error.response.data.attachmentStatusType;
          errorMsg = errors;
        }
        dispatch(
            attachmentStatusTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addAttachmentStatusType,
    updateAttachmentStatusType,
    deleteAttachmentStatusType,
    getAttachmentStatusTypes,
    attachmentStatusTypeById,
  };
}
