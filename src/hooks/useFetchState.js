import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addStateAction,
    updateStateAction,   
    deleteStateAction,
    getStateBeginAction,
    getStateSuccessAction,
    getStateFailureAction,
    stateAction,
  } from "../actions/stateActions";

  export default function useFetchStates() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/state";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // State GET  ACTIONS
  const getStates = () => {
    dispatch(getStateBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getStateSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.state) {
          const [errors] = error.response.data.state;
          errorMsg = errors;
        }
        dispatch(
          getStateFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // State ADD  ACTIONS
  const addState = (state) => {
    return API.post(
      hapyCarURL,
      { data: state },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addStateAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.state) {
          const [errors] = error.response.data.state;
          errorMsg = errors;
        }
        dispatch(
          addStateAction({
            ...state,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // State UPDATE  ACTIONS
  const updateState = (stateId, state) => {

    return API.put(`${hapyCarURL}/${stateId}`,
      { data: state },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateStateAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.state) {
          const [errors] = error.response.data.state;
          errorMsg = errors;
        }
        dispatch(
          updateStateAction({
            ...state,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // State DELETE  ACTIONS
  const deleteState = (stateId) => {
    return API.delete(`${hapyCarURL}/${stateId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteStateAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.state) {
          const [errors] = error.response.data.state;
          errorMsg = errors;
        }
        dispatch(
          deleteStateAction({
            ...stateId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // State BY ID ACTIONS
  const stateById = (stateId) => {
    return API.get(`${hapyCarURL}/${stateId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            stateAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.state) {
          const [errors] = error.response.data.state;
          errorMsg = errors;
        }
        dispatch(
            stateAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addState,
    updateState,
    deleteState,
    getStates,
    stateById,
  };
}
