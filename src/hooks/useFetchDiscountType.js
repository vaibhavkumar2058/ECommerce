import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addDiscountTypeAction,
    updateDiscountTypeAction,   
    deleteDiscountTypeAction,
    getDiscountTypeBeginAction,
    getDiscountTypeSuccessAction,
    getDiscountTypeFailureAction,
    discountTypeAction,
  } from "../actions/discountTypeActions";

  export default function useFetchDiscountTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/discountType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // DiscountType GET  ACTIONS
  const getDiscountTypes = () => {
    dispatch(getDiscountTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getDiscountTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discountType) {
          const [errors] = error.response.data.discountType;
          errorMsg = errors;
        }
        dispatch(
            getDiscountTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // DiscountType ADD  ACTIONS
  const addDiscountType = (discountType) => {
    return API.post(
      hapyCarURL,
      { data: discountType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addDiscountTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discountType) {
          const [errors] = error.response.data.discountType;
          errorMsg = errors;
        }
        dispatch(
          addDiscountTypeAction({
            ...discountType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // DiscountType UPDATE  ACTIONS
  const updateDiscountType = (discountTypeId, discountType) => {

    return API.put(`${hapyCarURL}/${discountTypeId}`,
      { data: discountType},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateDiscountTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discountType) {
          const [errors] = error.response.data.discountType;
          errorMsg = errors;
        }
        dispatch(
          updateDiscountTypeAction({
            ...discountType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // DiscountType DELETE  ACTIONS
  const deleteDiscountType = (discountTypeId) => {
    return API.delete(`${hapyCarURL}/${discountTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteDiscountTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discountType) {
          const [errors] = error.response.data.discountType;
          errorMsg = errors;
        }
        dispatch(
          deleteDiscountTypeAction({
            ...discountTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // DiscountType BY ID ACTIONS
  const discountTypeById = (discountTypeId) => {
    return API.get(`${hapyCarURL}/${discountTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          discountTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discountType) {
          const [errors] = error.response.data.discountType;
          errorMsg = errors;
        }
        dispatch(
          discountTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addDiscountType,
    updateDiscountType,
    deleteDiscountType,
    getDiscountTypes,
    discountTypeById,
  };
}
