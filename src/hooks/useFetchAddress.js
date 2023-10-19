import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";
import {
    addAddressAction,
    updateAddressAction,   
    deleteAddressAction,
    getAddressBeginAction,
    getAddressSuccessAction,
    getAddressFailureAction,
    addressAction,
  } from "../actions/addressActions";


  export default function useFetchAddresses() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/address";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Address GET  ACTIONS
  const getAddresses = () => {
    dispatch(getAddressBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getAddressSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
          getAddressFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Address ADD  ACTIONS
  const addAddress = (address) => {
    return API.post(
      hapyCarURL,
      { data: address },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addAddressAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
          addAddressAction({
            ...address,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Address UPDATE  ACTIONS
  const updateAddress = (addressId, address) => {
    return API.put(`${hapyCarURL}/${addressId}`,
      { data: address},
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          updateAddressAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
          updateAddressAction({
            ...address,
            title: ERROR,
            errorMsg,
          })
        );
      });
  };

  // Address DELETE  ACTIONS
  const deleteAddress = (addressId) => {
    return API.delete(`${hapyCarURL}/${addressId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteAddressAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
          deleteAddressAction({
            ...addressId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Address by Id Actions
  const addressById = (addressId) => {
    return API.get(`${hapyCarURL}/${addressId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
           addressAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
            addressAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  const getAddressByResourceId = (resourcesId) => {
    dispatch(getAddressBeginAction());
    return API.get(`${hapyCarURL}/list/${resourcesId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getAddressSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.address) {
          const [errors] = error.response.data.address;
          errorMsg = errors;
        }
        dispatch(
          getAddressFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };
  
  
  
  return {
    addAddress,
    updateAddress,
    deleteAddress,
    getAddresses,
    addressById,
    getAddressByResourceId
  };
}
