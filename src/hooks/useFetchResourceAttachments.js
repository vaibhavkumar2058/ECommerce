
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addResourceAttachmentsAction,
    updateResourceAttachmentsAction,   
    deleteResourceAttachmentsAction,
    getResourceAttachmentsBeginAction,
    getResourceAttachmentsSuccessAction,
    getResourceAttachmentsFailureAction,
    resourceAttachmentsAction,
  } from "../actions/resourceAttachmentsActions";

  export default function useFetchResourceAttachments() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/resourceAttachments";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ResourceAttachments GET  ACTIONS
  const getResourceAttachments = () => {
    dispatch(getResourceAttachmentsBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getResourceAttachmentsSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resourceAttachments) {
          const [errors] = error.response.data.resourceAttachments;
          errorMsg = errors;
        }
        dispatch(
          getResourceAttachmentsFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ResourceAttachments ADD  ACTIONS
  const addResourceAttachments = (resourceAttachments) => {
    return API.post(
      hapyCarURL,
      { data: resourceAttachments },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addResourceAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resourceAttachments) {
          const [errors] = error.response.data.resourceAttachments;
          errorMsg = errors;
        }
        dispatch(
          addResourceAttachmentsAction({
            ...resourceAttachments,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // ResourceAttachments UPDATE  ACTIONS
  const updateResourceAttachments = (resourceAttachmentsId, resourceAttachments) => {

    return API.put(`${hapyCarURL}/${resourceAttachmentsId}`,
      { data: resourceAttachments },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateResourceAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resourceAttachments) {
          const [errors] = error.response.data.resourceAttachments;
          errorMsg = errors;
        }
        dispatch(
          updateResourceAttachmentsAction({
            ...resourceAttachments,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ResourceAttachments DELETE  ACTIONS
  const deleteResourceAttachments = (resourceAttachmentsId) => {
    return API.delete(`${hapyCarURL}/${resourceAttachmentsId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteResourceAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resourceAttachments) {
          const [errors] = error.response.data.resourceAttachments;
          errorMsg = errors;
        }
        dispatch(
          deleteResourceAttachmentsAction({
            ...resourceAttachmentsId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ResourceAttachments BY ID ACTIONS
  const resourceAttachmentsById = (resourceAttachmentsId) => {
    return API.get(`${hapyCarURL}/${resourceAttachmentsId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          resourceAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resourceAttachments) {
          const [errors] = error.response.data.resourceAttachments;
          errorMsg = errors;
        }
        dispatch(
          resourceAttachmentsAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addResourceAttachments,
    updateResourceAttachments,
    deleteResourceAttachments,
    getResourceAttachments,
    resourceAttachmentsById,
  };
}
