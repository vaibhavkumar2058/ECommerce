import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addFileAction,
    updateFileAction,   
    deleteFileAction,
    getFileBeginAction,
    getFileSuccessAction,
    getFileFailureAction,
    fileAction,
  } from "../actions/fileActions";

  export default function useFetchFiles() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/files";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // File GET  ACTIONS
  const getFile = () => {
    dispatch(getFileBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getFileSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.file) {
          const [errors] = error.response.data.file;
          errorMsg = errors;
        }
        dispatch(
          getFileFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // File ADD  ACTIONS
  const addFile = (file) => {
    return API.post(
      hapyCarURL,
      { data: file },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addFileAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.file) {
          const [errors] = error.response.data.file;
          errorMsg = errors;
        }
        dispatch(
          addFileAction({
            ...file,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // File UPDATE  ACTIONS
  const updateFile = (fileId, file) => {

    return API.put(`${hapyCarURL}/${fileId}`,
      { data: file },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateFileAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.file) {
          const [errors] = error.response.data.file;
          errorMsg = errors;
        }
        dispatch(
          updateFileAction({
            ...file,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // File DELETE  ACTIONS
  const deleteFile = (fileId) => {
    return API.delete(`${hapyCarURL}/${fileId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteFileAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.file) {
          const [errors] = error.response.data.file;
          errorMsg = errors;
        }
        dispatch(
          deleteFileAction({
            ...fileId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // File BY ID ACTIONS
  const fileById = (fileId) => {
    return API.get(`${hapyCarURL}/${fileId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            fileAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.file) {
          const [errors] = error.response.data.file;
          errorMsg = errors;
        }
        dispatch(
            fileAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addFile,
    updateFile,
    deleteFile,
    getFile,
    fileById,
  };
}
