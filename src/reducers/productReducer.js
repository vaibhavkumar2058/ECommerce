import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    FETCH_PRODUCT,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    PRODUCT,
  } from "../actions/productActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function productReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_PRODUCT_SUCCESS:
        return {
          ...state,
          product: {
            ...state.product,
            data: action.payload,
          },
        };
  
  
  
      case ADD_PRODUCT:
        return {
          ...state,
          product: {
            ...state.product,
            data: action.payload,
          },
        };
  
        case UPDATE_PRODUCT:
        return {
          ...state,
          product: {
            ...state.product,
            data: action.payload,
          },
        };
  
        case PRODUCT:
        return {
          ...state,
          product: {
            ...state.product,
            data: action.payload,
          },
        };
  
        case DELETE_PRODUCT:
          return {
            ...state,
            product: {
              ...state.product,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  