import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAPI } from "../services";

import {
    addFolderAction,
    updateFolderAction,   
    deleteFolderAction,
    getFolderBeginAction,
    getFolderSuccessAction,
    getFolderFailureAction,
    folderAction,
  } from "../actions/folderActions";

  export default function useFetchFolders() {
    const dispatch = useDispatch();
  const hapyCarURL = "https://localhost:7062/folder";

  const API = useAPI();
  const SUCCESS = "Success";
  const ERROR = "Error";

  // Folder GET  ACTIONS
  const getFolders = () => {
    dispatch(getFolderBeginAction());
    return API.get(hapyCarURL,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          getFolderSuccessAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.folder) {
          const [errors] = error.response.data.folder;
          errorMsg = errors;
        }
        dispatch(
          getFolderFailureAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Folder ADD  ACTIONS
  const addFolder = (folder) => {
    return API.post(
      hapyCarURL,
      { data: folder },
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          addFolderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )

      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.folder) {
          const [errors] = error.response.data.folder;
          errorMsg = errors;
        }
        dispatch(
          addFolderAction({
            ...folder,
            title: ERROR,
            errorMsg,
          })
        );
      });




  };

  // Folder UPDATE  ACTIONS
  const updateFolder = (folderId, folder) => {

    return API.put(`${hapyCarURL}/${folderId}`,
      { data: folder },
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
          updateFolderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.folder) {
          const [errors] = error.response.data.folder;
          errorMsg = errors;
        }
        dispatch(
          updateFolderAction({
            ...folder,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Folder DELETE  ACTIONS
  const deleteFolder = (folderId) => {
    return API.delete(`${hapyCarURL}/${folderId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data }) =>
        dispatch(
          deleteFolderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.folder) {
          const [errors] = error.response.data.folder;
          errorMsg = errors;
        }
        dispatch(
          deleteFolderAction({
            ...folderId,
            title: ERROR,
            errorMsg,
          })
        );
      });

  };

  // Folder BY ID ACTIONS
  const folderById = (folderId) => {
    return API.get(`${hapyCarURL}/${folderId}`,
      null,
      { suppressErrors: [400] }
    )
      .then(({ data

      }) =>

        dispatch(
            folderAction({
            ...data,
            title: SUCCESS,
          })
        )
      )
      .catch((error) => {
        let errorMsg = "error msg from copy file";
        if (error.response.data.folder) {
          const [errors] = error.response.data.folder;
          errorMsg = errors;
        }
        dispatch(
            folderAction({
            ...errorMsg,
            title: ERROR,
            errorMsg,
          })
        );
      });
      
  };
  return {
    addFolder,
    updateFolder,
    deleteFolder,
    getFolders,
    folderById,
  };
}
