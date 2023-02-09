import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addProductAttachmentsAction,
    updateProductAttachmentsAction,   
    deleteProductAttachmentsAction,
    getProductAttachmentsBeginAction,
    getProductAttachmentsSuccessAction,
    getProductAttachmentsFailureAction,
    productAttachmentsAction,
  } from "../actions/productAttachmentsActions";

  export default function useFetchProductAttachments() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/productAttachments";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ProductAttachments GET  ACTIONS
  const getProductAttachmentses = () => {
    dispatch(getProductAttachmentsBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getProductAttachmentsSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.productAttachments) {
          const [errors] = error.response.data.productAttachments;
          errorMsg = errors;
        }
        dispatch(
          getProductAttachmentsFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ProductAttachments ADD  ACTIONS
  const addProductAttachments = (productAttachments, attachment) => {
    const formData = new FormData();
    Object.keys(productAttachments).forEach((key) => formData.append(key,productAttachments[key]));

    return API.post(
      hapyCarURL,
      { data: formData },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addProductAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.productAttachments) {
          const [errors] = error.response.data.productAttachments;
          errorMsg = errors;
        }
        dispatch(
          addProductAttachmentsAction({
            ...productAttachments,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // ProductAttachments update  ACTIONS
  const updateProductAttachments = (productAttachmentsId, productAttachments) => {

    return API.put(`${hapyCarURL}/${productAttachmentsId}`,
      { data: productAttachments},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateProductAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.productAttachments) {
          const [errors] = error.response.data.productAttachments;
          errorMsg = errors;
        }
        dispatch(
          updateProductAttachmentsAction({
            ...productAttachments,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ProductAttachments DELETE  ACTIONS
  const deleteProductAttachments = (productAttachmentsId) => {
    return API.delete(`${hapyCarURL}/${productAttachmentsId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteProductAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.productAttachments) {
          const [errors] = error.response.data.productAttachments;
          errorMsg = errors;
        }
        dispatch(
          deleteProductAttachmentsAction({
            ...productAttachmentsId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ProductAttachments BY ID ACTIONS
  const productAttachmentsById = (productAttachmentsId) => {
    return API.get(`${hapyCarURL}/${productAttachmentsId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            productAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.productAttachments) {
          const [errors] = error.response.data.productAttachments;
          errorMsg = errors;
        }
        dispatch(
            productAttachmentsAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addProductAttachments,
    updateProductAttachments,
    deleteProductAttachments,
    getProductAttachmentses,
    productAttachmentsById,
  };
}
