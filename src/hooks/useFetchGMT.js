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
    gmtAction,
  } from "../actions/gmtActions";

  export default function useFetchgmt() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/gmt";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  //GMT GET  ACTIONS
  const getGMT = () => {
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
        if (error.response.data.gmt) {
          const [errors] = error.response.data.gmt;
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
  const addGMT = (gmt) => {
    return API.post(
      hapyCarURL,
      { data: gmt },
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
        if (error.response.data.gmt) {
          const [errors] = error.response.data.gmt;
          errorMsg = errors;
        }
        dispatch(
          addGMTAction({
            ...gmt,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  //GMT UPDATE  ACTIONS
  const updateGMT = (gmtId, gmt) => {

    return API.put(`${hapyCarURL}/${gmtId}`,
      { data: gmt },
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
        if (error.response.data.gmt) {
          const [errors] = error.response.data.gmt;
          errorMsg = errors;
        }
        dispatch(
          updateGMTAction({
            ...gmt,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GMT DELETE  ACTIONS
  const deleteGMT = (gmtId) => {
    return API.delete(`${hapyCarURL}/${gmtId}`,
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
        if (error.response.data.gmt) {
          const [errors] = error.response.data.gmt;
          errorMsg = errors;
        }
        dispatch(
          deleteGMTAction({
            ...gmtId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GMT BY ID ACTIONS
  const gmtById = (gmtId) => {
    return API.get(`${hapyCarURL}/${gmtId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            gmtAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gmt) {
          const [errors] = error.response.data.gmt;
          errorMsg = errors;
        }
        dispatch(
            gmtAction({
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
    getGMT,
    gmtById,
  };
}
