import {
    ADD_RECORD_STATUS,
    UPDATE_RECORD_STATUS,
    DELETE_RECORD_STATUS,
    FETCH_RECORD_STATUS,
    FETCH_RECORD_STATUS_SUCCESS,
    FETCH_RECORD_STATUS_FAILURE,
    RECORD_STATUS,
  } from "../actions/recordStatusActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function recordStatusReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_RECORD_STATUS_SUCCESS:
        return {
          ...state,
          recordStatus: {
            ...state.recordStatus,
            data: action.payload,
          },
        };
  
  
  
      case ADD_RECORD_STATUS:
        return {
          ...state,
          recordStatus: {
            ...state.recordStatus,
            data: action.payload,
          },
        };
  
        case UPDATE_RECORD_STATUS:
        return {
          ...state,
          recordStatus: {
            ...state.recordStatus,
            data: action.payload,
          },
        };
  
        case RECORD_STATUS:
        return {
          ...state,
          recordStatus: {
            ...state.recordStatus,
            data: action.payload,
          },
        };
  
        case DELETE_RECORD_STATUS:
          return {
            ...state,
            recordStatus: {
              ...state.recordStatus,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  