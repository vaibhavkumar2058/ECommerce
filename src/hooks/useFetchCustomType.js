import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addCustomTypeAction,
    updateCustomTypeAction,   
    deleteCustomTypeAction,
    getCustomTypeBeginAction,
    getCustomTypeSuccessAction,
    getCustomTypeFailureAction,
    customTypeAction,
  } from "../actions/customTypeActions";

  export default function useFetchCustomTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/customType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // CustomType GET  ACTIONS
  const getCustomTypes = () => {
    dispatch(getCustomTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getCustomTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.customType) {
          const [errors] = error.response.data.customType;
          errorMsg = errors;
        }
        dispatch(
          getCustomTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // CustomType ADD  ACTIONS
  const addCustomType = (customType) => {
    debugger;
    return API.post(
      hapyCarURL,
      { data: customType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addCustomTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.customType) {
          const [errors] = error.response.data.customType;
          errorMsg = errors;
        }
        dispatch(
          addCustomTypeAction({
            ...customType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // CustomType UPDATE  ACTIONS
  const updateCustomType = (customTypeId, customType) => {

    return API.put(`${hapyCarURL}/${customTypeId}`,
      { data: customType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateCustomTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.customType) {
          const [errors] = error.response.data.customType;
          errorMsg = errors;
        }
        dispatch(
          updateCustomTypeAction({
            ...customType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // CustomType DELETE  ACTIONS
  const deleteCustomType = (customTypeId) => {
    return API.delete(`${hapyCarURL}/${customTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteCustomTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.customType) {
          const [errors] = error.response.data.customType;
          errorMsg = errors;
        }
        dispatch(
          deleteCustomTypeAction({
            ...customTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // CustomType BY ID ACTIONS
  const customTypeById = (customTypeId) => {
    return API.get(`${hapyCarURL}/${customTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            customTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.customType) {
          const [errors] = error.response.data.customType;
          errorMsg = errors;
        }
        dispatch(
            customTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addCustomType,
    updateCustomType,
    deleteCustomType,
    getCustomTypes,
    customTypeById,
  };
}
