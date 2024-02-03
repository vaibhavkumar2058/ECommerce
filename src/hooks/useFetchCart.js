import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addCartAction,
    updateCartAction,   
    deleteCartAction,
    getCartBeginAction,
    getCartSuccessAction,
    getCartFailureAction,
    cartAction,
  } from "../actions/cartActions";

  export default function useFetchCarts() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:44320/cart";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Cart GET  ACTIONS
  const getCarts = () => {
    dispatch(getCartBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getCartSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.cart) {
          const [errors] = error.response.data.cart;
          errorMsg = errors;
        }
        dispatch(
          getCartFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Cart ADD  ACTIONS
  const addCart = (cart) => {
    return API.post(
      hapyCarURL,
      { data: cart },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addCartAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.cart) {
          const [errors] = error.response.data.cart;
          errorMsg = errors;
        }
        dispatch(
          addCartAction({
            ...cart,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Cart UPDATE  ACTIONS
  const updateCart = (cartId, cart) => {

    return API.put(`${hapyCarURL}/${cartId}`,
      { data: cart },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateCartAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.cart) {
          const [errors] = error.response.data.cart;
          errorMsg = errors;
        }
        dispatch(
          updateCartAction({
            ...cart,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Cart DELETE  ACTIONS
  const deleteCart = (cartId) => {
    return API.delete(`${hapyCarURL}/${cartId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteCartAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.cart) {
          const [errors] = error.response.data.cart;
          errorMsg = errors;
        }
        dispatch(
          deleteCartAction({
            ...cartId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Cart BY ID ACTIONS
  const cartById = (cartId) => {
    return API.get(`${hapyCarURL}/${cartId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            cartAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.cart) {
          const [errors] = error.response.data.cart;
          errorMsg = errors;
        }
        dispatch(
            cartAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  // Cart GET  ACTIONS
  const getCartListByResourcesId = (resourcesId) => {
    dispatch(getCartBeginAction());
    return API.get(`${hapyCarURL}/list/${resourcesId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getCartSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.cart) {
          const [errors] = error.response.data.cart;
          errorMsg = errors;
        }
        dispatch(
          getCartFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  return {
    addCart,
    updateCart,
    deleteCart,
    getCarts,
    getCartListByResourcesId,
    cartById,
  };
}
