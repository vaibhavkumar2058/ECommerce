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
          updateMeasurementTypeAction({
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
          updateMeasurementTypeAction({
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
          deleteMeasurementTypeAction({
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
          deleteMeasurementTypeAction({
            ...enquiryId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Enquiry BY ID ACTIONS
  const measurementById = (enquiryId) => {
    return API.get(`${hapyCarURL}/${enquiryId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            measurementTypeAction({
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
            measurementTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addMeasurementType,
    updateEnquiry,
    deleteEnquiry,
    getMeasurementType,
    measurementById,
  };
}
