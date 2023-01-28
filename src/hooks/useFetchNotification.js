import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addNotificationAction,
    updateNotificationAction,   
    deleteNotificationAction,
    getNotificationBeginAction,
    getNotificationSuccessAction,
    getNotificationFailureAction,
    notificationAction,
  } from "../actions/notificationActions";

  export default function useFetchNotifications() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/notification";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Notification GET  ACTIONS
  const getNotification = () => {
    dispatch(getNotificationBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getNotificationSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notification) {
          const [errors] = error.response.data.notification;
          errorMsg = errors;
        }
        dispatch(
          getNotificationFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Notification ADD  ACTIONS
  const addNotification = (notification) => {
    return API.post(
      hapyCarURL,
      { data: notification },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addNotificationAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notification) {
          const [errors] = error.response.data.notification;
          errorMsg = errors;
        }
        dispatch(
          addNotificationAction({
            ...notification,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Notification UPDATE  ACTIONS
  const updateNotification = (notificationId, notification) => {

    return API.put(`${hapyCarURL}/${notificationId}`,
      { data: notification },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateNotificationAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notification) {
          const [errors] = error.response.data.notification;
          errorMsg = errors;
        }
        dispatch(
          updateNotificationAction({
            ...notification,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Notification DELETE  ACTIONS
  const deleteNotification = (notificationId) => {
    return API.delete(`${hapyCarURL}/${notificationId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteNotificationAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notification) {
          const [errors] = error.response.data.notification;
          errorMsg = errors;
        }
        dispatch(
          deleteNotificationAction({
            ...notificationId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Notification BY ID ACTIONS
  const notificationById = (notificationId) => {
    return API.get(`${hapyCarURL}/${notificationId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            notificationAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.notification) {
          const [errors] = error.response.data.notification;
          errorMsg = errors;
        }
        dispatch(
            notificationAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addNotification,
    updateNotification,
    deleteNotification,
    getNotification,
    notificationById,
  };
}
