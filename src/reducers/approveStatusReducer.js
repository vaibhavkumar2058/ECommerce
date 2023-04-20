import {
    ADD_APPROVE_STATUS,
    UPDATE_APPROVE_STATUS,
    DELETE_APPROVE_STATUS,
    FETCH_APPROVE_STATUS,
    FETCH_APPROVE_STATUS_SUCCESS,
    FETCH_APPROVE_STATUS_FAILURE,
    APPROVE_STATUS,
  } from "../actions/approveStatusActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function approveStatusReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_APPROVE_STATUS_SUCCESS:
        return {
          ...state,
          approveStatus: {
            ...state.approveStatus,
            data: action.payload,
          },
        };
  
  
  
      case ADD_APPROVE_STATUS:
        return {
          ...state,
          approveStatus: {
            ...state.approveStatus,
            data: action.payload,
          },
        };
  
        case UPDATE_APPROVE_STATUS:
        return {
          ...state,
          approveStatus: {
            ...state.approveStatus,
            data: action.payload,
          },
        };
  
        case APPROVE_STATUS:
        return {
          ...state,
          approveStatus: {
            ...state.approveStatus,
            data: action.payload,
          },
        };
  
        case DELETE_APPROVE_STATUS:
          return {
            ...state,
            approveStatus: {
              ...state.approveStatus,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  