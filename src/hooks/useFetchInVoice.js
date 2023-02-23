import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addInvoiceAction,
    updateInvoiceAction,   
    deleteInvoiceAction,
    getInvoiceBeginAction,
    getInvoiceSuccessAction,
    getInvoiceFailureAction,
    invoiceAction,
  } from "../actions/invoiceActions";

  export default function useFetchInvoices() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/invoice";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Invoice GET  ACTIONS
  const getInvoice = () => {
    dispatch(getInvoiceBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getInvoiceSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.invoice) {
          const [errors] = error.response.data.invoice;
          errorMsg = errors;
        }
        dispatch(
          getInvoiceFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Invoice ADD  ACTIONS
  const addInvoice = (invoice) => {
    return API.post(
      hapyCarURL,
      { data: invoice },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addInvoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.invoice) {
          const [errors] = error.response.data.invoice;
          errorMsg = errors;
        }
        dispatch(
          addInvoiceAction({
            ...invoice,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // InVoice UPDATE  ACTIONS
  const updateInvoice = (invoiceId, invoice) => {

    return API.put(`${hapyCarURL}/${invoiceId}`,
      { data: invoice },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateInvoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.invoice) {
          const [errors] = error.response.data.invoice;
          errorMsg = errors;
        }
        dispatch(
          updateInvoiceAction({
            ...invoice,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Invoice DELETE  ACTIONS
  const deleteInvoice = (invoiceId) => {
    return API.delete(`${hapyCarURL}/${invoiceId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteInvoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.invoice) {
          const [errors] = error.response.data.invoice;
          errorMsg = errors;
        }
        dispatch(
          deleteInvoiceAction({
            ...invoiceId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Invoice BY ID ACTIONS
  const invoiceById = (invoiceId) => {
    return API.get(`${hapyCarURL}/${invoiceId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          invoiceAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.invoice) {
          const [errors] = error.response.data.invoice;
          errorMsg = errors;
        }
        dispatch(
          invoiceAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    invoiceById,
  };
}
