import {
    ADD_APPROVE,
    UPDATE_APPROVE,
    DELETE_APPROVE,
    FETCH_APPROVE,
    FETCH_APPROVE_SUCCESS,
    FETCH_APPROVE_FAILURE,
    APPROVE,
  } from "../actions/approveActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function approveReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_APPROVE_SUCCESS:
        return {
          ...state,
          approve: {
            ...state.approve,
            data: action.payload,
          },
        };
  
  
  
      case ADD_APPROVE:
        return {
          ...state,
          approve: {
            ...state.approve,
            data: action.payload,
          },
        };
  
        case UPDATE_APPROVE:
        return {
          ...state,
          approve: {
            ...state.approve,
            data: action.payload,
          },
        };
  
        case APPROVE:
        return {
          ...state,
          approve: {
            ...state.approve,
            data: action.payload,
          },
        };
  
        case DELETE_APPROVE:
          return {
            ...state,
            approve: {
              ...state.approve,
              data: action.payload,
            },
          };
  
  
      default:
        return state;
    }
  }
  