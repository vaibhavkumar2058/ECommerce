import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addCategoryTypeAction,
    updateCategoryTypeAction,   
    deleteCategoryTypeAction,
    getCategoryTypeBeginAction,
    getCategoryTypeSuccessAction,
    getCategoryTypeFailureAction,
    categoryTypeAction,
  } from "../actions/categoryTypeActions";

  export default function useFetchCategorytype() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/categoryType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Categorytype GET  ACTIONS
  const getCategoryTypes = () => {
    dispatch(getCategoryTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getCategoryTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categoryType) {
          const [errors] = error.response.data.categoryType;
          errorMsg = errors;
        }
        dispatch(
          getCategoryTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Categorytype ADD  ACTIONS
  const addCategoryType = (categoryType) => {
    return API.post( 
      hapyCarURL,
      { data: categoryType}
    )
      .then(({ data }) =>
        dispatch(
          addCategoryTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categoryType) {
          const [errors] = error.response.data.categoryType;
          errorMsg = errors;
        }
        dispatch(
          addCategoryTypeAction({
            ...categoryType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Categorytype UPDATE  ACTIONS
  const updateCategoryType = (categoryTypeId, categoryType) => {

    return API.put(`${hapyCarURL}/${categoryTypeId}`,
      { data: categoryType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateCategoryTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categoryType) {
          const [errors] = error.response.data.categoryType;
          errorMsg = errors;
        }
        dispatch(
          updateCategoryTypeAction({
            ...categoryType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Categorytype DELETE  ACTIONS
  const deleteCategoryType = (categoryTypeId) => {
    return API.delete(`${hapyCarURL}/${categoryTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteCategoryTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categoryType) {
          const [errors] = error.response.data.categoryType;
          errorMsg = errors;
        }
        dispatch(
          deleteCategoryTypeAction({
            ...categoryTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Categorytype BY ID ACTIONS
  const categoryTypeById = (categoryTypeId) => {
    return API.get(`${hapyCarURL}/${categoryTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            categoryTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.categoryType) {
          const [errors] = error.response.data.categoryType;
          errorMsg = errors;
        }
        dispatch(
            categoryTypeAction({
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
