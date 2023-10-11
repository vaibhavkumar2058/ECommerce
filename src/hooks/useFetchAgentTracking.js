import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";
import {
    getAgentTrackingBeginAction,
    getAgentTrackingSuccessAction,
    getAgentTrackingFailureAction,
    agentTrackingAction
  } from "../actions/agentTrackingActions";

  export default function useFetchAgentTracking() {
    const dispatch = useDispatch();
  const AgentTrackingURL = "https://localhost:7062/agentTracking";
  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  const getAgentTracking = () => {
    dispatch(getAgentTrackingBeginAction());
    return API.get(AgentTrackingURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getAgentTrackingSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
          getAgentTrackingFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      }); 
  };

  const agentTrackingById = (agentId) => {
    return API.get(`${AgentTrackingURL}/${agentId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data
      }) =>
        dispatch(
           agentTrackingAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.agentTracking) {
          const [errors] = error.response.data.agentTracking;
          errorMsg = errors;
        }
        dispatch(
          agentTrackingAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };

  return {
    getAgentTracking,
    agentTrackingById,
  };
}