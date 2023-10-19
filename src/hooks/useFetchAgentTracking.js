import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";
import {
    addAgentTrackingAction,
    updateAgentTrackingAction,
    deleteAgentTrackingAction,
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

  const getAgentTrackings = () => {
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
        if (error.response.data.agentTracking) {
          const [errors] = error.response.data.agentTracking;
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

  // AgentTracking Add Actions
  const addagentTracking = (agentTracking) => {
    return API.post(
      AgentTrackingURL,
      { data: agentTracking},
      { suppressErrors: [400] }
    )
      .then(({ data
      }) =>
        dispatch(
           addAgentTrackingAction({
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
          addAgentTrackingAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };

  // AgentTracking UPDATE Actions
  const updateAgentTracking = (agentTrackingId, agentTracking) => {
    return API.put(`${AgentTrackingURL}/${agentTrackingId}`,
      { data: agentTracking},
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          updateAgentTrackingAction({
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
          updateAgentTrackingAction({
            ...agentTracking,
            title: ERROR,
            errorMsg,
          })
        );
      });
  };

  // AgentTracking DELETE  ACTIONS
  const deleteAgentTracking = (agentTrackingId) => {
    return API.delete(`${AgentTrackingURL}/${agentTrackingId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteAgentTrackingAction({
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
          deleteAgentTrackingAction({
            ...agentTrackingId,
            title: ERROR,
            errorMsg,
          })
        );
      });
  };

  // AgentTracking by Id Actions
  const agentTrackingById = (agentTrackingId) => {
    return API.get(`${AgentTrackingURL}/${agentTrackingId}`,
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
    addagentTracking,
    updateAgentTracking,
    deleteAgentTracking,
    getAgentTrackings,
    agentTrackingById,
  };
}