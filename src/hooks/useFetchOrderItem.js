import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
  addOrderItemAction,
  updateOrderItemAction,
  deleteOrderItemAction,
  getOrderItemBeginAction,
  getOrderItemSuccessAction,
  getOrderItemFailureAction,
  orderItemAction,
} from "../actions/orderItemActions";

export default function useFetchRecordStatus() {
  const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/orderItem";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // OrderItem GET  ACTIONS
  const getOrderItems = () => {
    dispatch(getOrderItemBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getOrderItemSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderItem) {
          const [errors] = error.response.data.orderItem;
          errorMsg = errors;
        }
        dispatch(
          getOrderItemFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderItem ADD  ACTIONS
  const addOrderItem = (orderItem) => {
    return API.post(
      hapyCarURL,
      { data: orderItem },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addOrderItemAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderItem) {
          const [errors] = error.response.data.orderItem;
          errorMsg = errors;
        }
        dispatch(
          addOrderItemAction({
            ...orderItem,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // OrderItem UPDATE  ACTIONS
  const updateOrderItem = (orderItemId, orderItem) => {

    return API.put(`${hapyCarURL}/${orderItemId}`,
      { data: orderItem },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateOrderItemAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderItem) {
          const [errors] = error.response.data.orderItem;
          errorMsg = errors;
        }
        dispatch(
          updateOrderItemAction({
            ...orderItem,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderItem DELETE  ACTIONS
  const deleteOrderItem = (orderItemId) => {
    return API.delete(`${hapyCarURL}/${orderItemId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteOrderItemAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderItem) {
          const [errors] = error.response.data.orderItem;
          errorMsg = errors;
        }
        dispatch(
          deleteOrderItemAction({
            ...orderItemId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // OrderItem BY ID ACTIONS
  const orderItemById = (orderItemId) => {
    return API.get(`${hapyCarURL}/${orderItemId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          orderItemAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.orderItem) {
          const [errors] = error.response.data.orderItem;
          errorMsg = errors;
        }
        dispatch(
          orderItemAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };
  return {
    addOrderItem,
    updateOrderItem,
    deleteOrderItem,
    getOrderItems,
    orderItemById,
  };
}
