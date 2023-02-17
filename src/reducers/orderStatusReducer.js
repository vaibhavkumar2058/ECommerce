import {
    ADD_ORDER_STATUS,
    UPDATE_ORDER_STATUS,
    DELETE_ORDER_STATUS,
    FETCH_ORDER_STATUS,
    FETCH_ORDER_STATUS_SUCCESS,
    FETCH_ORDER_STATUS_FAILURE,
    ORDER_STATUS,
  } from "../actions/orderStatusActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function orderStatusReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          orderStatus: {
            ...state.orderTracking,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ORDER_STATUS:
        return {
          ...state,
          orderStatus: {
            ...state.orderStatus,
            data: action.payload,
          },
        };
  
        case UPDATE_ORDER_STATUS:
        return {
          ...state,
          orderStatus: {
            ...state.orderStatus,
            data: action.payload,
          },
        };
  
        case ORDER_STATUS:
        return {
          ...state,
          orderStatus: {
            ...state.orderStatus,
            data: action.payload,
          },
        };
  
        case DELETE_ORDER_STATUS:
          return {
            ...state,
            orderStatus: {
              ...state.orderStatus,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  