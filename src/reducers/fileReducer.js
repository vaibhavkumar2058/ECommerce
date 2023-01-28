import {
    ADD_FILE,
    UPDATE_FILE,
    DELETE_FILE,
    FETCH_FILE,
    FETCH_FILE_SUCCESS,
    FETCH_FILE_FAILURE,
    FILE,
  } from "../actions/fileActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function fileReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_FILE_SUCCESS:
        return {
          ...state,
          file: {
            ...state.file,
            data: action.payload,
          },
        };
  
  
  
      case ADD_FILE:
        return {
          ...state,
          file: {
            ...state.file,
            data: action.payload,
          },
        };
  
        case UPDATE_FILE:
        return {
          ...state,
          file: {
            ...state.file,
            data: action.payload,
          },
        };
  
        case FILE:
        return {
          ...state,
          file: {
            ...state.file,
            data: action.payload,
          },
        };
  
        case DELETE_FILE:
          return {
            ...state,
            file: {
              ...state.file,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  