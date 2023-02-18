import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addInVoiceAction,
    updateInVoiceAction,   
    deleteInVoiceAction,
    getInVoiceBeginAction,
    getInVoiceSuccessAction,
    getInVoiceFailureAction,
    inVoiceAction,
  } from "../actions/inVoiceActions";

  export default function useFetchInVoices() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/inVoice";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // InVoice GET  ACTIONS
  const getInVoice = () => {
    dispatch(getInVoiceBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getInVoiceSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.inVoice) {
          const [errors] = error.response.data.inVoice;
          errorMsg = errors;
        }
        dispatch(
          getInVoiceFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // InVoice ADD  ACTIONS
  const addInVoice = (inVoice) => {
    return API.post(
      hapyCarURL,
      { data: inVoice },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addInVoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.inVoice) {
          const [errors] = error.response.data.inVoice;
          errorMsg = errors;
        }
        dispatch(
          addInVoiceAction({
            ...inVoice,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // InVoice UPDATE  ACTIONS
  const updateInVoice = (inVoiceId, inVoice) => {

    return API.put(`${hapyCarURL}/${inVoiceId}`,
      { data: inVoice },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateInVoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.inVoice) {
          const [errors] = error.response.data.inVoice;
          errorMsg = errors;
        }
        dispatch(
          updateInVoiceAction({
            ...inVoice,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // InVoice DELETE  ACTIONS
  const deleteInVoice = (inVoiceId) => {
    return API.delete(`${hapyCarURL}/${inVoiceId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteInVoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.inVoice) {
          const [errors] = error.response.data.inVoice;
          errorMsg = errors;
        }
        dispatch(
          deleteInVoiceAction({
            ...inVoiceId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // InVoice BY ID ACTIONS
  const inVoiceById = (inVoiceId) => {
    return API.get(`${hapyCarURL}/${inVoiceId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          inVoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.inVoice) {
          const [errors] = error.response.data.inVoice;
          errorMsg = errors;
        }
        dispatch(
          inVoiceAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addInVoice,
    updateInVoice,
    deleteInVoice,
    getInVoice,
    inVoiceById,
  };
}
