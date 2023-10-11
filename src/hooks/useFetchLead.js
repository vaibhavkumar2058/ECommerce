import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addLeadAction,
    updateLeadAction,   
    deleteLeadAction,
    getLeadBeginAction,
    getLeadSuccessAction,
    getLeadFailureAction,
    leadAction,
  } from "../actions/leadActions";

  export default function useFetchLead() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/lead";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Lead GET  ACTIONS
  const getLeads = () => {
    dispatch(getLeadBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getLeadSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.lead) {
          const [errors] = error.response.data.lead;
          errorMsg = errors;
        }
        dispatch(
          getLeadFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Lead ADD  ACTIONS
  const addLead = (lead) => {
    return API.post(
      hapyCarURL,
      { data: lead },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addLeadAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.lead) {
          const [errors] = error.response.data.lead;
          errorMsg = errors;
        }
        dispatch(
          addLeadAction({
            ...lead,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Lead UPDATE  ACTIONS
  const updateLead = (leadId, lead) => {

    return API.put(`${hapyCarURL}/${leadId}`,
      { data: lead },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateLeadAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.lead) {
          const [errors] = error.response.data.lead;
          errorMsg = errors;
        }
        dispatch(
          updateLeadAction({
            ...lead,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Lead DELETE  ACTIONS
  const deleteLead = (leadId) => {
    return API.delete(`${hapyCarURL}/${leadId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteLeadAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.lead) {
          const [errors] = error.response.data.lead;
          errorMsg = errors;
        }
        dispatch(
          deleteLeadAction({
            ...leadId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  //Lead BY ID ACTIONS
  const leadById = (leadId) => {
    return API.get(`${hapyCarURL}/${leadId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            leadAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.lead) {
          const [errors] = error.response.data.lead;
          errorMsg = errors;
        }
        dispatch(
            leadAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addLead,
    updateLead,
    deleteLead,
    getLeads,
    leadById,
  };
}
