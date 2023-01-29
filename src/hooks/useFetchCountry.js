import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addCountryAction,
    updateCountryAction,   
    deleteCountryAction,
    getCountryBeginAction,
    getCountrySuccessAction,
    getCountryFailureAction,
    countryAction,
  } from "../actions/countryActions";

  export default function useFetchCountry() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/country";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Country GET  ACTIONS
  const getCountry = () => {
    dispatch(getCountryBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getCountrySuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.country) {
          const [errors] = error.response.data.country;
          errorMsg = errors;
        }
        dispatch(
          getCountryFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // COUNTRY ADD  ACTIONS
  const addCountry = (country) => {
    return API.post(
      hapyCarURL,
      { data: country },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addCountryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.country) {
          const [errors] = error.response.data.country;
          errorMsg = errors;
        }
        dispatch(
          addCountryAction({
            ...country,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // COUNTRY  UPDATE  ACTIONS
  const updateCountry = (countryId, country) => {
    return API.put(`${hapyCarURL}/${countryId}`,
      { data: country },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateCountryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.country) {
          const [errors] = error.response.data.country;
          errorMsg = errors;
        }
        dispatch(
          updateCountryAction({
            ...country,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // COUNTRY  DELETE  ACTIONS
  const deleteCountry = (countryId) => {
    return API.delete(`${hapyCarURL}/${countryId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteCountryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.country) {
          const [errors] = error.response.data.country;
          errorMsg = errors;
        }
        dispatch(
          deleteCountryAction({
            ...countryId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // COUNTRY  BY ID ACTIONS
  const countryById = (countryId) => {
    return API.get(`${hapyCarURL}/${countryId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            countryAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.country) {
          const [errors] = error.response.data.country;
          errorMsg = errors;
        }
        dispatch(
            countryAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addCountry,
    updateCountry,
    deleteCountry,
    getCountry,
    countryById,
  };
}
