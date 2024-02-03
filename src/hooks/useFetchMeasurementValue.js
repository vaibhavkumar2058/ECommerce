import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addMeasurementValueAction,
    updateMeasurementValueAction,   
    deleteMeasurementValueAction,
    getMeasurementValueBeginAction,
    getMeasurementValueSuccessAction,
    getMeasurementValueFailureAction,
    measurementValueAction,
  } from "../actions/measurementValueActions";

  export default function useFetchMeasurementValues() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:44320/measurementValue";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // MeasurementValue GET  ACTIONS
  const getMeasurementValues = () => {
    dispatch(getMeasurementValueBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getMeasurementValueSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementValue) {
          const [errors] = error.response.data.measurementValue;
          errorMsg = errors;
        }
        dispatch(
          getMeasurementValueFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // MeasurementValue ADD  ACTIONS
  const addMeasurementValue = (measurementValue) => {
    return API.post(
      hapyCarURL,
      { data: measurementValue },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addMeasurementValueAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementValue) {
          const [errors] = error.response.data.measurementValue;
          errorMsg = errors;
        }
        dispatch(
          addMeasurementValueAction({
            ...measurementValue,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // MeasurementValue UPDATE  ACTIONS
  const updateMeasurementValue = (measurementValueId, measurementValue) => {

    return API.put(`${hapyCarURL}/${measurementValueId}`,
      { data: measurementValue },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateMeasurementValueAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementValue) {
          const [errors] = error.response.data.measurementValue;
          errorMsg = errors;
        }
        dispatch(
          updateMeasurementValueAction({
            ...measurementValue,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // MeasurementValue DELETE  ACTIONS
  const deleteMeasurementValue = (measurementValueId) => {
    return API.delete(`${hapyCarURL}/${measurementValueId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteMeasurementValueAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementValue) {
          const [errors] = error.response.data.measurementValue;
          errorMsg = errors;
        }
        dispatch(
          deleteMeasurementValueAction({
            ...measurementValueId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // MeasurementValue BY ID ACTIONS
  const measurementValueById = (measurementValueId) => {
    return API.get(`${hapyCarURL}/${measurementValueId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            measurementValueAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.measurementValue) {
          const [errors] = error.response.data.measurementValue;
          errorMsg = errors;
        }
        dispatch(
            measurementValueAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addMeasurementValue,
    updateMeasurementValue,
    deleteMeasurementValue,
    getMeasurementValues,
    measurementValueById,
  };
}
