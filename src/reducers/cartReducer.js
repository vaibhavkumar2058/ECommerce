import {
    ADD_CART,
    UPDATE_CART,
    DELETE_CART,
    FETCH_CART,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    CART,
  } from "../actions/cartActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function cartReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_CART_SUCCESS:
        return {
          ...state,
          cart: {
            ...state.cart,
            data: action.payload,
          },
        };
  
  
  
      case ADD_CART:
        return {
          ...state,
          cart: {
            ...state.cart,
            data: action.payload,
          },
        };
  
        case UPDATE_CART:
        return {
          ...state,
          cart: {
            ...state.cart,
            data: action.payload,
          },
        };
  
        case CART:
        return {
          ...state,
          cart: {
            ...state.cart,
            data: action.payload,
          },
        };
  
        case DELETE_CART:
          return {
            ...state,
            cart: {
              ...state.cart,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  