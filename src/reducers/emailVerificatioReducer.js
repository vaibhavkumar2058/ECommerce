import {
  ADD_EMAILVERIFICATION,
  UPDATE_EMAILVERIFICATION,
  DELETE_EMAILVERIFICATION,
  FETCH_EMAILVERIFICATION,
  FETCH_EMAILVERIFICATION_FAILURE,
  FETCH_EMAILVERIFICATION_SUCCESS,
  EMAILVERIFICATION,
  
  } from "../actions/emailVerificationActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function emailverificationReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_EMAILVERIFICATION_SUCCESS:
        return {
          ...state,
          email: {
            ...state.email,
            data: action.payload,
          },
        };
  
  
  
      case ADD_EMAILVERIFICATION:
        return {
          ...state,
          email: {
            ...state.email,
            data: action.payload,
          },
        };
  
        case UPDATE_EMAILVERIFICATION:
        return {
          ...state,
          email: {
            ...state.email,
            data: action.payload,
          },
        };
  
        case EMAILVERIFICATION:
        return {
          ...state,
          email: {
            ...state.email,
            data: action.payload,
          },
        };
  
        case DELETE_EMAILVERIFICATION:
          return {
            ...state,
            email: {
              ...state.email,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  