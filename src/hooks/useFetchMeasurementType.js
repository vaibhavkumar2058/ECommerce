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
  const hapyCarURL = "https://localhost:44320/measurementType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // MeasurementType GET  ACTIONS
  const getMeasurementTypes = () => {
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

  // MeasurementType UPDATE  ACTIONS
  const updateMeasurementType = (measurementTypeId, measurementType) => {

    return API.put(`${hapyCarURL}/${measurementTypeId}`,
      { data: measurementType },
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
        if (error.response.data.measurementType) {
          const [errors] = error.response.data.measurementType;
          errorMsg = errors;
        }
        dispatch(
          updateMeasurementTypeAction({
            ...measurementType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // MeasurementType DELETE  ACTIONS
  const deleteMeasurementType = (measurementTypeId) => {
    return API.delete(`${hapyCarURL}/${measurementTypeId}`,
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
        if (error.response.data.measurementType) {
          const [errors] = error.response.data.measurementType;
          errorMsg = errors;
        }
        dispatch(
          deleteMeasurementTypeAction({
            ...measurementTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // MeasurementType BY ID ACTIONS
  const measurementTypeById = (measurementTypeId) => {
    return API.get(`${hapyCarURL}/${measurementTypeId}`,
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
        if (error.response.data.measurementType) {
          const [errors] = error.response.data.measurementType;
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
    updateMeasurementType,
    deleteMeasurementType,
    getMeasurementTypes,
    measurementTypeById,
  };
}
