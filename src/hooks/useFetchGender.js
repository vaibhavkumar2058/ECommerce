import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addGenderAction,
    updateGenderAction,   
    deleteGenderAction,
    getGenderBeginAction,
    getGenderSuccessAction,
    getGenderFailureAction,
    genderAction,
  } from "../actions/genderActions";

  export default function useFetchGender() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/gender";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // GENDER GET  ACTIONS
  const getGender = () => {
    dispatch(getGenderBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getGenderSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gender) {
          const [errors] = error.response.data.gender;
          errorMsg = errors;
        }
        dispatch(
          getGenderFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GENDER ADD  ACTIONS
  const addGender = (gender) => {
    return API.post(
      hapyCarURL,
      { data: gender },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addGenderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gender) {
          const [errors] = error.response.data.gender;
          errorMsg = errors;
        }
        dispatch(
          addGenderAction({
            ...gender,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // GENDER UPDATE  ACTIONS
  const updateGender = (genderId, gender) => {

    return API.put(`${hapyCarURL}/${genderId}`,
      { data: gender },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateGenderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gender) {
          const [errors] = error.response.data.gender;
          errorMsg = errors;
        }
        dispatch(
          updateGenderAction({
            ...gender,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GENDER DELETE  ACTIONS
  const deleteGender = (genderId) => {
    return API.delete(`${hapyCarURL}/${genderId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteGenderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gender) {
          const [errors] = error.response.data.gender;
          errorMsg = errors;
        }
        dispatch(
          deleteGenderAction({
            ...genderId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // GENDERBY ID ACTIONS
  const genderById = (genderId) => {
    return API.get(`${hapyCarURL}/${genderId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            genderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.gender) {
          const [errors] = error.response.data.gender;
          errorMsg = errors;
        }
        dispatch(
            genderAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addGender,
    updateGender,
    deleteGender,
    getGender,
    genderById,
  };
}
