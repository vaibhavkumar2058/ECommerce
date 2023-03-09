import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addResourcesAction,
    updateResourcesAction,   
    deleteResourcesAction,
    getResourcesBeginAction,
    getResourcesSuccessAction,
    getResourcesFailureAction,
    resourcesAction,
  } from "../actions/resourcesActions";

  export default function useFetchResources() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/resources";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Resources GET  ACTIONS
  const getResources = () => {
    dispatch(getResourcesBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getResourcesSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resources) {
          const [errors] = error.response.data.resources;
          errorMsg = errors;
        }
        dispatch(
          getResourcesFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Resources ADD  ACTIONS
  const addResources = (resources) => {

    const formData = new FormData();
    Object.keys(resources).forEach((key) => formData.append(key,resources[key]));

    return API.post(
      hapyCarURL,
      { data: formData },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addResourcesAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resources) {
          const [errors] = error.response.data.resources;
          errorMsg = errors;
        }
        dispatch(
          addResourcesAction({
            ...resources,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Resources UPDATE  ACTIONS
  const updateResources = (resourcesId, resources) => {

    return API.put(`${hapyCarURL}/${resourcesId}`,
      { data: resources },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateResourcesAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resources) {
          const [errors] = error.response.data.resources;
          errorMsg = errors;
        }
        dispatch(
          updateResourcesAction({
            ...resources,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Product DELETE  ACTIONS
  const deleteResources = (resourcesId) => {
    return API.delete(`${hapyCarURL}/${resourcesId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteResourcesAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resources) {
          const [errors] = error.response.data.resources;
          errorMsg = errors;
        }
        dispatch(
          deleteResourcesAction({
            ...resourcesId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Product BY ID ACTIONS
  const resourcesById = (resourcesId) => {
    return API.get(`${hapyCarURL}/${resourcesId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            resourcesAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.resources) {
          const [errors] = error.response.data.eesources;
          errorMsg = errors;
        }
        dispatch(
            resourcesAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addResources,
    updateResources,
    deleteResources,
    getResources,
    resourcesById,
  };
}
