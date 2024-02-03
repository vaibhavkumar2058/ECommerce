import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addAddressTypeAction,
    updateAddressTypeAction,   
    deleteAddressTypeAction,
    getAddressTypeBeginAction,
    getAddressTypeSuccessAction,
    getAddressTypeFailureAction,
    addressTypeAction,
  } from "../actions/addressTypeActions";

  export default function useFetchAddressTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:44320/addressType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // AddressType GET  ACTIONS
  const getAddressTypes = () => {
    dispatch(getAddressTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getAddressTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.addressType) {
          const [errors] = error.response.data.addressType;
          errorMsg = errors;
        }
        dispatch(
          getAddressTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // AddressType ADD  ACTIONS
  const addAddressType = (addressType) => {
    return API.post(
      hapyCarURL,
      { data: addressType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addAddressTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.addressType) {
          const [errors] = error.response.data.addressType;
          errorMsg = errors;
        }
        dispatch(
          addAddressTypeAction({
            ...addressType,
            title: ERROR,
            errorMsg,
          })
        );
      });
  };

  // AddressType UPDATE  ACTIONS
  const updateAddressType = (addressTypeId, addressType) => {

    return API.put(`${hapyCarURL}/${addressTypeId}`,
      { data: addressType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateAddressTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.addressType) {
          const [errors] = error.response.data.addressType;
          errorMsg = errors;
        }
        dispatch(
          updateAddressTypeAction({
            ...addressType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // AddressType DELETE  ACTIONS
  const deleteAddressType = (addressTypeId) => {
    return API.delete(`${hapyCarURL}/${addressTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteAddressTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.addressType) {
          const [errors] = error.response.data.addressType;
          errorMsg = errors;
        }
        dispatch(
          deleteAddressTypeAction({
            ...addressTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // AddressType BY ID ACTIONS
  const addressTypeById = (addressTypeId) => {
    return API.get(`${hapyCarURL}/${addressTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data
      }) =>

        dispatch(
            addressTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.addressType) {
          const [errors] = error.response.data.addressType;
          errorMsg = errors;
        }
        dispatch(
            addressTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addAddressType,
    updateAddressType,
    deleteAddressType,
    getAddressTypes,
    addressTypeById,
  };
}
