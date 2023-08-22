import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addTaxAction,
    updateTaxAction,   
    deleteTaxAction,
    getTaxBeginAction,
    getTaxSuccessAction,
    getTaxFailureAction,
    taxAction,
  } from "../actions/taxActions";

  export default function useFetchTax() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/tax";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Tax GET  ACTIONS
  const getTaxs = () => {
    dispatch(getTaxBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getTaxSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.tax) {
          const [errors] = error.response.data.tax;
          errorMsg = errors;
        }
        dispatch(
          getTaxFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Tax ADD  ACTIONS
  const addTax = (tax) => {
    return API.post(
      hapyCarURL,
      { data: tax },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addTaxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.tax) {
          const [errors] = error.response.data.tax;
          errorMsg = errors;
        }
        dispatch(
          addTaxAction({
            ...tax,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Tax UPDATE  ACTIONS
  const updateTax = (taxId, tax) => {

    return API.put(`${hapyCarURL}/${taxId}`,
      { data: tax },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateTaxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.tax) {
          const [errors] = error.response.data.tax;
          errorMsg = errors;
        }
        dispatch(
          updateTaxAction({
            ...tax,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Tax DELETE  ACTIONS
  const deleteTax = (taxId) => {
    return API.delete(`${hapyCarURL}/${taxId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteTaxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.tax) {
          const [errors] = error.response.data.tax;
          errorMsg = errors;
        }
        dispatch(
          deleteTaxAction({
            ...taxId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Tax BY ID ACTIONS
  const taxById = (taxId) => {
    return API.get(`${hapyCarURL}/${taxId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            taxAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.tax) {
          const [errors] = error.response.data.tax;
          errorMsg = errors;
        }
        dispatch(
            taxAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addTax,
    updateTax,
    deleteTax,
    getTaxs,
    taxById,
  };
}
