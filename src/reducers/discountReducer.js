import {
    ADD_DISCOUNT,
    UPDATE_DISCOUNT,
    DELETE_DISCOUNT,
    FETCH_DISCOUNT,
    FETCH_DISCOUNT_SUCCESS,
    FETCH_DISCOUNT_FAILURE,
    DISCOUNT,
  } from "../actions/discountActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function discountReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_DISCOUNT_SUCCESS:
        return {
          ...state,
          discount: {
            ...state.discount,
            data: action.payload,
          },
        };
  
  
  
      case ADD_DISCOUNT:
        return {
          ...state,
          discount: {
            ...state.discount,
            data: action.payload,
          },
        };
  
        case UPDATE_DISCOUNT:
        return {
          ...state,
          discount: {
            ...state.discount,
            data: action.payload,
          },
        };
  
        case DISCOUNT:
        return {
          ...state,
          discount: {
            ...state.discount,
            data: action.payload,
          },
        };
  
        case DELETE_DISCOUNT:
          return {
            ...state,
            discount: {
              ...state.discount,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  