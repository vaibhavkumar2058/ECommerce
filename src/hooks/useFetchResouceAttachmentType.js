import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addResouceAttachmentTypeAction,
    updateResouceAttachmentTypeAction,   
    deleteResouceAttachmentTypeAction,
    getResouceAttachmentTypeBeginAction,
    getResouceAttachmentTypeSuccessAction,
    getResouceAttachmentTypeFailureAction,
    resouceAttachmentTypeAction,
  } from "../actions/resouceAttachmentTypeActions";

  export default function useFetchResouceAttachmentType() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/resourceAttachmentType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ResouceAttachmentType GET  ACTIONS
  const getResouceAttachmentTypes = () => {
    dispatch(getResouceAttachmentTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getResouceAttachmentTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resouceAttachmentType) {
          const [errors] = error.response.data.resouceAttachmentType;
          errorMsg = errors;
        }
        dispatch(
          getResouceAttachmentTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ResouceAttachmentType ADD  ACTIONS
  const addResouceAttachmentType = (resouceAttachmentType) => {
    return API.post(
      hapyCarURL,
      { data: resouceAttachmentType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addResouceAttachmentTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resouceAttachmentType) {
          const [errors] = error.response.data.resouceAttachmentType;
          errorMsg = errors;
        }
        dispatch(
          addResouceAttachmentTypeAction({
            ...resouceAttachmentType,
            title: ERROR,
            errorMsg,
          })
        );
      });

    };

  // ResouceAttachmentType UPDATE  ACTIONS
  const updateResouceAttachmentType = (resouceAttachmentTypeId, resouceAttachmentType) => {

    return API.put(`${hapyCarURL}/${resouceAttachmentTypeId}`,
      { data: resouceAttachmentType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateResouceAttachmentTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resouceAttachmentType) {
          const [errors] = error.response.data.resouceAttachmentType;
          errorMsg = errors;
        }
        dispatch(
          updateResouceAttachmentTypeAction({
            ...resouceAttachmentType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ResouceAttachmentType DELETE  ACTIONS
  const deleteResouceAttachmentType = (resouceAttachmentTypeId) => {
    return API.delete(`${hapyCarURL}/${resouceAttachmentTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteResouceAttachmentTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resouceAttachmentType) {
          const [errors] = error.response.data.resouceAttachmentType;
          errorMsg = errors;
        }
        dispatch(
          deleteResouceAttachmentTypeAction({
            ...resouceAttachmentTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ResouceAttachmentType BY ID ACTIONS
  const resouceAttachmentTypeById = (resouceAttachmentTypeId) => {
    return API.get(`${hapyCarURL}/${resouceAttachmentTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            resouceAttachmentTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resouceAttachmentType) {
          const [errors] = error.response.data.resouceAttachmentType;
          errorMsg = errors;
        }
        dispatch(
            resouceAttachmentTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addResouceAttachmentType,
    updateResouceAttachmentType,
    deleteResouceAttachmentType,
    getResouceAttachmentTypes,
    resouceAttachmentTypeById,
  };
}
