import {
    ADD_TAX,
    UPDATE_TAX,
    DELETE_TAX,
    FETCH_TAX,
    FETCH_TAX_SUCCESS,
    FETCH_TAX_FAILURE,
    TAX,
  } from "../actions/taxActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function taxReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_TAX_SUCCESS:
        return {
          ...state,
          tax: {
            ...state.tax,
            data: action.payload,
          },
        };
  
  
  
      case ADD_TAX:
        return {
          ...state,
          tax: {
            ...state.tax,
            data: action.payload,
          },
        };
  
        case UPDATE_TAX:
        return {
          ...state,
          tax: {
            ...state.tax,
            data: action.payload,
          },
        };
  
        case TAX:
        return {
          ...state,
          tax: {
            ...state.tax,
            data: action.payload,
          },
        };
  
        case DELETE_TAX:
          return {
            ...state,
            tax: {
              ...state.tax,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  