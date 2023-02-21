import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addOrderStatusAction,
    updateOrderStatusAction,   
    deleteOrderStatusAction,
    getOrderStatusBeginAction,
    getOrderStatusSuccessAction,
    getOrderStatusFailureAction,
    orderStatusAction ,
  } from "../actions/orderStatusActions";

  export default function useFetchOrderStatuses() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/orderStatus";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // OrderTracking GET  ACTIONS
  const getOrderStatuses = () => {
    dispatch(getOrderStatusBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getOrderStatusSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderStatus) {
          const [errors] = error.response.data.orderStatus;
          errorMsg = errors;
        }
        dispatch(
          getOrderStatusFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderStatus ADD  ACTIONS
  const addOrderStatus = (orderStatus) => {
    return API.post(
      hapyCarURL,
      { data: orderStatus },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addOrderStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderStatus) {
          const [errors] = error.response.data.orderStatus;
          errorMsg = errors;
        }
        dispatch(
          addOrderStatusAction({
            ...orderStatus,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // OrderStatus UPDATE  ACTIONS
  const updateOrderStatus = (orderStatusId, orderStatus) => {

    return API.put(`${hapyCarURL}/${orderStatusId}`,
      { data: orderStatus},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateOrderStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderStatus) {
          const [errors] = error.response.data.orderStatus;
          errorMsg = errors;
        }
        dispatch(
          updateOrderStatusAction({
            ...orderStatus,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderStatus DELETE  ACTIONS
  const deleteOrderStatus = (orderStatusId) => {
    return API.delete(`${hapyCarURL}/${orderStatusId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteOrderStatusAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderStatus) {
          const [errors] = error.response.data.orderStatus;
          errorMsg = errors;
        }
        dispatch(
          deleteOrderStatusAction({
            ...orderStatusId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderStatus BY ID ACTIONS
  const orderStatusById = (orderStatusId) => {
    return API.get(`${hapyCarURL}/${orderStatusId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          orderStatusAction ({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderStatus) {
          const [errors] = error.response.data.orderStatus;
          errorMsg = errors;
        }
        dispatch(
          orderStatusAction ({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addOrderStatus,
    updateOrderStatus,
    deleteOrderStatus,
    getOrderStatuses,
    orderStatusById,
  };
}
