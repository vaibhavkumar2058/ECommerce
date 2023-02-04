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
    orderTrackingAction,
  } from "../actions/orderTrackingAction";

  export default function useFetchOrderTrackings() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/orderTracking";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ORDERTRACKING GET  ACTIONS
  debugger;
  const getOrderTracking = () => {
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
          const [errors] = error.response.data.ordertracking;
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

  // ORDERTRACKING ADD  ACTIONS
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
          const [errors] = error.response.data.ordertracking;
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

  // ORDERTRACKING UPDATE  ACTIONS
  const updateOrderTracking = (orderTrackingId, orderTracking) => {

    return API.put(`${hapyCarURL}/${orderTrackingId}`,
      { data: orderTracking },
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

  // ORDERTRACKING DELETE  ACTIONS
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

  // ORDERTRACKING BY ID ACTIONS
  const orderTrackingById = (orderTrackingId) => {
    return API.get(`${hapyCarURL}/${orderTrackingId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          orderTrackingAction({
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
          orderTrackingAction({
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
    getOrderTracking,
    orderTrackingById,
  };
}
