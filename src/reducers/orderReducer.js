import {
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    FETCH_ORDER,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE,
    ORDER,
  } from "../actions/orderActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function orderReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ORDER_SUCCESS:
        return {
          ...state,
          order: {
            ...state.order,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ORDER:
        return {
          ...state,
          order: {
            ...state.order,
            data: action.payload,
          },
        };
  
        case UPDATE_ORDER:
        return {
          ...state,
          order: {
            ...state.order,
            data: action.payload,
          },
        };
  
        case ORDER:
        return {
          ...state,
          order: {
            ...state.order,
            data: action.payload,
          },
        };
  
        case DELETE_ORDER:
          return {
            ...state,
            order: {
              ...state.order,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  