import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addBannerAction,
    updateBannerAction,   
    deleteBannerAction,
    getBannerBeginAction,
    getBannerSuccessAction,
    getBannerFailureAction,
    bannerAction,
  } from "../actions/bannerActions";

  export default function useFetchBanners() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/banner";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Banner GET  ACTIONS
  const getBanners = () => {
    dispatch(getBannerBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getBannerSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.banner) {
          const [errors] = error.response.data.banner;
          errorMsg = errors;
        }
        dispatch(
            getBannerFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Banner ADD  ACTIONS
  const addBanner = (banner) => {
    return API.post(
      hapyCarURL,
      { data: banner },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addBannerAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.banner) {
          const [errors] = error.response.data.banner;
          errorMsg = errors;
        }
        dispatch(
          addBannerAction({
            ...banner,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Banner UPDATE  ACTIONS
  const updateBanner = (bannerId, banner) => {
    debugger;

    return API.put(`${hapyCarURL}/${bannerId}`,
      { data: banner},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateBannerAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.banner) {
          const [errors] = error.response.data.banner;
          errorMsg = errors;
        }
        dispatch(
          updateBannerAction({
            ...banner,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Banner DELETE  ACTIONS
  const deleteBanner = (bannerId) => {
    return API.delete(`${hapyCarURL}/${bannerId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteBannerAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.banner) {
          const [errors] = error.response.data.banner;
          errorMsg = errors;
        }
        dispatch(
          deleteBannerAction({
            ...bannerId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Banner BY ID ACTIONS
  const bannerById = (bannerId) => {
    return API.get(`${hapyCarURL}/${bannerId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            bannerAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.banner) {
          const [errors] = error.response.data.banner;
          errorMsg = errors;
        }
        dispatch(
            bannerAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addBanner,
    updateBanner,
    deleteBanner,
    getBanners,
    bannerById,
  };
}
