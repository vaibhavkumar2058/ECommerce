import {
    ADD_FOLDER,
    UPDATE_FOLDER,
    DELETE_FOLDER,
    FETCH_FOLDER,
    FETCH_FOLDER_SUCCESS,
    FETCH_FOLDER_FAILURE,
    FOLDER,
  } from "../actions/folderActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function folderReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_FOLDER_SUCCESS:
        return {
          ...state,
          folder: {
            ...state.folder,
            data: action.payload,
          },
        };
  
  
  
      case ADD_FOLDER:
        return {
          ...state,
          folder: {
            ...state.folder,
            data: action.payload,
          },
        };
  
        case UPDATE_FOLDER:
        return {
          ...state,
          folder: {
            ...state.folder,
            data: action.payload,
          },
        };
  
        case FOLDER:
        return {
          ...state,
          folder: {
            ...state.folder,
            data: action.payload,
          },
        };
  
        case DELETE_FOLDER:
          return {
            ...state,
            folder: {
              ...state.folder,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  