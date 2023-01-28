import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addVehicleTypeAction,
    updateVehicleTypeAction,   
    deleteVehicleTypeAction,
    getVehicleTypeBeginAction,
    getVehicleTypeSuccessAction,
    getVehicleTypeFailureAction,
    vehicleTypeAction,
  } from "../actions/vehicleTypeActions";

  export default function useFetchVehicleTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/enquiry";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // VehicleType GET  ACTIONS
  const getVehicleType = () => {
    dispatch(getVehicleTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getVehicleTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.vehicleType) {
          const [errors] = error.response.data.vehicleType;
          errorMsg = errors;
        }
        dispatch(
          getVehicleTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // VehicleType ADD  ACTIONS
  const addVehicleType = (vehicleType) => {
    return API.post(
      hapyCarURL,
      { data: vehicleType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addVehicleTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.vehicleType) {
          const [errors] = error.response.data.vehicleTypey;
          errorMsg = errors;
        }
        dispatch(
          addVehicleTypeAction({
            ...vehicleType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // VehicleType UPDATE  ACTIONS
  const updateVehicleType = (vehicleTypeId, vehicleType) => {

    return API.put(`${hapyCarURL}/${vehicleTypeId}`,
      { data: vehicleType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateVehicleTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.vehicleType) {
          const [errors] = error.response.data.vehicleType;
          errorMsg = errors;
        }
        dispatch(
          updateVehicleTypeAction({
            ...vehicleType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // VehicleType DELETE  ACTIONS
  const deleteVehicleType = (vehicleTypeId) => {
    return API.delete(`${hapyCarURL}/${vehicleTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteVehicleTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.vehicleType) {
          const [errors] = error.response.data.vehicleType;
          errorMsg = errors;
        }
        dispatch(
          deleteVehicleTypeAction({
            ...vehicleTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // VehicleType BY ID ACTIONS
  const vehicleTypeById = (vehicleTypeId) => {
    return API.get(`${hapyCarURL}/${vehicleTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            vehicleTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.vehicleType) {
          const [errors] = error.response.data.vehicleType;
          errorMsg = errors;
        }
        dispatch(
            vehicleTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addVehicleType,
    updateVehicleType,
    deleteVehicleType,
    getVehicleType,
    vehicleTypeById,
  };
}
