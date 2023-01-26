import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addEnquiryAction,
    updateEnquiryAction,   
    deleteEnquiryAction,
    getEnquiryBeginAction,
    getEnquirySuccessAction,
    getEnquiryFailureAction,
    enquiryAction,
  } from "../actions/enquiryActions";

  export default function useFetchEnquirys() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/enquiry";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Enquiry GET  ACTIONS
  const getEnquiry = () => {
    dispatch(getEnquiryBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getEnquirySuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
          getEnquiryFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Enquiry ADD  ACTIONS
  const addEnquiry = (enquiry) => {
    return API.post(
      hapyCarURL,
      { data: enquiry },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addEnquiryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
          addEnquiryAction({
            ...enquiry,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Enquiry UPDATE  ACTIONS
  const updateEnquiry = (enquiryId, enquiry) => {

    return API.put(`${hapyCarURL}/${enquiryId}`,
      { data: enquiry },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateEnquiryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
          updateEnquiryAction({
            ...enquiry,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Enquiry DELETE  ACTIONS
  const deleteEnquiry = (enquiryId) => {
    return API.delete(`${hapyCarURL}/${enquiryId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteEnquiryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
          deleteEnquiryAction({
            ...enquiryId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Enquiry BY ID ACTIONS
  const enquiryById = (enquiryId) => {
    return API.get(`${hapyCarURL}/${enquiryId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            enquiryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
            enquiryAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getEnquiry,
    enquiryById,
  };
}
