import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addBannerAttachmentsAction,
    updateBannerAttachmentsAction,   
    deleteBannerAttachmentsAction,
    getBannerAttachmentsBeginAction,
    getBannerAttachmentsSuccessAction,
    getBannerAttachmentsFailureAction,
    bannerAttachmentsAction,
  } from "../actions/bannerAttachmentsActions";

  export default function useFetchBannerAttachments() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://jarksapi.azurewebsites.net/bannerAttachments";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // BannerAttachments GET  ACTIONS
  const getBannerAttachmentses = () => {
    dispatch(getBannerAttachmentsBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getBannerAttachmentsSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerAttachments) {
          const [errors] = error.response.data.bannerAttachments;
          errorMsg = errors;
        }
        dispatch(
          getBannerAttachmentsFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // BannerAttachments ADD  ACTIONS
  const addBannerAttachments = (bannerAttachments, attachment) => {
    const formData = new FormData();
    Object.keys(bannerAttachments).forEach((key) => formData.append(key,bannerAttachments[key]));

    return API.post(
      hapyCarURL,
      { data: formData },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addBannerAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerAttachments) {
          const [errors] = error.response.data.bannerAttachments;
          errorMsg = errors;
        }
        dispatch(
          addBannerAttachmentsAction({
            ...bannerAttachments,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // BannerAttachments update  ACTIONS
  const updateBannerAttachments = (bannerAttachmentsId, bannerAttachments) => {

    return API.put(`${hapyCarURL}/${bannerAttachmentsId}`,
      { data: bannerAttachments},
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateBannerAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerAttachments) {
          const [errors] = error.response.data.bannerAttachments;
          errorMsg = errors;
        }
        dispatch(
          updateBannerAttachmentsAction({
            ...bannerAttachments,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // BannerAttachments DELETE  ACTIONS
  const deleteBannerAttachments = (bannerAttachmentsId) => {
    return API.delete(`${hapyCarURL}/${bannerAttachmentsId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteBannerAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerAttachments) {
          const [errors] = error.response.data.bannerAttachments;
          errorMsg = errors;
        }
        dispatch(
          deleteBannerAttachmentsAction({
            ...bannerAttachmentsId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // BannerAttachments BY ID ACTIONS
  const bannerAttachmentsById = (bannerAttachmentsId) => {
    return API.get(`${hapyCarURL}/${bannerAttachmentsId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            bannerAttachmentsAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.bannerAttachments) {
          const [errors] = error.response.data.bannerAttachments;
          errorMsg = errors;
        }
        dispatch(
            bannerAttachmentsAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addBannerAttachments,
    updateBannerAttachments,
    deleteBannerAttachments,
    getBannerAttachmentses,
    bannerAttachmentsById,
  };
}
