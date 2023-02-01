import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addOrderAction,
    updateOrderAction,   
    deleteOrderAction,
    getOrderBeginAction,
    getOrderSuccessAction,
    getOrderFailureAction,
    orderAction,
  } from "../actions/orderActions";

  export default function useFetchOrders() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/order";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Order GET  ACTIONS
  const getOrders = () => {
    dispatch(getOrderBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getOrderSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.order) {
          const [errors] = error.response.data.order;
          errorMsg = errors;
        }
        dispatch(
          getOrderFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Order ADD  ACTIONS
  const addOrder = (order) => {
    return API.post(
      hapyCarURL,
      { data: order },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addOrderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.order) {
          const [errors] = error.response.data.order;
          errorMsg = errors;
        }
        dispatch(
          addOrderAction({
            ...order,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Order UPDATE  ACTIONS
  const updateOrder = (orderId, order) => {

    return API.put(`${hapyCarURL}/${orderId}`,
      { data: order },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateOrderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.order) {
          const [errors] = error.response.data.order;
          errorMsg = errors;
        }
        dispatch(
          updateOrderAction({
            ...order,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Order DELETE  ACTIONS
  const deleteOrder = (orderId) => {
    return API.delete(`${hapyCarURL}/${orderId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteOrderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.order) {
          const [errors] = error.response.data.order;
          errorMsg = errors;
        }
        dispatch(
          deleteOrderAction({
            ...orderId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Order BY ID ACTIONS
  const orderById = (orderId) => {
    return API.get(`${hapyCarURL}/${orderId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            orderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.order) {
          const [errors] = error.response.data.order;
          errorMsg = errors;
        }
        dispatch(
            orderAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    orderById,
  };
}