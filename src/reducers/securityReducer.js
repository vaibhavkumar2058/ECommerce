import {
    ADD_SECURITY,
    UPDATE_SECURITY,
    DELETE_SECURITY,
    FETCH_SECURITY,
    FETCH_SECURITY_SUCCESS,
    FETCH_SECURITY_FAILURE,
    SECURITY,
  } from "../actions/securityActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function securityReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_SECURITY_SUCCESS:
        return {
          ...state,
          security: {
            ...state.security,
            data: action.payload,
          },
        };
  
  
  
      case ADD_SECURITY:
        return {
          ...state,
          security: {
            ...state.security,
            data: action.payload,
          },
        };
  
        case UPDATE_SECURITY:
        return {
          ...state,
          security: {
            ...state.security,
            data: action.payload,
          },
        };

        case SECURITY:
        return {
          ...state,
          security: {
            ...state.security,
            data: action.payload,
          },
        };
  
        
  
        case DELETE_SECURITY:
          return {
            ...state,
            security: {
              ...state.security,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  