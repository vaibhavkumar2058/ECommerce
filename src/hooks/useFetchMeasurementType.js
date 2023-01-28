import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addMeasurementTypeAction,
    updateMeasurementTypeAction,   
    deleteMeasurementTypeAction,
    getMeasurementTypeBeginAction,
    getMeasurementTypeSuccessAction,
    getMeasurementTypeFailureAction,
    measurementTypeAction,
  } from "../actions/measurementTypeActions";

  export default function useFetchMeasurementTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/measurementType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // MeasurementType GET  ACTIONS
  const getMeasurementType = () => {
    dispatch(getMeasurementTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getMeasurementTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementType) {
          const [errors] = error.response.data.measurementType;
          errorMsg = errors;
        }
        dispatch(
          getMeasurementTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // MeasurementType ADD  ACTIONS
  const addMeasurementType = (measurementType) => {
    return API.post(
      hapyCarURL,
      { data: measurementType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addMeasurementTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementType) {
          const [errors] = error.response.data.measurementType;
          errorMsg = errors;
        }
        dispatch(
          addMeasurementTypeAction({
            ...measurementType,
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
