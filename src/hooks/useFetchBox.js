import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addBoxAction,
    updateBoxAction,   
    deleteBoxAction,
    getBoxBeginAction,
    getBoxSuccessAction,
    getBoxFailureAction,
    boxAction,
  } from "../actions/boxActions";

  export default function useFetchBoxes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/box";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Box GET  ACTIONS
  const getBoxes = () => {
    dispatch(getBoxBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getBoxSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.box) {
          const [errors] = error.response.data.box;
          errorMsg = errors;
        }
        dispatch(
          getBoxFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Box ADD  ACTIONS
  const addBox = (box) => {
    return API.post(
      hapyCarURL,
      { data: box },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addBoxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.box) {
          const [errors] = error.response.data.box;
          errorMsg = errors;
        }
        dispatch(
          addBoxAction({
            ...box,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Box UPDATE  ACTIONS
  const updateBox = (boxId, box) => {

    return API.put(`${hapyCarURL}/${boxId}`,
      { data: box},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateBoxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.box) {
          const [errors] = error.response.data.box;
          errorMsg = errors;
        }
        dispatch(
          updateBoxAction({
            ...box,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Box DELETE  ACTIONS
  const deleteBox = (boxId) => {
    return API.delete(`${hapyCarURL}/${boxId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteBoxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.box) {
          const [errors] = error.response.data.box;
          errorMsg = errors;
        }
        dispatch(
          deleteBoxAction({
            ...boxId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Box BY ID ACTIONS
  const boxById = (boxId) => {
    return API.get(`${hapyCarURL}/${boxId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            boxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.box) {
          const [errors] = error.response.data.box;
          errorMsg = errors;
        }
        dispatch(
            boxAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addBox,
    updateBox,
    deleteBox,
    getBoxes,
    boxById,
  };
}
