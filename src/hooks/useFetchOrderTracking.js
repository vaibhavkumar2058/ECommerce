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
  } from "../actions/ordertrackingAction";

  export default function useFetchOrderTrackings() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/enquiry";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ORDERTRACKING GET  ACTIONS
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
        if (error.response.data.enquiry) {
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
  const addOrderTracking = (enquiry) => {
    return API.post(
      hapyCarURL,
      { data: enquiry },
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
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.ordertracking;
          errorMsg = errors;
        }
        dispatch(
          addOrderTrackingAction({
            ...enquiry,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // ORDERTRACKING UPDATE  ACTIONS
  const updateOrderTracking = (enquiryId, enquiry) => {

    return API.put(`${hapyCarURL}/${enquiryId}`,
      { data: enquiry },
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
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
          updateOrderTrackingAction({
            ...enquiry,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ORDERTRACKING DELETE  ACTIONS
  const deleteOrderTracking = (enquiryId) => {
    return API.delete(`${hapyCarURL}/${enquiryId}`,
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
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
          errorMsg = errors;
        }
        dispatch(
          deleteOrderTrackingAction({
            ...enquiryId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ORDERTRACKING BY ID ACTIONS
  const enquiryById = (enquiryId) => {
    return API.get(`${hapyCarURL}/${enquiryId}`,
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
        if (error.response.data.enquiry) {
          const [errors] = error.response.data.enquiry;
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
    enquiryById,
  };
}
