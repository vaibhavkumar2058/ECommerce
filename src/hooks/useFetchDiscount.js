import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addDiscountAction,
    updateDiscountAction,   
    deleteDiscountAction,
    getDiscountBeginAction,
    getDiscountSuccessAction,
    getDiscountFailureAction,
    discountAction,
  } from "../actions/discountActions";

  export default function useFetchDiscounts() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/discount";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Discount GET  ACTIONS
  const getDiscounts = () => {
    dispatch(getDiscountBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getDiscountSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discount) {
          const [errors] = error.response.data.discount;
          errorMsg = errors;
        }
        dispatch(
          getDiscountFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Discount ADD  ACTIONS
  const addDiscount = (discount) => {
    return API.post(
      hapyCarURL,
      { data: discount },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addDiscountAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discount) {
          const [errors] = error.response.data.discount;
          errorMsg = errors;
        }
        dispatch(
          addDiscountAction({
            ...discount,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Discount UPDATE  ACTIONS
  const updateDiscount = (discountId, discount) => {

    return API.put(`${hapyCarURL}/${discountId}`,
      { data: discount },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateDiscountAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discount) {
          const [errors] = error.response.data.discount;
          errorMsg = errors;
        }
        dispatch(
          updateDiscountAction({
            ...discount,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Discount DELETE  ACTIONS
  const deleteDiscount = (discountId) => {
    return API.delete(`${hapyCarURL}/${discountId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteDiscountAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discount) {
          const [errors] = error.response.data.discount;
          errorMsg = errors;
        }
        dispatch(
          deleteDiscountAction({
            ...discountId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Discount BY ID ACTIONS
  const discountById = (discountById) => {
    return API.get(`${hapyCarURL}/${discountById}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            discountAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.discount) {
          const [errors] = error.response.data.discount;
          errorMsg = errors;
        }
        dispatch(
            discountAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addDiscount,
    updateDiscount,
    deleteDiscount,
    getDiscounts,
    discountById,
  };
}
