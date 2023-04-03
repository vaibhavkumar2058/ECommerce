import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addGMTAction,
    updateGMTAction,   
    deleteGMTAction,
    getGMTBeginAction,
    getGMTSuccessAction,
    getGMTFailureAction,
    GTMAction,
  } from "../actions/GMTActions";

  export default function useFetchGMTs() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/GMT";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  //GMT GET  ACTIONS
  const getGMTs = () => {
    dispatch(getGMTBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getGMTSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.GMT) {
          const [errors] = error.response.data.GMT;
          errorMsg = errors;
        }
        dispatch(
          getGMTFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GMT ADD  ACTIONS
  const addGMT = (GMT) => {
    debugger;
    return API.post(
      hapyCarURL,
      { data: GMT },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addGMTAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.GMT) {
          const [errors] = error.response.data.GMT;
          errorMsg = errors;
        }
        dispatch(
          addGMTAction({
            ...GMT,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  //GMT UPDATE  ACTIONS
  const updateGMT = (GMTId, GMT) => {

    return API.put(`${hapyCarURL}/${GMTId}`,
      { data: GMT },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateGMTAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.GMT) {
          const [errors] = error.response.data.GMT;
          errorMsg = errors;
        }
        dispatch(
          updateGMTAction({
            ...GMT,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GMT DELETE  ACTIONS
  const deleteGMT = (GMTId) => {
    return API.delete(`${hapyCarURL}/${GMTId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteGMTAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.GMT) {
          const [errors] = error.response.data.GMT;
          errorMsg = errors;
        }
        dispatch(
          deleteGMTAction({
            ...GMTId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GMT BY ID ACTIONS
  const GMTById = (GMTId) => {
    return API.get(`${hapyCarURL}/${GMTId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          GTMAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.GMT) {
          const [errors] = error.response.data.GMT;
          errorMsg = errors;
        }
        dispatch(
          GTMAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addGMT,
    updateGMT,
    deleteGMT,
    getGMTs,
    GMTById,
  };
}
