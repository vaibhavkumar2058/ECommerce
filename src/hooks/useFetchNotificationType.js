import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addNotificationTypeAction,
    updateNotificationTypeAction,   
    deleteNotificationTypeAction,
    getNotificationTypeBeginAction,
    getNotificationTypeSuccessAction,
    getNotificationTypeFailureAction,
    notificationTypeAction,
  } from "../actions/notificationTypeActions";

  export default function useFetchNotificationType() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/notificationType";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // NotificationType GET  ACTIONS
  const getNotificationTypes = () => {
    dispatch(getNotificationTypeBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getNotificationTypeSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notificationType) {
          const [errors] = error.response.data.notificationType;
          errorMsg = errors;
        }
        dispatch(
          getNotificationTypeFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // NotificationType ADD  ACTIONS
  const addNotificationType = (notificationType) => {
    return API.post(
      hapyCarURL,
      { data: notificationType },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addNotificationTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notificationType) {
          const [errors] = error.response.data.notificationType;
          errorMsg = errors;
        }
        dispatch(
          addNotificationTypeAction({
            ...notificationType,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // NotificationType UPDATE  ACTIONS
  const updateNotificationType = (notificationTypeId, notificationType) => {

    return API.put(`${hapyCarURL}/${notificationTypeId}`,
      { data: notificationType },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateNotificationTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notificationType) {
          const [errors] = error.response.data.notificationType;
          errorMsg = errors;
        }
        dispatch(
          updateNotificationTypeAction({
            ...notificationType,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // NotificationType DELETE  ACTIONS
  const deleteNotificationType = (notificationTypeId) => {
    return API.delete(`${hapyCarURL}/${notificationTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteNotificationTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notificationType) {
          const [errors] = error.response.data.notificationType;
          errorMsg = errors;
        }
        dispatch(
          deleteNotificationTypeAction({
            ...notificationTypeId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // NotificationType BY ID ACTIONS
  const notificationTypeById = (notificationTypeId) => {
    return API.get(`${hapyCarURL}/${notificationTypeId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            notificationTypeAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notificationType) {
          const [errors] = error.response.data.notificationType;
          errorMsg = errors;
        }
        dispatch(
            notificationTypeAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addNotificationType,
    updateNotificationType,
    deleteNotificationType,
    getNotificationTypes,
    notificationTypeById,
  };
}
