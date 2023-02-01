import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addProductAction,
    updateProductAction,   
    deleteProductAction,
    getProductBeginAction,
    getProductSuccessAction,
    getProductFailureAction,
    productAction,
  } from "../actions/productActions";

  export default function useFetchProducts() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/product";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Product GET  ACTIONS
  const getProduct = () => {
    dispatch(getProductBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getProductSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.Product) {
          const [errors] = error.response.data.product;
          errorMsg = errors;
        }
        dispatch(
          getProductFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Product ADD  ACTIONS
  const addProduct = (product) => {
    return API.post(
      hapyCarURL,
      { data: product },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addProductAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.product) {
          const [errors] = error.response.data.product;
          errorMsg = errors;
        }
        dispatch(
          addProductAction({
            ...product,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Product UPDATE  ACTIONS
  const updateProduct = (productId, product) => {

    return API.put(`${hapyCarURL}/${productId}`,
      { data: product },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateProductAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.product) {
          const [errors] = error.response.data.product;
          errorMsg = errors;
        }
        dispatch(
          updateProductAction({
            ...product,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Product DELETE  ACTIONS
  const deleteProduct = (productId) => {
    return API.delete(`${hapyCarURL}/${productId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteProductAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.product) {
          const [errors] = error.response.data.product;
          errorMsg = errors;
        }
        dispatch(
          deleteProductAction({
            ...productId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Product BY ID ACTIONS
  const productById = (productId) => {
    return API.get(`${hapyCarURL}/${productId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            productAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.product) {
          const [errors] = error.response.data.product;
          errorMsg = errors;
        }
        dispatch(
            productAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    productById,
  };
}