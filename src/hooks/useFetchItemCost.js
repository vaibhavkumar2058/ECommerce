import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addItemCostAction,
    updateItemCostAction,   
    deleteItemCostAction,
    getItemCostBeginAction,
    getItemCostSuccessAction,
    getItemCostFailureAction,
    itemCostAction,
  } from "../actions/itemCostActions";

  export default function useFetchItemCosts() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://msa-api-host.azurewebsites.net/itemCost";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // ItemCost GET  ACTIONS
  const getItemCosts = () => {
    dispatch(getItemCostBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getItemCostSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.itemCost) {
          const [errors] = error.response.data.itemCost;
          errorMsg = errors;
        }
        dispatch(
          getItemCostFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ItemCost ADD  ACTIONS
  const addItemCost = (itemCost) => {
    return API.post(
      hapyCarURL,
      { data: itemCost },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addItemCostAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.itemCost) {
          const [errors] = error.response.data.itemCost;
          errorMsg = errors;
        }
        dispatch(
          addItemCostAction({
            ...itemCost,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // ItemCost UPDATE  ACTIONS
  const updateItemCost = (itemCostId, itemCost) => {

    return API.put(`${hapyCarURL}/${itemCostId}`,
      { data: itemCost},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateItemCostAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.itemCost) {
          const [errors] = error.response.data.itemCost;
          errorMsg = errors;
        }
        dispatch(
          updateItemCostAction({
            ...itemCost,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ItemCost DELETE  ACTIONS
  const deleteItemCost = (itemCostId) => {
    return API.delete(`${hapyCarURL}/${itemCostId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteItemCostAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.itemCost) {
          const [errors] = error.response.data.itemCost;
          errorMsg = errors;
        }
        dispatch(
          deleteItemCostAction({
            ...itemCostId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // ItemCost BY ID ACTIONS
  const itemCostById = (itemCostId) => {
    return API.get(`${hapyCarURL}/${itemCostId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          itemCostAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.itemCost) {
          const [errors] = error.response.data.itemCost;
          errorMsg = errors;
        }
        dispatch(
          itemCostAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addItemCost,
    updateItemCost,
    deleteItemCost,
    getItemCosts,
    itemCostById,
  };
}
