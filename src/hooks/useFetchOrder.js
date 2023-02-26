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
    placeOrderAction,
  } from "../actions/orderActions";

  export default function useFetchOrders() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/order";
  const placeOrdersURL = "https://localhost:7062/placeorders";
  const productOrderListURL = "https://localhost:7062/productorderlist";
  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Order GET  ACTIONS
  const getOrder = () => {
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

    // Order GET  ACTIONS
    const productOrderList = () => {
      dispatch(getOrderBeginAction());
      return API.get(productOrderListURL,
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
          let errorMsg = "error msg from product OrderList";
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

   // Order PLACE_ORDER  ACTIONS
   const placeOrder = (orders) => {
    return API.post(
      placeOrdersURL,
      { data: orders },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          placeOrderAction({
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
          placeOrderAction({
            ...orders,
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
    getOrder,
    orderById,
    placeOrder,
    productOrderList,
  };
}
