import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addBannerTypeAction,
    updateBannerTypeAction,   
    deleteBannerTypeAction,
    getBannerTypeBeginAction,
    getBannerTypeSuccessAction,
    getBannerTypeFailureAction,
    bannerTypeAction,
  } from "../actions/bannerTypeActions";

  export default function useFetchBannerTypes() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:44320/bannerType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // BannerType GET  ACTIONS
  const getBannerTypes = () => {
    dispatch(getBannerTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getBannerTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerType) {
          const [errors] = error.response.data.bannerType;
          errorMsg = errors;
        }
        dispatch(
          getBannerTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // BannerType ADD  ACTIONS
  const addBannerType = (bannerType) => {
    return API.post(
      hapyCarURL,
      { data: bannerType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addBannerTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerType) {
          const [errors] = error.response.data.bannerType;
          errorMsg = errors;
        }
        dispatch(
          addBannerTypeAction({
            ...bannerType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  //BannerType UPDATE  ACTIONS
  const updateBannerType = (bannerTypeId, bannerType) => {

    return API.put(`${hapyCarURL}/${bannerTypeId}`,
      { data: bannerType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateBannerTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerType) {
          const [errors] = error.response.data.bannerType;
          errorMsg = errors;
        }
        dispatch(
          updateBannerTypeAction({
            ...bannerType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // BannerType DELETE  ACTIONS
  const deleteBannerType = (bannerTypeId) => {
    return API.delete(`${hapyCarURL}/${bannerTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteBannerTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerType) {
          const [errors] = error.response.data.bannerType;
          errorMsg = errors;
        }
        dispatch(
          deleteBannerTypeAction({
            ...bannerTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // BannerType BY ID ACTIONS
  const bannerTypeById = (bannerTypeId) => {
    return API.get(`${hapyCarURL}/${bannerTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            bannerTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerType) {
          const [errors] = error.response.data.bannerType;
          errorMsg = errors;
        }
        dispatch(
            bannerTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addBannerType,
    updateBannerType,
    deleteBannerType,
    getBannerTypes,
    bannerTypeById,
  };
}
