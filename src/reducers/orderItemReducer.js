import {
    ADD_ORDERITEM,
    UPDATE_ORDERITEM,
    DELETE_ORDERITEM,
    FETCH_ORDERITEM,
    FETCH_ORDERITEM_SUCCESS,
    FETCH_ORDERITEM_FAILURE,
    ORDERITEM,
  } from "../actions/orderItemActions";
  
  const initialState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export function orderItemReducer(state = initialState, action) {
    switch (action.type) {
  
      case FETCH_ORDERITEM_SUCCESS:
        return {
          ...state,
          orderItem: {
            ...state.orderItem,
            data: action.payload,
          },
        };
  
  
  
      case ADD_ORDERITEM:
        return {
          ...state,
          orderItemx: {
            ...state.orderItem,
            data: action.payload,
          },
        };
  
        case UPDATE_ORDERITEM:
        return {
          ...state,
          orderItem: {
            ...state.orderItem,
            data: action.payload,
          },
        };
  
        case ORDERITEM:
        return {
          ...state,
          orderItem: {
            ...state.orderItem,
            data: action.payload,
          },
        };
  
        case DELETE_ORDERITEM:
          return {
            ...state,
            orderItem: {
              ...state.orderItem,
              data: action.payload,
            },
          };
  
  
  
      default:
        return state;
    }
  }
  