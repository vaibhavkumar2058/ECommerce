import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addOrderTrackingAction,
    updateOrderTrackingAction,   
    deleteOrderTrackingAction,
    getOrderTrackingBeginAction,
    getOrderTrackingSuccessAction,
    getOrderTrackingFailureAction,
    orderTrackingAction ,
  } from "../actions/orderTrackingActions";

  export default function useFetchOrderTrackinges() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/orderTracking";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // OrderTracking GET  ACTIONS
  const getOrderTrackinges = () => {
    dispatch(getOrderTrackingBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getOrderTrackingSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderTracking) {
          const [errors] = error.response.data.orderTracking;
          errorMsg = errors;
        }
        dispatch(
          getOrderTrackingFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderTracking ADD  ACTIONS
  const addOrderTracking = (orderTracking) => {
    return API.post(
      hapyCarURL,
      { data: orderTracking },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addOrderTrackingAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderTracking) {
          const [errors] = error.response.data.orderTracking;
          errorMsg = errors;
        }
        dispatch(
          addOrderTrackingAction({
            ...orderTracking,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // OrderTracking UPDATE  ACTIONS
  const updateOrderTracking = (orderTrackingId, orderTracking) => {

    return API.put(`${hapyCarURL}/${orderTrackingId}`,
      { data: orderTracking},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateOrderTrackingAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderTracking) {
          const [errors] = error.response.data.orderTracking;
          errorMsg = errors;
        }
        dispatch(
          updateOrderTrackingAction({
            ...orderTracking,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderTracking DELETE  ACTIONS
  const deleteOrderTracking = (orderTrackingId) => {
    return API.delete(`${hapyCarURL}/${orderTrackingId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteOrderTrackingAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderTracking) {
          const [errors] = error.response.data.orderTracking;
          errorMsg = errors;
        }
        dispatch(
          deleteOrderTrackingAction({
            ...orderTrackingId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderTracking BY ID ACTIONS
  const orderTrackingById = (orderTrackingId) => {
    return API.get(`${hapyCarURL}/${orderTrackingId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          orderTrackingAction ({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderTracking) {
          const [errors] = error.response.data.orderTracking;
          errorMsg = errors;
        }
        dispatch(
          orderTrackingAction ({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addOrderTracking,
    updateOrderTracking,
    deleteOrderTracking,
    getOrderTrackinges,
    orderTrackingById,
  };
}
