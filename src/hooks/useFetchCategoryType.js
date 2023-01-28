import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addCategorytypeAction,
    updateCategorytypeAction,   
    deleteCategorytypeAction,
    getCategorytypeBeginAction,
    getCategorytypeSuccessAction,
    getCategorytypeFailureAction,
    categorytypeAction,
  } from "../actions/categoryTypeActions";

  export default function useFetchCategorytype() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/category";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Categorytype GET  ACTIONS
  const getCategoryTypes = () => {
    dispatch(getCategorytypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getCategorytypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categorytype) {
          const [errors] = error.response.data.categorytype;
          errorMsg = errors;
        }
        dispatch(
          getCategorytypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Categorytype ADD  ACTIONS
  const addCategoryType = (categorytype) => {
    return API.post(
      hapyCarURL,
      { data:categorytype},
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addCategorytypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.Categorytype) {
          const [errors] = error.response.data.categorytype;
          errorMsg = errors;
        }
        dispatch(
          addCategorytypeAction({
            ...categorytype,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Categorytype UPDATE  ACTIONS
  const updateCategoryType = (categorytypeId, categorytype) => {

    return API.put(`${hapyCarURL}/${categorytypeId}`,
      { data: categorytype },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateCategorytypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categorytype) {
          const [errors] = error.response.data.categorytype;
          errorMsg = errors;
        }
        dispatch(
          updateCategorytypeAction({
            ...categorytype,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Categorytype DELETE  ACTIONS
  const deleteCategoryType = (categorytypeId) => {
    return API.delete(`${hapyCarURL}/${categorytypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteCategorytypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categorytype) {
          const [errors] = error.response.data.categorytype;
          errorMsg = errors;
        }
        dispatch(
          deleteCategorytypeAction({
            ...categorytypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Categorytype BY ID ACTIONS
  const categoryTypeById = (categorytypeId) => {
    return API.get(`${hapyCarURL}/${categorytypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            categorytypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categorytype) {
          const [errors] = error.response.data.categorytype;
          errorMsg = errors;
        }
        dispatch(
            categorytypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addCategoryType,
    updateCategoryType,
    deleteCategoryType,
    getCategoryTypes,
    categoryTypeById ,
  };
}
